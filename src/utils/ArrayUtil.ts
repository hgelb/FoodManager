export class ArrayUtil {
  static getMaxId(arr) {
    let maxId = 0;

    arr.forEach((item) => {
      if (item.id > maxId) {
        maxId = item.id;
      }
    });

    return maxId;
  }
}
