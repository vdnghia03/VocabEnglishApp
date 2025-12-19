// import React, { useState } from 'react';

// export default function StudyStep2({ lesson, onComplete }) {
//   // State tạm thời để hiển thị giao diện (Logic sẽ làm sau)
//   const [learnedCount, setLearnedCount] = useState(0);
//   const [unlearnedCount, setUnlearnedCount] = useState(0);

//   return (
//     <div className="max-w-4xl mx-auto">
//       {/* Header trạng thái */}
//       <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 mb-6 text-center">
//         <h2 className="text-xl font-bold text-slate-700 mb-4">Bước 2: Luyện tập & Sàng lọc</h2>
        
//         <div className="flex gap-4">
//            <div className="flex-1 bg-green-100 rounded-xl p-4 border border-green-200">
//              <div className="text-3xl font-bold text-green-600">{learnedCount}</div>
//              <div className="text-xs uppercase font-bold text-green-700">Đã thuộc</div>
//            </div>
//            <div className="flex-1 bg-red-100 rounded-xl p-4 border border-red-200">
//              <div className="text-3xl font-bold text-red-600">{unlearnedCount}</div>
//              <div className="text-xs uppercase font-bold text-red-700">Chưa thuộc</div>
//            </div>
//         </div>
//       </div>

//       {/* Khu vực Flashcard (Placeholder) */}
//       <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden min-h-[400px] flex flex-col items-center justify-center p-8 relative">
          
//           <div className="text-center">
//              <p className="text-slate-400 text-sm uppercase mb-2">Từ vựng đang học</p>
//              <h3 className="text-4xl font-bold text-slate-800 mb-8">example word</h3>
             
//              {/* Các nút hành động */}
//              <div className="flex gap-4 flex-wrap justify-center">
//                 <button className="bg-red-50 text-red-600 hover:bg-red-100 px-6 py-3 rounded-lg font-bold transition-colors">
//                   ✖ Quên từ này
//                 </button>
//                 <button className="bg-green-600 text-white hover:bg-green-700 px-6 py-3 rounded-lg font-bold shadow-lg transition-transform hover:scale-105">
//                   ✔ Nhớ từ này
//                 </button>
//              </div>
//           </div>

//       </div>
      
//       {/* Nút thoát tạm (để test) */}
//       <div className="text-center mt-6">
//         <button onClick={onComplete} className="text-slate-400 text-sm underline">
//           Kết thúc bài học (Debug)
//         </button>
//       </div>
//     </div>
//   );
// }


// import React, { useState, useEffect } from 'react';

// export default function StudyStep2({ lesson, onComplete }) {
//   // 1. CÁC STATE QUẢN LÝ DỮ LIỆU
  
//   // Danh sách từ đang cần học trong vòng này
//   const [pool, setPool] = useState(lesson.words);
  
//   // Danh sách từ đã thuộc (Cột Xanh)
//   const [learned, setLearned] = useState([]);
  
//   // Danh sách từ chưa thuộc (Cột Đỏ)
//   const [unlearned, setUnlearned] = useState([]);

//   // State lưu những ID từ vựng đang được "lật thẻ" xem nghĩa
//   // Dạng: { [id]: true/false }
//   const [revealedIds, setRevealedIds] = useState({});

//   // 2. CÁC HÀM XỬ LÝ LOGIC (ACTION)

//   // Xử lý khi bấm "Quên từ này" (Ngay từ đầu)
//   const handleForgotImmediately = (word) => {
//     // 1. Xóa khỏi pool (Dùng filter để loại bỏ từ có id trùng khớp)
//     const newPool = pool.filter(w => w.id !== word.id);
//     setPool(newPool);
    
//     // 2. Thêm vào danh sách chưa thuộc
//     setUnlearned((prev) => [...prev, word]);
//   };

//   // Xử lý khi bấm "Nhớ từ này" (Chỉ hiện nghĩa, chưa quyết định số phận)
//   const handleReveal = (id) => {
//     setRevealedIds({ ...revealedIds, [id]: true });
//   };

