import React, {useEffect, useState} from "react";

import QuestionItem from "./QuestionItem";

function QuestionList() {
  //setting question states
  const [questions, setQuestions] = useState([]);
  useEffect(()=> {
    //handling side effects and fetching the questions
    fetch("http://localhost:4000/questions")
    .then((response)=>response.json())
    .then((questions)=> setQuestions(questions))
  },[])

  //handling delete actions
  function handleDelete(id){
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",})
      .then((res)=> res.json())
      .then(() => {
        //updating questions 
        const updatedQuestions = questions.filter((question) => question.id !== id);
        setQuestions(updatedQuestions);
      });
    }
    //handling update actions
  function handleUpdate(id, correctIndex){
    fetch (`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({correctIndex}),
    })
    .then((response)=> response.json())
    .then((updatedQuestion)=>{
      const updatedQuestions = questions.map((question)=> {
        if (question.id === updatedQuestion.id) return updatedQuestion
        return question
      });
      setQuestions(updatedQuestions);
      });
    }

    //displaying questions in the DOM
  const questionsDisplay = questions.map((question) => (
    <QuestionItem
      key={question.id}
      question={question}
      onDelete={handleDelete}
      onChange={handleUpdate}
    />
  ));
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionsDisplay}</ul>
    </section>
  );
}

export default QuestionList;