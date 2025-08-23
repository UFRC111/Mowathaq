import { motion } from "framer-motion";
import logo from "./logo3.png";
import {  Verified, Edit,  MessageCircle, Delete, Stars, Workflow, SearchCheck, Lock, CoinsIcon, Timer } from "lucide-react"; // أيقونات

function TipsPage() {
  const tips = [
    { 
      title: "التحقق من الأمان ", 
      description: " اتأكد من موقع ( كشف النصابين ) إذا كان الرقم عليه أي بلاغ أو ريبورت.راجع موقع (موثق) للتأكد من توثيق الشخص ومصداقيته ولو مش متوثق اطلب منه يسجل بياناته ",    
         icon: <Verified className="text-[#50c4f2] w-10 h-10" />
    },
    { 
      title: "التواصل الموثق", 
      description: "خلّي معظم التواصل مكتوب (واتساب).تجنّب الاعتماد على المكالمات الصوتية أو الفويسات فقط علشان تفضل عندك إثباتات.", 
      icon: <MessageCircle className="text-[#50c4f2] w-10 h-10" />
    },
    { 
      title: "الاتفاق على التعديلات", 
      description: "قبل البدء، حدد عدد التعديلات المجانية (مثلاً: 3 تعديلات فقط مجاني، وما بعده بمقابل) وضّح إن أي تغيير جذري بعد التسليم يعتبر طلب جديد", 
      icon: <Edit className="text-[#50c4f2] w-10 h-10" />
    },
    { 
      title: " ابعد عن تيليجرام", 
      description: "تجنّب تسليم الشغل عليه، لأنه ممكن الرسائل تتشال بسهولة ومايبقاش فيه إثبات", 
      icon: <Delete className="text-[#50c4f2] w-10 h-10" />
    },
    { 
      title: "بناء الثقة", 
      description: "التزم بالاتفاقات حتى لو بسيطة، ده بيخلي الموزع/المكتب يرجعلك تاني.لو اتأخرت غصب عنك، بلّغ بدري وما تستناش يطاردك هو وبلاش تقفل موبايلك او تفعل وضع الطيران", 
      icon: <Stars className="text-[#50c4f2] w-10 h-10" />
    },
        { 
      title: "الاتفاق المسبق", 
      description: "قبل ما تبدأ في أي عمل وضّح طبيعة الأعمال المطلوبةاكتب السعر المتفق عليه حدّد موعد التسليم بشكل صريح", 
      icon: <Workflow className="text-[#50c4f2] w-10 h-10" />
    },
      { 
      title: "مراجعة الجودة", 
      description: "اعمل تشيك سريع على الأخطاء الإملائية أو التنسيقية قبل التسليم، علشان تحافظ على سمعتك استخدم أدوات التدقيق (Grammarly أو أدوات التدقيق العربي زي) للتأكد من خلو النصوص من أخطاء مع كل تسليم بحث يشترط تسليم نسخة تقرير turnitin لتوثيق العمل بأنه خالي من الذكاء الاصطناعي", 
      icon: <SearchCheck className="text-[#50c4f2] w-10 h-10" />
    },

          { 
      title: "تأمين العمل أثناء التسليم", 
      description: "عند الانتهاء من العملترسل فيديو/صور لجزء من العمل من موبايلك (مش الفايل الأصلي)ممنوع تسلّم صور أو فيديو للعمل كامل حتى لو من تصويركولو شرح استخدم جوجل درايف كوسيلة آمنة لتحديد من له صلاحية الدخول للملفات", 
      icon: <Lock className="text-[#50c4f2] w-10 h-10" />
    },
        { 
      title: "ضمان الجدية", 
      description: "اطلب من المكتب/الموزع ديبوزيت (مقدم) لضمان الجدية وعدم تضييع وقت الطرفين لو المشروع كبير، اقسم الدفع على مراحل مقدم - بعد التسليم الجزئي - عند التسليم النهائي",
      icon: <CoinsIcon className="text-[#50c4f2] w-10 h-10" />
    },
        { 
      title: "إدارة الوقت بذكاء", 
      description: "وزّع وقتك على كل مشروع حسب الأولوية وميعاد التسليم اطلب مواعيد منطقية لو المكتب ضاغطك في وقت مستحيل، اطلب تمديد أو ارفض بوضوح",
      icon: <Timer className="text-[#50c4f2] w-10 h-10" />
    },


  ];

  return (
    <div className="min-h-screen relative overflow-hidden font-sans" dir="rtl">
      {/* الخلفية */}
<div className="absolute inset-0 z-0" style={{ backgroundColor: "#f2f2f2" }}></div>

      <main className="relative z-10 flex flex-col items-center justify-center text-center min-h-screen px-6 pt-24">
        {/* اللوجو */}
        <motion.img
          src={logo}
          alt="Logo"
          className="w-24 h-24 mb-6 rounded-full shadow-lg"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        />

        {/* العنوان */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="text-4xl font-bold text-[#0378a6] mb-6"
        >
          نصائح هامة
        </motion.h1>


        {/* كروت النصائح */}
        <div className="grid gap-6 sm:grid-cols-2 max-w-4xl w-full mb-20">
          {tips.map((tip, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white/90 p-6 rounded-3xl shadow-lg border border-silver text-right flex flex-col items-start hover:scale-105 hover:shadow-2xl transition-transform duration-300"
            >
              <div className="mb-3">{tip.icon}</div>
              <h3 className="text-lg font-bold text-[#0378a6] mb-2">{tip.title}</h3>
              <p className="text-gray-700">{tip.description}</p>
            </motion.div>
          ))}
        </div>
      </main>

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

export default TipsPage;
