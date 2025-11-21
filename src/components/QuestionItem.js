import React from "react";

function QuestionItem({ question, onDeleteQuestion, onUpdateQuestion }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  // Handle delete button click
  function handleDeleteClick() {
    // DELETE request to remove the question from the server
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        // Update the parent component's state to remove the question from the list
        onDeleteQuestion(id);
      });
  }

  // Handle dropdown change for updating the correct answer
  function handleAnswerChange(event) {
    // PATCH request to update the question's correctIndex on the server
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        correctIndex: parseInt(event.target.value), // Convert to integer
      }),
    })
      .then((res) => res.json())
      .then((updatedQuestion) => {
        // Update the parent component's state with the updated question
        onUpdateQuestion(updatedQuestion);
      });
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={handleAnswerChange}>
          {options}
        </select>
      </label>
      <button onClick={handleDeleteClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
