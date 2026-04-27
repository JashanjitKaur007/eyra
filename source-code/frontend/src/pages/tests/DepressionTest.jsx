import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";

import emailjs from "@emailjs/browser";


// const questions = [
//   {
//     id: 1,
//     text: "Little interest or pleasure in doing things",
//     options: [
//       { label: "Not at all", score: 0 },
//       { label: "Several days", score: 1 },
//       { label: "More than half the days", score: 2 },
//       { label: "Nearly every day", score: 3 },
//     ],
//   },
//   {
//     id: 2,
//     text: "Feeling down, depressed, or hopeless",
//     options: [
//       { label: "Not at all", score: 0 },
//       { label: "Several days", score: 1 },
//       { label: "More than half the days", score: 2 },
//       { label: "Nearly every day", score: 3 },
//     ],
//   },
//   {
//     id: 3,
//     text: "Trouble falling or staying asleep, or sleeping too much",
//     options: [
//       { label: "Not at all", score: 0 },
//       { label: "Several days", score: 1 },
//       { label: "More than half the days", score: 2 },
//       { label: "Nearly every day", score: 3 },
//     ],
//   },
//   {
//     id: 4,
//     text: "Feeling tired or having little energy",
//     options: [
//       { label: "Not at all", score: 0 },
//       { label: "Several days", score: 1 },
//       { label: "More than half the days", score: 2 },
//       { label: "Nearly every day", score: 3 },
//     ],
//   },
//   {
//     id: 5,
//     text: "Poor appetite or overeating",
//     options: [
//       { label: "Not at all", score: 0 },
//       { label: "Several days", score: 1 },
//       { label: "More than half the days", score: 2 },
//       { label: "Nearly every day", score: 3 },
//     ],
//   },
//   {
//     id: 6,
//     text: "Feeling bad about yourself — or that you are a failure or have let yourself or your family down",
//     options: [
//       { label: "Not at all", score: 0 },
//       { label: "Several days", score: 1 },
//       { label: "More than half the days", score: 2 },
//       { label: "Nearly every day", score: 3 },
//     ],
//   },
//   {
//     id: 7,
//     text: "Trouble concentrating on things, such as reading or watching television",
//     options: [
//       { label: "Not at all", score: 0 },
//       { label: "Several days", score: 1 },
//       { label: "More than half the days", score: 2 },
//       { label: "Nearly every day", score: 3 },
//     ],
//   },
//   {
//     id: 8,
//     text: "Moving or speaking slowly OR being very restless/fidgety",
//     options: [
//       { label: "Not at all", score: 0 },
//       { label: "Several days", score: 1 },
//       { label: "More than half the days", score: 2 },
//       { label: "Nearly every day", score: 3 },
//     ],
//   },
//   {
//     id: 9,
//     text: "Thoughts that you would be better off dead or hurting yourself",
//     options: [
//       { label: "Not at all", score: 0 },
//       { label: "Several days", score: 1 },
//       { label: "More than half the days", score: 2 },
//       { label: "Nearly every day", score: 3 },
//     ],
//   },
//   {
//     id: 10,
//     text: "How difficult have these problems made your daily life?",
//     options: [
//       { label: "Not difficult at all", score: 0 },
//       { label: "Somewhat difficult", score: 1 },
//       { label: "Very difficult", score: 2 },
//       { label: "Extremely difficult", score: 3 },
//     ],
//   },
// ];

// const getResult = (score) => {
//   if (score <= 4)
//     return {
//       level: "Minimal",
//       color: "text-emerald-600",
//       message:
//         "Your responses suggest minimal depressive symptoms. You're doing well, but keep taking care of your mental health.",
//     };

//   if (score <= 9)
//     return {
//       level: "Mild",
//       color: "text-green-600",
//       message:
//         "You may be experiencing mild symptoms. Consider small lifestyle changes and self-care.",
//     };

//   if (score <= 14)
//     return {
//       level: "Moderate",
//       color: "text-yellow-600",
//       message:
//         "You may be experiencing moderate symptoms. It may help to talk to someone you trust or seek support.",
//     };

//   if (score <= 19)
//     return {
//       level: "Moderately Severe",
//       color: "text-orange-600",
//       message:
//         "Your responses suggest more serious symptoms. Professional guidance could be beneficial.",
//     };

