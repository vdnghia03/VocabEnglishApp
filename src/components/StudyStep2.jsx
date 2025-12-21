
import React, { useState } from 'react';

export default function StudyStep2({ lesson, onComplete }) {
  // 1. CÁC STATE QUẢN LÝ DỮ LIỆU
  const [pool, setPool] = useState(lesson.words);
  const [learned, setLearned] = useState([]);
  const [unlearned, setUnlearned] = useState([]);
  const [revealedIds, setRevealedIds] = useState({});

  // 2. CÁC HÀM XỬ LÝ LOGIC
  const handleForgotImmediately = (word) => {
    // Xóa khỏi pool, thêm vào unlearned
    setPool(pool.filter(w => w.id !== word.id));
    setUnlearned((prev) => [...prev, word]);
  };

  const handleReveal = (id) => {
    setRevealedIds({ ...revealedIds, [id]: true });
  };

  const handleConfirmKnown = (word) => {
    // Xóa khỏi pool, thêm vào learned
    setPool(pool.filter(w => w.id !== word.id));
    setLearned([...learned, word]);
    // Reset trạng thái reveal
    const newReveals = { ...revealedIds };
    delete newReveals[word.id];
    setRevealedIds(newReveals);
  };

  const handleConfirmWrong = (word) => {
    // Xóa khỏi pool, thêm vào unlearned
    setPool(pool.filter(w => w.id !== word.id));
    setUnlearned([...unlearned, word]);
    // Reset trạng thái reveal
    const newReveals = { ...revealedIds };
    delete newReveals[word.id];
    setRevealedIds(newReveals);
  };

  const handleRetryUnlearned = () => {
    setPool((prevPool) => [...prevPool, ...unlearned]);
    setUnlearned([]);
  };

  const isAllDone = pool.length === 0 && unlearned.length === 0;
  const isRoundDone = pool.length === 0 && !isAllDone;

  return (
    <div className="bg-white rounded-sm shadow-xl border border-slate-300 overflow-hidden min-h-[600px] flex flex-col relative max-w-3xl mx-auto">
      
      {/* HEADER */}
      <div className="bg-slate-100 p-6 border-b border-slate-300">
         <h2 className="text-center text-slate-800 font-bold uppercase text-sm tracking-wider mb-4">
            Chia từ vào 2 nhóm cho tới khi thuộc hết
         </h2>

         <div className="flex gap-4">
             {/* Thẻ Xanh */}
             <div className="flex-1 bg-green-700 rounded-sm p-4 text-white text-center shadow-sm relative overflow-hidden">
                <div className="text-4xl font-bold">{learned.length}</div>
                <div className="text-xs font-bold uppercase opacity-90">Đã thuộc</div>
             </div>

             {/* Thẻ Đỏ */}
             <div className="flex-1 bg-red-700 rounded-sm p-4 text-white text-center shadow-sm relative overflow-hidden">
                <div className="text-4xl font-bold">{unlearned.length}</div>
                <div className="text-xs font-bold uppercase opacity-90">Chưa thuộc</div>
             </div>
         </div>
      </div>

      {/* BODY */}
      <div className="flex-1 overflow-y-auto p-4 bg-slate-50 mb-20"> 
        
        
        {/* CASE 1: HOÀN THÀNH - Đã sửa để chuyển sang Step 3 */}
        {isAllDone && (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 mt-10">
                <div className="bg-green-100 p-6 rounded-full mb-4">
                    <span className="text-6xl">🏆</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-2">Tuyệt vời!</h3>
                <p className="text-slate-500 mb-6">Bạn đã thuộc mặt chữ toàn bộ từ vựng.</p>
                
                {/* NÚT CHUYỂN SANG STEP 3 */}
                <button 
                    onClick={onComplete} // Hàm này sẽ báo cho App.jsx chuyển sang Step 3
                    className="bg-blue-700 text-white px-10 py-4 rounded-sm font-bold shadow-lg hover:bg-blue-800 transition-all uppercase flex items-center gap-3 animate-bounce-slow"
                >
                    <span>Sang Bước 3: Nhanh như chớp</span>
                    <span className="text-xl">→</span>
                </button>
            </div>
        )}

        {/* CASE 2: HẾT VÒNG */}
        {isRoundDone && (
             <div className="h-full flex flex-col items-center justify-center text-center p-6 mt-10">
                <div className="bg-red-50 p-6 rounded-full mb-4 border border-red-200">
                    <span className="text-4xl text-red-700 font-bold">{unlearned.length}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">Đã hết từ mới</h3>
                <p className="text-slate-500 mb-6 text-sm">Vui lòng bấm nút bên dưới để ôn lại các từ chưa thuộc.</p>
            </div>
        )}

        {/* CASE 3: LIST TỪ VỰNG */}
        {!isAllDone && (
            <div className="space-y-4">
                {pool.map((item, index) => {
                    const isRevealed = revealedIds[item.id];
                    return (
                        <div key={item.id} className="bg-white rounded-sm shadow-sm border border-slate-300 overflow-hidden">
                            <div className="flex flex-col md:flex-row">
                                {/* Cột Trái: Nội dung */}
                                <div 
                                    className={`flex-1 p-5 flex flex-col justify-center transition-colors 
                                    ${isRevealed ? 'bg-[#fcd34d]' : 'bg-white'}`} // <-- Đã sửa: Màu vàng đậm #fcd34d
                                >
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className={`text-xs font-bold px-1 border ${isRevealed ? 'text-black border-black' : 'text-slate-400 border-slate-200'}`}>
                                            #{index + 1}
                                        </span>
                                        {/* Đã sửa: font-normal (không in đậm) */}
                                        <span className="text-xl font-normal text-slate-800">{item.vocab}</span>
                                    </div>
                                    
                                    <div className={`transition-all duration-200 overflow-hidden ${isRevealed ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'}`}>
                                        <p className="text-slate-800 font-medium text-base border-t border-slate-800/20 mt-2 pt-2">
                                            {item.meaning}
                                        </p>
                                    </div>
                                </div>

                                {/* Cột Phải: Hành động */}
                                <div className={`p-3 flex items-center justify-center gap-3 border-l min-w-[260px] ${isRevealed ? 'bg-[#fcd34d] border-[#fcd34d]' : 'bg-slate-50 border-slate-200'}`}>
                                    {!isRevealed ? (
                                        <>
                                            <button 
                                                onClick={() => handleReveal(item.id)}
                                                className="flex-1 bg-green-700 hover:bg-green-800 text-white text-sm font-bold py-3 px-2 rounded-sm shadow-sm transition-colors flex flex-col items-center gap-1 whitespace-nowrap"
                                            >
                                                <span>✔</span> <span>Nhớ từ này</span>
                                            </button>
                                            <button 
                                                onClick={() => handleForgotImmediately(item)}
                                                className="flex-1 bg-red-700 hover:bg-red-800 text-white text-sm font-bold py-3 px-2 rounded-sm shadow-sm transition-colors flex flex-col items-center gap-1 whitespace-nowrap"
                                            >
                                                <span>✖</span> <span>Quên từ này</span>
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                             <button 
                                                onClick={() => handleConfirmKnown(item)}
                                                className="flex-1 bg-white border-2 border-green-700 text-green-700 hover:bg-green-50 text-sm font-bold py-2 px-2 rounded-sm transition-colors flex flex-col items-center whitespace-nowrap"
                                            >
                                                <span className="text-lg">✔</span> <span>Đã thuộc</span>
                                            </button>
                                            <button 
                                                onClick={() => handleConfirmWrong(item)}
                                                className="flex-1 bg-white border-2 border-red-700 text-red-700 hover:bg-red-50 text-sm font-bold py-2 px-2 rounded-sm transition-colors flex flex-col items-center whitespace-nowrap"
                                            >
                                                <span className="text-lg">✖</span> <span>Nhớ sai</span>
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        )}
      </div>

      {/* FOOTER CỐ ĐỊNH */}
      {!isAllDone && unlearned.length > 0 && (
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-300 shadow-lg z-10 flex justify-center">
              <button 
                onClick={handleRetryUnlearned}
                className="w-full md:w-auto bg-blue-700 hover:bg-blue-800 text-white px-8 py-3 rounded-sm font-bold shadow-md transition-all uppercase flex items-center justify-center gap-2"
            >
                <span>↺</span> Tiếp tục với {unlearned.length} từ chưa thuộc
            </button>
          </div>
      )}

      {!isAllDone && unlearned.length === 0 && (
          <div className="absolute bottom-0 left-0 right-0 p-2 bg-slate-100 border-t border-slate-300 text-center text-[10px] text-slate-500 uppercase tracking-widest">
              Spaced Repetition System
          </div>
      )}

    
    </div>
  );
}