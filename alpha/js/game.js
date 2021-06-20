let { init, Sprite, GameLoop, initPointer, setImagePath, load, imageAssets, Button, SpriteSheet, setAudioPath, audioAssets } = kontra


let { canvas } = init();
canvas.width = window.innerWidth - 20
canvas.height = window.innerHeight - 20

// must call this to have pointer events work
initPointer();

let button
let startFlag = false

load('/audio/music.mp3').then(function() {
  // Audio asset can be accessed by both
  // name: audioAssets['/audio/music']
  // path: audioAssets['/audio/music.ogg']
});

setImagePath('images');

let image = new Image();
image.src = 'images/player.png';

let sprite = Sprite({
  x: getRandom(window.innerWidth),        // starting x,y position of the sprite
  y: getRandom(window.innerHeight),
  dx: 2,          // move the sprite 2px to the right every frame
  image: image
});

// let colorList = ["violet", "indigo", "blue", "green", "yellow", "orange", "red"]

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
      // sprite.color = colorList[getRandom(7)];
      
    }
  },
  render: function() { // render the game state
    if (!startFlag)
      button.render();
    if (startFlag){
      sprite.render();
      // Button.destroy()
    }
  }
});

load('blue_button02.png', 'blue_button03.png').then(() => {
  button = Button({
  // sprite properties
  x: window.innerWidth / 2,
  y: window.innerHeight / 2,
  anchor: {x: 0.5, y: 0.5},
  image: imageAssets['blue_button02'],

  // text properties
  text: {
    text: 'Start Game',
    color: 'white',
    font: '20px Arial, sans-serif',
    anchor: {x: 0.5, y: 0.5}
  },

  // pointer events
  onDown() {
    this.image = imageAssets['blue_button03'];
    this.y += 5;
  },
  onUp() {
    this.image = imageAssets['blue_button02']
    this.y -= 5;
    audioAssets['/audio/music'].play();
    startFlag = true
}
});
loop.start();    // start the game
})




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