//   // Xử lý khi đã xem nghĩa và chọn "Đã thuộc" (Đúng)
//   const handleConfirmKnown = (word) => {
//     // 1. Xóa khỏi pool
//     setPool(pool.filter(w => w.id !== word.id));
//     // 2. Thêm vào danh sách đã thuộc
//     setLearned([...learned, word]);
//     // 3. Reset trạng thái reveal
//     const newReveals = { ...revealedIds };
//     delete newReveals[word.id];
//     setRevealedIds(newReveals);
//   };

//   // Xử lý khi đã xem nghĩa và chọn "Nhớ sai"
//   const handleConfirmWrong = (word) => {
//     setPool(pool.filter(w => w.id !== word.id));
//     setUnlearned([...unlearned, word]);
    
//     const newReveals = { ...revealedIds };
//     delete newReveals[word.id];
//     setRevealedIds(newReveals);
//   };

//   // Xử lý khi hết vòng và bấm "Tiếp tục với các từ chưa thuộc"
//   const handleRetryUnlearned = () => {
//     // Lấy toàn bộ từ chưa thuộc đưa ngược trở lại pool để học tiếp
//     setPool(unlearned);
//     setUnlearned([]); // Reset danh sách chưa thuộc về 0
//   };

//   // Logic kiểm tra hoàn thành
//   const isAllDone = pool.length === 0 && unlearned.length === 0;
//   const isRoundDone = pool.length === 0 && !isAllDone;

//   return (
//     <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden min-h-[600px] flex flex-col relative max-w-2xl mx-auto">
      
//       {/* HEADER: Tiêu đề + Bộ đếm Xanh/Đỏ */}
//       <div className="bg-slate-50 p-6 border-b border-slate-100">
//          <h2 className="text-center text-slate-700 font-bold uppercase text-sm tracking-wider mb-4">
//             Chia từ vào 2 nhóm cho tới khi thuộc hết
//          </h2>

//          <div className="flex gap-4">
//              {/* Thẻ Xanh (Đã thuộc) */}
//              <div className="flex-1 bg-green-500 rounded-xl p-3 text-white text-center shadow-md shadow-green-200 relative overflow-hidden">
//                 <div className="text-4xl font-bold">{learned.length}</div>
//                 <div className="text-xs font-bold uppercase opacity-90">Đã thuộc</div>
//                 <div className="absolute top-0 right-0 p-1 opacity-20">
//                     <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
//                 </div>
//              </div>

//              {/* Thẻ Đỏ (Chưa thuộc) */}
//              <div className="flex-1 bg-red-500 rounded-xl p-3 text-white text-center shadow-md shadow-red-200 relative overflow-hidden">
//                 <div className="text-4xl font-bold">{unlearned.length}</div>
//                 <div className="text-xs font-bold uppercase opacity-90">Chưa thuộc</div>
//                 <div className="absolute top-0 right-0 p-1 opacity-20">
//                      <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/></svg>
//                 </div>
//              </div>
//          </div>
//       </div>

//       {/* BODY: Danh sách từ vựng (Pool) */}
//       <div className="flex-1 overflow-y-auto p-4 bg-slate-50">
        
//         {/* Trường hợp 1: HOÀN THÀNH TẤT CẢ */}
//         {isAllDone && (
//             <div className="h-full flex flex-col items-center justify-center text-center p-6 animate-fade-in-up">
//                 <div className="bg-green-100 p-6 rounded-full mb-4">
//                     <span className="text-6xl">🏆</span>
//                 </div>
//                 <h3 className="text-2xl font-bold text-slate-800 mb-2">Tuyệt vời!</h3>
//                 <p className="text-slate-500 mb-6">Bạn đã thuộc toàn bộ từ vựng trong bài này.</p>
//                 <button 
//                     onClick={onComplete}
//                     className="bg-green-600 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-green-700 transition-all transform hover:scale-105"
//                 >
//                     HOÀN THÀNH BÀI HỌC
//                 </button>
//             </div>
//         )}

