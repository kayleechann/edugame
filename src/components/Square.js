import React from "react";

const buildSquares = (num, scoreHandler) => {
  let result = [];
  for (let i = 1; i <= num; i++) {
    result.push(
      <Square num={i} key={"square" + i} scoreHandler={scoreHandler} />
    );
  }
  return result;
};

const setClickedAttribute = (element) => {
  element.setAttribute("clicked", "true");
};

const clickHandler = (event, setScoreHandler) => {
  // check if a mole, increment score if so and hasn't been clicked already
  if (
    event.target.classList.contains("mole") &&
    event.target.getAttribute("clicked") === "false"
  ) {
    setScoreHandler((prev) => prev + 1);
    setClickedAttribute(event.target);
  }
};

const Square = (props) => {
  const { num, scoreHandler } = props;

  return (
    <li
      className="square"
      id={num}
      onClick={(event) => {
        clickHandler(event, scoreHandler);
      }}
    ></li>
  );
};

export { buildSquares, setClickedAttribute, Square };
