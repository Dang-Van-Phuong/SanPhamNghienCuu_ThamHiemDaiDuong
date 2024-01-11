var HuongDanLevel5 = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize: function MenuScene() {
        Phaser.Scene.call(this, { key: 'HuongDanLevel5' });
    },

    preload: function () {
        this.load.image('taungamhuongdan', 'assets/TauNgamHuongDan.png');
        this.load.image('nutbam', 'assets/NutBam.png');
        this.load.image('anhnen5.1', 'assets/level5_1.png');
        this.load.image('anhnen5.2', 'assets/level5_2.png');
        this.load.image('anhnen5.3', 'assets/level5_3.png');
        this.load.image('anhnen5.4', 'assets/level5_4.png');
        this.load.image('vien', 'assets/vien.png');
        this.load.image('nguloi', 'assets/NguLoi.png');
        this.load.image('oxi', 'assets/oxi.png');
        this.load.image('thoat', 'assets/Thoat.png');
        this.load.image('bomnguloi', 'assets/bomnguloi.png');

        this.load.atlas('Nguoinhienlieu', 'assets/NguoiNhienLieu.png', 'assets/NguoiNhienLieu.json');
        this.load.atlas('CoHoi', 'assets/CoHoi.png', 'assets/CoHoi.json');

        this.load.spritesheet('TauNgamChet', 'assets/TauNgam_die.png', { frameWidth: 52, frameHeight: 53 });
		this.load.spritesheet('QuaiVatChet', 'assets/QuaiVat_die.png', { frameWidth: 78, frameHeight: 87 });
        this.load.spritesheet('tiepnhienlieu', 'assets/TiepNhienLieu.png', { frameWidth: 80, frameHeight: 80 });
        this.load.spritesheet('taungam', 'assets/TauNgam.png', { frameWidth: 200, frameHeight: 70 });
		this.load.spritesheet('quaivat_lever5', 'assets/QuaiVat_lever5.png', { frameWidth: 84, frameHeight: 56 });
    },
    create: function () {
            bgParallax1 = this.add.tileSprite(1920 / 2, 1080 / 2, config.width, config.height - 200, 'anhnen5.1');
            bgParallax2 = this.add.tileSprite(1920 / 2, 1080 / 2, config.width, config.height - 200, 'anhnen5.2');
            bgParallax3 = this.add.tileSprite(1920 / 2, 1080 / 2, config.width, config.height - 200, 'anhnen5.3');
            bgParallax4 = this.add.tileSprite(1920 / 2, 1080 / 2, config.width, config.height - 200, 'anhnen5.4');
            // vien anh
            var vienHeight = 170;
            var vienWidth = config.width;

            var vienTop = this.add.image(config.width / 2, vienHeight / 2, 'vien');
            vienTop.setDisplaySize(vienWidth, vienHeight);
            var vienBottom = this.add.image(config.width / 2, config.height - vienHeight / 2, 'vien');
            vienBottom.setDisplaySize(vienWidth, vienHeight);
              // hien hinh anh len man hinh
            this.add.image(900, config.height - 120, 'oxi').setScale(1.4);
        // this.add.image(config.width / 2 + 175, config.height - 125, 'nguloi').setScale(1.4);
            this.add.image(175, config.height - 125, 'CoHoi', 'threeLives').setScale(1.1);
            this.add.image(config.width - 250, config.height - 125, 'Nguoinhienlieu', 'zeroDivers').setScale(1.4);
         
         this.anims.create({
            key: 'taungam',
            frames: this.anims.generateFrameNumbers('taungam'),
            frameRate: 8,
            repeat: -1
        });
          // tao tau ngam
        this.player = this.physics.add.sprite(200, 350, 'taungam').setCollideWorldBounds(true);
        this.player.setFlipX(true);
        this.player.anims.play('taungam');
        this.player.setScale(1);  
       
        this.anims.create({
			key: 'tiepnhienlieu',
			frames: this.anims.generateFrameNumbers('tiepnhienlieu'),
			frameRate: 12,
			repeat: -1
		});
        this.swimmers = this.physics.add.sprite(1600, 350, 'tiepnhienlieu').setCollideWorldBounds(true);
        this.swimmers.setFlipX(true);
        this.swimmers.anims.play('tiepnhienlieu');
        this.swimmers.setScale(2);  

        this.anims.create({
            key: 'quaivat_lever5',
            frames: this.anims.generateFrameNumbers('quaivat_lever5'),
            frameRate: 8,
            repeat: -1
        });
        this.monsters = this.physics.add.sprite(200, 700, 'quaivat_lever5').setCollideWorldBounds(true);
        this.monsters.setFlipX(true);
        this.monsters.anims.play('quaivat_lever5');
        this.monsters.setScale(5);  
        
        // bien oxi
        this.oxi = 3000;
        this.oxiText = this.add.text(890, config.height - 155, this.oxi, {
            fontSize: '55px',
            fill: '#ffffff',
            fontFamily: 'pixel_font',
        }).setDepth(1);
         // bien cap do
         var levelText = this.add.text(50, 95, 'Cấp độ: 5', { fontSize: '55px', fill: '#ffffff', fontFamily: 'pixel_font' });
         levelText.setDepth(1);
        //  this.nguloi = 20; // ngu loi ban dau
        //  this.nguloiText = this.add.text(1150, config.height - 155, this.nguloi, {
        //      fontSize: '55px',
        //      fill: '#ffffff',
        //      fontFamily: 'pixel_font',
        //  }).setDepth(1);
         // bien diem
         this.ScoreCount = 0,
         this.ScoreText = this.add.text(1320, 100, 'Điểm: ' + this.ScoreCount, {
             fontSize: '55px',
             fill: '#ffffff',
             fontFamily: 'Arial, sans-serif'
         });
         this.ScoreText.setDepth(1);

         var self = this; 
         var tauNgamHuongDan = this.add.image(0, config.height / 2 + 200, 'taungamhuongdan').setScale(2.8);
         tauNgamHuongDan.setOrigin(0, 0.5);
         var container = this.add.container(config.width / 2, config.height / 2);
         this.add.existing(tauNgamHuongDan);
         
         // Tween để di chuyển tauNgamHuongDan từ phía trái đến giữa màn hình
         this.tweens.add({
             targets: tauNgamHuongDan,
             x: config.width - 600,
             duration: 2000,
             ease: 'Power2',
             onComplete: function () {
                 // Thêm hinh chu nhat
                 var centerX = config.width / 2;
                 var centerY = config.height / 2;
                 var rectangle = self.add.rectangle(centerX, centerY, 1050, 750, 0xFFFFFF);
                 rectangle.setOrigin(0.5);
                 rectangle.setStrokeStyle(7, 0x000000); 
                var textY = centerY - 650 / 2 + 70;
            // Tạo văn bản cho dòng đầu tiên
                var message1 = "Xin thông báo!";
                var style1 = {
                    fontSize: '80px',
                    fill: '#FF0000',
                    fontFamily: 'Arial',
                    align: 'center',
                    baselineY: 0,
                };
                var text1 = self.add.text(centerX, textY, message1, style1);
                text1.setOrigin(0.5);
                textY += 250; 

                var message2 = "Đã đến một hang động nguy hiểm.\nCó vẻ đây là nơi ở của bạch tuột\nkhổng lồ. Hãy cẩn thận!"
                var style2 = {
                    fontSize: '53px', 
                    fill: 0xFFFFFF, 
                    fontFamily: 'Arial',
                    align: 'left',
                    lineSpacing: 40,  
                };
                var text2 = self.add.text(centerX, textY, message2, style2);
                text2.setOrigin(0.5);                
               //
               var message3 = "Di chuyển để tránh bạch tuột.\nKhông thể sử dụng ngư lôi\ntrong hang động.";
               var style3 = {
                   fontSize: '55px',
                   fill: 0xFFFFFF, 
                   fontFamily: 'Arial',
                   align: 'left',
                   lineSpacing: 60,  
               };
               var text3 = self.add.text(centerX, textY, message3, style3);
               text3.setOrigin(0.5);
               text3.visible = false; 

               var message4 = "Chỉ có 3 cơ hội và một ít oxi. Khi hết\n1 trong 2 sẽ thất bại.\nRước người tiếp nhiên liệu bằng cách\ntrả lời câu hỏi.";
               var style4 = {
                   fontSize: '55px',
                   fill: 0xFFFFFF, 
                   fontFamily: 'Arial',
                   align: 'left',
                   lineSpacing: 40,  
               };
               var text4 = self.add.text(centerX, textY, message4, style4);
               text4.setOrigin(0.5);
               text4.visible = false; 
               textY += 250; 
    
                var button = self.add.sprite(1250, 800, 'nutbam');
                button.setScale(0.3, 0.28);
                var buttonText = self.add.text(button.x, button.y, 'Tiếp tục', {
                    fontSize: '35px',
                    fill: '0xFFFFFF',
                    fontFamily: 'Arial, sans-serif',
                    align: 'center',
                });
                buttonText.setOrigin(0.5);                  
            var instructionState = 1; 
            this.tron1 = null;
            this.tron2 = null;
            this.tron3 = null;
            this.tron4 = null;
            button.setInteractive().on('pointerdown', function () {            
                switch (instructionState) {
                    case 1:
                        text1.visible = false;
                        text2.visible = false;
                        text3.visible = true;
                        break;
                   
                    case 2:
                        text4.visible = true;
                        text3.visible = false;

                        if (this.tron1) {
                            this.tron1.destroy();
                        }
                            this.tron2 = self.add.circle(175, config.height - 125, 120, 0x00FF00);
                            this.tron2.setAlpha(0.5);
                            this.tron2.setDepth(100);
                            this.tron2.setStrokeStyle(5, 0x000000); 
                            this.tron3 = self.add.circle(880, config.height - 125, 120, 0xFFFF00);
                            this.tron3.setAlpha(0.5);
                            this.tron3.setDepth(100);
                            this.tron3.setStrokeStyle(5, 0x000000); 
                
                            this.tron4 = self.add.circle(config.width - 250, config.height - 105, 200, 0x800080);
                            this.tron4.setAlpha(0.5);
                            this.tron4.setDepth(100);
                            this.tron4.setStrokeStyle(5, 0x000000); 
                            buttonText.setText('Bắt đầu');
                        break;
                       
                    case 3:
                        if (this.tron2) {
                            this.tron2.destroy();
                        }
                        if (this.tron3) {
                            this.tron3.destroy();
                        }
                        if (this.tron4) {
                            this.tron4.destroy();
                        }
                        self.scene.start('Level5Scene');
                        break;
                }
            
                // Tăng trạng thái
                instructionState++;
            }, this);
            
            }
        });
 
    },
    update: function () {
        bgParallax1.tilePositionX -= 1;
        bgParallax2.tilePositionX -= 2;
        bgParallax3.tilePositionX -= 3;
        bgParallax4.tilePositionX -= 4;
    }

})
