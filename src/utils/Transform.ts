export class Transform {
  static arrayToDictionary(array) {
    const result = {};
    array.forEach((item) => result[item.id] = item);
    return result;
  }
}
