
// server.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('./models/User');

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());


// MongoDB connection setup
const { MONGO_URI } = process.env;

mongoose.connect('mongodb+srv://neerajkumarm345:neeraj@cluster0.2w1ea84.mongodb.net/quizApp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const connection = mongoose.connection;

connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

// Mock pool of 50 questions with unique texts and options
const questionPool = [
    {
        id: 1,
        text: "What is the purpose of the keyword 'const' in C++?",
        options: [
          { id: 'A', text: 'To declare a constant variable' },
          { id: 'B', text: 'To define a constant function' },
          { id: 'C', text: 'To indicate a constant reference parameter' },
          { id: 'D', text: 'All of the above' },
        ],
      },
      {
        id: 2,
        text: 'In React, what is the role of JSX?',
        options: [
          { id: 'A', text: 'JavaScript XML used to describe components' },
          { id: 'B', text: 'JavaScript extension for XML syntax' },
          { id: 'C', text: 'JavaScript execution environment for XML' },
          { id: 'D', text: 'JavaScript external syntax' },
        ],
      },
      {
        id: 3,
        text: 'Which HTML tag is used to create a hyperlink?',
        options: [
          { id: 'A', text: '<link>' },
          { id: 'B', text: '<a>' },
          { id: 'C', text: '<hyperlink>' },
          { id: 'D', text: '<url>' },
        ],
      },
      {
        id: 4,
        text: 'What is a constructor in C++?',
        options: [
          { id: 'A', text: 'A member function of a class with the same name as the class' },
          { id: 'B', text: 'A special function used to allocate memory' },
          { id: 'C', text: 'A function that is automatically called when an object is created' },
          { id: 'D', text: 'A function used to destroy objects' },
        ],
      },
      {
        id: 5,
        text: 'What is the purpose of the "useState" hook in React?',
        options: [
          { id: 'A', text: 'To define a state variable in a functional component' },
          { id: 'B', text: 'To update the state in a class component' },
          { id: 'C', text: 'To create a global state accessible from any component' },
          { id: 'D', text: 'To define a constant variable in a functional component' },
        ],
      },
      {
        id: 6,
        text: 'What does HTML stand for?',
        options: [
          { id: 'A', text: 'HyperText Markup Language' },
          { id: 'B', text: 'HighText Machine Language' },
          { id: 'C', text: 'HyperText and links Markup Language' },
          { id: 'D', text: 'Hyper Transfer Markup Language' },
        ],
      },
      {
        id: 7,
        text: 'What is the difference between "++i" and "i++" in C++?',
        options: [
          { id: 'A', text: 'Both increment the value of "i" by 1' },
          { id: 'B', text: '"++i" increments the value of "i" and returns the updated value' },
          { id: 'C', text: '"i++" increments the value of "i" and returns the original value' },
          { id: 'D', text: '"++i" and "i++" are equivalent' },
        ],
      },
      {
        id: 8,
        text: 'What is a React component lifecycle method that is called after a component renders?',
        options: [
          { id: 'A', text: 'componentDidMount' },
          { id: 'B', text: 'componentDidUpdate' },
          { id: 'C', text: 'componentWillUnmount' },
          { id: 'D', text: 'componentDidRender' },
        ],
      },
      {
        id: 9,
        text: 'Which HTML tag is used to define an unordered list?',
        options: [
          { id: 'A', text: '<list>' },
          { id: 'B', text: '<ul>' },
          { id: 'C', text: '<ol>' },
          { id: 'D', text: '<li>' },
        ],
      },
      {
        id: 10,
        text: 'What is polymorphism in C++?',
        options: [
          { id: 'A', text: 'The ability of a function to operate on different types of data' },
          { id: 'B', text: 'The ability of a class to inherit from multiple base classes' },
          { id: 'C', text: 'The ability of a function to have multiple implementations with the same name' },
          { id: 'D', text: 'The ability of a class to hide its implementation details' },
        ],
      },
      {
        id: 11,
        text: 'In React, what is the purpose of the "useEffect" hook?',
        options: [
          { id: 'A', text: 'To create a new component' },
          { id: 'B', text: 'To handle side effects in a functional component' },
          { id: 'C', text: 'To define a global state' },
          { id: 'D', text: 'To update the state in a class component' },
        ],
      },
      {
        id: 12,
        text: 'Which of the following is a correct way to comment in C++?',
        options: [
          { id: 'A', text: '// This is a comment' },
          { id: 'B', text: '# This is a comment' },
          { id: 'C', text: '/ This is a comment /' },
          { id: 'D', text: '* This is a comment *' },
        ],
      },
      {
        id: 13,
        text: 'What is the purpose of the "dangerouslySetInnerHTML" attribute in React?',
        options: [
          { id: 'A', text: 'To handle dangerous HTML input' },
          { id: 'B', text: 'To set the inner HTML of a React element' },
          { id: 'C', text: 'To prevent XSS attacks' },
          { id: 'D', text: 'To apply inline styles' },
        ],
      },
      {
        id: 14,
        text: 'Which HTML tag is used to define a table?',
        options: [
          { id: 'A', text: '<table>' },
          { id: 'B', text: '<tab>' },
          { id: 'C', text: '<tbl>' },
          { id: 'D', text: '<tr>' },
        ],
      },
      {
        id: 15,
        text: 'What is the purpose of the "this" keyword in JavaScript?',
        options: [
          { id: 'A', text: 'To refer to the current function' },
          { id: 'B', text: 'To refer to the current object' },
          { id: 'C', text: 'To define a variable' },
          { id: 'D', text: 'To declare a constant' },
        ],
      },
      {
        id: 16,
        text: 'How can you include a JavaScript file in an HTML document?',
        options: [
          { id: 'A', text: '<script src="file.js"></script>' },
          { id: 'B', text: '<js include="file.js"></js>' },
          { id: 'C', text: '<javascript src="file.js"></javascript>' },
          { id: 'D', text: '<include script="file.js"></include>' },
        ],
      },
      {
        id: 17,
        text: 'What is the purpose of the "async" keyword in JavaScript?',
        options: [
          { id: 'A', text: 'To declare a function as asynchronous' },
          { id: 'B', text: 'To define a variable' },
          { id: 'C', text: 'To handle exceptions' },
          { id: 'D', text: 'To create an array' },
        ],
      },
      {
        id: 18,
        text: 'Which C++ keyword is used to break out of a loop?',
        options: [
          { id: 'A', text: 'break' },
          { id: 'B', text: 'exit' },
          { id: 'C', text: 'terminate' },
          { id: 'D', text: 'end' },
        ],
      },
      {
        id: 19,
        text: 'What is the purpose of the "key" prop in React?',
        options: [
          { id: 'A', text: 'To specify the background color' },
          { id: 'B', text: 'To uniquely identify a list item' },
          { id: 'C', text: 'To define a CSS class' },
          { id: 'D', text: 'To create a state variable' },
        ],
      },
      {
        id: 20,
        text: 'Which HTML tag is used to create a line break?',
        options: [
          { id: 'A', text: '<lb>' },
          { id: 'B', text: '<line>' },
          { id: 'C', text: '<break>' },
          { id: 'D', text: '<br>' },
        ],
      },

      {
        id: 21,
        text: 'What is the purpose of the "let" keyword in JavaScript?',
        options: [
          { id: 'A', text: 'To declare a variable with block scope' },
          { id: 'B', text: 'To define a constant' },
          { id: 'C', text: 'To create a function' },
          { id: 'D', text: 'To declare a global variable' },
        ],
      },
      {
        id: 22,
        text: 'Which C++ operator is used to allocate memory for a variable?',
        options: [
          { id: 'A', text: 'malloc' },
          { id: 'B', text: 'new' },
          { id: 'C', text: 'allocate' },
          { id: 'D', text: 'alloc' },
        ],
      },
      {
        id: 23,
        text: 'In React, what is the purpose of the "props" object?',
        options: [
          { id: 'A', text: 'To store local component state' },
          { id: 'B', text: 'To pass data from parent to child components' },
          { id: 'C', text: 'To handle events' },
          { id: 'D', text: 'To define component styles' },
        ],
      },
      {
        id: 24,
        text: 'What is the default behavior of the "submit" button in an HTML form?',
        options: [
          { id: 'A', text: 'Redirect to the homepage' },
          { id: 'B', text: 'Submit the form data to the server' },
          { id: 'C', text: 'Clear the form fields' },
          { id: 'D', text: 'Close the form' },
        ],
      },
      {
        id: 25,
        text: 'What is the purpose of the "finally" block in a try-catch-finally statement in JavaScript?',
        options: [
          { id: 'A', text: 'To execute code regardless of whether an exception is thrown or caught' },
          { id: 'B', text: 'To catch exceptions' },
          { id: 'C', text: 'To specify the condition for catching exceptions' },
          { id: 'D', text: 'To define the final state of a variable' },
        ],
      },
      {
        id: 26,
        text: 'Which HTML tag is used to create an ordered list?',
        options: [
          { id: 'A', text: '<ol>' },
          { id: 'B', text: '<ul>' },
          { id: 'C', text: '<li>' },
          { id: 'D', text: '<order>' },
        ],
      },
      {
        id: 27,
        text: 'What is the purpose of the "map" function in JavaScript?',
        options: [
          { id: 'A', text: 'To create a new array with the results of calling a provided function on every element' },
          { id: 'B', text: 'To define a mapping between keys and values' },
          { id: 'C', text: 'To loop through an array' },
          { id: 'D', text: 'To filter array elements' },
        ],
      },
      {
        id: 28,
        text: 'Which C++ keyword is used to declare a pure virtual function?',
        options: [
          { id: 'A', text: 'pure' },
          { id: 'B', text: 'abstract' },
          { id: 'C', text: 'virtual' },
          { id: 'D', text: 'pure virtual' },
        ],
      },
      {
        id: 29,
        text: 'In React, what is the purpose of the "useReducer" hook?',
        options: [
          { id: 'A', text: 'To manage state in functional components' },
          { id: 'B', text: 'To handle asynchronous actions' },
          { id: 'C', text: 'To create a reducer function' },
          { id: 'D', text: 'To update the state in class components' },
        ],
      },
      {
        id: 30,
        text: 'Which CSS property is used to control the spacing between lines of text?',
        options: [
          { id: 'A', text: 'margin' },
          { id: 'B', text: 'padding' },
          { id: 'C', text: 'line-height' },
          { id: 'D', text: 'spacing' },
        ],
      },

      {
        id: 31,
        text: 'What is the purpose of the "slice" method in JavaScript?',
        options: [
          { id: 'A', text: 'To remove the last element from an array' },
          { id: 'B', text: 'To extract a portion of an array without modifying the original array' },
          { id: 'C', text: 'To add elements to the beginning of an array' },
          { id: 'D', text: 'To concatenate two arrays' },
        ],
      },
      {
        id: 32,
        text: 'In C++, what is the purpose of the "inline" keyword?',
        options: [
          { id: 'A', text: 'To specify the input/output stream' },
          { id: 'B', text: 'To declare a function that should be expanded in line' },
          { id: 'C', text: 'To define a variable with constant value' },
          { id: 'D', text: 'To create an inline comment' },
        ],
      },
      {
        id: 33,
        text: 'What is the purpose of the "useState" hook in React?',
        options: [
          { id: 'A', text: 'To manage state in functional components' },
          { id: 'B', text: 'To handle asynchronous actions' },
          { id: 'C', text: 'To create a reducer function' },
          { id: 'D', text: 'To update the state in class components' },
        ],
      },
      {
        id: 34,
        text: 'Which HTML tag is used to create a hyperlink?',
        options: [
          { id: 'A', text: '<link>' },
          { id: 'B', text: '<a>' },
          { id: 'C', text: '<hyperlink>' },
          { id: 'D', text: '<url>' },
        ],
      },
      {
        id: 35,
        text: 'What is the purpose of the "this" keyword in JavaScript?',
        options: [
          { id: 'A', text: 'To refer to the current function' },
          { id: 'B', text: 'To refer to the current object' },
          { id: 'C', text: 'To define a variable' },
          { id: 'D', text: 'To declare a constant' },
        ],
      },
      {
        id: 36,
        text: 'Which CSS property is used to control the size of an element relative to its normal size?',
        options: [
          { id: 'A', text: 'width' },
          { id: 'B', text: 'height' },
          { id: 'C', text: 'transform' },
          { id: 'D', text: 'scale' },
        ],
      },
      {
        id: 37,
        text: 'What is the purpose of the "useEffect" hook in React?',
        options: [
          { id: 'A', text: 'To create a new component' },
          { id: 'B', text: 'To handle side effects in a functional component' },
          { id: 'C', text: 'To define a global state' },
          { id: 'D', text: 'To update the state in a class component' },
        ],
      },
      {
        id: 38,
        text: 'In C++, what is the purpose of the "const" keyword?',
        options: [
          { id: 'A', text: 'To define a constant variable' },
          { id: 'B', text: 'To create a constant function' },
          { id: 'C', text: 'To indicate a constant reference parameter' },
          { id: 'D', text: 'All of the above' },
        ],
      },
      {
        id: 39,
        text: 'What is the default method of a class in C++?',
        options: [
          { id: 'A', text: 'init' },
          { id: 'B', text: 'main' },
          { id: 'C', text: 'start' },
          { id: 'D', text: 'constructor' },
        ],
      },
      {
        id: 40,
        text: 'Which CSS property is used to change the color of text?',
        options: [
          { id: 'A', text: 'text-color' },
          { id: 'B', text: 'font-color' },
          { id: 'C', text: 'color' },
          { id: 'D', text: 'background-color' },
        ],
      },

      {
        id: 41,
        text: 'What is the purpose of the "async" keyword in JavaScript?',
        options: [
          { id: 'A', text: 'To declare a function as asynchronous' },
          { id: 'B', text: 'To define a variable' },
          { id: 'C', text: 'To handle exceptions' },
          { id: 'D', text: 'To create an array' },
        ],
      },
      {
        id: 42,
        text: 'In React, what is the purpose of the "key" prop?',
        options: [
          { id: 'A', text: 'To specify the background color' },
          { id: 'B', text: 'To uniquely identify a list item' },
          { id: 'C', text: 'To define a CSS class' },
          { id: 'D', text: 'To create a state variable' },
        ],
      },
      {
        id: 43,
        text: 'Which HTML tag is used to create a line break?',
        options: [
          { id: 'A', text: '<lb>' },
          { id: 'B', text: '<line>' },
          { id: 'C', text: '<break>' },
          { id: 'D', text: '<br>' },
        ],
      },
      {
        id: 44,
        text: 'In C++, what is the purpose of the "static" keyword?',
        options: [
          { id: 'A', text: 'To declare a variable with global scope' },
          { id: 'B', text: 'To define a constant' },
          { id: 'C', text: 'To specify the input/output stream' },
          { id: 'D', text: 'To declare a function that should be expanded in line' },
        ],
      },
      {
        id: 45,
        text: 'What is the purpose of the "useReducer" hook in React?',
        options: [
          { id: 'A', text: 'To manage state in functional components' },
          { id: 'B', text: 'To handle asynchronous actions' },
          { id: 'C', text: 'To create a reducer function' },
          { id: 'D', text: 'To update the state in class components' },
        ],
      },
      {
        id: 46,
        text: 'Which HTML tag is used to create a table row?',
        options: [
          { id: 'A', text: '<row>' },
          { id: 'B', text: '<tr>' },
          { id: 'C', text: '<table-row>' },
          { id: 'D', text: '<td>' },
        ],
      },
      {
        id: 47,
        text: 'What is the purpose of the "const" keyword in JavaScript?',
        options: [
          { id: 'A', text: 'To declare a constant variable' },
          { id: 'B', text: 'To create a constant function' },
          { id: 'C', text: 'To indicate a constant reference parameter' },
          { id: 'D', text: 'All of the above' },
        ],
      },
      {
        id: 48,
        text: 'In C++, what is the purpose of the "break" statement?',
        options: [
          { id: 'A', text: 'To terminate the program' },
          { id: 'B', text: 'To break out of a loop or switch statement' },
          { id: 'C', text: 'To skip the current iteration of a loop' },
          { id: 'D', text: 'To create a line break in the output' },
        ],
      },
      {
        id: 49,
        text: 'What does JSX stand for in the context of React?',
        options: [
          { id: 'A', text: 'JavaScript XML' },
          { id: 'B', text: 'Java Syntax Extension' },
          { id: 'C', text: 'JSON XML' },
          { id: 'D', text: 'JavaScript Syntax Extension' },
        ],
      },
      {
        id: 50,
        text: 'Which CSS property is used to change the font size of text?',
        options: [
          { id: 'A', text: 'font-size' },
          { id: 'B', text: 'text-size' },
          { id: 'C', text: 'font-style' },
          { id: 'D', text: 'text-font' },
        ],
      },
  // ... (Include the other 7 questions here)
];

// Endpoint to get 30 random questions
app.get('/questions', (req, res) => {
  // Shuffle the question pool
  const shuffledQuestions = questionPool.sort(() => Math.random() - 0.5);

  // Select the first 30 questions
  const selectedQuestions = shuffledQuestions.slice(0, 30);

  res.json(selectedQuestions);
});



app.post('/register', async (req, res) => {
    try {
      const { username, email, password } = req.body;
  
      // Check if the username or email already exists
      const existingUser = await User.findOne({ $or: [{ username }, { email }] });
      if (existingUser) {
        return res.status(400).json({ message: 'Username or email already exists' });
    
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user document with the hashed password
      const newUser = new User({ username, email, password: hashedPassword });
  
      // Save the user to the database
      await newUser.save();
  
      res.status(201).json({ message: 'Registration successful' });
    } catch (error) {
      console.error('Error during registration:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  // Endpoint to handle user login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      // Check if the user exists
      const existingUser = await User.findOne({ username });
  
      if (!existingUser) {
        return res.status(400).json({ message: 'User not found. Please register first.' });
      }
  
      // Check if the password is correct
      const isPasswordValid = existingUser.comparePassword(password);
  
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid password' });
      }
  
      // Login successful
      res.status(200).json({ message: 'Login successful' });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
