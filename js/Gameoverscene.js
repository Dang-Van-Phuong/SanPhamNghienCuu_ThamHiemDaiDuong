var GameOverScene = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize: function GameOverScene() {
        Phaser.Scene.call(this, { key: 'GameOverScene' });
    },

    init: function (data) {
        this.currentScene = data.currentScene;
    },

    preload: function () {
        this.load.image('thua', 'assets/thua.png');
        this.load.audio('lose', 'assets/music/lose.mp3');
    },

    create: function () {
        this.cameras.main.fadeIn(500, 0, 0, 0);
        console.log('Đã vào lose scene');

        this.backgroundMusic1 = this.sound.add('lose', { loop: true });
        this.backgroundMusic1.play();
        setTimeout(() => {
            this.backgroundMusic1.stop();
        }, 1000);
        let image = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'thua');
        let scaleX = this.cameras.main.width / image.width;
        let scaleY = this.cameras.main.height / image.height;
        let scale = Math.max(scaleX, scaleY);
        image.setScale(scale).setScrollFactor(0);
        this.createMenuButton("Chơi lại", this.doTryAgain, this.game.config.width / 2, 600);
        this.buttonMainMenu = this.createMenuButton("Trở về trang chính", this.doMainMenu, this.game.config.width / 2, 700);
        this.buttonMainMenu.setInteractive();

    },

    doTryAgain: function () {
        this.cameras.main.fadeOut(500, 0, 0, 0);
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            this.scene.start(this.currentScene);
        });
    },

    doMainMenu: function () {
        this.cameras.main.fadeOut(500, 0, 0, 0);
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            this.scene.start('MenuScene');
        });
    },
    createMenuButton: function (text, callback, x, y) {
        const button = this.add.text(x, y, text, {
            fontSize: '50px',
            fill: '#fff',
            fontFamily: 'Arial, sans-serif'
        }).setOrigin(0.5).setInteractive();

        button.on('pointerup', callback, this);

        return button;
    }
});


