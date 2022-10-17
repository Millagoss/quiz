import axios from 'axios';
import React, { useState, useContext } from 'react';

const table = {
  sports: 21,
  history: 23,
  politics: 24,
};

const API_ENDPOINT = 'https://opentdb.com/api.php?';

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [waiting, setWaiting] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [error, setError] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [quiz, setQuiz] = useState({
    amount: 10,
    category: 'sports',
    difficulty: 'easy',
  });

  const fetchQuestions = async (url) => {
    setIsLoading(true);
    setWaiting(false);
    const response = await axios(url).catch((error) => console.log(error));

    if (response) {
      const data = response.data.results;
      if (data.length > 0) {
        setQuestions(data);
        setIsLoading(false);
        setWaiting(false);
        setError(false);
      } else {
        setWaiting(true);
        setError(true);
      }
    } else {
      setWaiting(true);
    }
  };

  const handleNextQuestion = () => {
    setIndex((index) => {
      if (index >= questions.length - 1) {
        openModal();
        return 0;
      } else {
        return index + 1;
      }
    });
  };

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setWaiting(true);
    setCorrectAnswers(0);
  };

  const handleGivenAnswer = (param) => {
    if (param) {
      setCorrectAnswers((oldCorrectAnswers) => oldCorrectAnswers + 1);
    }
    handleNextQuestion();
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setQuiz({ ...quiz, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { amount, category, difficulty } = quiz;
    const url = `${API_ENDPOINT}amount=${amount}&category=${table[category]}&difficulty=${difficulty}&type=multiple`;
    fetchQuestions(url);
  };

  const value = {
    waiting,
    isLoading,
    questions,
    index,
    correctAnswers,
    error,
    isModalOpen,
    handleNextQuestion,
    handleGivenAnswer,
    closeModal,
    handleChange,
    handleSubmit,
    quiz,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
