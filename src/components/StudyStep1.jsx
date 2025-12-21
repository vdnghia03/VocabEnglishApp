
import React from 'react';

export default function StudyStep1({ lesson, onComplete }) {

  // --- HÀM XỬ LÝ PHÁT ÂM ---
  const handleSpeak = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Ngắt lời cũ
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US'; 
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    // Giữ nguyên class của bạn: max-w-2xl mx-auto (Kích thước gọn gàng)
    <div className="bg-white rounded-2xl shadow-xl border border-indigo-100 overflow-hidden min-h-[600px] flex flex-col relative max-w-2xl mx-auto">
      
      {/* Header - Giữ nguyên */}
      <div className="bg-indigo-600 p-6 text-center">
        <h2 className="text-white text-xl font-bold uppercase tracking-wide">Bước 1: Ghi nhớ mặt chữ</h2>
        <div className="mt-3 bg-indigo-500/50 inline-block px-4 py-2 rounded-lg backdrop-blur-sm">
           <p className="text-indigo-100 text-sm font-medium">✍️ Hãy nghe và chép tất cả từ vựng dưới đây vào vở.</p>
        </div>
      </div>

      {/* List từ vựng */}
      <div className="flex-1 overflow-y-auto p-6 bg-slate-50">
        <div className="space-y-3">
          {lesson.words.map((item, index) => (
            <div key={item.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between group hover:border-indigo-300 transition-all">
              <div className="flex items-center gap-4">
                 <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-500 font-bold text-sm">
                   {index + 1}
                 </span>
                 <div>
                   <p className="text-lg font-bold text-slate-800">{item.vocab}</p>
                   <p className="text-slate-500 text-sm">{item.meaning}</p>
                 </div>
              </div>
              
              {/* THAY ĐỔI Ở ĐÂY: Thay icon bút chì bằng nút Loa */}
              {/* Giữ nguyên hiệu ứng opacity-0 group-hover:opacity-100 để chỉ hiện khi di chuột vào */}
              <button 
                onClick={() => handleSpeak(item.vocab)}
                className="opacity-0 group-hover:opacity-100 text-indigo-500 hover:text-indigo-700 hover:bg-indigo-50 p-2 rounded-full transition-all"
                title="Nghe phát âm"
              >
                {/* Icon Loa */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06zM18.584 5.106a.75.75 0 011.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 11-1.06-1.06 8.25 8.25 0 000-11.668.75.75 0 010-1.06z" />
                  <path d="M15.932 7.757a.75.75 0 011.061 0 6 6 0 010 8.486.75.75 0 01-1.06-1.061 4.5 4.5 0 000-6.364.75.75 0 010-1.06z" />
                </svg>
              </button>

            </div>
          ))}
        </div>
      </div>

      {/* Footer Button - Giữ nguyên */}
      <div className="p-6 bg-white border-t border-slate-100 text-center">
         <button 
           onClick={onComplete}
           className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-12 rounded-full shadow-lg hover:shadow-indigo-500/30 transition-all transform hover:scale-105"
         >
           ĐÃ XONG
         </button>
         <p className="mt-3 text-xs text-slate-400">Ấn vào đây khi bạn đã chép xong hết các từ trên</p>
      </div>
    </div>
  );
}
