let rows = 5;
let columns = 5;

let currTile;
let otherTile;
let turns = 0;

window.onload = function () {
  //Initialize the 5*5 board
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      //creating an image tag here <img> below
      let tile = document.createElement('img');
      tile.src = './images/blank.jpg';

      //Drag an dDrop functionality
      //in reality we are going to exchange the white image with the one we select
      tile.addEventListener('dragstart', dragStart); // click an image to start

      tile.addEventListener('dragover', dragOver); // when moving the mouse after dragging
      tile.addEventListener('dragenter', dragEnter); //dragging an image into another image
      tile.addEventListener('dragleave', dragLeave); //dragging an image away from another one
      tile.addEventListener('drop', dragDrop); //drop an image onto another one
      tile.addEventListener('dragend', dragEnd); //after you completed dragDrop
      document.getElementById('board').append(tile);
    }
  }

  //to populate all the images into the pieces area
  let pieces = [];
  for (let i = 1; i <= rows * columns; i++) {
    pieces.push(i.toString()); //put 1 to 25 into the array(we have the puzzle images names from 1 to 25)
  }
  //to reverse the pieces
  pieces.reverse();

  //to shuffle the pieces
  for (let i = 0; i < pieces.length; i++) {
    let j = Math.floor(Math.random() * pieces.length);
    //now to swap the present image with the random image

    let temp = pieces[i];
    pieces[i] = pieces[j];
    pieces[j] = temp;
  }

  for (let i = 0; i < pieces.length; i++) {
    let tile = document.createElement('img');
    tile.src = `./images/${pieces[i]}.jpg`;

    //Drag an dDrop functionality
    //in reality we are going to exchange the white image with the one we select
    tile.addEventListener('dragstart', dragStart); // click an image to start
    tile.addEventListener('dragover', dragOver); // when moving the mouse after dragging
    tile.addEventListener('dragenter', dragEnter); //dragging an image into another image
    tile.addEventListener('dragleave', dragLeave); //dragging an image away from another one
    tile.addEventListener('drop', dragDrop); //drop an image onto another one
    tile.addEventListener('dragend', dragEnd); //after you completed dragDrop

    document.getElementById('pieces').append(tile);
  }
};

//actual functions

function dragStart() {
  currTile = this; //this refers to image that was clicked on for dragging
}

function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault();
}

function dragLeave() {}

function dragDrop() {
  otherTile = this; //this refers to image that is being dropped on
}

function dragEnd() {
  if (currTile.src.includes('blank')) {
    return;
  }
  let currImg = currTile.src;
  let otherImg = otherTile.src;
  currTile.src = otherImg;
  otherTile.src = currImg;

  turns += 1;
  document.getElementById('turns').innerText = turns;
}
