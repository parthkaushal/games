// create a new scene
let level1Scene = new Phaser.Scene('Level1');

// some parameters for our scene
level1Scene.init = function() {
  // game stats
  this.stats = {
    health: 100,
    fun: 100
  };

};

// executed once, after assets were loaded
level1Scene.create = function() {

  // game background
  let bg = this.add.sprite(0, 0, 'background').setInteractive();
  bg.setOrigin(0, 0);

  // show stats to the user
  this.createHud();
  this.refreshHud();

  this.next = this.add.sprite(100, 200, 'next', 0).setInteractive();
  this.next.depth = 1;

  // play spritesheet animation
  this.next.play('loading');    

  bg.on('pointerdown', function(){
    this.scene.start('Level2');
  }, this);
};

// create the text elements that will show the stats
level1Scene.createHud = function() {
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
level1Scene.refreshHud = function(){
  this.healthText.setText('L1 Health: ' + this.stats.health);
  this.funText.setText('L1 Fun: ' + this.stats.fun);
};


