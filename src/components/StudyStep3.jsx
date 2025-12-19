

import React, { useState, useEffect } from 'react';

const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export default function StudyStep3({ lesson, onComplete }) {
  // --- STATE ---
  const [queue, setQueue] = useState(shuffleArray([...lesson.words]));
  const [currentBatch, setCurrentBatch] = useState([]);
  const [wrongWordsInBatch, setWrongWordsInBatch] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [gameState, setGameState] = useState('intro'); 
  const [timeLeft, setTimeLeft] = useState(3);
  const [options, setOptions] = useState([]);
  const [isAnswered, setIsAnswered] = useState(false);
  const [progressWidth, setProgressWidth] = useState(100);
  const [selectedOptionId, setSelectedOptionId] = useState(null); 

  // --- LOGIC ---
  const startNextBatch = () => {
    const nextBatchSize = Math.min(10, queue.length);
    const newBatch = queue.slice(0, nextBatchSize);
    const remainingQueue = queue.slice(nextBatchSize);
    
    setQueue(remainingQueue);
    setCurrentBatch(newBatch);
    setWrongWordsInBatch([]);
    setCurrentIndex(0);
    setGameState('playing');
    prepareQuestion(newBatch[0]);
  };

  const prepareQuestion = (targetWord) => {
    setTimeLeft(3);
    setIsAnswered(false);
    setSelectedOptionId(null);
    
    // 1. Reset về 100% ngay lập tức
    setProgressWidth(100); 

    const distractors = lesson.words
      .filter(w => w.id !== targetWord.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    
    const currentOptions = shuffleArray([targetWord, ...distractors]);
    setOptions(currentOptions);
    
    // 2. Sau một khoảnh khắc cực ngắn, mới cho tụt về 0%
    setTimeout(() => {
        setProgressWidth(0);
    }, 50);
  };

  useEffect(() => {
    let timer;
    if (gameState === 'playing' && timeLeft > 0 && !isAnswered) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && !isAnswered && gameState === 'playing') {
      handleAnswer(null); 
    }
    return () => clearInterval(timer);
  }, [timeLeft, isAnswered, gameState]);

  const handleAnswer = (option) => {
    setIsAnswered(true);
    const currentWord = currentBatch[currentIndex];
    
    setSelectedOptionId(option ? option.id : 'TIMEOUT');

    if (option && option.id === currentWord.id) {
        // Đúng
    } else {
        setWrongWordsInBatch(prev => [...prev, currentWord]);
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex < currentBatch.length - 1) {
        const nextIndex = currentIndex + 1;
        setCurrentIndex(nextIndex);
        prepareQuestion(currentBatch[nextIndex]);
    } else {
        setGameState('batch_summary');
        if (wrongWordsInBatch.length > 0) {
             setQueue(prev => [...prev, ...wrongWordsInBatch]);
        }
    }
  };

  // --- RENDER ---
  
  if (gameState === 'intro') {
      return (
        <div className="bg-white rounded-sm shadow-xl border border-slate-300 min-h-[600px] flex flex-col items-center justify-center p-8 max-w-3xl mx-auto text-center">
             <div className="bg-blue-700 text-white p-6 rounded-full mb-6 shadow-lg">
                <span className="text-6xl">⚡</span>
             </div>
             <h2 className="text-3xl font-bold text-slate-800 mb-2 uppercase">Nhanh như chớp</h2>
             <p className="text-slate-500 mb-8 max-w-md">
                Bạn có 3 giây cho mỗi từ vựng. Trả lời sai sẽ bị phạt học lại ở lượt sau.
             </p>
             <button onClick={startNextBatch} className="bg-[#fcd34d] hover:bg-yellow-400 text-black font-bold py-4 px-12 rounded-full uppercase tracking-wider shadow-md transition-all transform hover:scale-105">
                Bắt đầu ngay
             </button>
        </div>
      );
  }

  if (gameState === 'batch_summary') {
      const isQueueEmpty = queue.length === 0;
      return (
        <div className="bg-white rounded-sm shadow-xl border border-slate-300 min-h-[600px] flex flex-col items-center justify-center p-8 max-w-3xl mx-auto text-center">
             <h2 className="text-2xl font-bold text-slate-800 mb-4 uppercase">Tổng kết lượt này</h2>
             <div className="flex gap-4 mb-8 w-full max-w-sm">
                 <div className="flex-1 bg-green-100 p-4 border border-green-200 rounded-xl">
                     <div className="text-3xl font-bold text-green-700">{currentBatch.length - wrongWordsInBatch.length}</div>
                     <div className="text-xs uppercase text-green-600 font-bold">Đúng</div>
                 </div>
                 <div className="flex-1 bg-red-100 p-4 border border-red-200 rounded-xl">
                     <div className="text-3xl font-bold text-red-700">{wrongWordsInBatch.length}</div>
                     <div className="text-xs uppercase text-red-600 font-bold">Sai (Học lại)</div>
                 </div>
             </div>
             {isQueueEmpty ? (
                 <div>
                    <div className="text-6xl mb-4">🏆</div>
                    <h3 className="text-xl font-bold text-slate-700 mb-6">Bạn đã thuộc lòng tất cả từ vựng!</h3>
                    <button onClick={onComplete} className="bg-green-700 text-white font-bold py-3 px-10 rounded-full uppercase shadow-md hover:bg-green-800 transition-all">
                        Hoàn thành bài học
                    </button>
                 </div>
             ) : (
                 <div>
                    <p className="text-slate-500 mb-6">Vẫn còn <strong>{queue.length}</strong> lượt cần hoàn thành.</p>
                    <button onClick={startNextBatch} className="bg-blue-700 text-white font-bold py-3 px-10 rounded-full uppercase shadow-md animate-bounce-slow">
                        Tiếp tục →
                    </button>
                 </div>
             )}
        </div>
      );
  }

  // --- MÀN HÌNH CHƠI ---
  const currentWord = currentBatch[currentIndex];

  return (
    <div className="bg-[#e2e8f0] rounded-sm shadow-xl border border-slate-400 overflow-hidden min-h-[600px] flex flex-col relative max-w-[400px] mx-auto">
       
       {/* Header */}
       <div className="bg-[#2c3e50] p-4 text-center z-10 shadow-sm">
            <h2 className="text-white font-bold uppercase text-sm tracking-widest">Nhanh như chớp</h2>
       </div>

       {/* Thanh tiến độ câu hỏi */}
       <div className="w-full bg-slate-300 h-1">
           <div 
             className="bg-green-500 h-1 transition-all duration-300" 
             style={{ width: `${((currentIndex + 1) / currentBatch.length) * 100}%` }}
           ></div>
       </div>

       {/* Nội dung chính */}
       <div className="flex-1 p-6 flex flex-col items-center pt-6 pb-24 overflow-y-auto">
            
            {/* Đồng hồ + Thanh mượt */}
            <div className="w-full flex flex-col items-center mb-6">
                <div className={`
                    flex items-center justify-center w-20 h-16 rounded-2xl mb-3 shadow-lg border-2 border-white
                    ${timeLeft <= 1 ? 'bg-red-600 text-white animate-pulse' : 'bg-[#fcd34d] text-black'}
                    font-mono text-4xl font-bold 
                `}>
                    0{timeLeft}
                </div>

                <div className="w-full max-w-[200px] h-2 bg-gray-300 rounded-full overflow-hidden">
                    <div 
                        className={`h-full ${timeLeft <= 1 ? 'bg-red-500' : 'bg-[#fcd34d]'}`}
                        style={{ 
                            width: `${progressWidth}%`,
                            // ĐÃ SỬA LỖI Ở ĐÂY:
                            // Nếu width = 100% -> Tắt transition để nó "nhảy" về đầy ngay lập tức
                            // Nếu đã trả lời -> Tắt transition để nó đứng yên
                            transition: (isAnswered || progressWidth === 100) ? 'none' : 'width 3s linear' 
                        }}
                    ></div>
                </div>
            </div>

            {/* Từ vựng */}
            <div className="text-center mb-6 w-full">
                <p className="text-slate-500 text-[10px] uppercase mb-1 font-bold tracking-widest">ENGLISH WORD</p>
                <h3 className="text-4xl font-bold text-slate-800 break-words">{currentWord.vocab}</h3>
            </div>

            {/* Danh sách đáp án */}
            <div className="w-full space-y-3">
                {options.map((option, idx) => {
                    let btnClass = "bg-white text-slate-700 hover:bg-slate-50 border-slate-300"; 
                    
                    if (isAnswered) {
                        if (option.id === currentWord.id) {
                            btnClass = "bg-green-600 text-white border-green-700 shadow-md"; 
                        } else if (option.id === selectedOptionId) {
                            btnClass = "bg-red-600 text-white border-red-700 shadow-md"; 
                        } else {
                            btnClass = "bg-slate-100 text-slate-400 border-slate-200 opacity-40"; 
                        }
                    }

                    return (
                        <button
                            key={idx}
                            disabled={isAnswered}
                            onClick={() => handleAnswer(option)}
                            className={`
                                w-full py-3.5 px-4 text-lg font-medium text-left transition-all border-2 rounded-xl
                                ${btnClass}
                                ${!isAnswered ? 'hover:border-[#2c3e50] hover:-translate-y-1 hover:shadow-md' : ''}
                            `}
                        >
                            {option.meaning}
                        </button>
                    )
                })}
            </div>
       </div>

       {/* Nút Next Que */}
       {isAnswered && (
            <div className="absolute bottom-6 right-6 z-30 animate-bounce-slow">
                <button 
                    onClick={handleNextQuestion}
                    className="bg-[#2c3e50] text-white px-8 py-3 font-bold uppercase tracking-wider rounded-lg hover:bg-[#1a252f] shadow-xl border-2 border-white transition-transform active:scale-95 flex items-center gap-2"
                >
                    Next Que <span>→</span>
                </button>
            </div>
       )}
       
       {/* Footer số trang */}
       {!isAnswered && (
           <div className="absolute bottom-0 w-full bg-slate-200 p-2 text-center text-[10px] text-slate-500 uppercase tracking-widest border-t border-slate-300">
               {currentIndex + 1} of {currentBatch.length} Questions
           </div>
       )}
    </div>
  );
}