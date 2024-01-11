var ChonKhoi = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize: function Dangnhapscene() {
        Phaser.Scene.call(this, { key: 'ChonKhoi' });
        
    },
   
    preload: function () {
        this.load.image('anhnen', 'assets/anhnen.png');
    },

    create: function () {
        console.log('Đã vào Dangnhapscene');
        var backgroundImage = this.add.tileSprite(0, 0, 1920, 1080, 'anhnen');
        backgroundImage.setOrigin(0, 0);
        var titleText = this.add.text(500, 150, 'Mời bạn chọn khối lớp', {
            fontSize: '110px',
            fill: '#ff0',
            fontFamily: 'pixel_font',
            align: 'center',

        });
    
        this.tweens.add({
            targets: titleText,
            scaleX: 1.05,
            scaleY: 1.05,
            duration: 1000,
            yoyo: true,
            repeat: -1
        });
    
        var button1 = this.createButton(850, 400, 'Lớp 10');
        var button2 = this.createButton(850, 550, 'Lớp 11');
        var button3 = this.createButton(850, 700, 'Lớp 12');
         // gan su kien cho moi nut
         button1.on('pointerdown', () => {
            var rectangle = this.add.rectangle(config.width / 2, config.height / 2 + 70, 700, 500, 0xFFFFFF);
            rectangle.setOrigin(0.5);
            rectangle.setStrokeStyle(7, 0x000000); // do rong cua vien va mau sac
            var message1 = "Chức năng này chưa mở.\nVui lòng quay lại sau!";
            var style1 = {
                fontSize: '50px',
                fill: '#000',
                fontFamily: 'Tim new roman',
                align: 'center',
                baselineY: 0,
                lineSpacing: 20, 
            };
            var text1 = this.add.text(config.width / 2, config.height / 2 -20, message1, style1);
            text1.setOrigin(0.5);
            var style2 = {
                fontSize: '70px',
                fill: '#ff0000',
                fontFamily: 'Tim new roman',
                align: 'center',
                baselineY: 0,
                lineSpacing: 20, 

            };
            // tao nut ok
            var okText = this.add.text(config.width / 2, config.height / 2 + 180, "OK", style2);
            okText.setOrigin(0.5);            
            okText.setInteractive({ useHandCursor: true });
            okText.on('pointerdown', () => {
                rectangle.destroy();
                text1.destroy();
                okText.destroy();
            });
        });
        button2.on('pointerdown', () => {
            this.scene.start('LoadGame');
        });
    
        button3.on('pointerdown', () => {
            var rectangle = this.add.rectangle(config.width / 2, config.height / 2 + 70, 700, 500, 0xFFFFFF);
            rectangle.setOrigin(0.5);
            rectangle.setStrokeStyle(7, 0x000000);
            var message2 = "Chức năng này chưa mở.\nVui lòng quay lại sau!";
            var style2 = {
                fontSize: '50px',
                fill: '#000',
                fontFamily: 'Tim new roman',
                align: 'center',
                baselineY: 0,
                lineSpacing: 20, 
            };
            var text2 = this.add.text(config.width / 2, config.height / 2 - 20, message2, style2);
            text2.setOrigin(0.5);
            var style3 = {
                fontSize: '70px',
                fill: '#ff0000',
                fontFamily: 'Tim new roman',
                align: 'center',
                baselineY: 0,
                lineSpacing: 20, 
            };
            var okText = this.add.text(config.width / 2, config.height / 2 + 180, "OK", style3);
            okText.setOrigin(0.5);
            okText.setInteractive({ useHandCursor: true });
            okText.on('pointerdown', () => {
                rectangle.destroy();
                text2.destroy();
                okText.destroy();
            });
        });
    },
    createButton: function (x, y, text) {
        var buttonWidth = 220; // chieu rong cua nut
        var buttonHeight = 90; // chieu cao cua nut
        var cornerRadius = 10; // ban kinh
        var button = this.add.text(x, y, text, {
        fontSize:  '60px',
        fill: '#fff',
        padding: {
            left: 20,
            right: 20,
            top: 10,
            bottom: 10
        },
        align: 'center',
        fontFamily: 'pixel_font'
        });
    var buttonBorder = this.add.graphics();
    buttonBorder.lineStyle(6, 0xffffff); // Độ dày và màu của viền
    buttonBorder.   strokeRoundedRect(840,390, buttonWidth + 20, buttonHeight + 20, cornerRadius);
    buttonBorder.strokeRoundedRect(840,540, buttonWidth + 20, buttonHeight + 20, cornerRadius);
    buttonBorder.strokeRoundedRect(840,690, buttonWidth + 20, buttonHeight + 20, cornerRadius);

    button.setInteractive({ useHandCursor: true });

    button.on('pointerover', function () {
        button.setStyle({ fill: '#ff0' });
    });

    button.on('pointerout', function () {
        button.setStyle({ fill: '#fff' });
    });

    return button;
},
    update: function () {
        this.children.list.forEach(function (child) {
            if (child instanceof Phaser.GameObjects.TileSprite) {
                child.tilePositionX -= 2; // toc do chay nen
            }
        }, this);

    },
});
