

import { useState } from 'react';
import { lessonsData } from './data/index'; 
import { defaultData } from './data/default'; 

// Import các bước học
import StudyStep1 from './components/StudyStep1';
import StudyStep2 from './components/StudyStep2';
import StudyStep3 from './components/StudyStep3'; // Đã thêm Bước 3

function App() {
  const [currentLesson, setCurrentLesson] = useState(null);
  
  // view: 'welcome' | 'list' | 'detail' | 'study'
  const [view, setView] = useState('welcome'); 
  
  // studyStep: 1 (Chép từ) | 2 (Flashcard) | 3 (Nhanh như chớp)
  const [studyStep, setStudyStep] = useState(1);

  // --- ACTIONS ---
  const handleGoToList = () => {
    setView('list');
  };

  const handleSelectLesson = (lesson) => {
    setCurrentLesson(lesson);
    setView('detail');
  };

  const handleBackToHome = () => {
    setCurrentLesson(null);
    setView('welcome');
    setStudyStep(1);
  };

  const handleStartStudy = () => {
    if (view === 'welcome') {
        setCurrentLesson(defaultData);
    }
    setView('study');
    setStudyStep(1); // Luôn bắt đầu từ bước 1
  };

  // Hàm xử lý khi hoàn thành toàn bộ khóa học (Xong bước 3)
  const handleFinishCourse = () => {
    alert("🏆 CHÚC MỪNG! Bạn đã hoàn thành xuất sắc bài học hôm nay.");
    handleBackToHome();
  };

  // --- RENDER ---
  return (
    <div className="min-h-screen bg-[#f3f4f6] flex flex-col items-center py-8 font-sans text-slate-800">
      
      {/* 1. HEADER TOÀN MÀN HÌNH */}
      <div className="w-full max-w-6xl px-4 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex justify-between items-center">
            <div>
                <h1 className="text-2xl font-extrabold text-[#1e293b] tracking-tight">IELTS 3 STEP</h1>
                <p className="text-sm text-slate-500 mt-1">Hệ thống học từ vựng lặp lại ngắt quãng</p>
            </div>
            <div className="bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide">
                Beta Version
            </div>
        </div>
      </div>

      {/* 2. KHUNG NỘI DUNG CHÍNH */}
      <div className="flex flex-col md:flex-row gap-6 items-start w-full max-w-6xl px-4">
        
        {/* === CỘT TRÁI: MENU CHÍNH === */}
        <div className="w-full md:w-1/4 flex flex-col gap-4">
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                <h3 className="text-xs font-bold text-slate-400 uppercase mb-4 tracking-wider ml-1">Menu chính</h3>
                
                <button 
                    onClick={handleGoToList}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all mb-2 text-left group ${view === 'list' ? 'bg-blue-50 text-blue-700' : 'hover:bg-slate-50 text-slate-700'}`}
                >
                    <div className={`p-2 rounded-lg ${view === 'list' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-500 group-hover:bg-white group-hover:shadow-sm'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
                    </div>
                    <span>List Bài Học</span>
                </button>

                <button 
                    onClick={() => alert("Tính năng đang phát triển")}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all text-left text-slate-700 hover:bg-slate-50 group"
                >
                    <div className="p-2 rounded-lg bg-slate-100 text-slate-500 group-hover:bg-white group-hover:shadow-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                    </div>
                    <span>Tự nạp từ vựng</span>
                </button>
            </div>

            {view !== 'welcome' && (
                <button 
                    onClick={handleBackToHome}
                    className="flex items-center gap-2 justify-center w-full py-3 bg-white border border-slate-200 text-slate-500 rounded-xl hover:bg-slate-50 hover:text-slate-700 transition-colors text-sm font-medium shadow-sm"
                >
                    <span>← Quay lại trang chủ</span>
                </button>
            )}
        </div>

        {/* === CỘT PHẢI: NỘI DUNG THAY ĐỔI === */}
        <div className="w-full md:w-3/4">
            
            {/* --- VIEW: WELCOME --- */}
            {view === 'welcome' && (
                <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden min-h-[600px] flex flex-col items-center pt-8 pb-8">
                    <div className="mb-6">
                        <span className="text-xs font-bold text-slate-400 tracking-[0.2em] uppercase">WELCOME</span>
                    </div>
                    <div className="bg-[#2c3e50] w-11/12 md:w-4/5 py-4 px-6 text-center text-white rounded shadow-md mb-8">
                        <p className="font-serif italic text-lg">"Bí kíp để học 100 từ vựng mới mỗi ngày"</p>
                    </div>
                    <div className="w-11/12 md:w-4/5 border border-slate-100 rounded-xl shadow-sm overflow-hidden mb-10">
                        <div className="bg-white py-4 text-center border-b border-slate-50">
                            <h3 className="text-slate-600 font-bold text-lg">{defaultData.title}</h3>
                        </div>
                        <table className="w-full">
                            <thead className="bg-gradient-to-r from-[#a855f7] to-[#f97316] text-white">
                                <tr>
                                    <th className="px-6 py-3 text-left font-bold text-sm">#</th>
                                    <th className="px-6 py-3 text-left font-bold text-sm uppercase">Từ vựng</th>
                                    <th className="px-6 py-3 text-left font-bold text-sm uppercase">Nghĩa</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {defaultData.words.map((item, index) => (
                                    <tr key={item.id} className="hover:bg-slate-50">
                                        <td className="px-6 py-4 text-slate-400 font-bold">{index + 1}</td>
                                        <td className="px-6 py-4 font-bold text-slate-800 text-lg">{item.vocab}</td>
                                        <td className="px-6 py-4 text-slate-600">{item.meaning}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <button 
                        onClick={handleStartStudy}
                        className="bg-[#2c3e50] hover:bg-[#1e2b37] text-white font-bold py-3.5 px-16 rounded-full shadow-lg shadow-slate-300 transform hover:scale-105 transition-all text-sm uppercase tracking-wide"
                    >
                        HỌC NGAY
                    </button>
                </div>
            )}


            {/* --- VIEW: LIST BÀI HỌC --- */}
            {view === 'list' && (
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 min-h-[600px]">
                    <h2 className="text-2xl font-bold text-slate-800 mb-6">Thư viện bài học</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {lessonsData.map((lesson) => (
                            <div 
                                key={lesson.id}
                                onClick={() => handleSelectLesson(lesson)}
                                className="group border border-slate-200 rounded-xl p-6 cursor-pointer hover:border-blue-400 hover:shadow-md transition-all bg-white"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full uppercase">
                                        Lesson {lesson.id}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">
                                    {lesson.title}
                                </h3>
                                <p className="text-slate-500 text-sm line-clamp-2">
                                    {lesson.description}
                                </p>
                                <div className="mt-4 pt-4 border-t border-slate-50 flex items-center text-sm text-slate-400">
                                    <span>{lesson.words.length} từ vựng</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* --- VIEW: CHI TIẾT BÀI HỌC --- */}
            {view === 'detail' && currentLesson && (
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden min-h-[600px]">
                    <div className="bg-[#2c3e50] p-10 text-white">
                        <button onClick={handleGoToList} className="text-slate-400 hover:text-white text-sm mb-4 flex items-center gap-1">← Quay lại danh sách</button>
                        <h2 className="text-3xl font-bold mb-2">{currentLesson.title}</h2>
                        <p className="opacity-80 text-lg font-light">{currentLesson.description}</p>
                    </div>
                    
                    <div className="p-8">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-bold text-slate-700">Danh sách từ vựng</h3>
                            <button 
                                onClick={handleStartStudy}
                                className="bg-[#2c3e50] hover:bg-[#1a252f] text-white px-6 py-2 rounded-lg font-bold text-sm shadow-md transition-all"
                            >
                                BẮT ĐẦU HỌC NGAY
                            </button>
                        </div>
                        
                        <div className="border rounded-xl overflow-hidden">
                             <table className="w-full text-sm">
                                <thead className="bg-slate-50 text-slate-500 uppercase font-semibold">
                                    <tr>
                                        <th className="px-6 py-3 text-left">Từ vựng</th>
                                        <th className="px-6 py-3 text-left">Nghĩa</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {currentLesson.words.map(w => (
                                        <tr key={w.id} className="hover:bg-slate-50">
                                            <td className="px-6 py-4 font-bold text-slate-700">{w.vocab}</td>
                                            <td className="px-6 py-4 text-slate-600">{w.meaning}</td>
                                        </tr>
                                    ))}
                                </tbody>
                             </table>
                        </div>
                    </div>
                </div>
            )}

            {/* --- VIEW: CHẾ ĐỘ HỌC (3 STEP) --- */}
            {view === 'study' && (
                <div className="w-full">
                    {/* STEP 1: CHÉP TỪ */}
                    {studyStep === 1 && (
                        <StudyStep1 
                            lesson={currentLesson || defaultData} 
                            onComplete={() => setStudyStep(2)} 
                        />
                    )}

                    {/* STEP 2: FLASHCARD SRS */}
                    {studyStep === 2 && (
                        <StudyStep2 
                            lesson={currentLesson || defaultData} 
                            onComplete={() => setStudyStep(3)} // Chuyển sang bước 3
                        />
                    )}

                    {/* STEP 3: GAME NHANH NHƯ CHỚP (MỚI) */}
                    {studyStep === 3 && (
                        <StudyStep3 
                            lesson={currentLesson || defaultData} 
                            onComplete={handleFinishCourse} // Kết thúc khóa học
                        />
                    )}
                </div>
            )}

        </div>
      </div>
    </div>
  );
}

export default App;