let numOfSquares = 6;
let colors = [];
let correctColor;

let squares = document.querySelectorAll(".square");
let msgDisplay = document.getElementById("msg");
let h1 = document.querySelector("h1");
let colorDisplay = document.getElementById("colorDisplay");
let resetButton = document.getElementById("reset");
let modeBtns = document.querySelectorAll(".mode");

init();

function init() {
  setModeButtons();
  setSquares();
  reset();
}

function generateRandomColors(num) {
  //creates array
  let arr = [];

  //make array have same number of items as num argument
  for (let i = 0; i < num; i++) {

    //put a random color into array
    arr.push(randomColor());
  }
  return arr;
}

//generate and format random color
function randomColor() {
  //pick an amount of red from 0 - 255
  let r = Math.floor(Math.random() * 256);
  //pick an amount of green from 0 - 255
  let g = Math.floor(Math.random() * 256);
  //pick an amount of blue from 0 - 255
  let b = Math.floor(Math.random() * 256);

  /* NOTE
   * need spaces after comma
   * otherwise comparing this string with generated one wont work
   * DOM adds spaces when assigning bg color
   */
  return "rgb(" + r + ", " + g + ", " + b + ")";
}

//randomly chooses which square will be the winner
function correctSquare() {
  let random = Math.floor(Math.random() * colors.length);
  return colors[random];
}

//changes all squares to match winning color
function changeColors(color) {
  //loop through the squares
  for (var i = 0; i < squares.length; i++) {
    //change color to match winner
    squares[i].style.backgroundColor = color;
  }
}

function setModeButtons() {
  for (var i = 0; i < modeBtns.length; i++) {
    modeBtns[i].addEventListener("click", function() {

      //removing selected style from all buttons
      modeBtns[0].classList.remove("selected");
      modeBtns[1].classList.remove("selected");

      //adding selected to clicked button
      this.classList.add("selected");

      //determine number of squares based on which button was clicked
      // ternary operator "?" shorter than if/else here
      this.textContent === "Easy" ? numOfSquares = 3 : numOfSquares = 6;

      //reset page after changing game mode
      reset();
    })
  }
}

function setSquares() {
  for (let i = 0; i < squares.length; i++) {
    //adds initial colors to squares
    squares[i].style.backgroundColor = colors[i];

    //adds click listeners to squares
    squares[i].addEventListener("click", function() {

      //stores color user selected
      let clickedColor = this.style.backgroundColor;

      //evaluation of clicked square -> compare to correct color
      if (clickedColor === correctColor) {
        //if correct all squares turn correct color, say correct and ask play again
        msgDisplay.classList.add("winner");
        msgDisplay.textContent = "Correct!";
        changeColors(clickedColor);
        h1.style.backgroundColor = clickedColor;
        resetButton.textContent = "Play Again?"
      } else {
        //fade square into background, say try again
        this.style.backgroundColor = "#232323";
        msgDisplay.textContent = "Try again";
      }
    })
  }
}

function reset() {
  //generate  new colors
  colors = generateRandomColors(numOfSquares);

  //pick new desired color
  correctColor = correctSquare();

  //change color display
  colorDisplay.textContent = correctColor;

  // reset message styles if player won
  msgDisplay.classList.remove("winner");
  
  // empty string on text content keeps spacing
  msgDisplay.textContent = "";

  //change colors of the squares
  for (let i = 0; i < squares.length; i++) {

    //if there is a color at the index, change color
    if (colors[i]) {
      //ensure all squares used are visible
      squares[i].style.display = "block";
      squares[i].style.backgroundColor = colors[i];

      //if there isn't a color at the index, hide the div
    } else {
      squares[i].style.display = "none";
    }
  }
  //reset header color
  h1.style.backgroundColor = "steelblue";
  //reset button text (if player wins)
  resetButton.textContent = "New Colors";
}

resetButton.addEventListener("click", function() {
  reset();
})
