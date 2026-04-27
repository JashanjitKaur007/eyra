import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import emailjs from "@emailjs/browser";

const questions = [
  {
    id: 1,
    text: "How often do you worry about your body weight or shape?",
    options: [
      { label: "Not at all", score: 0 },
      { label: "Several days", score: 1 },
      { label: "More than half the days", score: 2 },
      { label: "Nearly every day", score: 3 },
    ],
  },
  {
    id: 2,
    text: "How often do you feel guilty after eating?",
    options: [
      { label: "Not at all", score: 0 },
      { label: "Several days", score: 1 },
      { label: "More than half the days", score: 2 },
      { label: "Nearly every day", score: 3 },
    ],
  },
  {
    id: 3,
    text: "How often do you skip meals intentionally to control weight?",
    options: [
      { label: "Not at all", score: 0 },
      { label: "Several days", score: 1 },
      { label: "More than half the days", score: 2 },
      { label: "Nearly every day", score: 3 },
    ],
  },
  {
    id: 4,
    text: "How often do you feel out of control while eating?",
    options: [
      { label: "Not at all", score: 0 },
      { label: "Several days", score: 1 },
      { label: "More than half the days", score: 2 },
      { label: "Nearly every day", score: 3 },
    ],
  },
  {
    id: 5,
    text: "How often do you compare your body with others?",
    options: [
      { label: "Not at all", score: 0 },
      { label: "Several days", score: 1 },
      { label: "More than half the days", score: 2 },
      { label: "Nearly every day", score: 3 },
    ],
  },
  {
    id: 6,
    text: "How often do you restrict food even when you are hungry?",
    options: [
      { label: "Not at all", score: 0 },
      { label: "Several days", score: 1 },
      { label: "More than half the days", score: 2 },
      { label: "Nearly every day", score: 3 },
    ],
  },
  {
    id: 7,
    text: "How often do you eat large amounts of food in one sitting?",
    options: [
      { label: "Never", score: 0 },
      { label: "Rarely", score: 1 },
      { label: "Sometimes", score: 2 },
      { label: "Often", score: 3 },
    ],
  },
  {
    id: 8,
    text: "How often do you feel ashamed about your eating habits?",
    options: [
      { label: "Never", score: 0 },
      { label: "Rarely", score: 1 },
      { label: "Sometimes", score: 2 },
      { label: "Often", score: 3 },
    ],
  },
  {
    id: 9,
    text: "How often does food or body image affect your mood?",
    options: [
      { label: "Never", score: 0 },
      { label: "Rarely", score: 1 },
      { label: "Sometimes", score: 2 },
      { label: "Often", score: 3 },
    ],
  },
  {
    id: 10,
    text: "How often does this behavior affect your daily life or confidence?",
    options: [
      { label: "Never", score: 0 },
      { label: "Rarely", score: 1 },
      { label: "Sometimes", score: 2 },
      { label: "Often", score: 3 },
    ],
  },
];

const getResult = (score) => {
  if (score <= 4)
    return {
      level: "Minimal",
      color: "text-emerald-600",
      message:
        "Your responses suggest minimal concern around eating behavior and body image.",
    };

  if (score <= 9)
    return {
      level: "Mild",
      color: "text-green-600",
      message:
        "You may have mild concerns around eating habits or body image. Awareness and balance can help.",
    };

  if (score <= 14)
    return {
      level: "Moderate",
      color: "text-yellow-600",
      message:
        "Your responses suggest moderate concern that may affect eating behavior and self-image.",
    };

  if (score <= 19)
    return {
      level: "High",
      color: "text-orange-600",
      message:
        "You may be experiencing significant eating-related distress. Support is recommended.",
    };

  return {
    level: "Severe",
    color: "text-red-600",
    message:
      "Your responses suggest severe eating-related concerns. Professional help is strongly advised.",
  };
};