//         {/* Trường hợp 2: HẾT VÒNG (Nhưng vẫn còn từ chưa thuộc) */}
//         {isRoundDone && (
//              <div className="h-full flex flex-col items-center justify-center text-center p-6">
//                 <div className="bg-red-50 p-6 rounded-full mb-4 border border-red-100">
//                     <span className="text-4xl text-red-500 font-bold">{unlearned.length}</span>
//                 </div>
//                 <h3 className="text-xl font-bold text-slate-800 mb-2">Vẫn còn từ chưa nhớ</h3>
//                 <p className="text-slate-500 mb-6 text-sm">Hãy ôn lại nhóm từ chưa thuộc để ghi nhớ sâu hơn nhé.</p>
//                 <button 
//                     onClick={handleRetryUnlearned}
//                     className="bg-blue-600 text-white px-6 py-3 rounded-full font-bold shadow-lg hover:bg-blue-700 transition-all flex items-center gap-2"
//                 >
//                     Tiếp tục ôn từ chưa thuộc 
//                     <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
//                 </button>
//             </div>
//         )}

//         {/* Trường hợp 3: ĐANG HỌC (Hiển thị list pool) */}
//         {!isAllDone && !isRoundDone && (
//             <div className="space-y-3 pb-20">
//                 {pool.map((item, index) => {
//                     const isRevealed = revealedIds[item.id];

//                     return (
//                         <div key={item.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
//                             <div className="flex flex-col md:flex-row">
                                
//                                 {/* Cột Trái: Từ vựng & Nghĩa */}
//                                 <div className={`flex-1 p-4 flex flex-col justify-center ${isRevealed ? 'bg-yellow-50' : 'bg-white'}`}>
//                                     <div className="flex items-center gap-3 mb-1">
//                                         <span className="text-xs font-bold text-slate-300">#{index + 1}</span>
//                                         <span className="text-lg font-bold text-slate-800">{item.vocab}</span>
//                                     </div>
                                    
//                                     <div className={`transition-all duration-300 overflow-hidden ${isRevealed ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}>
//                                         <p className="text-slate-600 text-sm italic border-t border-slate-200/50 mt-2 pt-2">
//                                             Nghĩa: {item.meaning}
//                                         </p>
//                                     </div>
//                                 </div>

//                                 {/* Cột Phải: Các nút hành động */}
//                                 <div className="bg-slate-50 p-3 flex items-center justify-center gap-2 border-l border-slate-100 min-w-[200px]">
                                    
//                                     {!isRevealed ? (
//                                         // GIAI ĐOẠN 1: Chưa lật thẻ
//                                         <>
//                                             <button 
//                                                 onClick={() => handleReveal(item.id)}
//                                                 className="flex-1 bg-green-500 hover:bg-green-600 text-white text-xs font-bold py-3 px-3 rounded-lg shadow-sm transition-colors flex flex-col items-center gap-1"
//                                             >
//                                                 <span>✔</span> 
//                                                 <span>Nhớ từ này</span>
//                                             </button>
                                            
//                                             {/* --- ĐÃ SỬA LỖI Ở ĐÂY --- */}
//                                             {/* Trước đây: handleForgotImmediately(item.id) -> SAI */}
//                                             {/* Bây giờ: handleForgotImmediately(item) -> ĐÚNG */}
//                                             <button 
//                                                 onClick={() => handleForgotImmediately(item)}
//                                                 className="flex-1 bg-red-500 hover:bg-red-600 text-white text-xs font-bold py-3 px-3 rounded-lg shadow-sm transition-colors flex flex-col items-center gap-1"
//                                             >
//                                                 <span>✖</span>
//                                                 <span>Quên từ này</span>
//                                             </button>
//                                         </>
//                                     ) : (
//                                         // GIAI ĐOẠN 2: Đã lật thẻ
//                                         <>
//                                              <button 
//                                                 onClick={() => handleConfirmKnown(item)}
//                                                 className="flex-1 bg-white border-2 border-green-500 text-green-600 hover:bg-green-50 text-xs font-bold py-2 px-2 rounded-lg transition-colors flex flex-col items-center"
//                                             >
//                                                 <span className="text-lg">✔</span>
//                                                 <span>Đã thuộc</span>
//                                             </button>
//                                             <button 
//                                                 onClick={() => handleConfirmWrong(item)}
//                                                 className="flex-1 bg-white border-2 border-red-500 text-red-500 hover:bg-red-50 text-xs font-bold py-2 px-2 rounded-lg transition-colors flex flex-col items-center"
//                                             >
//                                                 <span className="text-lg">✖</span>
//                                                 <span>Nhớ sai</span>
//                                             </button>
//                                         </>
//                                     )}
//                                 </div>
//                             </div>
//                         </div>
//                     );
//                 })}
//             </div>
//         )}

