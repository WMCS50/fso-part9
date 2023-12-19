import {CoursePart} from '../types';

//declare an interface, PartProps, that expects prop named 'coursePart'
//that has union type CourePart
interface PartProps {
  coursePart: CoursePart
}

//helper function for type-checking
const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`)
};

//create Part component that expects to receive props of type PartProps
//and includes switch case-based type checking
const Part = (props: PartProps) => {
  const { coursePart } = props;
  switch (coursePart.kind) {
    case 'basic':
      return (
        <div>
          <h3>{coursePart.name} {coursePart.exerciseCount}</h3>
          <p><i>{coursePart.description}</i></p>
        </div>
      );
    case 'group':
      return (
        <div>
          <h3>{coursePart.name} {coursePart.exerciseCount}</h3>
          <p>project exercises {coursePart.groupProjectCount}</p>
        </div>
      );
    case 'background':
    return (
      <div>
        <h3>{coursePart.name} {coursePart.exerciseCount}</h3>
        <p><i>{coursePart.description}</i></p>
        <p>submit to {coursePart.backgroundMaterial}</p>
      </div>
    );
    case 'special':
      return (
        <div>
          <h3>{coursePart.name} {coursePart.exerciseCount}</h3>
          <p><i>{coursePart.description}</i></p>
          <p>required skills {coursePart.requirements.join(', ')}</p>
      </div>
      );
    default:
      return assertNever(coursePart);
  }
}

export default Part;