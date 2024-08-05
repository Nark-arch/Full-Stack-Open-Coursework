import { CoursePart } from '../utils/types';
import Part from './Part';

const Content = ({ courseParts }: { courseParts: CoursePart[] }) =>
  courseParts.map((coursePart) => <Part coursePart={coursePart} />);

export default Content;
