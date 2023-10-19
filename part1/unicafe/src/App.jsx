import { useState } from "react";

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>;
};

const StatisticsLine = (props) => {
  return (
      <tr>
        <td>{props.text}</td>
        <td>{props.value}</td>
      </tr>
  );
};

const Statistics = (props) => {
  //statistical calculations
  const all = props.good + props.neutral + props.bad;

  const average = (props.good * 1 + props.neutral * 0 + props.bad * -1) / all;

  const positivePercentage = (props.good / all) * 100;

  //if null input display
  if (all === 0) {
    return <p>No Feedback Given</p>;
  }

  //non null display
  return (
    <table>
      <tbody>
      <StatisticsLine text="good" value={props.good} />
      <StatisticsLine text="neutral" value={props.neutral} />
      <StatisticsLine text="bad" value={props.bad} />
      <StatisticsLine text="all" value={all} />
      <StatisticsLine text="average" value={average} />
      <StatisticsLine text="percentage" value={positivePercentage} />
      </tbody>
    </table>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  // click handlers for all three buttons
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
    <>
      <h1>Give Feedback</h1>
      <li>
        <Button text="good" handleClick={handleGoodClick} />
        <Button text="neutral" handleClick={handleNeutralClick} />
        <Button text="bad" handleClick={handleBadClick} />
      </li>
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  );
};

export default App;
