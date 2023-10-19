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
      bad {bad}
      {console.log(good, neutral, bad)}
    </div>
  );
};

export default App;
