exports.allPairsShortestPaths = (nodes, edges) => {
  const matrix = [];
  const route = [];
  for (let i = 0; i < nodes.length; i++) {
    const row = [];
    const row2 = [];
    for (let j = 0; j < nodes.length; j++) {
      row.push(i == j ? 0 : 1000);
      row2.push(null);
    }
    matrix.push(row);
    route.push(row2);
  }

  for (const [csFrom, csTo, name] of edges) {
    matrix[nodes.indexOf(csFrom)][nodes.indexOf(csTo)] = 1;
    route[nodes.indexOf(csFrom)][nodes.indexOf(csTo)] = name;
  }

  // Floyd algorithm
  for (let k = 0; k < nodes.length; k++) {
    for (let i = 0; i < nodes.length; i++) {
      for (let j = 0; j < nodes.length; j++) {
        if (matrix[i][j] > matrix[i][k] + matrix[k][j]) {
          matrix[i][j] = matrix[i][k] + matrix[k][j];
          route[i][j] = k;
        }
      }
    }
  }
  let shortestPath = (i, j) => {
    if (route[i][j] == null) return null;
    if (typeof route[i][j] != "number") {
      return [route[i][j]];
    } else {
      const k = route[i][j];
      const p1 = shortestPath(i, k);
      const p2 = shortestPath(k, j);
      if (p1 == null || p2 == null) return null;
      return p1.concat(p2);
    }
  };
  return shortestPath;
};
