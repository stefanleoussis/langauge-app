import "./App.css";
import React, { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";

const GET_PHRASE = gql`
  query GetPhrase {
    phrase
  }
`;
function App() {
  const phrases = [
    "Nice to meet you.",
    "Where are you from?",
    "What do you do?",
  ];
  const wordData = ["and", "the", "a", "with"];
  const [phrase, setPhrase] = useState("");
  const [ansKeyWord, setAnsKeyword] = useState("");
  const [options, setOptions] = useState([]);
  const [outcome, setOutcome] = useState("");
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
    let randomOptions = wordData;
    randomOptions.sort(() => Math.random() - 0.5);
    randomOptions[Math.floor(Math.random() * (wordData.length - 1 + 1))] =
      ansWord;
    setOptions(randomOptions);
  }
  useEffect(() => {
    generateValues();
  }, []);
  function Gamify(option) {
    if (option === ansKeyWord) {
      console.log("correct");
      setOutcome("Correct");
    } else {
      console.log("wrong");
      setOutcome("Wrong");
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
  const { loading, error, data } = useQuery(GET_PHRASE);
  if (loading) return "loading...";
  if (error) return `Error! ${error.message}`;
  console.log(data, "PHRASE Data");

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
      <div>
        <p>{outcome}</p>
      </div>
    </div>
  );
}

export default App;
