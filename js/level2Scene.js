var Level2Scene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
  
      function Level2Scene() { Phaser.Scene.call(this, { key: 'Level2Scene' }); },
  
    preload: function () { 
        
        this.load.image('anhnen2.1', 'assets/level2_1.png');
        this.load.image('anhnen2.2', 'assets/level2_2.png');
        this.load.image('vien', 'assets/vien.png');
        this.load.image('thoat', 'assets/Thoat.png');
        this.load.image('quaivat', 'assets/QuaiVat_lever2.png');
        this.load.image('thoigian', 'assets/Thoigian.png');

        this.load.atlas('CoHoi', 'assets/CoHoi.png', 'assets/CoHoi.json');
        this.load.atlas('Nguoinhienlieu', 'assets/NguoiNhienLieu.png', 'assets/NguoiNhienLieu.json');

        this.load.audio('nhacnenlevel2', 'assets/music/level2.mp3');
        this.load.audio('quaivatchet', 'assets/music/quaivatchet.mp3');
        this.load.audio('nguoi', 'assets/music/nguoi.mp3');
        this.load.audio('chonsai', 'assets/music/chonsai.mp3');

        this.load.spritesheet('tiepnhienlieu', 'assets/TiepNhienLieu.png', { frameWidth: 80, frameHeight: 80 });
        this.load.spritesheet('taungam', 'assets/TauNgam.png', { frameWidth: 200, frameHeight: 70 });
        this.load.spritesheet('TauNgamChet', 'assets/TauNgam_die.png', { frameWidth: 52, frameHeight: 53 });
        this.load.spritesheet('QuaiVatChet', 'assets/QuaiVat_die.png', { frameWidth: 78, frameHeight: 87 });
    },
    create: function () {
      // am thanh
        this.backgroundMusic1 = this.sound.add('quaivatchet', { loop: true });
        this.backgroundMusic2 = this.sound.add('nguoi', { loop: true });
        this.backgroundMusic3 = this.sound.add('nhacnenlevel2', { loop: true });
        this.backgroundMusic3.play();
        this.backgroundMusic4 = this.sound.add('chonsai', { loop: true });

        bgParallax1 = this.add.tileSprite(1920 / 2, 1080 / 2, config.width, config.height - 200, 'anhnen2.1');
        bgParallax2 = this.add.tileSprite(1920 / 2, 1080 / 2, config.width, config.height - 200, 'anhnen2.2');
        // vien anh
        var vienHeight = 170;
        var vienWidth = config.width;
        var vienTop = this.add.image(config.width / 2, vienHeight / 2, 'vien');
        vienTop.setDisplaySize(vienWidth, vienHeight);
        var vienBottom = this.add.image(config.width / 2, config.height - vienHeight / 2, 'vien');
        vienBottom.setDisplaySize(vienWidth, vienHeight);
        cursors = this.input.keyboard.createCursorKeys();

        this.cameras.main.fadeIn(500, 0, 0, 0);
        this.add.image(175, config.height - 125, 'CoHoi', 'threeLives').setScale(1.1);
        this.add.image(config.width - 250, config.height - 125, 'Nguoinhienlieu', 'zeroDivers').setScale(1.4);
         // cac bien
        this.ScoreCount = 0;
        this.DiversSavedCount = 1;
        this.CoHoi = 3;
        this.CollisionTimer = 0;
      //  this.isMoving = true;
        this.isSwimmerSpawningEnabled = true;  // bien kiem soat quai vat va nguoi boi
        this.isMonsterSpawningEnabled = true; 

        // animation
        this.anims.create({
            key: 'taungam',
            frames: this.anims.generateFrameNumbers('taungam'),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
			key: 'tiepnhienlieu',
			frames: this.anims.generateFrameNumbers('tiepnhienlieu'),
			frameRate: 7,
			repeat: -1
		});
        this.anims.create({
			key: 'TauNgamChet',
			frames: this.anims.generateFrameNumbers('TauNgamChet'),
			frameRate: 10,
			repeat: 0,
			hideOnComplete: true
		});
        this.anims.create({
			key: 'QuaiVatChet',
			frames: this.anims.generateFrameNumbers('QuaiVatChet'),
			frameRate: 20,
			repeat: 0,
			hideOnComplete: true
		});
       // Thoi gian
        this.timer = 30;
        this.timerText = this.add.text(config.width / 2 + 70, config.height - 120, this.timer, {
        fontSize: '40px',
        fill: '#ffffff',
        fontFamily: 'Arial, sans-serif'
        }).setOrigin(0.5, 0.5).setScale(1.5);
        this.timeImage = this.add.image(config.width / 2, config.height - 170, 'thoigian').setOrigin(0.5, 0).setScale(1.5);
        this.countdownEvent = this.time.addEvent({
            delay: 1000,
            callback: function () {
                this.timer--;
                this.updateTimeText();
                if (this.timer <= 0) {
                    this.YouLost();
                }
            },
            callbackScope: this,
            loop: true,
        });
       console.log('Đã vào lever2.scene');
        // nut thoat
        var thoatButton = this.add.image(config.width -20, 100, 'thoat').setOrigin(1, 0).setScale(0.1);
        thoatButton.setTintFill(0xFFFFFF); 
        thoatButton.setInteractive();
        thoatButton.on('pointerup', function () {
            this.backgroundMusic3.stop();
            this.scene.start('MenuScene');
        }, this);
        // tao tau ngam
        this.player = this.physics.add.sprite(200, 400, 'taungam').setCollideWorldBounds(true);
        this.player.setFlipX(false);
        this.player.anims.play('taungam');
        this.player.setScale(0.8);  //kich thuoc mong muon
        
        this.swimmers = this.physics.add.group();
        this.time.addEvent({
            delay: Phaser.Math.Between(4000, 6000), // thoi gian giua cac nguoi boi
            callback: this.spawnSwimmer,
            callbackScope: this,
            loop: true
        });
         // bien cap do
         var levelText = this.add.text(50, 95, 'Cấp độ: 2', { fontSize: '55px', fill: '#ffffff', fontFamily: 'pixel_font' });
         levelText.setDepth(1);
         // bien diem
         this.ScoreText = this.add.text(1320, 100, 'Điểm: ' + this.ScoreCount, {
             fontSize: '55px',
             fill: '#ffffff',
             fontFamily: 'Arial, sans-serif'
         });
         this.ScoreText.setDepth(1);
         // quai vat lever2
         this.monsters = this.physics.add.group();
         this.spawnMonster();
         // xử lí
            // tau ngam cham vao nguoi tiep nhien lieu
        this.physics.add.collider(this.player, this.swimmers, this.taungamNguoiTiepNhienLieuCollision, null, this);
        this.physics.add.collider(this.player, this.monsters, this.taungamQuaivatCollision, null, this);
    },
    // dung 
    handleCollision: function () {
        this.physics.pause();
        this.countdownEvent.paused = true;
        this.isMoving = true;
        this.isSwimmerSpawningEnabled = false;
        this.isMonsterSpawningEnabled = false;
    },
    // tiep tuc
    resumeGame: function () {
        this.physics.resume();
        this.countdownEvent.paused = false;
        this.isMoving = true;
        this.isSwimmerSpawningEnabled = true;
        if( this.isMonsterSpawningEnabled === false)    { 
           this.isMonsterSpawningEnabled = true;
           this.spawnMonster();
        }

    },
    congDiem: function()    {
        this.ScoreCount += 500;
        this.ScoreText.setText('Điểm: ' + this.ScoreCount);
        this.timer += 5;
        this.timerText.setText( this.timer); 
        this.timerText.setTint(0xffff00); 
        this.time.delayedCall(1000, function () {
            this.timerText.clearTint();
            this.timerText.setText(this.timer); 
        }, [], this);
    },
    CauHoi1: function() {
        var questionBox = this.add.rectangle(config.width / 2, config.height / 2, 1600, 700, 0xffffff );
        questionBox.setOrigin(0.5, 0.5);
        questionBox.setStrokeStyle(13, 0x003366); 
        var questionText = this.add.text(config.width / 2, config.height / 2 - 200, 'Để chia sẻ dữ liệu giữa hai máy tính, bạn có thể sử dụng cổng nào sau đây?', {
            fontSize: '50px',
            fill: '#000000',
            fontFamily: 'Times New Roman', 
            align: 'center',
            fontWeight: 'bold',
            lineSpacing: 20
        });
        questionText.setOrigin(0.5, 0.5);
        var buttonA = this.add.rectangle(1500, 700, 650, 100, 0x003366);
        buttonA.setOrigin(2, 2);
        var textA = this.add.text(450, 550, 'A. USB', {
            fontSize: '30px',
            fill: '#ffffff', 
            fontFamily: 'Times New Roman', 
            align: 'center'
        });
        textA.setOrigin(0.5, 0.5);
        var buttonB = this.add.rectangle(1350, 550, 650, 100, 0x003366);
        buttonB.setOrigin(0.5, 0.5);
        var textB = this.add.text(1300, 550, 'B. LAN(Ethernet)', {
            fontSize: '30px',
            fill: '#ffffff', 
            fontFamily: 'Times New Roman', 
            align: 'center'
        });
        textB.setOrigin(0.5, 0.5);
        var buttonC = this.add.rectangle( 530, 750, 650, 100, 0x003366);
        buttonC.setOrigin(0.5, 0.5);
        var textC = this.add.text(440, 750, 'C. HDMI', {
            fontSize: '27px',
            fill: '#ffffff', 
            fontFamily: 'Times New Roman', 
            align: 'center'
        });
        textC.setOrigin(0.5, 0.5);
        var buttonD = this.add.rectangle(1350, 750, 650, 100, 0x003366);
        buttonD.setOrigin(0.5, 0.5);
        var textD = this.add.text(1200, 730, 'D. Bluetooth', {
            fontSize: '30px',
            fill: '#ffffff', 
            fontFamily: 'Times New Roman', 
            align: 'center'
        });
        textC.setOrigin(0.5, 0.5);
           
            return new Promise((resolve, reject) => {
                buttonA.setInteractive().on('pointerup', function () {
                    buttonA.setFillStyle(0xFF0000);  
                    this.backgroundMusic4.play();
                    setTimeout(() => {
                        this.backgroundMusic4.stop();
                    }, 1000);
                    const self = this;
                    this.time.delayedCall(2000, function () {
                        self.cleanupQuestionUI(questionBox, questionText, buttonA, textA, buttonB, textB, buttonC, textC, buttonD, textD);
                        self.resumeGame();
                        resolve(false);
                    });
                   
                }, this);
                buttonB.setInteractive().on('pointerup', function () {
                    buttonB.setFillStyle(0x00ff00); 
                    const self = this;
                    this.time.delayedCall(2000, function () {
                        self.cleanupQuestionUI(questionBox, questionText, buttonA, textA, buttonB, textB, buttonC, textC, buttonD, textD);
                        self.resumeGame();
                        resolve(true);
                    });
                   
                }, this);
                buttonC.setInteractive().on('pointerup', function () {
                    buttonC.setFillStyle(0xFF0000);  
                    this.backgroundMusic4.play();
                    setTimeout(() => {
                        this.backgroundMusic4.stop();
                    }, 1000);
                    const self = this;
                    this.time.delayedCall(2000, function () {
                        self.cleanupQuestionUI(questionBox, questionText, buttonA, textA, buttonB, textB, buttonC, textC, buttonD, textD);
                        self.resumeGame();
                        resolve(false);
                    });
                   
                }, this);
                buttonD.setInteractive().on('pointerup', function () {
                    buttonD.setFillStyle(0xFF0000); 
                    this.backgroundMusic4.play();
                    setTimeout(() => {
                        this.backgroundMusic4.stop();
                    }, 1000); 
                    const self = this;
                    this.time.delayedCall(2000, function () {
                        self.cleanupQuestionUI(questionBox, questionText, buttonA, textA, buttonB, textB, buttonC, textC, buttonD, textD);
                        self.resumeGame();
                        resolve(false);
                    });
                }, this);
    });
},
CauHoi2: function() {
    var questionBox = this.add.rectangle(config.width / 2, config.height / 2, 1600, 700, 0xffffff );
    questionBox.setOrigin(0.5, 0.5);
    questionBox.setStrokeStyle(13, 0x003366); 
    var questionText = this.add.text(config.width / 2, config.height / 2 - 200, 'Đơn vị đo dung lượng RAM là gì? ', {
        fontSize: '50px',
        fill: '#000000',
        fontFamily: 'Times New Roman', 
        align: 'center',
        fontWeight: 'bold', 
        lineSpacing: 20
    });
    questionText.setOrigin(0.5, 0.5);
    var buttonA = this.add.rectangle(1500, 700, 650, 100, 0x003366);
    buttonA.setOrigin(2, 2);
    var textA = this.add.text(450, 550, 'A.	Gigabyte(GB) ', {
        fontSize: '30px',
        fill: '#ffffff', 
        fontFamily: 'Times New Roman',
        align: 'center'
    });
    textA.setOrigin(0.5, 0.5);
    var buttonB = this.add.rectangle(1250, 550, 650, 100, 0x003366);
    buttonB.setOrigin(0.5, 0.5);
    var textB = this.add.text(1250, 550, 'B. Byte', {
        fontSize: '30px',
        fill: '#ffffff', 
        fontFamily: 'Times New Roman', 
        align: 'center'
    });
    textB.setOrigin(0.5, 0.5);
    var buttonC = this.add.rectangle( 530, 750, 650, 100, 0x003366);
    buttonC.setOrigin(0.5, 0.5);
    var textC = this.add.text(440, 750, 'C.	Kilobyte(KB)', {
        fontSize: '30px',
        fill: '#ffffff', 
        fontFamily: 'Times New Roman', 
        align: 'center'
    });
    textC.setOrigin(0.5, 0.5);
    var buttonD = this.add.rectangle(1250, 750, 650, 100, 0x003366);
    buttonD.setOrigin(0.5, 0.5);
    var textD = this.add.text(1200, 730, 'D. Terabyte(TB)', {
        fontSize: '30px',
        fill: '#ffffff', 
        fontFamily: 'Times New Roman', 
        align: 'center'
    });
    textC.setOrigin(0.5, 0.5);
       
        return new Promise((resolve, reject) => {
            buttonA.setInteractive().on('pointerup', function () {
                buttonA.setFillStyle(0x00ff00); 
                const self = this;
                this.time.delayedCall(2000, function () {
                    self.cleanupQuestionUI(questionBox, questionText, buttonA, textA, buttonB, textB, buttonC, textC, buttonD, textD);
                    self.resumeGame();
                    resolve(true);
                });
               
            }, this);
            buttonB.setInteractive().on('pointerup', function () {
                buttonB.setFillStyle(0xFF0000);  
                this.backgroundMusic4.play();
                setTimeout(() => {
                    this.backgroundMusic4.stop();
                }, 1000);
                const self = this;
                this.time.delayedCall(2000, function () {
                    self.cleanupQuestionUI(questionBox, questionText, buttonA, textA, buttonB, textB, buttonC, textC, buttonD, textD);
                    self.resumeGame();
                    resolve(false);
                });
               
            }, this);
           
            buttonC.setInteractive().on('pointerup', function () {
                buttonC.setFillStyle(0xFF0000);  
                this.backgroundMusic4.play();
                setTimeout(() => {
                    this.backgroundMusic4.stop();
                }, 1000);
                const self = this;
                this.time.delayedCall(2000, function () {
                    self.cleanupQuestionUI(questionBox, questionText, buttonA, textA, buttonB, textB, buttonC, textC, buttonD, textD);
                    self.resumeGame();
                    resolve(false);
                });
               
            }, this);
            buttonD.setInteractive().on('pointerup', function () {
                buttonD.setFillStyle(0xFF0000); 
                this.backgroundMusic4.play();
                setTimeout(() => {
                    this.backgroundMusic4.stop();
                }, 1000); 
                const self = this;
                this.time.delayedCall(2000, function () {
                    self.cleanupQuestionUI(questionBox, questionText, buttonA, textA, buttonB, textB, buttonC, textC, buttonD, textD);
                    self.resumeGame();
                    resolve(false);
                });
            }, this);
});
},
CauHoi3: function() {
    var questionBox = this.add.rectangle(config.width / 2, config.height / 2, 1600, 700, 0xffffff );
    questionBox.setOrigin(0.5, 0.5);
    questionBox.setStrokeStyle(13, 0x003366); 
    var questionText = this.add.text(config.width / 2, config.height / 2 - 200, 'Bảng mạch chính của máy tính có chức năng gì?', {
        fontSize: '50px',
        fill: '#000000',
        fontFamily: 'Times New Roman', 
        align: 'center',
        fontWeight: 'bold', 
        lineSpacing: 20
    });
    questionText.setOrigin(0.5, 0.5);
    var buttonA = this.add.rectangle(1500, 700, 650, 100, 0x003366);
    buttonA.setOrigin(2, 2);
    var textA = this.add.text(470, 550, 'A.	Tạo ra tín hiệu âm thanh cho máy tính.', {
        fontSize: '30px',
        fill: '#ffffff', 
        fontFamily: 'Times New Roman', 
        align: 'center'
    });
    textA.setOrigin(0.5, 0.5);
    var buttonB = this.add.rectangle(1350, 550, 650, 100, 0x003366);
    buttonB.setOrigin(0.5, 0.5);
    var textB = this.add.text(1350, 550, 'B. Điều khiển việc ghi và đọc dữ liệu từ ổ cứng.', {
        fontSize: '30px',
        fill: '#ffffff', 
        fontFamily: 'Times New Roman', 
        align: 'center'
    });
    textB.setOrigin(0.5, 0.5);
    var buttonC = this.add.rectangle( 530, 750, 650, 100, 0x003366);
    buttonC.setOrigin(0.5, 0.5);
    var textC = this.add.text(530, 750, 'C.Tương tác với thiết bị ngoại vi và điều khiển CPU,RAM.', {
        fontSize: '27px',
        fill: '#ffffff', 
        fontFamily: 'Times New Roman', 
        align: 'center'
    });
    textC.setOrigin(0.5, 0.5);
    var buttonD = this.add.rectangle(1350, 750, 650, 100, 0x003366);
    buttonD.setOrigin(0.5, 0.5);
    var textD = this.add.text(1050, 730, 'D. Xử lý đồ họa và hiển thị hình ảnh trên màn hình.', {
        fontSize: '30px',
        fill: '#ffffff', 
        fontFamily: 'Times New Roman',
        align: 'center'
    });
    textC.setOrigin(0.5, 0.5);
       
        return new Promise((resolve, reject) => {
            buttonA.setInteractive().on('pointerup', function () {
                buttonA.setFillStyle(0xFF0000);  
                this.backgroundMusic4.play();
                setTimeout(() => {
                    this.backgroundMusic4.stop();
                }, 1000);
                const self = this;
                this.time.delayedCall(2000, function () {
                    self.cleanupQuestionUI(questionBox, questionText, buttonA, textA, buttonB, textB, buttonC, textC, buttonD, textD);
                    self.resumeGame();
                    resolve(false);
                });
               
            }, this);
            buttonB.setInteractive().on('pointerup', function () {
                buttonB.setFillStyle(0xFF0000);  
                this.backgroundMusic4.play();
                setTimeout(() => {
                    this.backgroundMusic4.stop();
                }, 1000);
                const self = this;
                this.time.delayedCall(2000, function () {
                    self.cleanupQuestionUI(questionBox, questionText, buttonA, textA, buttonB, textB, buttonC, textC, buttonD, textD);
                    self.resumeGame();
                    resolve(false);
                });
               
            }, this);
         
            buttonC.setInteractive().on('pointerup', function () {
                buttonC.setFillStyle(0x00ff00); 
                const self = this;
                this.time.delayedCall(2000, function () {
                    self.cleanupQuestionUI(questionBox, questionText, buttonA, textA, buttonB, textB, buttonC, textC, buttonD, textD);
                    self.resumeGame();
                    resolve(true);
                });
               
            }, this);
            buttonD.setInteractive().on('pointerup', function () {
                buttonD.setFillStyle(0xFF0000); 
                this.backgroundMusic4.play();
                setTimeout(() => {
                    this.backgroundMusic4.stop();
                }, 1000); 
                const self = this;
                this.time.delayedCall(2000, function () {
                    self.cleanupQuestionUI(questionBox, questionText, buttonA, textA, buttonB, textB, buttonC, textC, buttonD, textD);
                    self.resumeGame();
                    resolve(false);
                });
            }, this);
});
},
CauHoi4: function() {
    var questionBox = this.add.rectangle(config.width / 2, config.height / 2, 1600, 700, 0xffffff );
    questionBox.setOrigin(0.5, 0.5);
    questionBox.setStrokeStyle(13, 0x003366); 
    var questionText = this.add.text(config.width / 2, config.height / 2 - 200, 'Sơ đồ mạch logic được sử dụng để thể hiện gì\ntrong hệ thống điện tử và máy tính?', {
        fontSize: '50px',
        fill: '#000000',
        fontFamily: 'Times New Roman', 
        align: 'center',
        fontWeight: 'bold', 
        lineSpacing: 20
    });
    questionText.setOrigin(0.5, 0.5);
    var buttonA = this.add.rectangle(1500, 700, 650, 100, 0x003366);
    buttonA.setOrigin(2, 2);
    var textA = this.add.text(450, 550, 'A. Cấu trúc vật lý của bảng mạch chủ.', {
        fontSize: '30px',
        fill: '#ffffff', 
        fontFamily: 'Times New Roman', 
        align: 'center'
    });
    textA.setOrigin(0.5, 0.5);
    var buttonB = this.add.rectangle(1350, 550, 650, 100, 0x003366);
    buttonB.setOrigin(0.5, 0.5);
    var textB = this.add.text(1330, 550, 'B. Sự tương tác giữa các ứng dụng phần mềm.', {
        fontSize: '30px',
        fill: '#ffffff', 
        fontFamily: 'Times New Roman', 
        align: 'center'
    });
    textB.setOrigin(0.5, 0.5);
    var buttonC = this.add.rectangle( 530, 750, 650, 100, 0x003366);
    buttonC.setOrigin(0.5, 0.5);
    var textC = this.add.text(460, 750, 'C. Bảng phân công tài nguyên hệ thống.', {
        fontSize: '30px',
        fill: '#ffffff', 
        fontFamily: 'Times New Roman', 
        align: 'center'
    });
    textC.setOrigin(0.5, 0.5);
    var buttonD = this.add.rectangle(1350, 750, 650, 100, 0x003366);
    buttonD.setOrigin(0.5, 0.5);
    var textD = this.add.text(1050, 730, 'D.Phép toán và mối quan hệ logic của các tín hiệu điện.', {
        fontSize: '28px',
        fill: '#ffffff', 
        fontFamily: 'Times New Roman', 
        align: 'center'
    });
    textC.setOrigin(0.5, 0.5);
       
        return new Promise((resolve, reject) => {
            buttonA.setInteractive().on('pointerup', function () {
                buttonA.setFillStyle(0xFF0000);  
                this.backgroundMusic4.play();
                setTimeout(() => {
                    this.backgroundMusic4.stop();
                }, 1000);
                const self = this;
                this.time.delayedCall(2000, function () {
                    self.cleanupQuestionUI(questionBox, questionText, buttonA, textA, buttonB, textB, buttonC, textC, buttonD, textD);
                    self.resumeGame();
                    resolve(false);
                });
               
            }, this);
            buttonB.setInteractive().on('pointerup', function () {
                buttonB.setFillStyle(0xFF0000);  
                this.backgroundMusic4.play();
                setTimeout(() => {
                    this.backgroundMusic4.stop();
                }, 1000);
                const self = this;
                this.time.delayedCall(2000, function () {
                    self.cleanupQuestionUI(questionBox, questionText, buttonA, textA, buttonB, textB, buttonC, textC, buttonD, textD);
                    self.resumeGame();
                    resolve(false);
                });
               
            }, this);
            buttonC.setInteractive().on('pointerup', function () {
                buttonC.setFillStyle(0xFF0000); 
                this.backgroundMusic4.play();
                setTimeout(() => {
                    this.backgroundMusic4.stop();
                }, 1000); 
                const self = this;
                this.time.delayedCall(2000, function () {
                    self.cleanupQuestionUI(questionBox, questionText, buttonA, textA, buttonB, textB, buttonC, textC, buttonD, textD);
                    self.resumeGame();
                    resolve(false);
                });
            }, this);
            buttonD.setInteractive().on('pointerup', function () {
                buttonD.setFillStyle(0x00ff00); // Mã màu xanh lá cây 
                const self = this;
                this.time.delayedCall(2000, function () {
                    self.cleanupQuestionUI(questionBox, questionText, buttonA, textA, buttonB, textB, buttonC, textC, buttonD, textD);
                    self.resumeGame();
                    resolve(true);
                });
               
            }, this);
        
});
},
CauHoi5: function() {
    var questionBox = this.add.rectangle(config.width / 2, config.height / 2, 1600, 700, 0xffffff );
    questionBox.setOrigin(0.5, 0.5);
    questionBox.setStrokeStyle(13, 0x003366); 
    var questionText = this.add.text(config.width / 2, config.height / 2 - 200, 'Mục đích chính của cơ chế bảo vệ trong hệ điều hành là gì?', {
        fontSize: '50px',
        fill: '#000000',
        fontFamily: 'Times New Roman', 
        align: 'center',
        fontWeight: 'bold', 
        lineSpacing: 20
    });
    questionText.setOrigin(0.5, 0.5);
    var buttonA = this.add.rectangle(1500, 700, 650, 100, 0x003366);
    buttonA.setOrigin(2, 2);
    var textA = this.add.text(480, 550, 'A.	Bảo vệ hệ thống và thông tin lưu trữ.', {
        fontSize: '30px',
        fill: '#ffffff', 
        fontFamily: 'Times New Roman', 
        align: 'center'
    });
    textA.setOrigin(0.5, 0.5);
    var buttonB = this.add.rectangle(1350, 550, 650, 100, 0x003366);
    buttonB.setOrigin(0.5, 0.5);
    var textB = this.add.text(1330, 550, 'B. Tạo ra giao diện trực quan cho người dùng.', {
        fontSize: '30px',
        fill: '#ffffff', 
        fontFamily: 'Times New Roman', 
        align: 'center'
    });
    textB.setOrigin(0.5, 0.5);
    var buttonC = this.add.rectangle( 530, 750, 650, 100, 0x003366);
    buttonC.setOrigin(0.5, 0.5);
    var textC = this.add.text(460, 750, 'C.	Tối ưu hóa tài nguyên hệ thống.', {
        fontSize: '30px',
        fill: '#ffffff', 
        fontFamily: 'Times New Roman', 
        align: 'center'
    });
    textC.setOrigin(0.5, 0.5);
    var buttonD = this.add.rectangle(1350, 750, 650, 100, 0x003366);
    buttonD.setOrigin(0.5, 0.5);
    var textD = this.add.text(1050, 730, 'D. Cung cấp các công cụ soạn thảo văn bản.', {
        fontSize: '30px',
        fill: '#ffffff', 
        fontFamily: 'Times New Roman', 
        align: 'center'
    });
    textC.setOrigin(0.5, 0.5);
       
        return new Promise((resolve, reject) => {
            buttonD.setInteractive().on('pointerup', function () {
                buttonD.setFillStyle(0xFF0000);  
                this.backgroundMusic4.play();
                setTimeout(() => {
                    this.backgroundMusic4.stop();
                }, 1000);
                const self = this;
                this.time.delayedCall(2000, function () {
                    self.cleanupQuestionUI(questionBox, questionText, buttonA, textA, buttonB, textB, buttonC, textC, buttonD, textD);
                    self.resumeGame();
                    resolve(false);
                });
               
            }, this);
            buttonB.setInteractive().on('pointerup', function () {
                buttonB.setFillStyle(0xFF0000);  
                this.backgroundMusic4.play();
                setTimeout(() => {
                    this.backgroundMusic4.stop();
                }, 1000);
                const self = this;
                this.time.delayedCall(2000, function () {
                    self.cleanupQuestionUI(questionBox, questionText, buttonA, textA, buttonB, textB, buttonC, textC, buttonD, textD);
                    self.resumeGame();
                    resolve(false);
                });
               
            }, this);
            buttonC.setInteractive().on('pointerup', function () {
                buttonC.setFillStyle(0xFF0000); 
                this.backgroundMusic4.play();
                setTimeout(() => {
                    this.backgroundMusic4.stop();
                }, 1000); 
                const self = this;
                this.time.delayedCall(2000, function () {
                    self.cleanupQuestionUI(questionBox, questionText, buttonA, textA, buttonB, textB, buttonC, textC, buttonD, textD);
                    self.resumeGame();
                    resolve(false);
                });
            }, this);
            buttonA.setInteractive().on('pointerup', function () {
                buttonA.setFillStyle(0x00ff00);  
                const self = this;
                this.time.delayedCall(2000, function () {
                    self.cleanupQuestionUI(questionBox, questionText, buttonA, textA, buttonB, textB, buttonC, textC, buttonD, textD);
                    self.resumeGame();
                    resolve(true);
                });
               
            }, this);
        
});
},
    /// an cau hoi 
    cleanupQuestionUI: function (questionBox, questionText, buttonA, textA, buttonB, textB, buttonC, textC, buttonD, textD) {
        questionBox.setVisible(false);
        questionText.setVisible(false);
        buttonA.setVisible(false);
        textA.setVisible(false);
        buttonB.setVisible(false);
        textB.setVisible(false);
        buttonC.setVisible(false);
        textC.setVisible(false);
        buttonD.setVisible(false);
        textD.setVisible(false);
    },
    // tau ngam cham vao nguoi tiep nhien lieu
    taungamNguoiTiepNhienLieuCollision: function (taungam, nguoitiepnhienlieu) {
        this.handleCollision(); // Xử lý va chạm chung
        nguoitiepnhienlieu.destroy();
        if (this.DiversSavedCount === 1) {
            this.CauHoi1().then((isCorrect) => {
                console.log('Câu trả lời có đúng không?', isCorrect);
                if (isCorrect) {
                    this.backgroundMusic2.play();
                    setTimeout(() => {
                        this.backgroundMusic2.stop();
                    }, 500);
                    this.DiversSavedCount++;
                    this.add.image(config.width - 250, config.height - 125, 'Nguoinhienlieu', 'oneDivers').setScale(1.4);
                    this.congDiem();
                }
            });
        } else if (this.DiversSavedCount === 2) {
            this.CauHoi2().then((isCorrect) => {
                console.log('Câu trả lời có đúng không?', isCorrect);
                if (isCorrect) {
                    this.backgroundMusic2.play();
                    setTimeout(() => {
                        this.backgroundMusic2.stop();
                    }, 500);
                    this.DiversSavedCount++;
                    this.add.image(config.width - 250, config.height - 125, 'Nguoinhienlieu', 'twoDivers').setScale(1.4);
                    this.congDiem();
                }
            });
        } else if (this.DiversSavedCount === 3) {
            this.CauHoi3().then((isCorrect) => {
                console.log('Câu trả lời có đúng không?', isCorrect);
                if (isCorrect) {
                    this.backgroundMusic2.play();
                    setTimeout(() => {
                        this.backgroundMusic2.stop();
                    }, 500);
                    this.DiversSavedCount++;
                    this.add.image(config.width - 250, config.height - 125, 'Nguoinhienlieu', 'threeDivers').setScale(1.4);
                    this.congDiem();
                } 
            });
        } else if (this.DiversSavedCount === 4) {
            this.CauHoi4().then((isCorrect) => {
                console.log('Câu trả lời có đúng không?', isCorrect);
                if (isCorrect) {
                    this.backgroundMusic2.play();
                    setTimeout(() => {
                        this.backgroundMusic2.stop();
                    }, 500);
                    this.DiversSavedCount++;
                    this.add.image(config.width - 250, config.height - 125, 'Nguoinhienlieu', 'fourDivers').setScale(1.4);
                    this.congDiem();
                } 
            });
        } else {
            this.CauHoi5().then((isCorrect) => {
            console.log('Câu trả lời có đúng không?', isCorrect);
                if (isCorrect) {
                    this.backgroundMusic2.play();
                    setTimeout(() => {
                        this.backgroundMusic2.stop();
                    }, 500);
                    this.DiversSavedCount++;
                    this.add.image(config.width - 250, config.height - 125, 'Nguoinhienlieu', 'fiveDivers').setScale(1.4);
                    this.congDiem();
                    this.backgroundMusic3.stop();
                    this.YouWon();
                } 
            });
        }
    },
    spawnSwimmer: function () {
        if (this.isSwimmerSpawningEnabled) {
            const swimmer = this.physics.add.sprite(
                config.width + Phaser.Math.Between(0, 20),  
                Phaser.Math.Between(200, 880),
                'tiepnhienlieu'
            ).setCollideWorldBounds(false);
            swimmer.setScale(1.8);
            this.swimmers.add(swimmer);
            swimmer.flipX = true; // xoay nguoi boi 

            // dat toc do di chuyen theo truc x cua nguoi boi
            const swimmerSpeed = 800; 
            swimmer.setVelocityX(-swimmerSpeed);
    
            swimmer.on('outOfBounds', function () {
                swimmer.destroy();
                this.spawnSwimmer();
            }, this);

            // chay animation
            swimmer.anims.play('tiepnhienlieu');
        } 
    },
    spawnMonster: function () {
        if (this.isMonsterSpawningEnabled === true) {
            const monster = this.physics.add.sprite(
                config.width + Phaser.Math.Between(0, 20), // xuat hien o cuoi truc x
                Phaser.Math.Between(200, 880), 
                'quaivat'
            ).setCollideWorldBounds(true);
            monster.setFlipX(true); // xoay ve ben 
            monster.setScale(2.2);
            this.monsters.add(monster);
            // Set tốc độ
            const speed = 500;
            monster.setVelocityX(-speed); // dat gia tri am de di chuyen ve ben phai
            monster.on('outOfBounds', function () {
                monster.destroy();
                this.spawnMonster();
            }, this);
            const spawnDelay = Phaser.Math.Between(500, 1000);
            this.time.addEvent({
                delay: spawnDelay,
                callback: this.spawnMonster,
                callbackScope: this,
                loop: false
            });
        } 
    },
    // tau ngam cham quai vat
        taungamQuaivatCollision: function (taungam, quaivat) {
            if (this.CollisionTimer === 0) {
                quaivat.destroy();
                const animation = this.add.sprite(quaivat.x, quaivat.y, 'QuaiVatChet').setScale(2.5);
                animation.anims.play('QuaiVatChet');
                this.backgroundMusic1.play();
                setTimeout(() => {
                    this.backgroundMusic1.stop();
                }, 1000);
                animation.on('animationcomplete', function () {
                    animation.destroy();
            });
                this.CoHoi--;
                taungam.setTint(0xff0000);
                this.time.delayedCall(1000, function () {
                    taungam.clearTint();
                }, [], this);
                if (this.CoHoi === 2) {
                  this.add.image(175, config.height - 125, 'CoHoi', 'twoLives').setScale(1.1);
                }
                else if (this.CoHoi === 1) {
                  this.add.image(175, config.height - 125, 'CoHoi', 'oneLife').setScale(1.1);
                }
                else {
                  this.add.image(175, config.height - 125, 'CoHoi', 'zeroLives').setScale(1.1);
                }
                this.LostLife = true;
            if (this.CoHoi === 0)   {
                this.backgroundMusic3.stop();
                this.YouLost();
            }
                else    this.player.setPosition(300, 300); 
            }
        },
    // thua tro choi
    gameOver: function () {
        this.countdownEvent.remove();
        console.log('Game Over');
    },
    // thang tro choi
    YouWon: function () {
            this.physics.pause();
            this.backgroundMusic3.stop();
            this.cameras.main.fadeOut(500, 0, 0, 0);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                this.scene.start('Victoryscene', { nextScene: 'HuongDanLevel3' });
            });
    },
    // thua tro choi
    YouLost: function () {
          this.physics.pause();
          this.backgroundMusic3.stop();
          this.cameras.main.fadeOut(500, 0, 0, 0);
          this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            this.scene.start('GameOverScene', { currentScene: 'HuongDanLevel2'});
          }); 
    },
    update: function () {
        this.children.list.forEach(function (child) {
            if (child instanceof Phaser.GameObjects.TileSprite) {
                child.tilePositionX += 6; // dieu chinh toc do chay nen
            }
        }, this); 
            // Kiểm tra liên tục và cập nhật màu đỏ
        if (this.timer <= 5) {
            this.timerText.setStyle({
                fill: '#ff0000'
            });
        } else {
            // Nếu timer lớn hơn 5, đặt lại màu về trạng thái ban đầu
            this.timerText.setStyle({
                fill: '#ffffff'
            });
        }
            // Di chuyển
            if (cursors.up.isDown) {
                this.player.setVelocityY(-750);
            }
            else if (cursors.down.isDown) {
                this.player.setVelocityY(750);
            }
            else if (cursors.left.isDown) {
                this.player.setVelocityX(-650);
            }
            else if (cursors.right.isDown) {
                this.player.setVelocityX(550);
            }
            // khong nhan phim nao dung di chuyen
            else {
                this.player.setVelocity(0);
            }
             // gioi han di chuyen cua tau ngam
            if (this.player.y < 200) {
                this.player.y = 200;
            } else if (this.player.y > 880) {
                this.player.y = 880;
            } 
    },
   // cap nhat oxi
   updateTimeText: function () {
    this.timerText.setText(this.timer);
    }   

})