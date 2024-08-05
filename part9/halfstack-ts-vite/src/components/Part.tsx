import { CoursePart } from '../utils/types';
import { assertNever } from '../utils/utils';

const Part = ({ coursePart }: { coursePart: CoursePart }) => {
  switch (coursePart.kind) {
    case 'basic':
      return (
        <p>
          <b>
            {coursePart.name} {coursePart.exerciseCount}
          </b>
          <br />
          <i>{coursePart.description}</i>
        </p>
      );
    case 'group':
      return (
        <p>
          <b>
            {coursePart.name} {coursePart.exerciseCount}
          </b>
          <br /> project exercises {coursePart.groupProjectCount}
        </p>
      );
    case 'background':
      return (
        <p>
          <b>
            {coursePart.name} {coursePart.exerciseCount}
          </b>
          <br />
          <i>{coursePart.description}</i>
          <br />
          submit to {coursePart.backgroundMaterial}
        </p>
      );
    case 'special':
      return (
        <p>
          <b>
            {coursePart.name} {coursePart.exerciseCount}
          </b>
          <br />
          <i>{coursePart.description}</i>
          <br />
          {coursePart.requirements}
        </p>
      );
    default:
      assertNever(coursePart);
  }
};

export default Part;
