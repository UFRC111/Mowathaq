import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Player } from "@lottiefiles/react-lottie-player";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import registerAnim from "./Member.json"; // 🔹 ملف Lottie للتسجيل
import logo from "./logo3.png";
import loadingAnim from "./Loading1.json";
import { motion } from "framer-motion"; // 🔹 إضافة هذا السطر

function SignPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    age: "",
    dob: "",
    nationalId: "",
    phone: "",
  });

  const [selfieFile, setSelfieFile] = useState(null);
  const [idCardFile, setIdCardFile] = useState(null);

  const [selfieUrl, setSelfieUrl] = useState(null);
  const [idCardUrl, setIdCardUrl] = useState(null);

  const [activeCamera, setActiveCamera] = useState(null);
  const [loading, setLoading] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

const startCamera = async (type) => {
  setActiveCamera(type);
  try {
    let constraints = { video: true };

    if (type === "selfie") {
      constraints = { video: { facingMode: "user" } }; // front camera
    } else if (type === "idCard") {
      constraints = { video: { facingMode: { exact: "environment" } } }; // back camera
    }

    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    if (videoRef.current) videoRef.current.srcObject = stream;
  } catch (err) {
    toast.error(" لم يتم فتح الكاميرا: " + err.message, {
      position: "top-right",
      autoClose: 3000,
    });
  }
};
  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0, 300, 200);
    canvasRef.current.toBlob(
      (blob) => {
        if (activeCamera === "selfie") {
          setSelfieFile(blob);
          setSelfieUrl(URL.createObjectURL(blob));
        } else if (activeCamera === "idCard") {
          setIdCardFile(blob);
          setIdCardUrl(URL.createObjectURL(blob));
        }
      },
      "image/jpeg"
    );
    stopCamera();
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setActiveCamera(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const emptyField = Object.entries(formData).find(
      ([key, value]) => !value.toString().trim()
    );
    if (emptyField) {
      toast.error(` يرجى تعبئة حقل ${emptyField[0]}`, {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    if (!selfieFile || !idCardFile) {
      toast.error(" يجب التقاط كلتا الصورتين أولاً", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    setLoading(true);
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) =>
      data.append(key, value)
    );
    data.append("selfie", selfieFile, "selfie.jpg");
    data.append("idCard", idCardFile, "idCard.jpg");

    try {
      const res = await fetch(
        "https://web-production-77f8a.up.railway.app/register",
        { method: "POST", body: data }
      );
      const result = await res.json();
      if (res.ok) {
        toast.success(result.message, {
          position: "top-right",
          autoClose: 3000,
        });
        setSelfieUrl(`https://drive.google.com/uc?id=${result.selfie_id}`);
        setIdCardUrl(`https://drive.google.com/uc?id=${result.idCard_id}`);
      } else {
        toast.error(result.detail || "حدث خطأ أثناء التسجيل", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (err) {
      toast.error("خطأ في الاتصال بالباك: " + err.message, {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden font-sans" dir="rtl">
      {/* الخلفية */}
      <div
        className="absolute inset-0 z-0"
        style={{ backgroundColor: "#f2f2f2" }}
      ></div>

      {/* Loading */}
      {loading && (
        <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
          <Player
            autoplay
            loop
            src={loadingAnim}
            style={{ height: 150, width: 150 }}
          />
        </div>
      )}

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
          className="text-4xl font-bold text-[#0378a6] mb-6"
        >
          تسجيل البيانات
        </motion.h1>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4 }}
          className="bg-white/95 p-8 rounded-3xl shadow-xl border border-silver max-w-md w-full text-right"
          style={{ borderColor: "#0378a6" }}
        >
          <div className="flex justify-center mb-4">
            <Player
              autoplay
              loop
              src={registerAnim}
              style={{ height: 120, width: 120 }}
            />
          </div>

          {/* Form */}
          <div className="space-y-4">
            <input
              type="text"
              name="fullName"
              placeholder="الاسم الثلاثي"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full p-4 border border-silver rounded-2xl bg-white focus:ring-2 focus:#0378a6 outline-none shadow-sm"
            />

            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full p-4 border border-silver rounded-2xl bg-white focus:ring-2 focus:#0378a6 outline-none shadow-sm"
            >
              <option value="">اختر النوع</option>
              <option value="ذكر">ذكر</option>
              <option value="أنثى">أنثى</option>
            </select>

            <input
              type="number"
              name="age"
              placeholder="العمر"
              value={formData.age}
              onChange={handleChange}
              className="w-full p-4 border border-silver rounded-2xl bg-white focus:ring-2 focus:#0378a6 outline-none shadow-sm"
            />

            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="w-full p-4 border border-silver rounded-2xl bg-white focus:ring-2 focus:#0378a6 outline-none shadow-sm"
            />

            <input
              type="text"
              name="nationalId"
              placeholder="رقم الهوية"
              value={formData.nationalId}
              onChange={handleChange}
              className="w-full p-4 border border-silver rounded-2xl bg-white focus:ring-2 focus:#0378a6 outline-none shadow-sm"
            />

            <input
              type="text"
              name="phone"
              placeholder="رقم الهاتف"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-4 border border-silver rounded-2xl bg-white focus:ring-2 focus:#0378a6 outline-none shadow-sm"
            />
          </div>

          {/* Camera Buttons */}
          <div className="mt-6 space-y-4">
            <button
              onClick={() => startCamera("selfie")}
              className="w-full bg-gradient-to-r from-[#50c4f2] to-[#80d2f2] hover:from-[#4bb5e0] hover:to-[#6fc2e0] text-white py-3 rounded-2xl font-bold text-lg shadow-md transition duration-300"
            >
              التقاط الصورة الشخصية
            </button>
            {selfieUrl && (
              <img
                src={selfieUrl}
                alt="selfie"
                className="w-32 h-32 mx-auto rounded-xl mt-2"
              />
            )}

            <button
              onClick={() => startCamera("idCard")}
              className="w-full bg-gradient-to-r from-[#50c4f2] to-[#80d2f2] hover:from-[#4bb5e0] hover:to-[#6fc2e0] text-white py-3 rounded-2xl font-bold text-lg shadow-md transition duration-300"
            >
              التقاط صورة الهوية
            </button>
            {idCardUrl && (
              <img
                src={idCardUrl}
                alt="idCard"
                className="w-32 h-32 mx-auto rounded-xl mt-2"
              />
            )}
          </div>

          {/* Video preview */}
          {activeCamera && (
            <div className="mt-4 text-center">
              <video ref={videoRef} autoPlay playsInline className="w-full rounded-2xl" />
              <canvas ref={canvasRef} width="300" height="200" className="hidden" />
              <div className="flex flex-col space-y-3 mt-3">
                <button
                  onClick={capturePhoto}
                  className="w-full bg-gradient-to-r from-[#50c4f2] to-[#80d2f2] hover:from-[#4bb5e0] hover:to-[#6fc2e0] text-white py-3 rounded-2xl font-bold text-lg shadow-md transition duration-300"
                >
                  حفظ الصورة
                </button>
                <button
                  onClick={stopCamera}
                  className="w-full bg-gradient-to-r from-[#50c4f2] to-[#80d2f2] hover:from-[#4bb5e0] hover:to-[#6fc2e0] text-white py-3 rounded-2xl font-bold text-lg shadow-md transition duration-300"
                >
                  إغلاق
                </button>
              </div>
            </div>
          )}

          {/* Submit */}
          <div className="space-y-3 mt-6">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#50c4f2] to-[#80d2f2] hover:from-[#4bb5e0] hover:to-[#6fc2e0] text-white py-3 rounded-2xl font-bold text-lg shadow-md transition duration-300"
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                  جاري التسجيل...
                </div>
              ) : (
                "تسجيل"
              )}
            </button>

            <button
              onClick={() => navigate("/")}
              className="w-full bg-white border border-silver hover:bg-gray-50 text-gray-800 py-3 rounded-2xl font-bold text-lg shadow-md transition duration-300"
            >
              رجوع للصفحة الرئيسية
            </button>
          </div>
        </motion.div>
      </main>

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} />

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

export default SignPage;