//       </div>
      
//       {/* Footer */}
//       {!isAllDone && !isRoundDone && (
//           <div className="bg-white p-3 border-t border-slate-100 text-center text-xs text-slate-400 italic">
//               Tip: Hãy trung thực với bản thân để thuật toán hoạt động tốt nhất!
//           </div>
//       )}
//     </div>
//   );
// }

// import React, { useState } from 'react';

// export default function StudyStep2({ lesson, onComplete }) {
//   // 1. CÁC STATE QUẢN LÝ DỮ LIỆU
//   const [pool, setPool] = useState(lesson.words);
//   const [learned, setLearned] = useState([]);
//   const [unlearned, setUnlearned] = useState([]);
//   const [revealedIds, setRevealedIds] = useState({});

//   // 2. CÁC HÀM XỬ LÝ LOGIC (Giữ nguyên logic đã sửa đúng ở bước trước)
  
//   const handleForgotImmediately = (word) => {
//     const newPool = pool.filter(w => w.id !== word.id);
//     setPool(newPool);
//     setUnlearned((prev) => [...prev, word]);
//   };

//   const handleReveal = (id) => {
//     setRevealedIds({ ...revealedIds, [id]: true });
//   };

//   const handleConfirmKnown = (word) => {
//     setPool(pool.filter(w => w.id !== word.id));
//     setLearned([...learned, word]);
//     const newReveals = { ...revealedIds };
//     delete newReveals[word.id];
//     setRevealedIds(newReveals);
//   };

//   const handleConfirmWrong = (word) => {
//     setPool(pool.filter(w => w.id !== word.id));
//     setUnlearned([...unlearned, word]);
//     const newReveals = { ...revealedIds };
//     delete newReveals[word.id];
//     setRevealedIds(newReveals);
//   };

//   const handleRetryUnlearned = () => {
//     setPool(unlearned);
//     setUnlearned([]);
//   };

//   const isAllDone = pool.length === 0 && unlearned.length === 0;
//   const isRoundDone = pool.length === 0 && !isAllDone;

//   return (
//     // CHỈNH SỬA 1: Bỏ rounded-2xl -> rounded-sm (vuông vức hơn)
//     <div className="bg-white rounded-sm shadow-xl border border-slate-300 overflow-hidden min-h-[600px] flex flex-col relative max-w-3xl mx-auto">
      
//       {/* HEADER */}
//       <div className="bg-slate-100 p-6 border-b border-slate-300">
//          <h2 className="text-center text-slate-800 font-bold uppercase text-sm tracking-wider mb-4">
//             Chia từ vào 2 nhóm cho tới khi thuộc hết
//          </h2>

//          <div className="flex gap-4">
//              {/* CHỈNH SỬA 3: Màu Xanh Đậm (bg-green-700) & Bỏ bo góc */}
//              <div className="flex-1 bg-green-700 rounded-sm p-4 text-white text-center shadow-sm relative overflow-hidden">
//                 <div className="text-4xl font-bold">{learned.length}</div>
//                 <div className="text-xs font-bold uppercase opacity-90">Đã thuộc</div>
//              </div>

