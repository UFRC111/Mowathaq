import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Player } from "@lottiefiles/react-lottie-player";
import logo from "./logo2.png";
import loadingAnim from "./Loading.json"; // ضع ملفك هنا

function HomePage() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleNavigate = (path) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate(path);
      setMenuOpen(false);
    }, 1500);
  };

  const handleComingSoon = () => {
    setToast("سوف يتم توفير الاضافة الجديدة بعد توثيق اول 300 شخص");
    setTimeout(() => setToast(null), 3000);
  };

  const navItems = [
    { label: "قريباً", onClick: handleComingSoon },
    { label: "نصائح", onClick: () => handleNavigate("/Tips") },
    { label: "سايت النصابين", href: "https://thief-ditict-pfyu6goxqnvjeywxtyvee2.streamlit.app/" },
    { label: "فحص الايصالات", href: "https://transcriptcheck-czvfb9lmhz8hrebgthiydu.streamlit.app/" },
    { label: "فحص الرقم", onClick: () => handleNavigate("/search") },
    { label: "تسجيل البيانات", onClick: () => handleNavigate("/sign") },

  ];

  return (
    <div className="min-h-screen relative overflow-hidden font-sans">
      {/* الخلفية المتدرجة */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-blue-200 to-yellow-200 animate-gradient bg-[length:400%_400%] z-0"></div>

      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 backdrop-blur-md bg-white/30 fixed w-full z-20 shadow-md">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={logo} alt="Logo" className="w-10 h-10 rounded-full object-contain" />
          <span className="font-bold text-xl text-[#1853dc]">موثق</span>
        </div>

        {/* روابط الكمبيوتر */}
        <div className="hidden md:flex items-center space-x-6 rtl:space-x-reverse font-semibold">
          {navItems.map((item, idx) =>
            item.href ? (
              <a
                key={idx}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1853dc] hover:text-[#ffcc00] transition py-2 px-3 rounded-lg text-center"
              >
                {item.label}
              </a>
            ) : (
              <button
                key={idx}
                onClick={item.onClick}
                className="text-[#1853dc] hover:text-[#ffcc00] transition py-2 px-3 rounded-lg"
              >
                {item.label}
              </button>
            )
          )}
        </div>

        {/* زر الهاتف */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="focus:outline-none">
            <svg className="w-8 h-8 text-[#1853dc]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>

      {/* قائمة الهاتف */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white/50 backdrop-blur-md text-[#1853dc] flex flex-col space-y-2 py-6 px-4 shadow-lg fixed top-16 right-0 w-64 z-20 rounded-l-xl"
          >
            {navItems.map((item, idx) =>
              item.href ? (
                <a
                  key={idx}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#1853dc] hover:text-[#ffcc00] transition py-2 px-3 rounded-lg text-center"
                >
                  {item.label}
                </a>
              ) : (
                <button
                  key={idx}
                  onClick={item.onClick}
                  className="text-[#1853dc] hover:text-[#ffcc00] transition py-2 px-3 rounded-lg text-center"
                >
                  {item.label}
                </button>
              )
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="fixed top-24 left-1/2 transform -translate-x-1/2 bg-white/90 text-[#1853dc] px-6 py-3 rounded-xl shadow-lg z-50 border border-[#1853dc] font-semibold"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading */}
      {loading && (
        <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
          <Player autoplay loop src={loadingAnim} style={{ height: 150, width: 150 }} />
        </div>
      )}

      {/* المحتوى الرئيسي */}
      <main className="relative z-10 flex flex-col items-center justify-center text-center min-h-screen px-6">
        <motion.img
          src={logo}
          alt="Logo Large"
          className="w-40 h-40 mb-6 rounded-full shadow-lg"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        />

        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="text-5xl font-bold text-[#1853dc] mb-4"
        >
          مرحباً بك في موقع موثق
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4 }}
          className="text-xl max-w-xl mb-4 text-[#1853dc]"
        >
          هذا الموقع يهدف إلى مساعدتك في التأكد من موثوقية الأرقام <br /> وتوثيق البيانات لتجنب عمليات النصب والاحتيال.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6 }}
          className="text-xl max-w-xl mb-4 text-[#1853dc]"
        >
          يطمئن المستخدم عند رفع بياناته إلى أنها تحفظ بسرية تامة، مع وجود فريق نسائي مختص لمراجعة بيانات النساء لضمان الخصوصية والراحة
        </motion.p>
      </main>
            {/* Footer */}
      <footer className="relative z-10 bg-white/40 backdrop-blur-md text-[#1853dc] py-4 text-center text-sm border-t border-[#1853dc]/30">
        © {new Date().getFullYear()} UFRC - جميع الحقوق محفوظة
      </footer>
      <style>{`
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          background-size: 400% 400%;
          animation: gradientMove 15s ease infinite;
        }
      `}</style>
    </div>
  );
}

export default HomePage;
