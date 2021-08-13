export function floorNearest(num, placeDigit) {
  const placeWeight = Math.pow(10, placeDigit);
  return placeWeight * Math.floor(num / placeWeight);
}
export function floorNearestThousand(num) {
  return floorNearest(num, 3);
}
