import React, { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  // State to track which page to display (List or Form)
  const [page, setPage] = useState("List");

  // State to store all questions fetched from the API
  const [allQuestions, setAllQuestions] = useState([]);

  // useEffect hook to fetch questions when the component mounts
  useEffect(() => {
    // GET request to fetch all questions from the API
    fetch("http://localhost:4000/questions")
      .then((res) => res.json())
      .then((data) => {
        // Update state with the fetched questions
        setAllQuestions(data);
      });
  }, []); // Empty dependency array means this runs once on mount

  // Function to add a new question to state
  // This will be passed to QuestionForm to update the list when a new question is created
  function handleAddQuestion(newQuestion) {
    setAllQuestions([...allQuestions, newQuestion]);
  }

  // Function to delete a question from state
  // This will be passed down to QuestionItem to remove a question when deleted
  function handleDeleteQuestion(deletedQuestionId) {
    // Filter out the deleted question from the state
    setAllQuestions(
      allQuestions.filter((question) => question.id !== deletedQuestionId)
    );
  }

  // Function to update a question in state
  // This will be passed down to QuestionItem to update a question when the correct answer is changed
  function handleUpdateQuestion(updatedQuestion) {
    // Map through questions and replace the updated one
    setAllQuestions(
      allQuestions.map((question) =>
        question.id === updatedQuestion.id ? updatedQuestion : question
      )
    );
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm onAddQuestion={handleAddQuestion} />
      ) : (
        <QuestionList
          allQuestions={allQuestions}
          onDeleteQuestion={handleDeleteQuestion}
          onUpdateQuestion={handleUpdateQuestion}
        />
      )}
    </main>
  );
}

export default App;
