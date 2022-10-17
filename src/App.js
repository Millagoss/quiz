import React from 'react';
import { useGlobalContext } from './context';

import SetupForm from './SetupForm';
import Loading from './Loading';
import Modal from './Modal';
function App() {
  const {
    handleNextQuestion,
    waiting,
    isLoading,
    questions,
    index,
    correctAnswers,
    handleGivenAnswer,
  } = useGlobalContext();

  if (waiting) {
    return <SetupForm />;
  }
  if (isLoading) {
    return <Loading />;
  }
  // console.log(questions);
  const { question, incorrect_answers, correct_answer } = questions[index];
  // const answers = [...incorrect_answers, correct_answer];
  // console.log(answers);
  const answers = [...incorrect_answers];
  const randNum = Math.floor(Math.random() * 4);

  if (randNum === 3) {
    answers.push(correct_answer);
  } else {
    answers.push(answers[randNum]);
    answers[randNum] = correct_answer;
  }

  return (
    <main>
      <Modal />

      <section className='quiz'>
        <p className='correct-answers'>
          correct answers : {correctAnswers}/{index}
        </p>
        <article className='container'>
          <h2 dangerouslySetInnerHTML={{ __html: question }} />
          <div className='btn-container'>
            {answers.map((answer, index) => {
              return (
                <button
                  onClick={() => handleGivenAnswer(correct_answer === answer)}
                  key={index}
                  className='answer-btn'
                  dangerouslySetInnerHTML={{ __html: answer }}
                />
              );
            })}
          </div>
        </article>
        <button className='next-question' onClick={handleNextQuestion}>
          next question
        </button>
      </section>
    </main>
  );
}

export default App;
