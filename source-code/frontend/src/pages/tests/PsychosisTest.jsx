import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import emailjs from "@emailjs/browser";

const questions = [
  {
    id: 1,
    text: "How often do you feel confused about what is real and what is not?",
    options: [
      { label: "Not at all", score: 0 },
      { label: "Several days", score: 1 },
      { label: "More than half the days", score: 2 },
      { label: "Nearly every day", score: 3 },
    ],
  },
  {
    id: 2,
    text: "How often do you hear or sense things others do not notice?",
    options: [
      { label: "Not at all", score: 0 },
      { label: "Rarely", score: 1 },
      { label: "Sometimes", score: 2 },
      { label: "Often", score: 3 },
    ],
  },
  {
    id: 3,
    text: "How often do you feel strongly suspicious of others without clear reason?",
    options: [
      { label: "Not at all", score: 0 },
      { label: "Several days", score: 1 },
      { label: "More than half the days", score: 2 },
      { label: "Nearly every day", score: 3 },
    ],
  },
  {
    id: 4,
    text: "How often do you feel your thoughts are being controlled or influenced?",
    options: [
      { label: "Not at all", score: 0 },
      { label: "Rarely", score: 1 },
      { label: "Sometimes", score: 2 },
      { label: "Often", score: 3 },
    ],
  },
  {
    id: 5,
    text: "How often do you find it hard to organize or follow your thoughts clearly?",
    options: [
      { label: "Not at all", score: 0 },
      { label: "Several days", score: 1 },
      { label: "More than half the days", score: 2 },
      { label: "Nearly every day", score: 3 },
    ],
  },
  {
    id: 6,
    text: "How often do you feel detached from reality or like things are unreal?",
    options: [
      { label: "Not at all", score: 0 },
      { label: "Several days", score: 1 },
      { label: "More than half the days", score: 2 },
      { label: "Nearly every day", score: 3 },
    ],
  },
  {
    id: 7,
    text: "How often do you struggle to distinguish imagination from real events?",
    options: [
      { label: "Never", score: 0 },
      { label: "Rarely", score: 1 },
      { label: "Sometimes", score: 2 },
      { label: "Often", score: 3 },
    ],
  },
  {
    id: 8,
    text: "How often do you feel your thoughts are unusually fast, slow, or disorganized?",
    options: [
      { label: "Never", score: 0 },
      { label: "Rarely", score: 1 },
      { label: "Sometimes", score: 2 },
      { label: "Often", score: 3 },
    ],
  },
  {
    id: 9,
    text: "How often do you feel people are talking about you when they are not?",
    options: [
      { label: "Never", score: 0 },
      { label: "Rarely", score: 1 },
      { label: "Sometimes", score: 2 },
      { label: "Often", score: 3 },
    ],
  },
  {
    id: 10,
    text: "How often do these experiences affect your daily functioning or relationships?",
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
        "Your responses show minimal signs of psychosis-related experiences. Occasional confusion or stress-related perception changes can be normal.",
    };

  if (score <= 9)
    return {
      level: "Mild",
      color: "text-green-600",
      message:
        "You may experience mild perceptual or thought disturbances under stress. Monitoring and self-care may help.",
    };

  if (score <= 14)
    return {
      level: "Moderate",
      color: "text-yellow-600",
      message:
        "Your responses suggest moderate unusual perceptual or thought experiences. Consider speaking with a mental health professional.",
    };

  if (score <= 19)
    return {
      level: "High",
      color: "text-orange-600",
      message:
        "You may be experiencing significant perceptual or thinking disturbances. Professional support is strongly recommended.",
    };

  return {
    level: "Severe",
    color: "text-red-600",
    message:
      "Your responses suggest severe psychosis-related symptoms. Seeking immediate professional support is strongly advised.",
  };
};

const PsychosisTest = () => {
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
      test_name: "Psychosis Screening Test",
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
            Psychosis Test
          </span>
        </h1>

        <p className="text-slate-600 mb-10 text-center">
          This screening helps identify unusual perception, thinking, or reality-based experiences.
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
              Your Results — Psychosis Test
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
              More Information on Psychosis
            </h3>

            {[
              {
                q: "Does having strange thoughts mean I have psychosis?",
                a: "Not necessarily. Stress, anxiety, lack of sleep, or overthinking can sometimes cause unusual thoughts. Psychosis involves persistent difficulty distinguishing reality from imagination along with other symptoms.",
              },
              {
                q: "Is hearing a voice always a sign of mental illness?",
                a: "Not always. Some people may experience brief perceptual events during stress or fatigue. However, repeated or distressing experiences should be evaluated by a professional.",
              },
              {
                q: "Can psychosis happen temporarily?",
                a: "Yes. Psychosis-like symptoms can occur temporarily due to extreme stress, trauma, substance use, or sleep deprivation and may resolve with care.",
              },
              {
                q: "Can someone recover from psychosis?",
                a: "Yes. With early treatment, therapy, and sometimes medication, many people recover fully or learn to manage symptoms effectively.",
              },
              {
                q: "When should I seek help urgently?",
                a: "If you are frequently confused about reality, experiencing persistent hallucinations, or struggling to function in daily life, you should seek professional help as soon as possible.",
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

export default PsychosisTest;