//              {/* CHỈNH SỬA 3: Màu Đỏ Đậm (bg-red-700) & Bỏ bo góc */}
//              <div className="flex-1 bg-red-700 rounded-sm p-4 text-white text-center shadow-sm relative overflow-hidden">
//                 <div className="text-4xl font-bold">{unlearned.length}</div>
//                 <div className="text-xs font-bold uppercase opacity-90">Chưa thuộc</div>
//              </div>
//          </div>
//       </div>

//       {/* BODY */}
//       <div className="flex-1 overflow-y-auto p-4 bg-slate-50">
        
//         {/* CASE 1: HOÀN THÀNH */}
//         {isAllDone && (
//             <div className="h-full flex flex-col items-center justify-center text-center p-6">
//                 <div className="bg-green-100 p-6 rounded-full mb-4">
//                     <span className="text-6xl">🏆</span>
//                 </div>
//                 <h3 className="text-2xl font-bold text-slate-800 mb-2">Tuyệt vời!</h3>
//                 <p className="text-slate-500 mb-6">Bạn đã thuộc toàn bộ từ vựng.</p>
//                 <button 
//                     onClick={onComplete}
//                     className="bg-green-700 text-white px-10 py-3 rounded-sm font-bold shadow-lg hover:bg-green-800 transition-all uppercase"
//                 >
//                     Hoàn thành bài học
//                 </button>
//             </div>
//         )}

//         {/* CASE 2: HẾT VÒNG (CÒN TỪ CHƯA THUỘC) */}
//         {isRoundDone && (
//              <div className="h-full flex flex-col items-center justify-center text-center p-6">
//                 <div className="bg-red-50 p-6 rounded-full mb-4 border border-red-200">
//                     <span className="text-4xl text-red-700 font-bold">{unlearned.length}</span>
//                 </div>
//                 <h3 className="text-xl font-bold text-slate-800 mb-2">Từ vựng cần ôn lại</h3>
//                 <button 
//                     onClick={handleRetryUnlearned}
//                     className="bg-blue-700 text-white px-8 py-3 rounded-sm font-bold shadow-md hover:bg-blue-800 transition-all uppercase flex items-center gap-2"
//                 >
//                     Tiếp tục ôn từ chưa thuộc 
//                 </button>
//             </div>
//         )}

//         {/* CASE 3: ĐANG HỌC */}
//         {!isAllDone && !isRoundDone && (
//             <div className="space-y-4 pb-20">
//                 {pool.map((item, index) => {
//                     const isRevealed = revealedIds[item.id];

//                     return (
//                         // CHỈNH SỬA 1: Bỏ bo góc (rounded-sm thay vì rounded-xl)
//                         <div key={item.id} className="bg-white rounded-sm shadow-sm border border-slate-300 overflow-hidden">
//                             <div className="flex flex-col md:flex-row">
                                
//                                 {/* Cột Trái: Nội dung */}
//                                 <div className={`flex-1 p-5 flex flex-col justify-center transition-colors ${isRevealed ? 'bg-yellow-50' : 'bg-white'}`}>
//                                     <div className="flex items-center gap-3 mb-2">
//                                         <span className="text-xs font-bold text-slate-400 border border-slate-200 px-1">#{index + 1}</span>
//                                         <span className="text-xl font-bold text-slate-800">{item.vocab}</span>
//                                     </div>
                                    
//                                     <div className={`transition-all duration-200 overflow-hidden ${isRevealed ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'}`}>
//                                         <p className="text-slate-700 font-medium text-base border-t border-slate-200 mt-2 pt-2">
//                                             {item.meaning}
//                                         </p>
//                                     </div>
//                                 </div>

//                                 {/* Cột Phải: Hành động */}
//                                 {/* CHỈNH SỬA 2: Tăng min-w từ 200px lên 260px để đủ chỗ cho chữ dài */}
//                                 <div className="bg-slate-50 p-3 flex items-center justify-center gap-3 border-l border-slate-200 min-w-[260px]">
                                    
