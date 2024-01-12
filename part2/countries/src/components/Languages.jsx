const Languages = ({ languages }) => {
  return languages.map((language) => {
    return <li key={languages.indexOf(language)}>{language}</li>;
  });
};

export default Languages;
