import React from 'react';
import { useGlobalContext } from './context';

const Modal = () => {
  const { correctAnswers, questions, isModalOpen, closeModal } =
    useGlobalContext();
  return (
    <section
      className={`${
        isModalOpen ? 'modal-container isOpen' : 'modal-container'
      }`}
    >
      <div className='modal-content'>
        <h2>congrats!</h2>
        <p>
          {' '}
          you answered {((correctAnswers / questions.length) * 100).toFixed(0)}%
          of the questions correctly {questions.length}
          <button className='close-btn' onClick={closeModal}>
            play again
          </button>
        </p>
      </div>
    </section>
  );
};

export default Modal;
