import { useEffect, useState } from 'react'
import './index.css'

function App () {
  const [numOfVals, updateNumOfVals] = useState<number>(9);
  const [tttArr, updateTttArr] = useState<number[]>([]);
  const [playerOneTurn, updatePlayerOneTurn] = useState<boolean>(true);
  const [playerTwoTurn, updatePlayerTwoTurn] = useState<boolean>(false);
  const [playerOneWins, updatePlayerOneWins] = useState<boolean>(false);
  const [playerTwoWins, updatePlayerTwoWins] = useState<boolean>(false);
  const [draw, updateDraw] = useState<boolean>(false);
  const [gameOver, updateGameOver] = useState<boolean>(false);
  const [gameStarted, updateGameStarted] = useState<boolean>(false);

  const handleClick = (number: number): void => {
    const element = document.querySelector(`div[data-number="${number}"]`) as HTMLDivElement;
    // Check if the element exists and has the text content "H"
    console.log(element)
    if (element && !element.textContent) {
      element.textContent = "O";
    }
    // Check if the element exists and has the text content "O"
    else if (element && element.textContent === "O") {
      element.textContent = "X";
    }
  }
  


  {/* Responsible for the array */}
  useEffect(()=> {
    let newArr: number[] = [];
    for (let i = 1; i <= numOfVals; i++) {
      newArr.push(i);
    }
    updateTttArr(newArr);
  }, [numOfVals]);
  

  // const [count, setCount] = useState(0);
  return (
    <>
      <div className="flex flex-row justify-center">
        <div className="grid h-[700px] w-[700px] text-7xl bg-sky-500/100 text-white p-4 grid-cols-3 grid-rows-3 border-black border-[5px]">
          {tttArr.map((number) => (
            <div key={number} data-number={number} className="h-[220px] w-[220px] text-center border-[5px] border-black m-auto" onClick={() => handleClick(number)}></div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App
