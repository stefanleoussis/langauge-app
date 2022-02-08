import "./App.css";
import React, { useEffect, useState } from "react";
function App() {
  const data = ["and", "the", "a", "with"];

  const phrases = [
    "Nice to meet you.",
    "Where are you from?",
    "What do you do?",
  ];

  const [phrase, setPhrase] = useState("");
  const [ansKeyWord, setAnsKeyword] = useState("");
  const [options, setOptions] = useState([]);
  function generateValues() {
    // Generate Phrase
    let generateNum = Math.floor(Math.random() * (3 - 1 + 1));
    let questionPhraseSplit = phrases[generateNum].split(" ");

    // Generate Ans Word
    generateNum = Math.floor(
      Math.random() * (questionPhraseSplit.length - 1 + 1)
    );
    let ansWord = questionPhraseSplit[generateNum];
    setAnsKeyword(ansWord);
    // Create Displayed Phrase
    questionPhraseSplit[generateNum] = "_____";
    setPhrase(questionPhraseSplit.join(" ").toString());

    // Options
    let randomOptions = data;
    randomOptions.sort(() => Math.random() - 0.5);
    randomOptions[Math.floor(Math.random() * (data.length - 1 + 1))] = ansWord;
    setOptions(randomOptions);
  }
  useEffect(() => {
    generateValues();
  }, []);
  function Gamify(option) {
    if (option === ansKeyWord) {
      console.log("correct");
    } else {
      console.log("wrong");
    }
    generateValues();
  }
  // const query = () => {
  //   client
  //     .query({
  //       query: gql`
  //         query GetBooks {
  //           books {
  //             title
  //             author
  //           }
  //         }
  //       `,
  //     })
  //     .then((result) => console.log(result));
  // };

  return (
    <div className="App">
      <div className="phrase">
        <p>{phrase}</p>
      </div>
      <div className="Buttons">
        <button
          onClick={() => {
            Gamify(options[0]);
          }}
        >
          {options[0]}
        </button>
        <button
          onClick={() => {
            Gamify(options[1]);
          }}
        >
          {options[1]}
        </button>
        <button
          onClick={() => {
            Gamify(options[2]);
          }}
        >
          {options[2]}
        </button>
        <button
          onClick={() => {
            Gamify(options[3]);
          }}
        >
          {options[3]}
        </button>
      </div>
    </div>
  );
}

export default App;
