import React from 'react';

export default function StudyStep1({ lesson, onComplete }) {
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-indigo-100 overflow-hidden min-h-[600px] flex flex-col relative max-w-2xl mx-auto">
      
      {/* Header */}
      <div className="bg-indigo-600 p-6 text-center">
        <h2 className="text-white text-xl font-bold uppercase tracking-wide">Bước 1: Ghi nhớ mặt chữ</h2>
        <div className="mt-3 bg-indigo-500/50 inline-block px-4 py-2 rounded-lg backdrop-blur-sm">
           <p className="text-indigo-100 text-sm font-medium">✍️ Hãy chép tất cả từ vựng dưới đây vào vở để não bộ ghi nhớ lần đầu.</p>
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
              <span className="opacity-0 group-hover:opacity-100 text-indigo-400 text-xl transition-opacity">
                ✎
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Button */}
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