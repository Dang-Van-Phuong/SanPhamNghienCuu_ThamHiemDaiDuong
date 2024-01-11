
var ChungNhan = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize: function Dangnhapscene() {
        Phaser.Scene.call(this, { key: 'ChungNhan' });
        
    },

    preload: function () {
        this.load.image('anhnen', 'assets/anhnen.png');
        this.load.image('chungnhan', 'assets/Chungnhan.png');
    },
    
    create: function () {
        // const jsPDF = window.jspdf;  // Dòng này có thể bỏ đi
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
        
        var chucmungImage = this.add.image(config.width / 2, config.height / 2, 'chungnhan');
        chucmungImage.setOrigin(0.5);
        chucmungImage.setScale(0.6); 

        
        var button1 = this.createButton(1600, 400, 'Xuất giấy\n chứng nhận');
        var button2 = this.createButton(1630, 620, 'Quay lại');
        button2.on('pointerdown', () => {
            this.scene.start('MenuScene');
        });
        button1.on('pointerdown', () => {
            const pdf = new jsPDF();
            var imgData = this.textures.get('chungnhan').source;
            pdf.addImage(imgData, 'PNG', 10, 10, 100, 100);
            pdf.save('chungnhan.pdf');
        });
    },    
    createButton: function (x, y, text) {
        var buttonWidth = 220;
        var buttonHeight = 90;
        var cornerRadius = 10;
    
        var button = this.add.text(x, y, text, {
            fontSize:  '40px',
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
        buttonBorder.lineStyle(6, 0xffffff);
        buttonBorder.strokeRoundedRect(1600, 400, buttonWidth + 20, buttonHeight + 20, cornerRadius);
        buttonBorder.strokeRoundedRect(1600, 600, buttonWidth + 20, buttonHeight + 20, cornerRadius);

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
    },
});
