// create a new scene
let loadingScene = new Phaser.Scene('Loading');

loadingScene.preload = function() {

  // show logo
  let logo = this.add.sprite(this.sys.game.config.width/2, 250, 'logo');

  // progress bar background
  let bgBar = this.add.graphics();

  let barW = 150;
  let barH = 30;

  bgBar.setPosition(this.sys.game.config.width/2 - barW/2, this.sys.game.config.height/2 - barH/2);
  bgBar.fillStyle(0xF5F5F5, 1);
  bgBar.fillRect(0, 0, barW, barH);

  // progress bar
  let progressBar = this.add.graphics();
  progressBar.setPosition(this.sys.game.config.width/2 - barW/2, this.sys.game.config.height/2 - barH/2);

  // listen to the "progress" event
  this.load.on('progress', function(value){
    // clearing progress bar (so we can draw it again)
    progressBar.clear();

    // set style
    progressBar.fillStyle(0x9AD98D, 1);

    // draw rectangle
    progressBar.fillRect(0, 0, value * barW, barH);

  }, this);

  // load assets
  this.load.image('background', 'assets/images/background.jpg');
  this.load.image('toy', 'assets/images/toy.jpg');

//   this.load.audio('click', 'assets/audio/click.mp3');

  // load spritesheet
  this.load.spritesheet('next', 'assets/images/loading.png', {
    frameWidth: 188,
    frameHeight: 188,
    margin: 0,
    spacing: 0
  });

  // TESTING - to see the progress bar in action!
  // for(let i = 0; i < 2000; i++) {
  //   this.load.image('test' + i, 'assets/images/background.jpg');
  // }
};

loadingScene.create = function() {

  // animation
  this.anims.create({
    key: 'loading',
    frames: this.anims.generateFrameNames('next', {
      // frames: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      end: 48
    }),
    frameRate: 30,
    yoyo: true,
    repeat: -1 // to repeat forever: -1
  });

  this.scene.start('Home');
};
