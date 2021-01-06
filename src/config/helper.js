const editName = (data) => {
  let arr = data.toLowerCase().split(" ");
  for (let i = 0; i < arr.length; i++) {
    let letterWiseName = arr[i].split("");
    letterWiseName[0] = letterWiseName[0].toUpperCase();
    arr[i] = letterWiseName.join("");
  }
  return arr.join(" ");
};

module.exports = {
  editName,
};
