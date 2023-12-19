import {CoursePart} from '../types';
import Part from './Part';

//declare an interface, ContentProps, that expects prop named 'courseParts'
//that is an array of objects
interface ContentProps {
  courseParts: CoursePart[];
}

//create Content component that expects to receive props of type ContentProps
//and renders all attributes of the course parts
const Content = (props: ContentProps) => {
  return (
    <>
      {props.courseParts.map((part) => (
        <Part key={part.name} coursePart={part} />
        ))}
    </>
  )
};

export default Content;