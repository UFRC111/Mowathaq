import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Player } from "@lottiefiles/react-lottie-player";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import searchAnim from "./Search.json";
import logo from "./logo3.png";
import loadingAnim from "./Loading1.json";

function SearchPage() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!query.trim()) {
      toast.warn("من فضلك أدخل رقم للبحث", { position: "top-right", autoClose: 3000, theme: "colored" });
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch(`https://web-production-77f8a.up.railway.app/search?query=${encodeURIComponent(query)}`);
      const data = await res.json();

      if (data.status === "found") {
        setResult({ found: true, data: data.data });
        toast.success("تم العثور على الرقم بنجاح!", { position: "top-right", autoClose: 3000, theme: "colored" });
      } else {
        setResult({ found: false, message: data.message });
        toast.error(data.message, { position: "top-right", autoClose: 4000, theme: "colored" });
      }
    } catch (err) {
      console.error(err);
      toast.error("حدث خطأ أثناء البحث، حاول مرة أخرى", { position: "top-right", autoClose: 4000, theme: "colored" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden font-sans" dir="rtl">
      {/* الخلفية المتدرجة */}
<div className="absolute inset-0 z-0" style={{ backgroundColor: "#f2f2f2" }}></div>

  
      {/* Loading */}
      {loading && (
        <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
          <Player autoplay loop src={loadingAnim} style={{ height: 150, width: 150 }} />
        </div>
      )}

      {/* المحتوى الرئيسي */}
      <main className="relative z-10 flex flex-col items-center justify-center text-center min-h-screen px-6 pt-24">
        <motion.img
          src={logo}
          alt="Logo Large"
          className="w-24 h-24 mb-6 rounded-full shadow-lg"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        />

        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="text-4xl font-bold text-[#1853dc] mb-6"
        >
          البحث عن رقم
        </motion.h1>

        {/* صندوق البحث بتصميم متناسق */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4 }}
          className="bg-white/95 p-8 rounded-3xl shadow-xl border border-silver max-w-md w-full"
          style={{ borderColor: '#0378a6' }}
        >
          <div className="flex justify-center mb-4">
            <Player autoplay loop src={searchAnim} style={{ height: 120, width: 120 }} />
          </div>

          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="أدخل الرقم هنا..."
            className="w-full p-4 border border-silver rounded-2xl mb-4 text-right bg-white focus:ring-2 focus:#0378a6 outline-none shadow-sm"
          />

          <div className="space-y-3">
            <button
              onClick={handleSearch}
              className="w-full bg-gradient-to-r from-[#50c4f2] to-[#80d2f2] hover:from-[#4bb5e0] hover:to-[#6fc2e0] text-white py-3 rounded-2xl font-bold text-lg shadow-md transition duration-300"

            >
              {loading ? "جاري البحث..." : "بحث"}
            </button>

            <button
              onClick={() => navigate("/")}
              className="w-full bg-white border border-silver hover:bg-gray-50 text-gray-800 py-3 rounded-2xl font-bold text-lg shadow transition duration-300"
            >
              رجوع للصفحة الرئيسية
            </button>
          </div>

          {/* عرض النتائج */}
          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.5 }}
                className="mt-6 text-right"
              >
                {result.found ? (
                  <div className="p-4 bg-green-100 rounded-xl border border-silver">
                    <h2 className="font-bold mb-2 text-green-800"> الرقم موثق وموجود</h2>
                    <ul className="text-gray-700">
                      {result.data.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div className="p-4 bg-red-100 rounded-xl border border-silver text-red-800">
                    {result.message}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </main>

      <ToastContainer />

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

export default SearchPage;