//   return {
//     level: "Severe",
//     color: "text-red-600",
//     message:
//       "Your responses indicate severe symptoms. Please consider reaching out to a mental health professional.",
//   };
// };
const questions = [
  {
    id: 1,
    text: "How often have you felt emotionally empty or numb lately?",
    options: [
      { label: "Not at all", score: 0 },
      { label: "Several days", score: 1 },
      { label: "More than half the days", score: 2 },
      { label: "Nearly every day", score: 3 },
    ],
  },
  {
    id: 2,
    text: "How frequently do you lose interest in activities you used to enjoy?",
    options: [
      { label: "Not at all", score: 0 },
      { label: "Several days", score: 1 },
      { label: "More than half the days", score: 2 },
      { label: "Nearly every day", score: 3 },
    ],
  },
  {
    id: 3,
    text: "How often do you feel like you have no motivation to start your day?",
    options: [
      { label: "Not at all", score: 0 },
      { label: "Several days", score: 1 },
      { label: "More than half the days", score: 2 },
      { label: "Nearly every day", score: 3 },
    ],
  },
  {
    id: 4,
    text: "How frequently do you feel overwhelmed even by small tasks?",
    options: [
      { label: "Not at all", score: 0 },
      { label: "Several days", score: 1 },
      { label: "More than half the days", score: 2 },
      { label: "Nearly every day", score: 3 },
    ],
  },
  {
    id: 5,
    text: "How often do you feel disconnected from people around you?",
    options: [
      { label: "Not at all", score: 0 },
      { label: "Several days", score: 1 },
      { label: "More than half the days", score: 2 },
      { label: "Nearly every day", score: 3 },
    ],
  },
  {
    id: 6,
    text: "How frequently do you find yourself thinking negatively about yourself?",
    options: [
      { label: "Not at all", score: 0 },
      { label: "Several days", score: 1 },
      { label: "More than half the days", score: 2 },
      { label: "Nearly every day", score: 3 },
    ],
  },
  {
    id: 7,
    text: "How often do you feel that your future is hopeless or unclear?",
    options: [
      { label: "Never", score: 0 },
      { label: "Rarely", score: 1 },
      { label: "Sometimes", score: 2 },
      { label: "Often", score: 3 },
    ],
  },
  {
    id: 8,
    text: "How frequently do you experience difficulty focusing on tasks?",
    options: [
      { label: "Not difficult at all", score: 0 },
      { label: "Somewhat difficult", score: 1 },
      { label: "Very difficult", score: 2 },
      { label: "Extremely difficult", score: 3 },
    ],
  },
  {
    id: 9,
    text: "How often do you feel emotionally exhausted without a clear reason?",
    options: [
      { label: "Never", score: 0 },
      { label: "Rarely", score: 1 },
      { label: "Sometimes", score: 2 },
      { label: "Often", score: 3 },
    ],
  },
  {
    id: 10,
    text: "How often do you feel that things will never improve?",
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
        "Based on your responses, you are not currently experiencing signs of depression.\n\nThis is not meant to be a diagnosis. Symptoms can come and go. It’s a good idea to take the test again if things change or feel worse.\n\nYou deserve mental health support regardless of your result. The resources below can help you find your next steps toward feeling better.",
    };

  if (score <= 9)
    return {
      level: "Mild",
      color: "text-green-600",
      message:
        "Based on your responses, you’re experiencing signs of mild depression.\n\nThis is not a diagnosis, but it’s a good starting point. You’ve already taken an important step by completing this screening.\n\nYou may benefit from small lifestyle changes, self-care, and talking with someone you trust.",
    };

  if (score <= 14)
    return {
      level: "Moderate",
      color: "text-yellow-600",
      message:
        "Based on your responses, you’re experiencing signs of moderate depression.\n\nThis is not a diagnosis, but it suggests that your symptoms may be affecting your daily life.\n\nYou can consider sharing these results with a mental health professional or a trusted person for support.",
    };

  if (score <= 19)
    return {
      level: "Moderately Severe",
      color: "text-orange-600",
      message:
        "Based on your responses, you’re experiencing signs of moderately severe depression.\n\nThis is not a diagnosis, but your symptoms suggest a higher level of difficulty in daily functioning.\n\nReaching out to a mental health professional could be very helpful at this stage.",
    };

  return {
    level: "Severe",
    color: "text-red-600",
    message:
      "Based on your responses, you’re experiencing signs of severe depression.\n\nThis is not a diagnosis, but your symptoms indicate significant distress that may be impacting your daily life.\n\nProfessional support is strongly recommended, and reaching out for help can make a real difference.",
  };
};


