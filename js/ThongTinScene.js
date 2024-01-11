var ThongTinScene = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize: function LoadGame() {
        Phaser.Scene.call(this, { key: 'ThongTinScene' });
    },

    preload: function () {
        this.load.image('backButton', 'assets/TroLai.png');
        this.load.audio('nhacnen', 'assets/music/nhacnen.mp3');
        this.load.image('thoat', 'assets/Thoat.png');
        this.load.image('anhnen1', 'assets/level2_1.png');
        this.load.image('anhnen2', 'assets/level2_2.png');
    },

    create: function () {
        console.log('Đã vào guideScene');
        this.cameras.main.fadeIn(500, 0, 0, 0);
        this.backgroundMusic3 = this.sound.add('nhacnen', { loop: true });
    //    this.backgroundMusic3.play();
        bgParallax1 = this.add.tileSprite(1920 / 2, 1080 / 2, config.width, config.height , 'anhnen1');
        bgParallax2 = this.add.tileSprite(1920 / 2, 1080 / 2, config.width, config.height, 'anhnen2');
                      
        var rectangle = this.add.rectangle(this.game.config.width / 2, this.game.config.height / 2, 1050, 850, 0xFFFFFF);
        rectangle.setOrigin(0.5);
        rectangle.setStrokeStyle(7, 0x000000);
        var message = "Thông tin về trò chơi";
        var style = {
            fontSize: '60px',
            fill: '#FF0000',
            fontFamily: 'Time new roman',
            align: 'center'
        };
        var text = this.add.text(930, 170, message, style);
        text.setOrigin(0.5);
        var message = "Trò chơi được tạo ra với mục đích ôn tập kiến thức\nmôn Tin học lớp 11.";
        var style = {
            fontSize: '40px',
            fill: '#000000',
            fontFamily: 'Time new roman',
            align: 'left',
            lineSpacing: 20  
        };
        var text = this.add.text(900, 300, message, style);
        text.setOrigin(0.5);
        var message = "Sinh viên thực hiện: Đặng Văn Phương\nChi tiết liên hệ: phuongdv2605@gmail.com";
        var style = {
            fontSize: '40px',
            fill: '#000000',
            fontFamily: 'Time new roman',
            align: 'left',
            lineSpacing: 30 
        };
        var text = this.add.text(850, 440, message, style);
        text.setOrigin(0.5);
        var message = "Tài nguyên phục vụ phát triển trò chơi";
        var style = {
            fontSize: '50px',
            fill: '#FF0000',
            fontFamily: 'Time new roman',
            align: 'center'
        };
        var text = this.add.text(930, 590, message, style);
        text.setOrigin(0.5);
        var message = "https://ansimuz.itch.io/underwater-diving\nhttps://rare-gallery.com/550174-pixel-art-sea.html\nhttps://mixkit.co/free-sound-effects/";
        var style = {
            fontSize: '40px',
            fill: '#000000',
            fontFamily: 'Time new roman',
            align: 'left',
            lineSpacing: 40  
        };
        var text = this.add.text(890, 760, message, style);
        text.setOrigin(0.5);

        var message = "Xin cảm ơn!";
        var style = {
            fontSize: '50px',
            fill: '#000000',
            fontFamily: 'Time new roman',
            align: 'left',
            lineSpacing: 40  
        };
        var text = this.add.text(1300, 900, message, style);
        text.setOrigin(0.5);
         // nut thoat
         var thoatButton = this.add.image(config.width - 70, 130, 'thoat').setOrigin(1, 0).setScale(0.1);
         thoatButton.setTintFill(0xFFFFFF); 
         thoatButton.setInteractive();
         thoatButton.on('pointerup', function () {
             this.backgroundMusic3.stop();
             this.scene.start('MenuScene');
         }, this);       
    }
});
