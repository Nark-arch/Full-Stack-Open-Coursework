import { useState } from "react";

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>;
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => {
    const newGood = good + 1;
    setGood(newGood);
  };

  const handleNeutralClick = () => {
    const newNeutral = neutral + 1;
    setNeutral(newNeutral);
  };

  const handleBadClick = () => {
    const newBad = bad + 1;
    setBad(newBad);
  };

  const all = good + neutral + bad

  const average = (good * 1 + neutral * 0 + bad *-1) / all

  const positivePercentage = (good / all) *100

  return (
    <div>
      <h1>Give Feedback</h1>
      <li>
        <Button text="good" handleClick={handleGoodClick} />
        <Button text="neutral" handleClick={handleNeutralClick} />
        <Button text="bad" handleClick={handleBadClick} />
      </li>
      <h1>Statistics</h1>
      good {good} <br />
      neutral {neutral} <br />
      bad {bad} <br />
      all {all} <br />
      average {average} <br />
      positive {positivePercentage}% <br />
    </div>
  );
};

export default App;
