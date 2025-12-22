import React, { useState, useEffect, useMemo, useRef } from 'react';

export default function StudyStep4({ lesson, onComplete }) {
    // --- KHỞI TẠO DỮ LIỆU BAN ĐẦU ---
    // Sử dụng lazy initial state để chỉ chạy logic xáo trộn 1 lần khi mount
    const [gameState, setGameState] = useState(() => {
        // 1. Copy và xáo trộn toàn bộ từ vựng trong bài
        const allWords = [...lesson.words].sort(() => 0.5 - Math.random());
        
        // 2. Lấy 10 từ đầu tiên làm batch 1
        const firstBatch = allWords.slice(0, 10);
        
        // 3. Số còn lại đưa vào pool
        const remainingPool = allWords.slice(10);

        return {
            pool: remainingPool,       // Bể chứa các từ chưa học (hoặc trả về)
            currentBatch: firstBatch,  // 10 từ đang học
        };
    });

    // --- STATE UI & LOGIC GAME ---
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [timeLeft, setTimeLeft] = useState(15);
    
    // State lưu danh sách ID các từ làm sai trong lượt này
    const [wrongIds, setWrongIds] = useState([]); 

    // Thống kê hiển thị cuối mỗi lượt
    const [batchStats, setBatchStats] = useState({ correct: 0, wrong: 0 });
    const [showSummary, setShowSummary] = useState(false);

    const currentWord = gameState.currentBatch[currentIndex];
    const timerRef = useRef(null);

    // --- LOGIC 1: TẠO ĐÁP ÁN ---
    const options = useMemo(() => {
        if (!currentWord) return [];
        // Lấy 3 từ nhiễu
        const distractors = lesson.words
            .filter(w => w.id !== currentWord.id)
            .sort(() => 0.5 - Math.random())
            .slice(0, 3);
        return [currentWord, ...distractors].sort(() => 0.5 - Math.random());
    }, [currentWord, lesson.words]);

    // --- LOGIC 2: ĐỒNG HỒ ĐẾM NGƯỢC ---
    useEffect(() => {
        if (isAnswered || !currentWord || showSummary) return;

        if (timeLeft === 0) {
            handleAnswer(null); // Hết giờ = Sai
            return;
        }

        timerRef.current = setTimeout(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearTimeout(timerRef.current);
    }, [timeLeft, isAnswered, currentWord, showSummary]);

    // --- LOGIC 3: XỬ LÝ TRẢ LỜI ---
    const handleAnswer = (option) => {
        setIsAnswered(true);
        setSelectedOption(option);
        if (timerRef.current) clearTimeout(timerRef.current);

        const isCorrect = option && option.id === currentWord.id;

        setBatchStats(prev => ({
            correct: prev.correct + (isCorrect ? 1 : 0),
            wrong: prev.wrong + (isCorrect ? 0 : 1)
        }));

        // Nếu sai -> Lưu ID lại để lát nữa cộng dồn vào pool
        if (!isCorrect) {
            setWrongIds(prev => [...prev, currentWord.id]);
        }
    };

    // --- LOGIC 4: CHUYỂN CÂU THỦ CÔNG ---
    const handleManualNext = () => {
        setIsAnswered(false);
        setSelectedOption(null);
        setTimeLeft(15);

        if (currentIndex < gameState.currentBatch.length - 1) {
            setCurrentIndex(prev => prev + 1);
        } else {
            // Hết lượt -> Hiện bảng tổng kết
            setShowSummary(true);
        }
    };

    // --- LOGIC 5: BẮT ĐẦU LƯỢT TIẾP THEO (TRỌNG TÂM) ---
    const handleStartNextBatch = () => {
        // 1. Tìm lại các object từ vựng bị sai dựa trên wrongIds
        const wrongWords = gameState.currentBatch.filter(w => wrongIds.includes(w.id));

        // 2. Gộp các từ sai vào Pool hiện tại (Cộng dồn)
        // Ví dụ: Pool cũ (10) + Sai (4) = 14 từ
        const combinedPool = [...gameState.pool, ...wrongWords];

        // 3. Kiểm tra điều kiện hoàn thành
        if (combinedPool.length === 0) {
            onComplete();
            return;
        }

        // 4. Trộn lại toàn bộ (Shuffle)
        const shuffledPool = combinedPool.sort(() => 0.5 - Math.random());

        // 5. Lấy ra 10 câu tiếp theo (hoặc ít hơn nếu không đủ 10)
        const nextBatch = shuffledPool.slice(0, 10);
        const nextPool = shuffledPool.slice(10); // Phần thừa để dành cho lượt sau nữa

        // 6. Cập nhật State
        setGameState({
            pool: nextPool,
            currentBatch: nextBatch
        });

        // 7. Reset các chỉ số phụ
        setWrongIds([]); // Xóa danh sách sai tạm thời
        setBatchStats({ correct: 0, wrong: 0 });
        setCurrentIndex(0);
        setShowSummary(false);
        setIsAnswered(false);
        setTimeLeft(15);
    };

    // --- HELPER: Regex thông minh (Đã nâng cấp) ---
    const formatQuestion = (sentence, vocab) => {
        if (!vocab) return sentence;

        // BƯỚC 1: Xử lý tìm gốc từ (Root word)
        let root = vocab;
        
        // Chỉ xử lý nếu từ dài hơn 3 ký tự (để tránh cắt sai các từ ngắn như "be", "see")
        if (root.length > 3) {
            if (root.endsWith('e')) {
                // Ví dụ: discharge -> discharg (để bắt được discharging, discharged)
                root = root.slice(0, -1);
            } else if (root.endsWith('y')) {
                // Ví dụ: happy -> happ (để bắt được happiness, happily)
                root = root.slice(0, -1);
            }
        }

        // BƯỚC 2: Tạo Regex bắt gốc từ + các ký tự nối đuôi (\w*)
        const regex = new RegExp(`\\b${root}\\w*\\b`, 'gi'); 
        
        if (isAnswered) {
            return (
                <span dangerouslySetInnerHTML={{
                    __html: sentence.replace(
                        regex, 
                        (match) => `<span class="text-green-600 font-bold underline decoration-2">${match}</span>`
                    )
                }} />
            );
        } else {
            return sentence.replace(regex, '________');
        }
    };

    // --- RENDER MÀN HÌNH TỔNG KẾT ---
    
    // --- MÀN HÌNH 1: TỔNG KẾT BATCH ---
    if (showSummary) {
        // Tính số câu còn lại (Pool chưa học + Các câu vừa sai)
        const remainingCount = gameState.pool.length + wrongIds.length;

        return (
            <div className="w-full max-w-2xl mx-auto p-6 flex flex-col items-center justify-center min-h-[60vh] animate-fade-in">
                <div className="bg-white rounded-2xl shadow-xl p-8 w-full text-center border-t-4 border-blue-500">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Tổng kết lượt này</h2>
                    
                    <div className="flex justify-center gap-8 mb-8">
                        <div className="text-center">
                            <div className="text-4xl font-bold text-green-500 mb-1">{batchStats.correct}</div>
                            <div className="text-sm text-gray-400 font-semibold uppercase">Đúng</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-red-500 mb-1">{batchStats.wrong}</div>
                            <div className="text-sm text-gray-400 font-semibold uppercase">Sai</div>
                        </div>
                    </div>

                    {/* ĐOẠN BẠN CẦN SỬA LÀ Ở ĐÂY */}
                    <p className="text-gray-600 mb-8 px-4 text-lg">
                        {batchStats.wrong > 0 
                            ? `Bạn làm sai ${batchStats.wrong} câu. Bạn còn ${remainingCount} câu cần hoàn thành.`
                            : (remainingCount > 0 
                                ? `Xuất sắc! Bạn còn ${remainingCount} câu cần hoàn thành.`
                                : "Chúc mừng! Bạn đã hoàn thành tất cả câu hỏi.")}
                    </p>

                    <button 
                        onClick={handleStartNextBatch}
                        className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg transition-all transform active:scale-95 text-lg"
                    >
                        {remainingCount > 0 
                            ? "Bắt đầu lượt tiếp theo →" 
                            : "Hoàn thành bài học 🎉"}
                    </button>
                </div>
            </div>
        );
    }

    if (!currentWord) return <div className="p-10 text-center text-gray-500">Đang khởi tạo dữ liệu...</div>;

    return (
        <div className="w-full max-w-2xl mx-auto p-4 flex flex-col min-h-[60vh] justify-center relative">
            
            {/* Header */}
            <div className="flex justify-between items-end mb-2">
                <span className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                    Context Challenge
                </span>
                <span className="text-sm text-gray-400 font-mono">
                    Câu {currentIndex + 1}/{gameState.currentBatch.length}
                </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 mb-6 overflow-hidden">
                <div 
                    key={currentIndex}
                    className={`h-full transition-all duration-1000 ease-linear ${timeLeft <= 5 ? 'bg-red-500' : 'bg-blue-500'}`}
                    style={{ width: `${(timeLeft / 15) * 100}%` }}
                ></div>
            </div>

            {/* Question Card */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 mb-4 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-indigo-600"></div>
                
                <div className="text-xl md:text-2xl font-medium text-gray-800 leading-relaxed mb-2">
                   {formatQuestion(currentWord.example_en, currentWord.vocab)}
                </div>

                {isAnswered && (
                    <div className="mt-6 pt-5 border-t border-dashed border-gray-200 animate-fade-in-up">
                        <div className="text-gray-500 italic text-lg font-serif">
                            "{currentWord.example_vi}"
                        </div>
                    </div>
                )}
            </div>

            {/* Options */}
            <div className="grid grid-cols-1 gap-3 mb-24 md:mb-20"> 
                {options.map((option) => {
                    let btnClass = "p-4 rounded-xl border-2 text-left font-medium transition-all ";
                    if (!isAnswered) {
                        btnClass += "bg-white border-gray-200 hover:border-blue-400 hover:bg-blue-50 text-gray-700 shadow-sm active:scale-[0.98]";
                    } else {
                        if (option.id === currentWord.id) {
                            btnClass += "bg-green-100 border-green-500 text-green-800 font-bold shadow-md"; 
                        } else if (selectedOption === option) {
                            btnClass += "bg-red-100 border-red-500 text-red-800"; 
                        } else {
                            btnClass += "bg-gray-50 border-gray-100 text-gray-300 opacity-50"; 
                        }
                    }
                    return (
                        <button
                            key={option.id}
                            onClick={() => !isAnswered && handleAnswer(option)}
                            disabled={isAnswered}
                            className={btnClass}
                        >
                            <span className="inline-block w-6 h-6 rounded-full bg-gray-200 text-xs text-center leading-6 mr-3 text-gray-500 font-bold">?</span>
                            {option.vocab}
                        </button>
                    );
                })}
            </div>

            {/* Next Button */}
            {isAnswered && (
                <div className="fixed bottom-6 left-0 w-full px-4 z-10 md:absolute md:bottom-0 md:px-0">
                    <button 
                        onClick={handleManualNext}
                        className="w-full max-w-2xl mx-auto block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl shadow-xl transition-all transform active:scale-95 animate-bounce-small"
                    >
                        {currentIndex === gameState.currentBatch.length - 1 ? "Xem kết quả lượt này →" : "Câu tiếp theo →"}
                    </button>
                </div>
            )}
        </div>
    );
}