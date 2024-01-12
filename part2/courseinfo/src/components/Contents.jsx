import Part from "./Part";

const Content = ({ parts }) => {
  const sum = parts.reduce((tempSum, part) => tempSum + part.exercises, 0);
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
      <h3>total of {sum} exercises</h3>
    </div>
  );
};

export default Content;