const EatingDisorderTest = () => {
  const { user } = useAuth();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [openFAQ, setOpenFAQ] = useState(null);
  const [showAnswers, setShowAnswers] = useState(false);

  const questionRefs = useRef([]);

  const totalScore = Object.values(answers).reduce(
    (a, b) => a + (b || 0),
    0
  );

  useEffect(() => {
    if (questionRefs.current[currentIndex]) {
      questionRefs.current[currentIndex].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [currentIndex]);

  const handleSelect = (qId, score) => {
    setAnswers((prev) => ({ ...prev, [qId]: score }));

    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const getUserAnswers = () => {
    return questions.map((q) => {
      const score = answers[q.id];
      const selected = q.options.find((o) => o.score === score);
      return {
        question: q.text,
        answer: selected?.label || "Not answered",
      };
    });
  };

  const emailResults = () => {
    const result = getResult(totalScore);

    const templateParams = {
      to_email: user?.email || "test@gmail.com",
      user_name: user?.name || "User",
      name: user?.name || "User",
      test_name: "Eating Disorder Screening Test",
      score: totalScore,
      level: result.level,
      time: new Date().toLocaleString(),
    };

    emailjs
      .send(
        "service_bvttvdn",
        "template_vq7ggzp",
        templateParams,
        "9cRdZRIxJLHW5aNyj"
      )
      .then(() => alert("Email sent!"))
      .catch(() => alert("Failed"));
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] py-20 px-6">
      <div className="max-w-3xl mx-auto">

        <h1 className="text-6xl font-bold text-center mt-10 mb-6">
          <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
            Eating Disorder Test
          </span>
        </h1>

        <p className="text-slate-600 mb-10 text-center">
          This screening helps identify unhealthy eating patterns and body image concerns.
        </p>

        <div className="w-full bg-slate-200 rounded-full h-2 mb-8 overflow-hidden">
          <div
            className="h-2 rounded-full"
            style={{
              width: `${(Object.keys(answers).length / questions.length) * 100}%`,
              backgroundImage:
                "linear-gradient(to right, #059669, #0d9488, #0891b2)",
            }}
          />
        </div>

        <div className="space-y-10">
          {questions.map((q, index) => {
            if (index > currentIndex) return null;

            return (
              <div
                key={q.id}
                ref={(el) => (questionRefs.current[index] = el)}
                className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200"
              >
                <h3 className="text-lg font-medium text-slate-800 mb-5">
                  {q.id}. {q.text}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {q.options.map((opt, i) => {
                    const selected = answers[q.id] === opt.score;

                    return (
                      <button
                        key={i}
                        onClick={() => handleSelect(q.id, opt.score)}
                        className={`p-4 rounded-xl border text-left ${
                          selected
                            ? "bg-emerald-600 text-white"
                            : "hover:border-emerald-400"
                        }`}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {Object.keys(answers).length === questions.length && (
          <div className="mt-16 bg-white p-8 rounded-3xl shadow-xl border">

            <h2 className="text-3xl text-center font-semibold mb-6">
              Your Results — Eating Disorder Test
            </h2>

            <div className="text-center bg-slate-50 p-8 rounded-2xl mb-6">
              <h3 className={`text-4xl font-bold ${getResult(totalScore).color}`}>
                {getResult(totalScore).level}
              </h3>

              <p className="text-slate-600 mt-4 whitespace-pre-line">
                {getResult(totalScore).message}
              </p>
            </div>

            <div className="flex justify-center gap-4 flex-wrap mb-6">
              <div className="px-5 py-3 bg-slate-100 rounded-xl">
                Score: {totalScore} / 30
              </div>

              <button
                onClick={emailResults}
                className="px-5 py-3 bg-emerald-600 text-white rounded-xl"
              >
                Email Results
              </button>

              <button
                onClick={() => setShowAnswers(true)}
                className="px-5 py-3 bg-slate-900 text-white rounded-xl"
              >
                Your Answers
              </button>
            </div>

            {showAnswers && (
              <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
                <div className="bg-white w-full max-w-2xl rounded-2xl p-6 max-h-[80vh] overflow-y-auto">
                  <div className="flex justify-between mb-4">
                    <h2 className="text-xl font-semibold">Your Answers</h2>
                    <button onClick={() => setShowAnswers(false)}>✕</button>
                  </div>

                  {getUserAnswers().map((a, i) => (
                    <div key={i} className="border p-3 rounded-xl mb-3">
                      <p className="font-medium">{a.question}</p>
                      <p className="text-slate-600">{a.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {Object.keys(answers).length === questions.length && (
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-center mb-6">
              More Information on Eating Disorders
            </h3>

            {[
              {
                q: "How do I know if I have an eating disorder or just dieting habits?",
                a: "Dieting is usually flexible and temporary, while eating disorders involve rigid rules, guilt after eating, and distress around food or body image that affects daily life.",
              },
              {
                q: "Is it normal to think about food and weight all the time?",
                a: "Occasional thoughts are normal, but constant preoccupation with food, weight, or body image that causes anxiety may indicate an unhealthy pattern.",
              },
              {
                q: "Can someone have an eating disorder even if they look healthy?",
                a: "Yes. Eating disorders are not always visible. A person can appear physically healthy while struggling mentally and emotionally with food behaviors.",
              },
              {
                q: "Why do I feel guilty after eating even normal meals?",
                a: "This often comes from distorted thoughts about food or body image. It is a common symptom in eating disorders and not a reflection of actual eating behavior.",
              },
              {
                q: "Can eating disorders be treated without hospitalization?",
                a: "Yes, many people recover through therapy, nutritional counseling, and support. Hospitalization is only needed in severe or medically risky cases.",
              },
            ].map((item, i) => (
              <div key={i} className="bg-white border rounded-xl mb-3">
                <button
                  className="w-full text-left p-4 flex justify-between"
                  onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                >
                  {item.q}
                  <span>{openFAQ === i ? "−" : "+"}</span>
                </button>

                {openFAQ === i && (
                  <div className="p-4 text-slate-600">{item.a}</div>
                )}
              </div>
            ))}
          </div>
        )}

        <p className="text-sm text-slate-400 mt-6 text-center">
          This is not a diagnosis, only a screening tool.
        </p>

      </div>
    </div>
  );
};

export default EatingDisorderTest;