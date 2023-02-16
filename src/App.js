import './App.css';
import React, { useState, useEffect } from 'react';
function App() {
  const [isSolved, setIsSolved] = useState(false);

  const [inputNumber, setinputNumber] = useState(null)

  const numberArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  function handelNumber(num) {
    for (let i = num.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [num[i], num[j]] = [num[j], num[i]];
    }
    return num;
  }



  const handelChnage = (event) => {
    setinputNumber(parseInt(event.target.value))
  }

  const [puzzleNumbers, setPuzzleNumbers] = useState(handelNumber(numberArray));
  const [sortedNumbers, setSortedNumber] = useState([1,2,3,4,5,6,7,8,9])
  useEffect(() => {
    if (JSON.stringify(puzzleNumbers) === JSON.stringify(sortedNumbers) ){
      setIsSolved(true)
    }
  }, [puzzleNumbers, sortedNumbers]);

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
      <input type="number" value={inputNumber} placeholder='Enter Number' onChange={(event) => handelChnage(event)} />
      {inputNumber === 3 ? <div className="board">
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

      </div> : null}
    { isSolved && <div className='massage'>
        <h1>!! Puzzle solved !!</h1>
      </div>} 
    </div>
  );
}

export default App;
