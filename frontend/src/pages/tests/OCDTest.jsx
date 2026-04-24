import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import emailjs from "@emailjs/browser";

const questions = [
  {
    id: 1,
    text: "How often do you experience unwanted repetitive thoughts that feel hard to control?",
    options: [
      { label: "Not at all", score: 0 },
      { label: "Several days", score: 1 },
      { label: "More than half the days", score: 2 },
      { label: "Nearly every day", score: 3 },
    ],
  },
  {
    id: 2,
    text: "How often do you feel the need to repeat actions (checking, cleaning, counting)?",
    options: [
      { label: "Not at all", score: 0 },
      { label: "Several days", score: 1 },
      { label: "More than half the days", score: 2 },
      { label: "Nearly every day", score: 3 },
    ],
  },
  {
    id: 3,
    text: "How often do you feel anxious if things are not done in a certain way?",
    options: [
      { label: "Not at all", score: 0 },
      { label: "Several days", score: 1 },
      { label: "More than half the days", score: 2 },
      { label: "Nearly every day", score: 3 },
    ],
  },
  {
    id: 4,
    text: "How often do you spend extra time repeating tasks to feel 'just right'?",
    options: [
      { label: "Not at all", score: 0 },
      { label: "Several days", score: 1 },
      { label: "More than half the days", score: 2 },
      { label: "Nearly every day", score: 3 },
    ],
  },
  {
    id: 5,
    text: "How often do these thoughts or behaviors interfere with your daily life?",
    options: [
      { label: "Not at all", score: 0 },
      { label: "Several days", score: 1 },
      { label: "More than half the days", score: 2 },
      { label: "Nearly every day", score: 3 },
    ],
  },
  {
    id: 6,
    text: "How often do you feel distress if you try to resist repetitive behaviors?",
    options: [
      { label: "Not at all", score: 0 },
      { label: "Several days", score: 1 },
      { label: "More than half the days", score: 2 },
      { label: "Nearly every day", score: 3 },
    ],
  },
  {
    id: 7,
    text: "How often do you double-check things (locks, switches, messages) repeatedly?",
    options: [
      { label: "Never", score: 0 },
      { label: "Rarely", score: 1 },
      { label: "Sometimes", score: 2 },
      { label: "Often", score: 3 },
    ],
  },
  {
    id: 8,
    text: "How often do intrusive thoughts feel disturbing or unwanted?",
    options: [
      { label: "Never", score: 0 },
      { label: "Rarely", score: 1 },
      { label: "Sometimes", score: 2 },
      { label: "Often", score: 3 },
    ],
  },
  {
    id: 9,
    text: "How often do you feel temporary relief only after repeating actions?",
    options: [
      { label: "Never", score: 0 },
      { label: "Rarely", score: 1 },
      { label: "Sometimes", score: 2 },
      { label: "Often", score: 3 },
    ],
  },
  {
    id: 10,
    text: "How often do these thoughts or habits consume a significant part of your day?",
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
        "Your responses show minimal signs of obsessive-compulsive tendencies. Occasional repetitive thoughts are normal.",
    };

  if (score <= 9)
    return {
      level: "Mild",
      color: "text-green-600",
      message:
        "You may experience mild intrusive thoughts or habits. These are manageable with awareness and coping strategies.",
    };

  if (score <= 14)
    return {
      level: "Moderate",
      color: "text-yellow-600",
      message:
        "Your responses suggest moderate OCD-related patterns that may affect daily functioning.",
    };

  if (score <= 19)
    return {
      level: "High",
      color: "text-orange-600",
      message:
        "You may be experiencing strong obsessive thoughts or compulsive behaviors. Professional support is recommended.",
    };

  return {
    level: "Severe",
    color: "text-red-600",
    message:
      "Your symptoms suggest severe OCD-related patterns. Seeking professional help is strongly advised.",
  };
};

const OCDTest = () => {
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
      test_name: "OCD Screening Test",
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
            OCD Test
          </span>
        </h1>

        <p className="text-slate-600 mb-10 text-center">
          This screening helps identify intrusive thoughts and repetitive behavioral patterns.
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
              Your Results — OCD Test
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
              More Information on OCD
            </h3>

            {[
              {
                q: "How do I know if I have OCD or just overthinking?",
                a: "Overthinking is occasional and manageable, while OCD involves repeated intrusive thoughts that feel uncontrollable and often lead to repetitive actions to reduce anxiety.",
              },
              {
                q: "Are obsessive thoughts normal?",
                a: "Yes, everyone has random intrusive thoughts sometimes. In OCD, these thoughts are frequent, distressing, and difficult to ignore.",
              },
              {
                q: "Why do I feel forced to repeat actions?",
                a: "Compulsive behaviors temporarily reduce anxiety caused by intrusive thoughts, which reinforces the cycle and makes repetition feel necessary.",
              },
              {
                q: "Can OCD go away without treatment?",
                a: "Mild cases may improve with awareness and coping strategies, but moderate to severe OCD often requires therapy like CBT for effective management.",
              },
              {
                q: "Is OCD just about cleanliness?",
                a: "No. OCD can involve many themes like checking, counting, harm fears, symmetry, or intrusive thoughts—not just cleanliness.",
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

export default OCDTest;