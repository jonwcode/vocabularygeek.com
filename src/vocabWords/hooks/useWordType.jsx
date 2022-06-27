import React from "react";

const useWordType = (type) => {
  let wordType;

  switch (type) {
    case "1":
      wordType = "Noun";
      break;
    case "2":
      wordType = "Verb";
      break;
    case "3":
      wordType = "Adjective";
      break;
    case "4":
      wordType = "Adverb";
      break;
    default:
    case "5":
      wordType = "Pronoun";
      break;
    case "6":
      wordType = "Preposition";
      break;
    case "7":
      wordType = "Conjunction";
      break;
    case "8":
      wordType = "Interjection";
      break;
    case "9":
      wordType = "Article";
      break;
    case "10":
      wordType = "Determiner";
      break;
  }

  return wordType;
};

export default useWordType;
