let { init, Sprite, GameLoop } = kontra

let { canvas } = init();
canvas.width = window.innerWidth
canvas.height = window.innerHeight

let sprite = Sprite({
  x: getRandom(window.innerWidth),        // starting x,y position of the sprite
  y: getRandom(window.innerHeight),
  color: 'gold',  // fill color of the sprite rectangle
  width: 20,     // width and height of the sprite rectangle
  height: 40,
  dx: 2          // move the sprite 2px to the right every frame
});

let colorList = ["violet", "indigo", "blue", "green", "yellow", "orange", "red"]

let loop = GameLoop({  // create the main game loop
  update: function() { // update the game state

    if (counter() == 0){
      sprite.x = getRandom(window.innerWidth)
      sprite.y = getRandom(window.innerHeight)
    }

    sprite.update();

    // wrap the sprites position when it reaches
    // the edge of the screen
    if (sprite.x > canvas.width) {
      sprite.x = -sprite.width;
      sprite.color = colorList[getRandom(7)];
      
    }
  },
  render: function() { // render the game state
    sprite.render();
  }
});

loop.start();    // start the game


function changeCanvasSize(){
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
}


window.onresize = changeCanvasSize

function getRandom(maxValue){
  return Math.floor(Math.random() * maxValue)
}

var c = 0

function counter(){
  c++
  if (c > 250) {
    c = 0
  }
  return c
}

