import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import emailjs from "@emailjs/browser";

const questions = [
  {
    id: 1,
    text: "How often do you feel nervous, anxious, or on edge?",
    options: [
      { label: "Not at all", score: 0 },
      { label: "Several days", score: 1 },
      { label: "More than half the days", score: 2 },
      { label: "Nearly every day", score: 3 },
    ],
  },
  {
    id: 2,
    text: "How often do you find it hard to control your worrying?",
    options: [
      { label: "Not at all", score: 0 },
      { label: "Several days", score: 1 },
      { label: "More than half the days", score: 2 },
      { label: "Nearly every day", score: 3 },
    ],
  },
  {
    id: 3,
    text: "How often do you worry too much about different things?",
    options: [
      { label: "Not at all", score: 0 },
      { label: "Several days", score: 1 },
      { label: "More than half the days", score: 2 },
      { label: "Nearly every day", score: 3 },
    ],
  },
  {
    id: 4,
    text: "How often do you feel restless or unable to relax?",
    options: [
      { label: "Not at all", score: 0 },
      { label: "Several days", score: 1 },
      { label: "More than half the days", score: 2 },
      { label: "Nearly every day", score: 3 },
    ],
  },
  {
    id: 5,
    text: "How often do you feel easily irritated or annoyed?",
    options: [
      { label: "Not at all", score: 0 },
      { label: "Several days", score: 1 },
      { label: "More than half the days", score: 2 },
      { label: "Nearly every day", score: 3 },
    ],
  },
  {
    id: 6,
    text: "How often do you feel something bad might happen?",
    options: [
      { label: "Not at all", score: 0 },
      { label: "Several days", score: 1 },
      { label: "More than half the days", score: 2 },
      { label: "Nearly every day", score: 3 },
    ],
  },
  {
    id: 7,
    text: "How often do you have trouble relaxing even in safe situations?",
    options: [
      { label: "Never", score: 0 },
      { label: "Rarely", score: 1 },
      { label: "Sometimes", score: 2 },
      { label: "Often", score: 3 },
    ],
  },
  {
    id: 8,
    text: "How often does anxiety affect your sleep?",
    options: [
      { label: "Not at all", score: 0 },
      { label: "Somewhat", score: 1 },
      { label: "Very often", score: 2 },
      { label: "Almost always", score: 3 },
    ],
  },
  {
    id: 9,
    text: "How often do you overthink situations after they happen?",
    options: [
      { label: "Never", score: 0 },
      { label: "Rarely", score: 1 },
      { label: "Sometimes", score: 2 },
      { label: "Often", score: 3 },
    ],
  },
  {
    id: 10,
    text: "How often does anxiety interfere with your daily life?",
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
        "Your responses suggest minimal anxiety. Occasional worry is normal and usually not harmful.",
    };

  if (score <= 9)
    return {
      level: "Mild",
      color: "text-green-600",
      message:
        "You may experience mild anxiety. Simple coping techniques like breathing exercises may help.",
    };

  if (score <= 14)
    return {
      level: "Moderate",
      color: "text-yellow-600",
      message:
        "Your responses suggest moderate anxiety that may affect daily life. Support or lifestyle changes can help.",
    };

  if (score <= 19)
    return {
      level: "High",
      color: "text-orange-600",
      message:
        "You may be experiencing high anxiety levels. Professional support is recommended.",
    };

  return {
    level: "Severe",
    color: "text-red-600",
    message:
      "Your symptoms suggest severe anxiety. Seeking professional help is strongly advised.",
  };
};

const AnxietyTest = () => {
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
      test_name: "Anxiety Screening Test",
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
            Anxiety Test
          </span>
        </h1>

        <p className="text-slate-600 mb-10 text-center">
          This screening helps identify anxiety patterns, excessive worry, and stress levels.
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
              Your Results — Anxiety Test
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
              More Information on Anxiety
            </h3>

            {[
              {
                q: "How do I know if I have anxiety or just normal stress?",
                a: "Stress usually happens due to a specific situation and goes away, while anxiety is persistent, excessive worry that continues even without a clear reason and affects daily life.",
              },
              {
                q: "Can anxiety happen even if everything in my life is fine?",
                a: "Yes. Anxiety can occur without an obvious external reason. It is often linked to brain chemistry, thought patterns, and past experiences rather than current life conditions.",
              },
              {
                q: "Why do I overthink small things so much?",
                a: "Anxiety causes the brain to focus on potential threats or negative outcomes, even for small situations. This leads to overthinking and replaying events repeatedly.",
              },
              {
                q: "Is anxiety dangerous or just mental overthinking?",
                a: "Anxiety itself is not physically dangerous, but it can strongly affect mental health, sleep, concentration, and daily functioning if left unmanaged.",
              },
              {
                q: "Can anxiety go away without treatment?",
                a: "Mild anxiety can improve with lifestyle changes, but moderate to severe anxiety often needs support like therapy, coping strategies, or professional help for long-term improvement.",
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

export default AnxietyTest;