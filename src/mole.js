let randomNum = null

const randomizeNum = () => {
  return Math.ceil(Math.random() * 9); 
}

const moveMole = squares => {
  removeMoles(squares);

  let tempNum = randomizeNum()
  while (tempNum === randomNum) {
    tempNum = randomizeNum()
  }

  randomNum = tempNum
  addMole(squares[tempNum - 1]);
};

const addMole = element => {
  element.classList.add("mole");
  element.setAttribute('clicked', 'false')
  return element;
};

const removeMole = element => {
  element.classList.remove("mole");
  return element;
};

const removeMoles = squares => {
  for (let square of squares) {
    removeMole(square);
  }
}

export { addMole, moveMole, removeMole, removeMoles };
