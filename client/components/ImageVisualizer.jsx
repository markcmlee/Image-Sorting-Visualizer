import React, { useEffect, useState } from 'react';
import {
  selectionSort,
  bubbleSort,
  insertionSort,
  quickSort,
  heapSort
} from '../scripts/sorts';

const ImageVisualizer = (props) => {
  const { rows, cols, link } = props;
  const [randoms, setRandoms] = useState([]);
  let canvas = null;
  let ctx = null;
  let image = null;
  // const [pieceWidth, setPieceWidth] = useState(null);
  // const [pieceHeight, setPieceHeight] = useState(null);
  let pieceWidth = null;
  let pieceHeight = null;
  const [started, setStarted] = useState(false);
  const [chosen, setChosen] = useState(null);
  let [startIndex, setStartIndex] = useState(0);
  const [startTimer, setStartTimer] = useState(null);
  const [endTimer, setEndTimer] = useState(null);
  const [animations, setAnimations] = useState([]);
  const [finished, setFinished] = useState(false);

  const insertion = () => {
    setChosen({ name: "Insertion Sort", complexity: "O(n^2)" });
    setAnimations([]);
    let postDataCopy = randoms.slice();
    setStartTimer(performance.now());
    insertionSort(postDataCopy, animations);
    setEndTimer(performance.now());
    processAnimation();
  };

  const bubble = () => {
    setChosen({ name: "Bubble Sort", complexity: "O(n^2)" });
    setAnimations([]);
    let postDataCopy = randoms.slice();
    setStartTimer(performance.now());
    bubbleSort(postDataCopy, animations);
    setEndTimer(performance.now());
    processAnimation();
  };

  const selection = () => {
    setChosen({ name: "Selection Sort", complexity: "O(n^2)" });
    setAnimations([]);
    let postDataCopy = randoms.slice();
    setStartTimer(performance.now());
    selectionSort(postDataCopy, animations);
    setEndTimer(performance.now());
    processAnimation();
  };

  const quick = () => {
    setChosen({ name: "Quick Sort", complexity: "O(n*log(n))" });
    setAnimations([]);
    let postDataCopy = randoms.slice();
    setStartTimer(performance.now());
    quickSort(postDataCopy, animations);
    setEndTimer(performance.now());
    processAnimation();
  };

  const heap = () => {
    setChosen({ name: "Heap Sort", complexity: "O(n*log(n))" });
    setAnimations([]);
    let postDataCopy = randoms.slice();
    setStartTimer(performance.now());
    heapSort(postDataCopy, animations);
    setEndTimer(performance.now());
    processAnimation();
  };

  const reloadPage = () => location.reload();

  //! MORE STUFF
  const drawImage = () => {
    setTimeout(() => {
      let i = 0;
      for (let y = 0;  y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          let p = randoms[i++];
          ctx.drawImage(
            image,
            x * pieceWidth,
            y * pieceHeight,
            pieceWidth,
            pieceHeight,
            p.col * pieceWidth,
            p.row * pieceHeight,
            pieceWidth,
            pieceHeight
          )
        }
      }
    }, 100)
  }

  const highlight = (first, second) => {
    ctx.strokeStyle = "#cfe627";
    ctx.lineWidth = 5;
    ctx.strokeRect(
      randoms[first].col * pieceWidth,
      randoms[first].row * pieceHeight,
      pieceWidth,
      pieceHeight
    )
    ctx.strokeStyle = "#cfe627";
    ctx.lineWidth = 5;
    ctx.strokeRect(
      randoms[second].col * pieceWidth,
      randoms[second].row * pieceHeight,
      pieceWidth,
      pieceHeight
    )
    drawImage();
  }

  const processAnimation = () => {
    setInterval(() => {
      if (startIndex >= animations.length) {
        setFinished(true);
        return
      }
      let part = animations[startIndex];
      let temp = randoms[part[0]];
      randoms[part[0]] = randoms[part[1]];
      randoms[part[1]] = temp;
      highlight(part[1], part[0]);
      startIndex++;
    }, 100)
  }

  const start = () => {
    setStarted(true);
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext('2d');
    image = new Image();
    image.src = link;

    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      // setPieceWidth(canvas.width / cols);
      // setPieceHeight(canvas.height / rows);
      pieceWidth = canvas.width / cols;
      pieceHeight = canvas.height / rows;
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          let part = { col: j, row: i, val: i * 10 + j };
          randoms.push(part);
        }
      }
      for (
        let j, x, i = randoms.length;
        i;
        j = Math.floor(Math.random() * i),
          x = randoms[--i],
          randoms[i] = randoms[j],
          randoms[j] = x
      );
      drawImage();
    }
  }

  useEffect(() => {
    start();
  }, [started])

  return (
    <>
      <div>
          <h1 style={{ color: "#ecf0f1", textAlign: "center", paddingTop: "1rem", paddingBottom: "1rem", fontStyle: "italic" }}>
            Choose a sorting algorithm
          </h1>

        <div style={{width: "50%", margin: "auto", justifyContent: "center"}}>
          <div className="sortButtonContainer">
            <button className="sortingButton" onClick={insertion}>
              Insertion Sort
            </button>
            <button className="sortingButton" onClick={selection}>
              Selection Sort
            </button>
            <button className="sortingButton" onClick={bubble}>
              Bubble Sort
            </button>
            <button className="sortingButton" onClick={quick}>
              Quick Sort
            </button>
            <button className="sortingButton" onClick={heap}>
              Heap Sort
            </button>
          </div>
        </div>
        
        {finished && (
          <div>
            <button
              onClick={reloadPage}
            >
              Finished! Start again?
            </button>
          </div>
        )}
      </div>

      <br />
      <div>
        <canvas
          id="myCanvas"
          // ref="canvas"
          style={{ width: "80%", height: "80%", zIndex: "0"}}
        ></canvas>
      </div>
      <br/>

      {chosen && (
        <>
          <div>
            <h5 style={{ color: "#ecf0f1" }}>
              Chosen: {chosen.name}
            </h5>
          </div>
          <div>
            <h5 style={{ color: "#ecf0f1" }}>
              Time complexity for {chosen.name}
            </h5>
          </div>
          <div>
            <h5 style={{ color: "#ecf0f1" }}>
              Number of animations(swaps) : <b>{animations.length}</b>
            </h5>
          </div>
          <div>
            <h5 style={{ color: "#ecf0f1" }}>
              Execution Time in the background:{" "}
              <b>{(endTimer - startTimer).toFixed(2)}</b> ms
            </h5>
          </div>
        </>
      )}
    </>
  );
}

export default ImageVisualizer;