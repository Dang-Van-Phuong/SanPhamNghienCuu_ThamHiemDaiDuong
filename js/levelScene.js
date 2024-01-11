var LeverScene = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize: function LeverScene() {
        Phaser.Scene.call(this, { key: 'LeverScene' });
    },

    preload: function () {
        this.load.image('anhnen', 'assets/anhnen.png');
        this.load.image('backButton', 'assets/TroLai.png');
        this.load.audio('nhacnen', 'assets/music/nhacnen.mp3');
    },

    create: function () {
        console.log('Đã vào LeverScene');
        this.backgroundMusic1 = this.sound.add('nhacnen', { loop: true });
        this.backgroundMusic1.play();

        this.bgParallax1 = this.add.tileSprite(1920 / 2, 1080 / 2, this.game.config.width, this.game.config.height , 'anhnen');

        var backButton = this.add.image(400, this.game.config.height / 2 , 'backButton');
        backButton.setTintFill(0xFFFFFF); // Đặt màu trắng

        backButton.setDisplaySize(150, 150);
        backButton.setInteractive().on('pointerdown', function () {
            this.backgroundMusic1.stop();
            console.log("Quay lại đã được nhấp!");
            this.scene.start('MenuScene');

        }, this);
        
        var button1 = this.createHiddenMenuButton("Cấp độ 1", this.game.config.width / 2, 300);
        button1.setInteractive().on('pointerdown', function () {
            this.backgroundMusic1.stop();
            console.log("Nút 'Cấp độ 1' đã được nhấp!");
            this.scene.start('HuongDanLevel1');

        }, this);
        var button2 = this.createHiddenMenuButton("Cấp độ 2", this.game.config.width / 2, 420);
        button2.setInteractive().on('pointerdown', function () {
            console.log("Nút 'Cấp độ 2' đã được nhấp!");
            this.backgroundMusic1.stop();

            this.scene.start('HuongDanLevel2');

        }, this);
        var button3 = this.createHiddenMenuButton("Cấp độ 3", this.game.config.width / 2, 540);
        button3.setInteractive().on('pointerdown', function () {
            console.log("Nút 'Mức 3' đã được nhấp!");
            this.backgroundMusic1.stop();

            this.scene.start('HuongDanLevel3');

        }, this);
        var button4 = this.createHiddenMenuButton("Cấp độ 4", this.game.config.width / 2, 660);
        button4.setInteractive().on('pointerdown', function () {
            console.log("Nút 'Mức 4' đã được nhấp!");
            this.backgroundMusic1.stop();
            this.scene.start('HuongDanLevel4');

        }, this);
        var button5 = this.createHiddenMenuButton("Cấp độ 5", this.game.config.width / 2, 780);
        button5.setInteractive().on('pointerdown', function () {
            console.log("Nút 'Mức 5' đã được nhấp!");
            this.backgroundMusic1.stop();

            this.scene.start('HuongDanLevel5');

        }, this);

        button1.setVisible(true);
        button2.setVisible(true);
        button3.setVisible(true);
        button4.setVisible(true);
        button5.setVisible(true);
    },

    createHiddenMenuButton: function (text, x, y) {
        var button = this.add.text(x, y, text, {
            fontSize: '80px',
            fill: '#fff',
            fontFamily: 'pixel_font'
        });

        button.setOrigin(0.5);
        button.setVisible(false);

        var buttonWidth = 150;
        var buttonHeight = 80;
        button.setSize(buttonWidth, buttonHeight);

        var verticalSpacing = 500;

        return button;
    },
    update: function () {
        this.bgParallax1.tilePositionX -= 2;
    },
});