//                                     {!isRevealed ? (
//                                         <>
//                                             <button 
//                                                 onClick={() => handleReveal(item.id)}
//                                                 // CHỈNH SỬA 3: Màu đậm (green-700) + whitespace-nowrap (không xuống dòng)
//                                                 className="flex-1 bg-green-700 hover:bg-green-800 text-white text-sm font-bold py-3 px-2 rounded-sm shadow-sm transition-colors flex flex-col items-center gap-1 whitespace-nowrap"
//                                             >
//                                                 <span>✔</span> 
//                                                 <span>Nhớ từ này</span>
//                                             </button>
                                            
//                                             <button 
//                                                 onClick={() => handleForgotImmediately(item)}
//                                                 // CHỈNH SỬA 3: Màu đậm (red-700) + whitespace-nowrap
//                                                 className="flex-1 bg-red-700 hover:bg-red-800 text-white text-sm font-bold py-3 px-2 rounded-sm shadow-sm transition-colors flex flex-col items-center gap-1 whitespace-nowrap"
//                                             >
//                                                 <span>✖</span>
//                                                 <span>Quên từ này</span>
//                                             </button>
//                                         </>
//                                     ) : (
//                                         <>
//                                              <button 
//                                                 onClick={() => handleConfirmKnown(item)}
//                                                 className="flex-1 bg-white border-2 border-green-700 text-green-700 hover:bg-green-50 text-sm font-bold py-2 px-2 rounded-sm transition-colors flex flex-col items-center whitespace-nowrap"
//                                             >
//                                                 <span className="text-lg">✔</span>
//                                                 <span>Đã thuộc</span>
//                                             </button>
//                                             <button 
//                                                 onClick={() => handleConfirmWrong(item)}
//                                                 className="flex-1 bg-white border-2 border-red-700 text-red-700 hover:bg-red-50 text-sm font-bold py-2 px-2 rounded-sm transition-colors flex flex-col items-center whitespace-nowrap"
//                                             >
//                                                 <span className="text-lg">✖</span>
//                                                 <span>Nhớ sai</span>
//                                             </button>
//                                         </>
//                                     )}
//                                 </div>
//                             </div>
//                         </div>
//                     );
//                 })}
//             </div>
//         )}

//       </div>
      
//       {!isAllDone && !isRoundDone && (
//           <div className="bg-slate-100 p-2 border-t border-slate-300 text-center text-[10px] text-slate-500 uppercase tracking-widest">
//               Spaced Repetition System
//           </div>
//       )}
//     </div>
//   );
// }

// import React, { useState } from 'react';

// export default function StudyStep2({ lesson, onComplete }) {
//   // 1. CÁC STATE QUẢN LÝ DỮ LIỆU
//   const [pool, setPool] = useState(lesson.words);
//   const [learned, setLearned] = useState([]);
//   const [unlearned, setUnlearned] = useState([]);
//   const [revealedIds, setRevealedIds] = useState({});

//   // 2. CÁC HÀM XỬ LÝ LOGIC

//   const handleForgotImmediately = (word) => {
//     // Xóa khỏi pool, thêm vào unlearned
//     setPool(pool.filter(w => w.id !== word.id));
//     setUnlearned((prev) => [...prev, word]);
//   };

//   const handleReveal = (id) => {
//     setRevealedIds({ ...revealedIds, [id]: true });
//   };

//   const handleConfirmKnown = (word) => {
//     // Xóa khỏi pool, thêm vào learned
//     setPool(pool.filter(w => w.id !== word.id));
//     setLearned([...learned, word]);
//     // Reset trạng thái reveal
//     const newReveals = { ...revealedIds };
//     delete newReveals[word.id];
//     setRevealedIds(newReveals);
//   };

//   const handleConfirmWrong = (word) => {
//     // Xóa khỏi pool, thêm vào unlearned
//     setPool(pool.filter(w => w.id !== word.id));
//     setUnlearned([...unlearned, word]);
//     // Reset trạng thái reveal
//     const newReveals = { ...revealedIds };
//     delete newReveals[word.id];
//     setRevealedIds(newReveals);
//   };

