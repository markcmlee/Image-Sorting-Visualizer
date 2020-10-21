let swaps = 0;

function selectionSort(arrayCopy, animations) {
  let startIdx = 0;
  while (startIdx < arrayCopy.length - 1) {
    let smallestIdx = startIdx;
    for (let i = startIdx + 1; i < arrayCopy.length; i++) {
      if (arrayCopy[i].val < arrayCopy[smallestIdx].val) {
        smallestIdx = i;
      }
    }
    swap(smallestIdx, startIdx, arrayCopy);
    animations.push([smallestIdx, startIdx]);
    startIdx++;
  }
}

function bubbleSort(arrayCopy, animations) {
  let sorted = false;
  let counter = 0;
  while (!sorted) {
    sorted = true;
    for (let i = 0; i < arrayCopy.length - 1 - counter; i++) {
      if (arrayCopy[i].val > arrayCopy[i + 1].val) {
        swap(i, i + 1, arrayCopy);
        sorted = false;
        animations.push([i, i + 1]);
      }
    }
    counter++;
  }
}

function insertionSort(arrayCopy, animations) {
  for (let i = 0; i < arrayCopy.length; i++) {
    let j = i;
    while (j > 0 && arrayCopy[j].val < arrayCopy[j - 1].val) {
      swap(j, j - 1, arrayCopy);
      animations.push([j, --j]);
    }
  }
}

function quickSort(arrayCopy, animations, startIdx, endIdx) {
  if (startIdx >= endIdx) return;
  const pivot = startIdx;
  let leftIndex = startIdx + 1;
  let rightIndex = endIdx;
  while (rightIndex >= leftIndex) {
      if (arrayCopy[leftIndex].val > arrayCopy[pivot].val && arrayCopy[rightIndex].val < arrayCopy[pivot].val) {
          swap(leftIndex, rightIndex, arrayCopy);
          animations.push([leftIndex, rightIndex]);
      }
      if (arrayCopy[leftIndex].val <= arrayCopy[pivot].val) leftIndex++;
      if (arrayCopy[rightIndex].val >= arrayCopy[pivot].val) rightIndex--;
  }
  swap(pivot, rightIndex, arrayCopy);
  animations.push([pivot, rightIndex]);
  const leftSubarrayIsSmaller = rightIndex - 1 - startIdx < endIdx - (rightIndex + 1);
  if (leftSubarrayIsSmaller) {
      quickSort(arrayCopy, animations, startIdx, rightIndex - 1);
      quickSort(arrayCopy, animations, rightIndex + 1, endIdx);
  } else {
      quickSort(arrayCopy, animations,rightIndex + 1, endIdx);
      quickSort(arrayCopy, animations, startIdx, rightIndex - 1);
  }
}

function heapSort(arrayCopy, animations) {
  buildMaxHeap(arrayCopy, animations);
  for (let endIdx = arrayCopy.length - 1; endIdx > 0; endIdx--) {
    swap(0, endIdx, arrayCopy);
    animations.push([0, endIdx]);
    siftDown(0, endIdx - 1, arrayCopy, animations);
  }
}

function buildMaxHeap(array, animations) {
  const firstParentIndex = Math.floor((array.length - 2) / 2);
  for (let currentIndex = firstParentIndex; currentIndex >= 0; currentIndex--) {
    siftDown(currentIndex, array.length - 1, array, animations);
  }
}

function siftDown(currentIndex, endIndex, heap, animations) {
  let childOneIndex = currentIndex * 2 + 1;
  while (childOneIndex <= endIndex) {
    const childTwoIndex =
      currentIndex * 2 + 2 <= endIndex ? currentIndex * 2 + 2 : -1;
    let indexToSwap;
    if (
      childTwoIndex !== -1 &&
      heap[childTwoIndex].val > heap[childOneIndex].val
    ) {
      indexToSwap = childTwoIndex;
    } else {
      indexToSwap = childOneIndex;
    }
    if (heap[indexToSwap].val > heap[currentIndex].val) {
      swap(currentIndex, indexToSwap, heap);
      animations.push([currentIndex, indexToSwap]);
      currentIndex = indexToSwap;
      childOneIndex = currentIndex * 2 + 1;
    } else {
      return;
    }
  }
}

function swap(i, j, array) {
  let temp = array[i];
  array[i] = array[j];
  array[j] = temp;
  swaps++
}

export { selectionSort, bubbleSort, insertionSort, quickSort, heapSort, swaps, swap };
