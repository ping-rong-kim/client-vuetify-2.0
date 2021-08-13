export default {
  findInsertPosition(
    sortedArray,
    value,
    leftIndex = 0,
    rightIndex = sortedArray.length - 1
  ) {
    if (rightIndex - leftIndex <= 1) {
      if (sortedArray[leftIndex] > value) {
        return leftIndex;
      } else {
        if (sortedArray[rightIndex] <= value) {
          return rightIndex + 1;
        }
        return rightIndex;
      }
    }
    const midIndex = leftIndex + Math.round((rightIndex - leftIndex) / 2);
    const midValue = sortedArray[midIndex];
    if (midValue > value) {
      return this.findInsertPosition(sortedArray, value, leftIndex, midIndex);
    } else if (midValue < value) {
      return this.findInsertPosition(sortedArray, value, midIndex, rightIndex);
    } else {
      return midIndex;
    }
  },
  findNearestValue(sortedArray, value) {
    const insertPosition = this.findInsertPosition(sortedArray, value);
    if (insertPosition) {
      if (insertPosition === 0) {
        return sortedArray[insertPosition];
      }
      const leftValue = sortedArray[insertPosition - 1];
      const rightValue = sortedArray[insertPosition];
      if (rightValue - value > value - leftValue) {
        return leftValue;
      } else {
        return rightValue;
      }
    }
  }
};
