//declare an interface, TotalProps, that expects prop named 'courseParts' 
//that is an array of objects
interface TotalProps {
  courseParts: {
    name: string;
    exerciseCount: number;
  }[];
}

//create Total component that expects to receive props of type TotalProps
//and sums the number of exercises
const Total = (props: TotalProps) => {
  return (
    <p>
      Number of exercises {props.courseParts.reduce(
        (sum, part) => sum + part.exerciseCount, 0)}
    </p>
  )
};

export default Total;