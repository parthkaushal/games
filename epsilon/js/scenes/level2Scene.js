// create a new scene
let level2Scene = new Phaser.Scene('Level2');

// some parameters for our scene
level2Scene.init = function() {
  // game stats
  this.stats = {
    health: 100,
    fun: 100
  };

};

// executed once, after assets were loaded
level2Scene.create = function() {

  // game background
  let bg = this.add.sprite(0, 0, 'background').setInteractive();
  bg.setOrigin(0, 0);

  // show stats to the user
  this.createHud();
  this.refreshHud();

  this.toy = this.add.sprite(45, 80, 'toy');
  this.toy.setOrigin(0, 0);
  this.toy.depth = 1;


  bg.on('pointerdown', function(){
    this.scene.start('Home');
  }, this);
};

// create the text elements that will show the stats
level2Scene.createHud = function() {
  // health stat
  this.healthText = this.add.text(20, 20, 'Health: ', {
    font: '24px Arial',
    fill: '#ffffff'
  });

  // fun stat
  this.funText = this.add.text(170, 20, 'Fun: ', {
    font: '24px Arial',
    fill: '#ffffff'
  });
};

// show the current value of health and fun
level2Scene.refreshHud = function(){
  this.healthText.setText('L2 Health: ' + this.stats.health);
  this.funText.setText('L2 Fun: ' + this.stats.fun);
};


