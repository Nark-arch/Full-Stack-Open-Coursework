import express from 'express';
import qs from 'qs';
import { bmiQuery, parseToBmiQuery, parseNumArguments } from './utils';
import calculateBmi from './calculateBmi';

const app = express();

app.set('query parser', (str: string) => qs.parse(str));

app.get('/hello', (req, res) => {
  console.log(req.query);
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  try {
    const bmiQuery: bmiQuery = parseToBmiQuery(req.query);
    const [height, weight]: number[] = parseNumArguments(
      [bmiQuery.height, bmiQuery.weight],
      2
    );
    res.json({ weight, height, bmi: calculateBmi(height, weight) });
  } catch (error) {
    if (error instanceof Error)
      res
        .status(400)
        .json({ error: `Invalid query parameters: ${error.message}` });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
