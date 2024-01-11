var HuongDanLevel1 = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize: function MenuScene() {
        Phaser.Scene.call(this, { key: 'HuongDanLevel1' });
    },

    preload: function () {
        this.load.image('taungamhuongdan', 'assets/TauNgamHuongDan.png');
        this.load.image('nutbam', 'assets/NutBam.png');

        this.load.image('anhnen1.1', 'assets/level1_1.png');
        this.load.image('anhnen1.2', 'assets/level1_2.png');
        this.load.image('anhnen1.3', 'assets/level1_3.png');
        this.load.image('anhnen1.4', 'assets/level1_4.png');
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
        this.load.spritesheet('QuaiVat_Lever1', 'assets/QuaiVat_Lever1.png', { frameWidth: 54, frameHeight: 49 });
    },
    create: function () {

            bgParallax1 = this.add.tileSprite(1920 / 2, 1080 / 2, config.width, config.height - 200, 'anhnen1.1');
            bgParallax2 = this.add.tileSprite(1920 / 2, 1080 / 2, config.width, config.height - 200, 'anhnen1.2');
            bgParallax3 = this.add.tileSprite(1920 / 2, 1080 / 2, config.width, config.height - 200, 'anhnen1.3');
            bgParallax4 = this.add.tileSprite(1920 / 2, 1080 / 2, config.width, config.height - 200, 'anhnen1.4');
                    // vien anh
            var vienHeight = 170;
            var vienWidth = config.width;

            var vienTop = this.add.image(config.width / 2, vienHeight / 2, 'vien');
            vienTop.setDisplaySize(vienWidth, vienHeight);
            var vienBottom = this.add.image(config.width / 2, config.height - vienHeight / 2, 'vien');
            vienBottom.setDisplaySize(vienWidth, vienHeight);
              // hien hinh anh len man hinh
         this.add.image(700, config.height - 120, 'oxi').setScale(1.4);
         this.add.image(config.width / 2 + 175, config.height - 125, 'nguloi').setScale(1.4);
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
        this.player.setScale(1);  // Thay doi kich thuoc tau ngam
       
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
            key: 'QuaiVat_Lever1',
            frames: this.anims.generateFrameNumbers('QuaiVat_Lever1'),
            frameRate: 8,
            repeat: -1
        });
        this.monsters = this.physics.add.sprite(200, 700, 'QuaiVat_Lever1').setCollideWorldBounds(true);
        this.monsters.setFlipX(true);
        this.monsters.anims.play('QuaiVat_Lever1');
        this.monsters.setScale(2.3);  
        
        // bien oxi
        this.oxi = 3000;
        this.oxiText = this.add.text(670, config.height - 155, this.oxi, {
            fontSize: '55px',
            fill: '#ffffff',
            fontFamily: 'pixel_font',
        }).setDepth(1);
         // bien cap do
         var levelText = this.add.text(50, 95, 'Cấp độ:1', { fontSize: '55px', fill: '#ffffff', fontFamily: 'pixel_font' });
         levelText.setDepth(1);
         this.nguloi = 20; // ngu loi ban dau
         this.nguloiText = this.add.text(1150, config.height - 155, this.nguloi, {
             fontSize: '55px',
             fill: '#ffffff',
             fontFamily: 'pixel_font',
         }).setDepth(1);
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
    
         // hieu ung di den giua man hinh
         this.tweens.add({
             targets: tauNgamHuongDan,
             x: config.width - 600,
             duration: 2000,
             ease: 'Power2',
             onComplete: function () {
                 // them hinh chu nhat
                var centerX = config.width / 2;
                var centerY = config.height / 2;
                var rectangle = self.add.rectangle(centerX, centerY, 1000, 700, 0xFFFFFF);
                rectangle.setOrigin(0.5);
                rectangle.setStrokeStyle(7, 0x000000);
                var textY = centerY - 650 / 2 + 70;

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

                var message2 = "Tàu ngầm đã đến đáy đại dương.\nĐây là địa hình có nhiều cá dữ \nxin hãy cẩn thận."
                var style2 = {
                    fontSize: '55px', 
                    fill: 0xFFFFFF, // Mau trang
                    fontFamily: 'Arial',
                    align: 'left',
                    lineSpacing: 60,  
                };
                var text2 = self.add.text(centerX, textY, message2, style2);
                text2.setOrigin(0.5);                
    
               var message3 = "     Sử dụng:\n     Các phím mũi tên để di chuyển tàu ngầm.\n     Phím space để phóng ngư lôi.  ";
               var style3 = {
                   fontSize: '50px',
                   fill: 0xFFFFFF, 
                   fontFamily: 'Arial',
                   align: 'left',
                   lineSpacing: 60,  
               };
               var text3 = self.add.text(centerX, textY -70, message3, style3);
               text3.setOrigin(0.5);
               text3.visible = false; // an ngay tu dau
               var message4 = "Chỉ có 3 cơ hội và một ít oxi.\nRước người tiếp nhiên liệu\nbằng cách trả lời câu hỏi.";
               var style4 = {
                   fontSize: '55px',
                   fill: 0xFFFFFF, // Màu trắng
                   fontFamily: 'Arial',
                   align: 'left',
                   lineSpacing: 50,  
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

                  
            var instructionState = 1; // dat mac dinh la 1
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
                        this.tron1 = self.add.circle(config.width / 2 + 155, config.height - 125, 100);
                        this.tron1.setAlpha(0.5);
                        this.tron1.setDepth(100);
                        this.tron1.setStrokeStyle(10, 0xFF0000, 2 ); 
                        break;
                    case 2:
                        text3.visible = false;
                        text4.visible = true;
                        buttonText.setText('Bắt đầu');
                        if (this.tron1) {
                            this.tron1.destroy();
                        }
                            this.tron2 = self.add.circle(175, config.height - 125, 120);
                            this.tron2.setAlpha(0.5);
                            this.tron2.setDepth(100);
                            this.tron2.setStrokeStyle(10, 0xFFFF00, 2); 
                            this.tron3 = self.add.circle(680, config.height - 125, 120);
                            this.tron3.setAlpha(0.5);
                            this.tron3.setDepth(100);
                            this.tron3.setStrokeStyle(10, 0x0000FF, 2); 
                            this.tron4 = self.add.circle(config.width - 250, config.height - 105, 200);
                            this.tron4.setAlpha(0.5);
                            this.tron4.setDepth(100);
                            this.tron4.setStrokeStyle(10, 0x800080, 2); 
                        break;
                    case 3:
                        // Xóa vong tron
                        if (this.tron2) {
                            this.tron2.destroy();
                        }
                        if (this.tron3) {
                            this.tron3.destroy();
                        }
                        if (this.tron4) {
                            this.tron4.destroy();
                        }
                        self.scene.start('Level1Scene');

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
