var Victoryscene = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize: function Victoryscene() {
        Phaser.Scene.call(this, { key: 'Victoryscene' });
    },

    init: function (data) {
        this.nextScene = data.nextScene;
    },

    preload: function () {
        this.load.image('victory', 'assets/victory.png');
        this.load.audio('victory', 'assets/music/win.mp3');

    },

    create: function () {
        console.log('Đã vào Victory scene');
        this.cameras.main.fadeIn(500, 0, 0, 0);
        this.backgroundMusic1 = this.sound.add('victory', { loop: true });
        this.backgroundMusic1.play();
        setTimeout(() => {
            this.backgroundMusic1.stop();
        }, 1000);
        // Hiển thị hình ảnh
        let image = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'victory');
        let scaleX = this.cameras.main.width / image.width;
        let scaleY = this.cameras.main.height / image.height;
        let scale = Math.max(scaleX, scaleY);
        image.setScale(scale).setScrollFactor(0);

        this.createMenuButton("Cấp độ tiếp theo", this.doNextLevel, this.game.config.width / 2, 600);
        this.buttonMainMenu = this.createMenuButton("Trở về trang chính", this.doMainMenu, this.game.config.width / 2, 700);
        this.buttonMainMenu.setInteractive();       
    },
    createMenuButton: function (text, callback, x, y) {
        var button = this.add.text(x, y, text, {
            fontSize: '50px',
            fill: '#fff',
            fontFamily: 'pixel_font'
        });
        
        // Tăng khoảng cách giữa các dòng button
        var verticalSpacing = 50;
        y += verticalSpacing;
    
        button.setOrigin(0.5);
        button.setInteractive();
        button.on('pointerdown', callback, this);
        return button;
    },
    doNextLevel: function () {
      this.backgroundMusic1.stop();
        this.cameras.main.fadeOut(500, 0, 0, 0);
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            this.scene.start(this.nextScene)
        });
    },

    doMainMenu: function () {
       this.backgroundMusic1.stop();
        this.cameras.main.fadeOut(500, 0, 0, 0);
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            this.scene.start('MenuScene');

        });
    }
});
