import { useEffect, useState } from 'react'
import './index.css'

function App () {
  const [numOfVals, updateNumOfVals] = useState<number>(9);
  const [tttArr, updateTttArr] = useState<number[]>([]);
  const [playerOneTurn, updatePlayerOneTurn] = useState<boolean>(true);
  const [playerTwoTurn, updatePlayerTwoTurn] = useState<boolean>(false);
  const [draw, updateDraw] = useState<boolean>(false);
  const [gameOver, updateGameOver] = useState<boolean>(false);

  const checkForWin = (): boolean => {
    // Check for winning combinations
    const winningCombinations = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
      [1, 5, 9],
      [3, 5, 7]
    ];
    for (let i = 0; i < winningCombinations.length; i++) {
      const [a, b, c] = winningCombinations[i];
      const elementA = document.querySelector(`div[data-number="${a}"]`) as HTMLDivElement;
      const elementB = document.querySelector(`div[data-number="${b}"]`) as HTMLDivElement; 
      const elementC = document.querySelector(`div[data-number="${c}"]`) as HTMLDivElement;
      if (elementA && elementB && elementC) {
        if (elementA.textContent === elementB.textContent && elementB.textContent === elementC.textContent && elementA.textContent !== "") {
          if (elementA.textContent === "X") {
            updateGameOver(true);
            updateDraw(false);
            alert("Player 1 wins!");
            window.location.reload();
            return true;
          } else if (elementA.textContent === "O") {
            updateGameOver(true);
            updateDraw(false);
            alert("Player 2 wins!");
            window.location.reload();
            return true;
          }
        }
      }
    }
    // Check for draw
    const allElements = document.querySelectorAll('div[data-number]');
    let allFilled = true;
    allElements.forEach((element) => {
      if (element.textContent === "") {
        allFilled = false;
      }
    });
    if (allFilled) {
      updateDraw(true);
      updateGameOver(true);
      alert("It's a draw!");
      window.location.reload();
      return false;
    }
    // If no winner or draw, return false
    updateGameOver(false);
    updateDraw(false);

    return false;
  
  }

  const handleClick = (number: number): void => {
    const element = document.querySelector(`div[data-number="${number}"]`) as HTMLDivElement;
    // Check if the element exists and has the text content "H"
    console.log(element)
    if (element && !element.textContent) {
      if (playerOneTurn) {
        element.textContent = "X";
      }else {
        element.textContent = "O";
      }
      updatePlayerOneTurn(!playerOneTurn);
      updatePlayerTwoTurn(!playerTwoTurn);
      checkForWin();
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
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-6">
      
      <div className="flex flex-col items-center space-y-2">
        <h1 className="text-7xl text-sky-500 font-bold">Tic Tac Toe</h1>
      
      <span className="text-2xl text-sky-500 font-bold">Player 1: X</span>
      <span className="text-2xl text-sky-500 font-bold">Player 2: O</span>
      <span className="text-2xl text-sky-500 font-bold">Current Turn: {playerOneTurn ? "Player 1" : "Player 2"}</span>
      </div>
      <div className="flex flex-row justify-center">
        <div className="grid h-[700px] w-[700px] text-7xl bg-sky-500/100 text-white p-4 grid-cols-3 grid-rows-3 border-black border-[5px]">
          {tttArr.map((number) => (
            <div key={number} data-number={number} className="h-[220px] w-[220px] text-center border-[5px] border-black m-auto" onClick={() => handleClick(number)}></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App
