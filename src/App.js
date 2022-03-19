import React, { useState, useEffect } from "react";
import "./App.css"
import axios from 'axios';

const App = (props) => {
  const [quesAr, setQuesAr] = useState([]);
  const [result, setResult] = useState(false);
  const [score, setScore] = useState(0);
  const [watchAns, setWatchAns] = useState(false);

  useEffect(() => {
    callApi();
  },[])
  const callApi = async () => {

    await axios.get('https://opentdb.com/api.php?amount=10&category=11&difficulty=easy&type=multiple')
      .then(function (response) {
        // console.log(response.data.results);
        setQuesAr(response.data.results);
        // console.log(quesAr);
      })


  }
  let c = 0;
  const count = () => {
    c++;
    console.log(c);
  }
  const handleSubmit = () => {
    setResult(true);
    setScore(c);
    // console.log(result)
  }
  const viewAns = () => {
    setWatchAns(true);
  }
  return (
    <>
      <h1 className="q">Quiz app</h1>
      {quesAr.map(function (ques, i) {
        return (
          <div key={i} className="center pb-9">
            {/* <h1 className="bold center"> {i + 1} </h1> */}
            <h1 className="q">Q{i + 1} {quesAr[i].question}</h1>
            <div>
              <div className="grid grid-cols-2 gap-2 pl-20 pr-20">
                <span>
                  A. <input type="checkbox" onClick={count} className="a checkbox checkbox-primary mr-2" />
                  {quesAr[i].correct_answer}
                </span>
                <span>
                 B. <input type="checkbox" className="a checkbox checkbox-primary mr-2 " />
                  {quesAr[i].incorrect_answers[0]}
                </span>
                {/* <br /> */}
                <span>
                 C. <input type="checkbox" className="a checkbox checkbox-primary mr-2" />
                  {quesAr[i].incorrect_answers[1]}
                </span>
                <span>
                 D. <input type="checkbox" className="a checkbox checkbox-primary mr-2" />
                  {quesAr[i].incorrect_answers[2]}
                </span>
              </div>
         
            </div>
          </div>
        )
      })}
      <button onClick={handleSubmit} className="5">Submit</button>
      {result ?
        <div className="results block ml-auto mr-auto card w-96 bg-base-100 shadow-xl">
         
          <div className="card-body items-center text-center">
            <h2 className="card-title">Your Score = {score}!</h2>
            <p>Successfully submitted</p>
            <div className="card-actions">
              <button onClick={viewAns} className="btn btn-primary">Check Answers</button>
            </div>
          </div>
        </div> : null
      }
      {
        watchAns ?
          <div>
            {quesAr.map(function (ques, i) {
              return (
                <div key={i} className="center pb-9">
                  <div>
                  
                    <div className="grid grid-cols-4 gap-2 pl-20 pr-20">
                      <span>Ans{i + 1} {quesAr[i].correct_answer}</span><br />
                    </div>
                  </div>
                </div>
              )
            })}
          </div> : null
      }
    </>
  );
};

export default App;