//   // --- LOGIC MỚI: Nạp lại từ chưa thuộc ---
//   const handleRetryUnlearned = () => {
//     // Gộp từ chưa thuộc vào danh sách đang học (nếu còn)
//     // Để người dùng có thể ôn ngay lập tức hoặc tiếp tục vòng mới
//     setPool((prevPool) => [...prevPool, ...unlearned]);
//     setUnlearned([]); // Reset thùng chứa thuộc về 0
//   };

//   const isAllDone = pool.length === 0 && unlearned.length === 0;
//   const isRoundDone = pool.length === 0 && !isAllDone;

//   return (
//     <div className="bg-white rounded-sm shadow-xl border border-slate-300 overflow-hidden min-h-[600px] flex flex-col relative max-w-3xl mx-auto">
      
//       {/* HEADER */}
//       <div className="bg-slate-100 p-6 border-b border-slate-300">
//          <h2 className="text-center text-slate-800 font-bold uppercase text-sm tracking-wider mb-4">
//             Chia từ vào 2 nhóm cho tới khi thuộc hết
//          </h2>

//          <div className="flex gap-4">
//              {/* Thẻ Xanh */}
//              <div className="flex-1 bg-green-700 rounded-sm p-4 text-white text-center shadow-sm relative overflow-hidden">
//                 <div className="text-4xl font-bold">{learned.length}</div>
//                 <div className="text-xs font-bold uppercase opacity-90">Đã thuộc</div>
//              </div>

//              {/* Thẻ Đỏ */}
//              <div className="flex-1 bg-red-700 rounded-sm p-4 text-white text-center shadow-sm relative overflow-hidden">
//                 <div className="text-4xl font-bold">{unlearned.length}</div>
//                 <div className="text-xs font-bold uppercase opacity-90">Chưa thuộc</div>
//              </div>
//          </div>
//       </div>

//       {/* BODY: Vùng nội dung chính (Cuộn được) */}
//       <div className="flex-1 overflow-y-auto p-4 bg-slate-50 mb-20"> 
//       {/* mb-20 để chừa chỗ cho cái footer cố định ở dưới */}
        
//         {/* CASE 1: HOÀN THÀNH TẤT CẢ */}
//         {isAllDone && (
//             <div className="h-full flex flex-col items-center justify-center text-center p-6 mt-10">
//                 <div className="bg-green-100 p-6 rounded-full mb-4">
//                     <span className="text-6xl">🏆</span>
//                 </div>
//                 <h3 className="text-2xl font-bold text-slate-800 mb-2">Tuyệt vời!</h3>
//                 <p className="text-slate-500 mb-6">Bạn đã thuộc toàn bộ từ vựng.</p>
//                 <button 
//                     onClick={onComplete}
//                     className="bg-green-700 text-white px-10 py-3 rounded-sm font-bold shadow-lg hover:bg-green-800 transition-all uppercase"
//                 >
//                     Hoàn thành bài học
//                 </button>
//             </div>
//         )}

//         {/* CASE 2: HẾT VÒNG (Danh sách học trống, nhưng vẫn còn từ chưa thuộc) */}
//         {isRoundDone && (
//              <div className="h-full flex flex-col items-center justify-center text-center p-6 mt-10">
//                 <div className="bg-red-50 p-6 rounded-full mb-4 border border-red-200">
//                     <span className="text-4xl text-red-700 font-bold">{unlearned.length}</span>
//                 </div>
//                 <h3 className="text-xl font-bold text-slate-800 mb-2">Đã hết từ mới</h3>
//                 <p className="text-slate-500 mb-6 text-sm">Vui lòng bấm nút bên dưới để ôn lại các từ chưa thuộc.</p>
//             </div>
//         )}