const DepressionTest = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [openFAQ, setOpenFAQ] = useState(null);
const [showAnswers, setShowAnswers] = useState(false);

  const questionRefs = useRef([]);

  // const totalScore = Object.values(answers).reduce((a, b) => a + b, 0);
const totalScore = Object.values(answers).reduce((a, b) => a + (b || 0), 0);
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

  // ✅ FIXED: inside component scope
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


  const { user } = useAuth();

const emailResults = () => {
  const result = getResult(totalScore);

  const templateParams = {
    to_email: user?.email || "test@gmail.com",
    user_name: user?.name || "User",
    name: user?.name || "User",
    test_name: "Depression Test (PHQ-9)",
    score: totalScore,
    level: result.level,
    time: new Date().toLocaleString(),
  };

  console.log("Sending email to:", templateParams.to_email);

  emailjs.send(
    "service_bvttvdn",
    "template_vq7ggzp",
    templateParams,
    "9cRdZRIxJLHW5aNyj"
  )
  .then((res) => {
    console.log("SUCCESS:", res.status, res.text);
    alert("Email sent!");
  })
  .catch((err) => {
    console.log("ERROR:", err);
    alert("Failed");
  });
};

  return (
    <div className="min-h-screen bg-[#f8fafc] py-20 px-6">
      <div className="max-w-3xl mx-auto">
{/* 
        <h1 className="text-4xl font-semibold text-slate-900 mb-4">
          <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
            Depression Test
          </span>
        </h1> */}
<h1 className="text-6xl font-bold text-center mt-10 mb-6">
  <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
    Depression Test
  </span>
</h1><br />
        <p className="text-slate-600 mb-10">
  A depression screening test (like PHQ-9) checks for low mood, loss of interest, and related symptoms 
  <br /><br />
  Over the last 2 weeks, how often have you been bothered by the following problems?
</p>

{/* Progress */}
<div className="w-full bg-slate-200 rounded-full h-2 mb-8 overflow-hidden">
  <div
    className="h-2 rounded-full transition-all"
    style={{
      width: `${(Object.keys(answers).length / questions.length) * 100}%`,
      backgroundImage:
        "linear-gradient(to right, #059669, #0d9488, #0891b2)", // emerald → teal → cyan
    }}
  />
</div>

        {/* Questions */}
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
                        className={`p-4 rounded-xl border text-left transition ${
                          selected
                            ? "bg-emerald-600 text-white border-emerald-600"
                            : "bg-white text-slate-700 hover:border-emerald-400"
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

        {/* RESULT */}
        {Object.keys(answers).length === questions.length && (
//           <div className="mt-16 bg-white p-8 rounded-3xl shadow-xl border border-slate-200">

//             <h2 className="text-3xl font-semibold text-center mb-2">
//               Your Results — Depression Test
//             </h2>

//             <h3 className={`text-xl font-semibold text-center mb-6 ${getResult(totalScore).color}`}>
//               {getResult(totalScore).level}
//             </h3>

//             <div className="flex flex-wrap justify-center gap-4 mb-8">

//               <div className="px-5 py-3 bg-slate-100 rounded-xl">
//                 Score: {totalScore} / 27
//               </div>

//               <button
//                 onClick={emailResults}
//                 className="px-5 py-3 bg-emerald-600 text-white rounded-xl"
//               >
//                 Email Results
//               </button>

//               <button
//                 onClick={() => alert(JSON.stringify(getUserAnswers(), null, 2))}
//                 className="px-5 py-3 bg-slate-900 text-white rounded-xl"
//               >
//                 Your Answers
//               </button>
//             </div>

//             {/* <p className="text-slate-600 text-center mb-6">
//               {getResult(totalScore).message}
//             </p> */}
//             <p className="text-slate-600 text-center mb-6 whitespace-pre-line">
//   {getResult(totalScore).message}
// </p>

//             {totalScore >= 15 && (
//               <div className="bg-red-50 border border-red-200 p-4 rounded-xl text-red-700 text-sm mb-6">
//                 If you need immediate help, call or text 988 or visit 988lifeline.org
//               </div>
//             )}
//           </div>
<div className="mt-16 bg-white p-8 rounded-3xl shadow-xl border border-slate-200">

  {/* TITLE */}
  <h2 className="text-3xl font-semibold text-center mb-6">
    <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
      Your Results — Depression Test
    </span>
  </h2>

  {/* RESULT BOX */}
  <div className="text-center bg-slate-50 border border-slate-200 rounded-2xl p-8 mb-6">

    <h3
      className={`text-4xl font-bold mb-3 ${
        getResult(totalScore).color
      }`}
    >
      {getResult(totalScore).level}
    </h3>

    <p className="text-slate-600 whitespace-pre-line">
      {getResult(totalScore).message}
    </p>
  </div>

  {/* SCORE + BUTTONS */}
  <div className="flex flex-wrap justify-center gap-4 mb-8">

    <div className="px-5 py-3 bg-slate-100 rounded-xl">
      Score: {totalScore} / 27
    </div>

    <button
      onClick={emailResults}
      className="px-5 py-3 bg-emerald-600 text-white rounded-xl"
    >
      Email Results
    </button>

    <button
      // onClick={() => alert(JSON.stringify(getUserAnswers(), null, 2))}
onClick={() => setShowAnswers(true)}
      className="px-5 py-3 bg-slate-900 text-white rounded-xl"
    >
      Your Answers
    </button>
  </div>
{showAnswers && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">

    <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl p-6 max-h-[80vh] overflow-y-auto">

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">
          Your Answers
        </h2>

        <button
          onClick={() => setShowAnswers(false)}
          className="text-slate-500 hover:text-black text-xl"
        >
          ✕
        </button>
      </div>

      <div className="space-y-4">
        {getUserAnswers().map((a, i) => (
          <div
            key={i}
            className="border border-slate-200 rounded-xl p-4 bg-slate-50"
          >
            <p className="font-medium text-slate-800 mb-2">
              {i + 1}. {a.question}
            </p>

            <p className="text-slate-600">
              <span className="font-semibold">Answer:</span> {a.answer}
            </p>
          </div>
        ))}
      </div>

    </div>
  </div>
)}
  {/* CRISIS BOX */}
  {totalScore >= 15 && (
    <div className="bg-red-50 border border-red-200 p-4 rounded-xl text-red-700 text-sm mb-6 text-center">
      If you need immediate help, call or text 988 or visit 988lifeline.org
    </div>
  )}
</div>
        )}


        {/* FAQ SECTION */}
        {/* <div className="mt-16"> */}
        {Object.keys(answers).length === questions.length && (
  <div className="mt-16">
          <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">
            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
              More Information on Depression
            </span>
          </h3>

          {[
  {
    q: "What is the difference between sadness and clinical depression?",
    a: "Sadness is usually temporary and tied to specific events, while clinical depression is persistent (lasting at least two weeks) and affects daily functioning. It often includes deep feelings of emptiness, hopelessness, and loss of interest in activities you once enjoyed."
  },
  {
    q: "What are the main symptoms of depression?",
    a: "Common symptoms include a persistent low mood, loss of interest or pleasure (anhedonia), changes in sleep or appetite, fatigue, difficulty concentrating, feelings of worthlessness, and sometimes thoughts of self-harm or suicide."
  },
  {
    q: "Is depression a sign of weakness?",
    a: "No. Depression is a recognized medical condition influenced by biological, psychological, and environmental factors. It is not a character flaw or something someone can simply 'snap out of'."
  },
  {
    q: "Is depression treatable?",
    a: "Yes. Depression is highly treatable. Most people improve with therapy (such as CBT), medication, or a combination of both. Early support and consistent treatment often lead to better outcomes."
  },
  {
    q: "What should I do if I am having thoughts of suicide?",
    a: "If you are experiencing suicidal thoughts, seek immediate help. Reach out to a mental health professional, trusted person, or local emergency services. Crisis support is available and can provide immediate safety and guidance."
  }
].map((item, i) => (
            <div
              key={i}
              className="bg-white border border-slate-200 rounded-xl mb-3 overflow-hidden"
            >
              <button
                className="w-full text-left p-4 font-medium flex justify-between"
                onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
              >
                {item.q}
                <span>{openFAQ === i ? "−" : "+"}</span>
              </button>

              {openFAQ === i && (
                <div className="px-4 pb-4 text-slate-600">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        {/* </div> */}
          </div>
)}

        <p className="text-sm text-slate-400 mt-6 text-center">
          This is not a diagnosis. Only a screening tool.
        </p>

      </div>
    </div>
  );
};

export default DepressionTest;





