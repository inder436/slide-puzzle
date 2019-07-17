const DISTANCE = 100;
const boxes = document.querySelectorAll("main div");
var result = false;
const puzzlePieces = [
  { name: ".box1", x:0, y:0},// puzzle box names from 1 to 15
  { name: ".box2", x:100, y:0},
  { name: ".box3", x:200, y:0},
  { name: ".box4", x:300, y:0},
  { name: ".box5", x:0, y:100},
  { name: ".box6", x:100, y:100},
  { name: ".box7", x:200, y:100},
  { name: ".box8", x:300, y:100},
  { name: ".box9", x:0, y:200},
  { name: ".box10", x:100, y:200},
  { name: ".box11", x:200, y:200},
  { name: ".box12", x:300, y:200},
  { name: ".box13", x:0, y:300},
  { name: ".box14", x:100, y:300},
  { name: ".box15", x:200, y:300},
];

// blankSpace: initialize blank square as last piece so as to remember where it is.
// Will eventually use it to ask direction of clicked puzzle piece(s).
// Once pieces move, must remember to update x,y values to new blank space coords
const blankSpace = { x: 300, y: 300, order: 16 };
const puzzle = {
  pieces: puzzlePieces,
  distance: DISTANCE,
  blankSpace,
  currentPiece: null,
  directionToMove: "",
  initialize: function() {
// for each function and addEventListener on click to slide the box
    boxes.forEach(box=>box.addEventListener('click', this.slide));
    // show puzzle pieces
    this.display();
  },
  display: function() {
    // initialize pieces to their proper order
    this.pieces.forEach(piece => {
      const pieceDOM = document.querySelector(piece.name);
      TweenLite.set(pieceDOM, { x: piece.x, y: piece.y });
    });
  },

  slide: function(e) {
// implements evenet e to check and give direction for box to move
    puzzle.currentPiece = puzzle.pieces[e.target.dataset.idx];
    puzzle.secondPiece = puzzle.pieces[e.target.dataset.idx - 1];
    puzzle.thirdPiece = puzzle.pieces[e.target.dataset.idx - 2];
    directionToMove = puzzle.isMoveable();

    if((directionToMove=="up-down")||(directionToMove=="left-right")){
       TweenMax.to(this, 0.50, {
       x: puzzle.currentPiece.x,//function implements blankSpace.x,
       y: puzzle.currentPiece.y,//function implements blankSpace.y,
       ease: Power0.easeNone
     });
    }
  },
	// isMoveable functions checks if box moves in correct x coordinates direction or not
  isMoveable: function() {
    if(puzzle.currentPiece.x == blankSpace.x){
        if((puzzle.currentPiece.y == blankSpace.y - 100)||(puzzle.currentPiece.y == blankSpace.y + 100)){
          var yOfCurrent = puzzle.currentPiece.y;
          puzzle.currentPiece.y = blankSpace.y;
          blankSpace.y = yOfCurrent;
          return "up-down";
        }
        else {
          return "error";
        }
    }
			// isMoveable functions checks if box moves in correct y coordinates direction or not
    if(puzzle.currentPiece.y == blankSpace.y){
      if((puzzle.currentPiece.x == blankSpace.x - 100)||(puzzle.currentPiece.x == blankSpace.x + 100)){
        var xOfCurrent = puzzle.currentPiece.x;
        puzzle.currentPiece.x = blankSpace.x;
        blankSpace.x = xOfCurrent;
        return "left-right";
      }
      else{
        return "error";
      }
    }
  }
};

puzzle.initialize();