//         {/* CASE 3: LIST TỪ VỰNG (Hiển thị khi pool còn từ) */}
//         {!isAllDone && (
//             <div className="space-y-4">
//                 {pool.map((item, index) => {
//                     const isRevealed = revealedIds[item.id];
//                     return (
//                         <div key={item.id} className="bg-white rounded-sm shadow-sm border border-slate-300 overflow-hidden">
//                             <div className="flex flex-col md:flex-row">
//                                 {/* Cột Trái */}
//                                 <div className={`flex-1 p-5 flex flex-col justify-center transition-colors ${isRevealed ? 'bg-yellow-50' : 'bg-white'}`}>
//                                     <div className="flex items-center gap-3 mb-2">
//                                         <span className="text-xs font-bold text-slate-400 border border-slate-200 px-1">#{index + 1}</span>
//                                         <span className="text-xl font-bold text-slate-800">{item.vocab}</span>
//                                     </div>
//                                     <div className={`transition-all duration-200 overflow-hidden ${isRevealed ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'}`}>
//                                         <p className="text-slate-700 font-medium text-base border-t border-slate-200 mt-2 pt-2">
//                                             {item.meaning}
//                                         </p>
//                                     </div>
//                                 </div>
//                                 {/* Cột Phải */}
//                                 <div className="bg-slate-50 p-3 flex items-center justify-center gap-3 border-l border-slate-200 min-w-[260px]">
//                                     {!isRevealed ? (
//                                         <>
//                                             <button 
//                                                 onClick={() => handleReveal(item.id)}
//                                                 className="flex-1 bg-green-700 hover:bg-green-800 text-white text-sm font-bold py-3 px-2 rounded-sm shadow-sm transition-colors flex flex-col items-center gap-1 whitespace-nowrap"
//                                             >
//                                                 <span>✔</span> <span>Nhớ từ này</span>
//                                             </button>
//                                             <button 
//                                                 onClick={() => handleForgotImmediately(item)}
//                                                 className="flex-1 bg-red-700 hover:bg-red-800 text-white text-sm font-bold py-3 px-2 rounded-sm shadow-sm transition-colors flex flex-col items-center gap-1 whitespace-nowrap"
//                                             >
//                                                 <span>✖</span> <span>Quên từ này</span>
//                                             </button>
//                                         </>
//                                     ) : (
//                                         <>
//                                              <button 
//                                                 onClick={() => handleConfirmKnown(item)}
//                                                 className="flex-1 bg-white border-2 border-green-700 text-green-700 hover:bg-green-50 text-sm font-bold py-2 px-2 rounded-sm transition-colors flex flex-col items-center whitespace-nowrap"
//                                             >
//                                                 <span className="text-lg">✔</span> <span>Đã thuộc</span>
//                                             </button>
//                                             <button 
//                                                 onClick={() => handleConfirmWrong(item)}
//                                                 className="flex-1 bg-white border-2 border-red-700 text-red-700 hover:bg-red-50 text-sm font-bold py-2 px-2 rounded-sm transition-colors flex flex-col items-center whitespace-nowrap"
//                                             >
//                                                 <span className="text-lg">✖</span> <span>Nhớ sai</span>
//                                             </button>
//                                         </>
//                                     )}
//                                 </div>
//                             </div>
//                         </div>
//                     );
//                 })}
//             </div>
//         )}
//       </div>

//       {/* FOOTER CỐ ĐỊNH (Chứa nút Nạp lại từ) */}
//       {/* Chỉ hiện khi chưa xong hết VÀ có từ trong danh sách chưa thuộc */}
//       {!isAllDone && unlearned.length > 0 && (
//           <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-300 shadow-lg z-10 flex justify-center">
//               <button 
//                 onClick={handleRetryUnlearned}
//                 className="w-full md:w-auto bg-blue-700 hover:bg-blue-800 text-white px-8 py-3 rounded-sm font-bold shadow-md transition-all uppercase flex items-center justify-center gap-2 animate-bounce-slow"
//             >
//                 <span>↺</span> Tiếp tục với {unlearned.length} từ chưa thuộc
//             </button>
//           </div>
//       )}

//       {/* Footer nhỏ trang trí (khi không có nút nạp từ) */}
//       {!isAllDone && unlearned.length === 0 && (
//           <div className="absolute bottom-0 left-0 right-0 p-2 bg-slate-100 border-t border-slate-300 text-center text-[10px] text-slate-500 uppercase tracking-widest">
//               Spaced Repetition System
//           </div>
//       )}
//     </div>
//   );
// }

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