"use strict";
import quizData from "./quiz-data.js";

const createQuiz = quizData => {
  document.querySelector("button").classList.add("button");
  const form = document.querySelector("form");
  form.classList.add("form");

  const quizSections = quizData.questions.reduce((acc, quiz, index) => {
    const quizSection = document.createElement("section");
    quizSection.classList.add("form-sections");

    const quizTitle = document.createElement("h3");
    quizTitle.classList.add("form-sections__title");
    quizTitle.textContent = `${index + 1}. ${quiz.question}`;

    quizSection.append(quizTitle, createQuizElement(quiz.choices, index));
    acc += quizSection.outerHTML;
    return acc;
  }, "");

  form.insertAdjacentHTML("afterbegin", quizSections);

  const formTitle = document.createElement("h2");
  formTitle.textContent = quizData.title;
  formTitle.classList.add("form-title");
  form.prepend(formTitle);

  return checkQuiz(form, quizData.questions);
};

const createQuizElement = (choicesArr, number) => {
  const quizList = document.createElement("ol");

  const quizElement = choicesArr.reduce((acc, quiz, index) => {
    const quizElement = document.createElement("li");
    const quizLabel = document.createElement("label");
    const quizInput = document.createElement("input");
    quizInput.setAttribute("type", "radio");
    quizInput.setAttribute("name", `${number}`);
    quizInput.setAttribute("value", index);

    quizLabel.append(quizInput, document.createTextNode(quiz));
    quizElement.appendChild(quizLabel);

    acc += quizElement.outerHTML;
    return acc;
  }, "");

  quizList.insertAdjacentHTML("afterbegin", quizElement);
  return quizList;
};

const checkQuiz = (form, questions) => {
  const answer = document.createElement("h2");
  answer.classList.add("answer");

  document.querySelector("button").insertAdjacentElement("beforebegin", answer);

  form.addEventListener("submit", e => {
    e.preventDefault();
    let countCorrectAnswer = 0;
    const form = new FormData(e.currentTarget);
    form.forEach((key, value) => {
      if (questions[value].answer === Number(key)) {
        countCorrectAnswer += 1;
      }
    });
    (countCorrectAnswer * 100) / questions.length >= 80
      ? (answer.textContent = "Удача")
      : (answer.textContent = "Неудача");
  });
};

createQuiz(quizData);
