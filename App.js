import './App.css';
import React,{useState} from 'react';
function App() {
  const numberArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  function handelNumber(num) {
      for (let i = num.length-1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [num[i], num[j]] = [num[j], num[i]];
      }
      return num;
    }
   
const [puzzleNumbers, setPuzzleNumbers] = useState(handelNumber(numberArray));

const onDragStart = (event, ind) => {
event.dataTransfer.setData("index", ind);
};

const onDrop = (event, targetIndex) => {
const dragIndex = event.dataTransfer.getData("index");
const numbers = [...puzzleNumbers]
const temp = numbers[dragIndex];
numbers[dragIndex] = numbers[targetIndex];
numbers[targetIndex] = temp;
setPuzzleNumbers(numbers);
};
  return (
    <div className="App">
      <div className="board">
      {puzzleNumbers.map((number, index) => (
        <div
        draggable={true}
          key={index}
          onDragStart={event => onDragStart(event, index)}
          onDrop={event => onDrop(event, index)}
          onDragOver={event => event.preventDefault()}
          className="number"
        >
          {number}
        </div>
      ))}

    </div>
    </div>
  );
}

export default App;
