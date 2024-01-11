var HuongDanLevel4 = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize: function MenuScene() {
        Phaser.Scene.call(this, { key: 'HuongDanLevel4' });
    },

    preload: function () {
        this.load.image('anhnen4.1', 'assets/level2_1.png');
        this.load.image('anhnen4.2', 'assets/level2_2.png');
        this.load.image('icon_die', 'assets/icon_lever4.png');
        this.load.image('taungamhuongdan', 'assets/TauNgamHuongDan.png');
        this.load.image('nutbam', 'assets/NutBam.png');
        this.load.image('oxi', 'assets/oxi.png');
        this.load.image('vien', 'assets/vien.png');
        this.load.image('nguloi', 'assets/NguLoi.png');
        this.load.image('thoat', 'assets/Thoat.png');
        this.load.image('bomnguloi', 'assets/bomnguloi.png');
        this.load.image('bom4', 'assets/bom_lever4.png');

        this.load.atlas('CoHoi', 'assets/CoHoi.png', 'assets/CoHoi.json');

        this.load.spritesheet('TauNgamChet', 'assets/TauNgam_die.png', { frameWidth: 52, frameHeight: 53 });
		this.load.spritesheet('QuaiVatChet', 'assets/QuaiVat_die.png', { frameWidth: 78, frameHeight: 87 });
        this.load.spritesheet('tiepnhienlieu', 'assets/TiepNhienLieu.png', { frameWidth: 80, frameHeight: 80 });
        this.load.spritesheet('taungam', 'assets/TauNgam.png', { frameWidth: 200, frameHeight: 70 });
        this.load.spritesheet('Quaivat', 'assets/QuaiVat_lever4.png', { frameWidth: 54, frameHeight: 22 });
    },
    create: function () {
            bgParallax1 = this.add.tileSprite(1920 / 2, 1080 / 2, config.width, config.height - 200, 'anhnen4.1');
            bgParallax2 = this.add.tileSprite(1920 / 2, 1080 / 2, config.width, config.height - 200, 'anhnen4.2');
            // vien anh
            var vienHeight = 170;
            var vienWidth = config.width;

            var vienTop = this.add.image(config.width / 2, vienHeight / 2, 'vien');
            vienTop.setDisplaySize(vienWidth, vienHeight);
            var vienBottom = this.add.image(config.width / 2, config.height - vienHeight / 2, 'vien');
            vienBottom.setDisplaySize(vienWidth, vienHeight);
                // hien hinh anh len man hinh
            this.add.image(950, config.height - 120, 'icon_die').setScale(1.4);
            // this.add.image(config.width / 2 + 175, config.height - 125, 'nguloi').setScale(1.4);
            this.add.image(175, config.height - 125, 'oxi').setScale(1.2);
            this.add.image(config.width - 250, config.height - 125, 'bom4').setScale(0.2);
         
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
        this.player.setScale(1);  // kich thuoc mong muon
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
            key: 'Quaivat',
            frames: this.anims.generateFrameNumbers('Quaivat'),
            frameRate: 6,
            repeat: -1
        });
        this.monsters = this.physics.add.sprite(200, 700, 'Quaivat').setCollideWorldBounds(true);
        this.monsters.setFlipX(true);
        this.monsters.anims.play('Quaivat');
        this.monsters.setScale(3.5);  
        // bien oxi
        this.oxi = 2000;
        this.oxiText = this.add.text(150, config.height - 155, this.oxi, {
            fontSize: '55px',
            fill: '#ffffff',
            fontFamily: 'pixel_font',
        }),
        // bien thoi gian
        this.thoigian = 5;
        this.thoigianText = this.add.text(950, config.height - 155, this.thoigian, {
            fontSize: '55px',
            fill: '#ffffff',
            fontFamily: 'pixel_font',
        }).setDepth(1);
         // bien cap do
         var levelText = this.add.text(50, 95, 'Cấp độ: 4', { fontSize: '55px', fill: '#ffffff', fontFamily: 'pixel_font' });
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

         this.nguloi = 18,
         this.ScoreText = this.add.text(1740, 925, this.nguloi, {
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
         
         //  tauNgamHuongDan từ phía trái đến giữa màn hình
         this.tweens.add({
             targets: tauNgamHuongDan,
             x: config.width - 600,
             duration: 2000,
             ease: 'Power2',
             onComplete: function () {
                 // Them hinh chu nhat
                 var centerX = config.width / 2;
                 var centerY = config.height / 2;
                 var rectangle = self.add.rectangle(centerX, centerY, 1100, 750, 0xFFFFFF);
                 rectangle.setOrigin(0.5);
                 rectangle.setStrokeStyle(7, 0x000000); 
                var textY = centerY - 650 / 2 + 70;

                var message2 = "Xin thông báo";
                var style2 = {
                    fontSize: '80px',
                    fill: '#FF0000',
                    fontFamily: 'Arial',
                    align: 'center',
                    baselineY: 0,
                };
                var text2 = self.add.text(centerX, textY, message2, style2);
                text2.setOrigin(0.5);
                textY += 250; 

                var message3 = "Tàu ngầm đến vùng cá mập.\nHãy bắt đầu khám phá và cần lưu ý\ncác đều sau!"
                var style3 = {
                    fontSize: '55px', 
                    fill: 0xFFFFFF,
                    fontFamily: 'Arial',
                    align: 'left',
                    lineSpacing: 40,  
                };
                var text3 = self.add.text(centerX, textY, message3, style3);
                text3.setOrigin(0.5);                
               var message4 = "Thả ngư lôi vào những con cá mập\nđể trả lời câu hỏi và cần chú ý oxi\nở vùng nước này. Bởi vì...";
               var style4 = {
                   fontSize: '55px',
                   fill: 0xFFFFFF, 
                   fontFamily: 'Arial',
                   align: 'left',
                   lineSpacing: 60,  
               };
               var text4 = self.add.text(centerX, textY, message4, style4);
               text4.setOrigin(0.5);
               text4.visible = false; 
               var message5 = "Oxi và ngư lôi ở vùng này rất ít\nkhi 1 trong 2 hết sẽ thất bại.\nChúc may mắn!";
               var style5 = {
                   fontSize: '55px',
                   fill: 0xFFFFFF, 
                   fontFamily: 'Arial',
                   align: 'left',
                   lineSpacing: 60,  
               };
               var text5 = self.add.text(centerX, textY, message5, style5);
               text5.setOrigin(0.5);
               text5.visible = false; 
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
                        text2.visible = false;
                        text3.visible = false;
                        text4.visible = true;
                        this.tron1 = self.add.circle(config.width / 2 - 30 , config.height - 125, 100, 0xFF0000);
                        this.tron1.setAlpha(0.5);
                        this.tron1.setDepth(100);
                        this.tron1.setStrokeStyle(5, 0x000000 ); 
                        break;
                    case 2:
                        text4.visible = false;
                        text5.visible = true;
            
                        if (this.tron1) {
                            this.tron1.destroy();
                        }
                        this.tron2 = self.add.circle(175, config.height - 125, 120, 0xFFFF00);
                        this.tron2.setAlpha(0.5);
                        this.tron2.setDepth(100); 
                        this.tron2.setStrokeStyle(5, 0x000000); 
                        this.tron4 = self.add.circle(config.width - 250, config.height - 105, 200, 0x00FF00);
                        this.tron4.setAlpha(0.5);
                        this.tron4.setDepth(100);
                        this.tron4.setStrokeStyle(5, 0x000000); 
                        break;
                    case 3:
                        if (this.tron2) {
                            this.tron2.destroy();
                        }
                        if (this.tron4) {
                            this.tron4.destroy();
                        }
                        buttonText.setText('Bắt đầu');
                        self.scene.start('level4scene');
                        break;
                }
            
                // Tăng trạng thái
                instructionState++;
            }, this);
            
            }
        });
 
    },
    update: function () {

    }

})
