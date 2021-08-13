import SearchAlgorithm from "@/algorithms/SearchAlgorithm";

export default {
  insertPoint(graphPoints, point) {
    const xs = graphPoints.map(p => p.x);
    const ys = graphPoints.map(p => p.y);
    if (xs.includes(point.x)) {
      const index = xs.findIndex(x => x === point.x);
      ys[index] = point.y;
    } else {
      const insertPosition = SearchAlgorithm.findInsertPosition(xs, point.x);
      xs.splice(insertPosition, 0, point.x);
      ys.splice(insertPosition, 0, point.y);
    }
    return xs.map((x, i) => ({ x, y: ys[i] }));
  }
};
