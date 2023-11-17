
// // Sidebar.js
// import React from 'react';

// const Sidebar = ({ questions, currentQuestionIndex, handleQuestionSelection }) => {
//   const numberOfRows = 5;
//   const numberOfColumns = 6;

//   // Ensure questions array is not undefined
//   if (!questions || !Array.isArray(questions)) {
//     return null; // or handle this case appropriately
//   }

//   const renderGrid = () => {
//     const grid = Array.from({ length: numberOfRows }, (_, row) =>
//       Array.from({ length: numberOfColumns }, (_, col) => row * numberOfColumns + col)
//     );

    
//     return grid.map((row, rowIndex) => (
        
//       <div key={rowIndex} className="row">
      
//         {row.map((index) => (
//           // Check if the question at the given index exists
//           questions[index] ? (
//             <button
//               key={questions[index].id}
//               onClick={() => handleQuestionSelection(index)}
//               className={`question-button ${index === currentQuestionIndex ? 'active' : ''}`}
//             >
//               {index + 1}
//             </button>
//           ) : null
//         ))}
//       </div>
//     ));
//   };

//   return (
    
//     <div className="sidebar">
//     <h2>Question List</h2>
//       <div className="grid-container">{renderGrid()}</div>
//     </div>
//   );
// };

// export default Sidebar;

// Sidebar.js
import React from 'react';

const Sidebar = ({ questions, currentQuestionIndex, handleQuestionSelection }) => {
  const numberOfRows = 5;
  const numberOfColumns = 6;

  // Ensure questions array is not undefined
  if (!questions || !Array.isArray(questions)) {
    return null; // or handle this case appropriately
  }

  const renderGrid = () => {
    const grid = Array.from({ length: numberOfRows }, (_, row) =>
      Array.from({ length: numberOfColumns }, (_, col) => row * numberOfColumns + col)
    );

    return grid.map((row, rowIndex) => (
      <div key={rowIndex} className="grid-row">
        {row.map((index) => (
          // Check if the question at the given index exists
          questions[index] ? (
            <button
              key={questions[index].id}
              onClick={() => handleQuestionSelection(index)}
              className={`question-button ${index === currentQuestionIndex ? 'active' : ''}`}
            >
              {index + 1}
            </button>
          ) : null
        ))}
      </div>
    ));
  };

  return (
    <div className="sidebar">
      <div className="grid-container">{renderGrid()}</div>
    </div>
  );
};

export default Sidebar;






