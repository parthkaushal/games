let { init, Sprite, GameLoop } = kontra

let { canvas } = init();

let sprite = Sprite({
  x: 100,        // starting x,y position of the sprite
  y: 80,
  color: 'gold',  // fill color of the sprite rectangle
  width: 20,     // width and height of the sprite rectangle
  height: 40,
  dx: 2          // move the sprite 2px to the right every frame
});

let colorList = ["violet", "indigo", "blue", "green", "yellow", "orange", "red"]

let loop = GameLoop({  // create the main game loop
  update: function() { // update the game state
    // setTimeout( () => {
    // } , 1000)
    
    sprite.update();

    // wrap the sprites position when it reaches
    // the edge of the screen
    if (sprite.x > canvas.width) {
      sprite.x = -sprite.width;
      sprite.color = colorList[Math.floor(Math.random() * 7)];
    }
  },
  render: function() { // render the game state
    sprite.render();
  }
});

loop.start();    // start the game