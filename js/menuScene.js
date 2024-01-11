var MenuScene = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize: function MenuScene() {
        Phaser.Scene.call(this, { key: 'MenuScene' });
    },

    preload: function () {
        this.load.image('anhnen', 'assets/anhnen.png');
        this.load.audio('nhacnen1', 'assets/music/nhacnen1.mp3');
        this.load.image('iconNhacBat', 'assets/iconNhacBat.png'); 
         this.load.image('iconNhacTat', 'assets/iconNhacTat.png'); 
    },

    create: function () {
        console.log('Đã vào MenuScene');
        var backgroundImage = this.add.tileSprite(0, 0, 1920, 1080, 'anhnen');
        backgroundImage.setOrigin(0, 0);
        
        this.backgroundMusic1 = this.sound.add('nhacnen1', { loop: true });
        this.backgroundMusic1.play();

        var musicIcon = this.add.sprite(this.game.config.width - 100, 910, 'iconNhacTat');
        musicIcon.setTintFill(0xFFFFFF); 
        musicIcon.setOrigin(0.5);
        musicIcon.setScale(0.2);
        musicIcon.setInteractive().on('pointerdown', function () {
            if (this.backgroundMusic1.isPlaying) {
                this.backgroundMusic1.stop();
                musicIcon.setTintFill(0xFFFFFF); 
                musicIcon.setTexture('iconNhacBat');
            } else {
                this.backgroundMusic1.play();
                musicIcon.setTintFill(0xFFFFFF); 
                musicIcon.setTexture('iconNhacTat');
            }
        }, this);
        
        this.musicIcon = musicIcon; 
        var titleText = this.add.text(this.game.config.width / 2, 200, 'Thám hiểm đại dương', {
            fontSize: '110px',
            fill: '#ff0',
            fontFamily: 'pixel_font'
        });
        var message1 = "Xin thông báo!";
        var style1 = {
            fontSize: '80px',
            fill: '#FF0000',
            fontFamily: 'Arial',
            align: 'center',
            baselineY: 0,
        };
        // hieu ung chu
        this.tweens.add({
            targets: titleText,
            scaleX: 1.1, // Phóng to 10%
            scaleY: 1.1, // Phóng to 10%
            duration: 1000, 
            yoyo: true, 
            repeat: -1 
        });
        titleText.setOrigin(0.5);

        // Nút menu
        var startButton = this.createMenuButton("Bắt đầu", this.game.config.width / 2, 400);
        startButton.setStyle({ fontFamily: 'pixel_font' });
        var optionsButton = this.createMenuButton("Cấp độ", this.game.config.width / 2, 550);
        optionsButton.setStyle({ fontFamily: 'pixel_font' });
        var quetionsButton = this.createMenuButton("Thông tin về trò chơi", this.game.config.width / 2, 850);
        quetionsButton.setStyle({ fontFamily: 'pixel_font' });
        var guideButton = this.createMenuButton("Hướng dẫn", this.game.config.width / 2, 700);
        guideButton.setStyle({ fontFamily: 'pixel_font' });
        // them su kien cho moi nut
        startButton.setInteractive().on('pointerdown', function () {
            this.backgroundMusic1.stop();
            this.scene.start('HuongDanLevel1');
        }, this);
        optionsButton.setInteractive().on('pointerdown', function () {
            this.backgroundMusic1.stop();
            this.scene.start('LeverScene');
        }, this);
        quetionsButton.setInteractive().on('pointerdown', function () {
            this.backgroundMusic1.stop();
            this.scene.start('ThongTinScene');
        }, this);

        guideButton.setInteractive().on('pointerdown', function () {
            this.backgroundMusic1.stop();
            this.scene.start('GuideScene');
        }, this);
    },
    
    update: function () {
        this.children.list.forEach(function (child) {
            if (child instanceof Phaser.GameObjects.TileSprite) {
                child.tilePositionX -= 2; // Điều chỉnh tốc độ chạy của hình nền
            }
        }, this);
    },

    createMenuButton: function (text, x, y) {
        var button = this.add.text(x, y, text, {
            fontSize: '80px',
            fill: '#fff',
            fontFamily: 'pixel_font'
        });
        button.setOrigin(0.5);
        return button;
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
    }
});
