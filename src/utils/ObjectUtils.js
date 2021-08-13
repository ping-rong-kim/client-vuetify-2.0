export function deepAssignByPath(target, source, path) {}
export function deepAssign(target, source) {
  for (let key in source) {
    if (typeof source[key] === "object") {
      deepAssign(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
}
export function filter(source, path) {
  if (Array.isArray(path)) {
    if (typeof path[0] === "string") {
      return path.reduce((acc, keyV) => {
        acc[keyV] = source[keyV];
        return acc;
      }, {});
    }
    return path.map((v, index) => filter(source[index], v));
  } else if (typeof path === "string") {
    return {
      [path]: source[path]
    };
  } else if (typeof path !== "object") {
    return source;
  } else {
    const pathSource = {};
    for (const key in path) {
      pathSource[key] = filter(source[key], path[key]);
    }
    return pathSource;
  }
}
export function hasPath(source, path) {
  if (Array.isArray(path)) {
    if (typeof path[0] === "string") {
      for (let i = 0; i < path.length; i++) {
        if (!(path[i] in source)) {
          return false;
        }
      }
      return true;
    }
    for (let i = 0; i < path.length; i++) {
      if (!hasPath(source[i], path[i])) {
        return false;
      }
    }
    return true;
  } else if (typeof path === "string") {
    return path in source;
  } else if (typeof path !== "object") {
    return true;
  } else if (typeof path === "object") {
    for (const key in path) {
      if (!(key in source) || !hasPath(source[key], path[key])) {
        return false;
      }
    }
    return true;
  } else {
    return false;
  }
}
export function clone(source) {
  return JSON.parse(JSON.stringify(source));
}
