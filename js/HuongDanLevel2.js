var HuongDanLevel2 = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize: function MenuScene() {
        Phaser.Scene.call(this, { key: 'HuongDanLevel2' });
    },

    preload: function () {
        this.load.image('anhnen2.1', 'assets/level2_1.png');
        this.load.image('anhnen2.2', 'assets/level2_2.png');
        this.load.image('thoigian', 'assets/Thoigian.png');
        this.load.image('taungamhuongdan', 'assets/TauNgamHuongDan.png');
        this.load.image('nutbam', 'assets/NutBam.png');
        this.load.image('quaivat', 'assets/QuaiVat_lever2.png');

        this.load.image('vien', 'assets/vien.png');
        this.load.image('nguloi', 'assets/NguLoi.png');
        this.load.image('thoat', 'assets/Thoat.png');
        this.load.image('bomnguloi', 'assets/bomnguloi.png');
        this.load.atlas('Nguoinhienlieu', 'assets/NguoiNhienLieu.png', 'assets/NguoiNhienLieu.json');
        this.load.atlas('CoHoi', 'assets/CoHoi.png', 'assets/CoHoi.json');

        this.load.spritesheet('TauNgamChet', 'assets/TauNgam_die.png', { frameWidth: 52, frameHeight: 53 });
		this.load.spritesheet('QuaiVatChet', 'assets/QuaiVat_die.png', { frameWidth: 78, frameHeight: 87 });
        this.load.spritesheet('tiepnhienlieu', 'assets/TiepNhienLieu.png', { frameWidth: 80, frameHeight: 80 });
        this.load.spritesheet('taungam', 'assets/TauNgam.png', { frameWidth: 200, frameHeight: 70 });
    },
    create: function () {
            bgParallax1 = this.add.tileSprite(1920 / 2, 1080 / 2, config.width, config.height - 200, 'anhnen2.1');
            bgParallax2 = this.add.tileSprite(1920 / 2, 1080 / 2, config.width, config.height - 200, 'anhnen2.2');
          
            // vien anh
            var vienHeight = 170;
            var vienWidth = config.width;

            var vienTop = this.add.image(config.width / 2, vienHeight / 2, 'vien');
            vienTop.setDisplaySize(vienWidth, vienHeight);
            var vienBottom = this.add.image(config.width / 2, config.height - vienHeight / 2, 'vien');
            vienBottom.setDisplaySize(vienWidth, vienHeight);
            // hien hinh anh len man hinh
            this.add.image(950, config.height - 120, 'thoigian').setScale(1.4);
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
            key: 'QuaiVat_Lever1',
            frames: this.anims.generateFrameNumbers('QuaiVat_Lever1'),
            frameRate: 8,
            repeat: -1
        });
        this.monsters = this.physics.add.sprite(200, 700, 'quaivat').setCollideWorldBounds(true);
        this.monsters.setFlipX(true);
        this.monsters.anims.play('quaivat');
        this.monsters.setScale(2.3); 
        // bien oxi
        this.thoigian = 30;
        this.oxiText = this.add.text(950, config.height - 155, this.thoigian, {
            fontSize: '55px',
            fill: '#ffffff',
            fontFamily: 'pixel_font',
        }).setDepth(1);
         // bien cap do
         var levelText = this.add.text(50, 95, 'Cấp độ: 2', { fontSize: '55px', fill: '#ffffff', fontFamily: 'pixel_font' });
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
         
         //hieu ung di chuyen den giua man hinh
         this.tweens.add({
             targets: tauNgamHuongDan,
             x: config.width - 600,
             duration: 2000,
             ease: 'Power2',
             onComplete: function () {
                 // Them hinh chu nhat vao giua man hinh
                var centerX = config.width / 2;
                var centerY = config.height / 2;
                var rectangle = self.add.rectangle(centerX, centerY, 950, 750, 0xFFFFFF);
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
            // Tạo văn bản cho dòng thứ hai
                var message3 = "Tàu ngầm đến khu vực hiểm trở.\nNơi đây có rất nhiều gai biển.\nHãy cẩn thận!"
                var style3 = {
                    fontSize: '55px', 
                    fill: 0xFFFFFF, // Màu trắng
                    fontFamily: 'Arial',
                    align: 'left',
                    lineSpacing: 50,  
                };
                var text3 = self.add.text(centerX, textY, message3, style3);
                text3.setOrigin(0.5);                
    
               var message4 = "Di chuyển để tránh gai biển.\nÁp suất ở đây rất cao nên thời gian ở\nđây không nhiều.\nNgư lôi sẽ không hoạt động ở khu\nvực này.";
               var style4 = {
                   fontSize: '50px',
                   fill: 0xFFFFFF, 
                   fontFamily: 'Arial',
                   align: 'left',
                   lineSpacing: 50, 
               };
               var text4 = self.add.text(centerX, textY - 50, message4, style4);
               text4.setOrigin(0.5);
               text4.visible = false; 

               var message5 = "Hãy chú ý số cơ hội đang có.\nRước người tiếp nhiên liệu\nbằng cách trả lời câu hỏi.";
               var style5 = {
                   fontSize: '55px',
                   fill: 0xFFFFFF, 
                   fontFamily: 'Arial',
                   align: 'left',
                   lineSpacing: 70,  
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
                    align: 'left',
                });
                buttonText.setOrigin(0.5);
                  // Tạo sự kiện click cho nút    
            var instructionState = 1; // Trạng thái mặc định là 1
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
                        buttonText.setText('Bắt đầu');
                        break;
                    case 3:
                        if (this.tron2) {
                            this.tron2.destroy();
                        }
                       
                        if (this.tron4) {
                            this.tron4.destroy();
                        }
                        
                        self.scene.start('Level2Scene');
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
    }

})
