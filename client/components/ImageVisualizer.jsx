import React, { useEffect, useState } from 'react';
import {
  selectionSort,
  bubbleSort,
  insertionSort,
  quickSort,
  heapSort,
  swaps,
  swap
} from '../scripts/sorts';

const ImageVisualizer = (props) => {
  const { rows, cols, link } = props;
  const randoms = [];
  let canvas = null;
  let ctx = null;
  let image = null;
  let pieceWidth = null;
  let pieceHeight = null;
  let startIndex = 0;
  let animations = [];

  const [started, setStarted] = useState(false);
  const [chosen, setChosen] = useState(null);
  const [startTimer, setStartTimer] = useState(null);
  const [endTimer, setEndTimer] = useState(null);
  const [finished, setFinished] = useState(false);

  const insertion = () => {
    setChosen({ name: "Insertion Sort", complexity: "O(n^2)" });
    animations = [];
    let postDataCopy = randoms.slice();
    setStartTimer(performance.now());
    insertionSort(postDataCopy, animations);
    setEndTimer(performance.now());
    processAnimation();
  };
  
  const bubble = () => {
    setChosen({ name: "Bubble Sort", complexity: "O(n^2)" });
    animations = [];
    let postDataCopy = randoms.slice();
    setStartTimer(performance.now());
    bubbleSort(postDataCopy, animations);
    setEndTimer(performance.now());
    processAnimation();
  };
  
  const selection = () => {
    setChosen({ name: "Selection Sort", complexity: "O(n^2)" });
    animations = [];
    let postDataCopy = randoms.slice();
    setStartTimer(performance.now());
    selectionSort(postDataCopy, animations);
    setEndTimer(performance.now());
    processAnimation();  
  };

  const quick = () => {
    setChosen({ name: "Quick Sort", complexity: "O(n*log(n))" });
    animations = [];
    let postDataCopy = randoms.slice();
    setStartTimer(performance.now());
    quickSort(postDataCopy, animations, 0, randoms.length - 1);
    setEndTimer(performance.now());
    processAnimation();
  };

  const heap = () => {
    setChosen({ name: "Heap Sort", complexity: "O(n*log(n))" });
    animations = [];
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
    ctx.lineWidth = 10;
    ctx.strokeRect(
      randoms[first].col * pieceWidth,
      randoms[first].row * pieceHeight,
      pieceWidth,
      pieceHeight
    )
    ctx.strokeStyle = "#cfe627";
    ctx.lineWidth = 10;
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
    }, 50)
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

  useEffect(() => {
    console.log("start", startTimer);
    console.log("end", endTimer)
  }, [startTimer, endTimer])

  return (
    <>
      <div>
          <h1 style={{ textAlign: "center", paddingTop: "1rem" }}>
            Choose a sorting algorithm
          </h1>

        <div style={{textAlign: "center", paddingBottom: ".5rem", fontStyle: "italic"}}>
          <h6>
            The swapping animation is considerably slower than the function execution.
          </h6>
        </div>

        {!chosen && (
          <div className="buttonContainer">
            <div className="sortButtonContainer">
              <button className="sortingButton" onClick={insertion}>
                <b>Insertion </b><span id="littleDarker">Sort</span>
              </button>
              <button className="sortingButton" onClick={selection}>
                <b>Selection </b><span id="littleDarker">Sort</span>
              </button>
              <button className="sortingButton" onClick={bubble}>
                <b>Bubble </b><span id="littleDarker">Sort</span>
              </button>
              <button className="sortingButton" onClick={quick}>
                <b>Quick </b><span id="littleDarker">Sort</span>
              </button>
              <button className="sortingButton" onClick={heap}>
                <b>Heap </b><span id="littleDarker">Sort</span>
              </button>
            </div>
          </div>
        )}
      </div>
      <br />

      <div className="canvasContainer">
        <canvas
          id="myCanvas"
          // ref="canvas"
          style={{ width: "60%", height: "60%", zIndex: "0"}}
        ></canvas>
      </div>
      <br/>

      {chosen && (
        <div className="sortInfo">
          <div>
            <h5>
              Chosen: <b>{ chosen.name }</b>
            </h5>
          </div>
          <div>
            <h5>
              Time complexity for { chosen.name }: <b>{ chosen.complexity }</b>
            </h5>
          </div>
          <div>
            <h5>
              Number of animations(swaps) : <b>{ swaps }</b>
            </h5>
          </div>
          <div>
            <h5>
              Execution Time in the background:{" "}
              <b>{(endTimer - startTimer).toFixed(4)}</b> ms
            </h5>
          </div>
        </div>
      )}

      {finished && (
        <div className="finishedButtonContainer">
          <button
            id="finishedButton"
            onClick={reloadPage}
          >
            Finished! <b>Start again?</b>
          </button>
        </div>
      )}
    </>
  );
}

export default ImageVisualizer;