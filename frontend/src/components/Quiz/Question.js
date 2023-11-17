// // Quiz/Question.js
// import React from 'react';

// const Question = ({ question }) => {
//   console.log('Question Object:', question);

//   return (
//     <div>
//       <h2>{question.title}</h2>
//       {/* Render question options, handle user input, etc. */}
//     </div>
//   );
// };

// export default Question;


// Question.js
import React, { useState } from 'react';

const Question = ({ question, onAnswer, onNext, onPrev }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelect = (optionId) => {
    setSelectedOption(optionId);
  };

  return (
    <div>
      <h2>{question.text}</h2>
      <ul>
        {question.options.map((option) => (
          <li key={option.id}>
            <label>
              <input
                type="radio"
                name="options"
                value={option.id}
                checked={selectedOption === option.id}
                onChange={() => handleOptionSelect(option.id)}
              />
              {option.text}
            </label>
          </li>
        ))}
      </ul>
      <button onClick={() => onPrev()}>Previous</button>
      <button onClick={() => onNext()}>Next</button>
      <button onClick={() => onAnswer(selectedOption)}>Submit Answer</button>
    </div>
  );
};

export default Question;

