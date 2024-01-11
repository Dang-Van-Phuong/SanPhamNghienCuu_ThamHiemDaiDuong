var Level3Scene = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize: function MenuScene() {
        Phaser.Scene.call(this, { key: 'Level3Scene' });
    },

    preload: function () {
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

        this.load.audio('nhaclevel3', 'assets/music/level3.mp3');
        this.load.audio('quaivatchet', 'assets/music/quaivatchet.mp3');
        this.load.audio('nguoi', 'assets/music/nguoi.mp3');
        this.load.audio('chonsai', 'assets/music/chonsai.mp3');

        this.load.spritesheet('TauNgamChet', 'assets/TauNgam_die.png', { frameWidth: 52, frameHeight: 53 });
		this.load.spritesheet('QuaiVatChet', 'assets/QuaiVat_die.png', { frameWidth: 78, frameHeight: 87 });
        this.load.spritesheet('tiepnhienlieu', 'assets/TiepNhienLieu.png', { frameWidth: 80, frameHeight: 80 });
        this.load.spritesheet('taungam', 'assets/TauNgam.png', { frameWidth: 200, frameHeight: 70 });
        this.load.spritesheet('QuaiVat_Lever3', 'assets/QuaiVat_lever3.png', { frameWidth: 32, frameHeight: 32 });
    },
    create: function () {  
        // am thanh
        this.cameras.main.fadeIn(500, 0, 0, 0);
        this.backgroundMusic1 = this.sound.add('quaivatchet', { loop: true });
        this.backgroundMusic2 = this.sound.add('nguoi', { loop: true });
        this.backgroundMusic3 = this.sound.add('nhaclevel3', { loop: true });
        this.backgroundMusic4 = this.sound.add('chonsai', { loop: true });

        this.backgroundMusic3.play();
        // cac bien
        this.ScoreCount = 0;
        this.DiversSavedCount = 1;
        this.CoHoi = 3;
        this.CollisionTimer = 0;

        this.isMoving = true;
        this.isSwimmerSpawningEnabled = true; // bien kiem soat nguoi boi
        this.isMonsterSpawningEnabled = true; // bien kiem soat quai vat

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
        cursors = this.input.keyboard.createCursorKeys();
        // gioi han the gioi
          this.physics.world.setBounds(0, 70, this.game.config.width, this.game.config.height - 200);
         // hien hinh anh len man hinh
         this.add.image(700, config.height - 120, 'oxi').setScale(1.4);
         this.add.image(config.width / 2 + 175, config.height - 125, 'nguloi').setScale(1.4);
         this.add.image(175, config.height - 125, 'CoHoi', 'threeLives').setScale(1.1);
         this.add.image(config.width - 250, config.height - 125, 'Nguoinhienlieu', 'zeroDivers').setScale(1.4);
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
            key: 'QuaiVat_Lever3',
            frames: this.anims.generateFrameNumbers('QuaiVat_Lever3'),
            frameRate: 10,
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
        console.log('Đã vào lever3.scene');
        // nut thoat
        var thoatButton = this.add.image(config.width - 30, 100, 'thoat').setOrigin(1, 0).setScale(0.1);
        thoatButton.setTintFill(0xFFFFFF); 
        thoatButton.setInteractive();
        thoatButton.on('pointerup', function () {
            this.backgroundMusic3.stop();
            this.scene.start('MenuScene');
        }, this);
        // tao tau ngam
        this.player = this.physics.add.sprite(1920 / 2 + 800, 1080 / 2 - 200, 'taungam').setCollideWorldBounds(true);
        this.player.setFlipX(true);
        this.player.anims.play('taungam');
        this.player.setScale(0.8);  // kich thuoc mong muon
        // Tao quai vat va nguoi tiep nhien lieu
        this.monsters = this.physics.add.group();
        this.createMonsters();
        this.swimmers = this.physics.add.group();
        this.time.addEvent({
            delay: Phaser.Math.Between(5000, 8000), // thoi gian giua cac nguoi boi
            callback: this.spawnSwimmer,
            callbackScope: this,
            loop: true
        });
        // bien oxi
        this.oxi = 3000;
        this.oxiText = this.add.text(670, config.height - 155, this.oxi, {
            fontSize: '55px',
            fill: '#ffffff',
            fontFamily: 'pixel_font',
        }).setDepth(1);
            // dem nguoc oxi
        this.countdownEvent = this.time.addEvent({
            delay: 30,
            callback: function () {
                this.oxi--;
                this.updateOxiText();
                if (this.oxi <= 0) {
                    this.YouLost();
                }
            },
            callbackScope: this,
            loop: true,
        });
        // bien cap do
        var levelText = this.add.text(50, 95, 'Cấp độ: 3', { fontSize: '55px', fill: '#ffffff', fontFamily: 'pixel_font' });
        levelText.setDepth(1);
        // bien diem
        this.ScoreText = this.add.text(1320, 100, 'Điểm: ' + this.ScoreCount, {
            fontSize: '55px',
            fill: '#ffffff',
            fontFamily: 'Arial, sans-serif'
        });
        this.ScoreText.setDepth(1);
         // nhan phim space thì diem duoc cong
         this.nguloi = 20; // ngu loi ban dau
        this.nguloiText = this.add.text(1150, config.height - 155, this.nguloi, {
            fontSize: '55px',
            fill: '#ffffff',
            fontFamily: 'pixel_font',
        }).setDepth(1);
        this.bombs = this.physics.add.group();
        this.lastBombTime = 0; // thoi diem cuoi khi ban bom ngu loi
        this.bombDelay = 1000; // khoang thoi gian giua cac lan ban
        this.input.keyboard.on('keydown-SPACE', function (event) {
            var currentTime = this.time.now;
            if (currentTime - this.lastBombTime > this.bombDelay && this.nguloi > 0) {
                this.dropBomb();
                this.lastBombTime = currentTime;
                this.nguloi--; // moi lan ban se giam ngu loi
                this.updateNguloiText();
            } else if (this.nguloi === 0) { // ngu loi bang 0 se thanh mau do
                this.nguloiText.setColor('#ff0000'); // Màu đỏ
            }
        }, this);
        // xử lí
            // tau ngam cham vao nguoi tiep nhien lieu
        this.physics.add.collider(this.player, this.swimmers, this.taungamNguoiTiepNhienLieuCollision, null, this);
            // tau ngam cham vao quai vat  
        this.physics.add.collider(this.player, this.monsters, this.taungamQuaivatCollision, null, this);
            // ngu loi cham vao quai vat
        this.physics.add.collider(this.bombs, this.monsters, this.bomQuaivatCollision, null, this);
    },
    handleCollision: function () {
        this.physics.pause();
        this.countdownEvent.paused = true;
        this.isMoving = true;
        this.isSwimmerSpawningEnabled = false;
        this.isMonsterSpawningEnabled = false;
    },
    resumeGame: function () {
        this.physics.resume();
        this.countdownEvent.paused = false;
        this.isMoving = true;
        this.isSwimmerSpawningEnabled = true;
        this.isMonsterSpawningEnabled = true;
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
    // cau hoi 
    CauHoi1: function() {
            var questionBox = this.add.rectangle(config.width / 2, config.height / 2, 1600, 700, 0xffffff );
            questionBox.setOrigin(0.5, 0.5);
            questionBox.setStrokeStyle(13, 0x003366); // do day va mau
            var questionText = this.add.text(config.width / 2, config.height / 2 - 200, 'Phần mềm thương mại là gì?', {
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
            var textA = this.add.text(550, 550, 'A.	Phần mềm cần trả tiền để sử dụng.', {
                fontSize: '30px',
                fill: '#ffffff', 
                fontFamily: 'Times New Roman', 
                align: 'center'
            });
            textA.setOrigin(0.5, 0.5);
            var buttonB = this.add.rectangle(1350, 550, 650, 100, 0x003366);
            buttonB.setOrigin(0.5, 0.5);
            var textB = this.add.text(1270, 550, 'B. Phần mềm miễn phí.', {
                fontSize: '30px',
                fill: '#ffffff', 
                fontFamily: 'Times New Roman', 
                align: 'center'
            });
            textB.setOrigin(0.5, 0.5);
            var buttonC = this.add.rectangle( 530, 750, 650, 100, 0x003366);
            buttonC.setOrigin(0.5, 0.5);
            var textC = this.add.text(480, 750, 'C.	Phần mềm nguồn mở.', {
                fontSize: '30px',
                fill: '#ffffff', 
                fontFamily: 'Times New Roman', 
                align: 'center'
            });
            textC.setOrigin(0.5, 0.5);
            var buttonD = this.add.rectangle(1350, 750, 650, 100, 0x003366);
            buttonD.setOrigin(0.5, 0.5);
            var textD = this.add.text(1100, 730, 'D. Phần mềm khai thác trực tuyến.', {
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
            })
    },
    CauHoi2: function() {
            var questionBox = this.add.rectangle(config.width / 2, config.height / 2, 1600, 700, 0xffffff );
            questionBox.setOrigin(0.5, 0.5);
            questionBox.setStrokeStyle(13, 0x003366); 
            var questionText = this.add.text(config.width / 2, config.height / 2 - 200, 'Giấy phép phần mềm công cộng đảm bảo cho người dùng được tự do gì?', {
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
            var textA = this.add.text(500, 550, 'A.Tự do truy cập vào các dịch vụ trực tuyến', {
                fontSize: '28px',
                fill: '#ffffff', 
                fontFamily: 'Times New Roman', 
                align: 'center'
            });
            textA.setOrigin(0.5, 0.5);
            var buttonB = this.add.rectangle(1350, 550, 650, 100, 0x003366);
            buttonB.setOrigin(0.5, 0.5);
            var textB = this.add.text(1320, 550, 'B.Tự do sử dụng phần mềm trên môi trường web.', {
                fontSize: '28px',
                fill: '#ffffff', 
                fontFamily: 'Times New Roman', 
                align: 'center'
            });
            textB.setOrigin(0.5, 0.5);
            var buttonC = this.add.rectangle( 530, 750, 650, 100, 0x003366);
            buttonC.setOrigin(0.5, 0.5);
            var textC = this.add.text(530, 750, 'C.Tự do cài đặt phần mềm trên điện thoại di động.', {
                fontSize: '28px',
                fill: '#ffffff', 
                fontFamily: 'Times New Roman', 
                align: 'center'
            });
            textC.setOrigin(0.5, 0.5);
            var buttonD = this.add.rectangle(1350, 750, 650, 100, 0x003366);
            buttonD.setOrigin(0.5, 0.5);
            var textD = this.add.text(1030, 730, 'D.Tự do khai thác,nghiên cứu,sửa đổi và chia sẻ phần mềm.', {
                fontSize: '27px',
                fill: '#ffffff', 
                fontFamily: 'Times New Roman', 
                align: 'center'
            });
            textC.setOrigin(0.5, 0.5);
            return new Promise((resolve, reject) => {
                buttonD.setInteractive().on('pointerup', function () {
                    buttonD.setFillStyle(0x00ff00); 
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
            })
    },
    CauHoi3: function() {
            var questionBox = this.add.rectangle(config.width / 2, config.height / 2, 1600, 700, 0xffffff );
            questionBox.setOrigin(0.5, 0.5);
            questionBox.setStrokeStyle(13, 0x003366); 
            var questionText = this.add.text(config.width / 2, config.height / 2 - 200, 'Hệ điều hành làm trung gian giữa người dùng\nmáy tính và thiết bị phần cứng như thế nào?', {
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
            var textA = this.add.text(520, 550, 'A.	Cung cấp các công cụ tìm kiếm và truy cập tệp tin.', {
                fontSize: '28px',
                fill: '#ffffff', 
                fontFamily: 'Times New Roman', 
                align: 'center'
            });
            textA.setOrigin(0.5, 0.5);
            var buttonB = this.add.rectangle(1350, 550, 650, 100, 0x003366);
            buttonB.setOrigin(0.5, 0.5);
            var textB = this.add.text(1360, 550, 'B.Tạo giao diện trực quan để người dùng tương tác với thiết bị', {
                fontSize: '25px',
                fill: '#ffffff', 
                fontFamily: 'Times New Roman', 
                align: 'center'
            });
            textB.setOrigin(0.5, 0.5);
            var buttonC = this.add.rectangle( 530, 750, 650, 100, 0x003366);
            buttonC.setOrigin(0.5, 0.5);
            var textC = this.add.text(500, 750, 'C.Quản lý các tiến trình và tài nguyên hệ thống.', {
                fontSize: '27px',
                fill: '#ffffff', 
                fontFamily: 'Times New Roman', 
                align: 'center'
            });
            textC.setOrigin(0.5, 0.5);
            var buttonD = this.add.rectangle(1350, 750, 650, 100, 0x003366);
            buttonD.setOrigin(0.5, 0.5);
            var textD = this.add.text(1070, 730, 'D. Giúp cài đặt và gỡ bỏ phần mềm ứng dụng.', {
                fontSize: '28px',
                fill: '#ffffff', 
                fontFamily: 'Times New Roman', 
                align: 'center'
            });
            textC.setOrigin(0.5, 0.5);
            return new Promise((resolve, reject) => {
                buttonB.setInteractive().on('pointerup', function () {
                    buttonB.setFillStyle(0x00ff00);  
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
            })
    },
    CauHoi4: function() {
            var questionBox = this.add.rectangle(config.width / 2, config.height / 2, 1600, 700, 0xffffff );
            questionBox.setOrigin(0.5, 0.5);
            questionBox.setStrokeStyle(13, 0x003366); 
            var questionText = this.add.text(config.width / 2, config.height / 2 - 200, 'Đơn vị đo tốc độ CPU GHz tương ứng với bao nhiêu Hz?', {
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
            var textA = this.add.text(500, 550, 'A. 10^3 Hz', {
                fontSize: '30px',
                fill: '#ffffff',
                fontFamily: 'Times New Roman', 
                align: 'center'
            });
            textA.setOrigin(0.5, 0.5);
            var buttonB = this.add.rectangle(1350, 550, 650, 100, 0x003366);
            buttonB.setOrigin(0.5, 0.5);
            var textB = this.add.text(1300, 550, 'B. 10^6 Hz', {
                fontSize: '30px',
                fill: '#ffffff', 
                fontFamily: 'Times New Roman', 
                align: 'center'
            });
            textB.setOrigin(0.5, 0.5);
            var buttonC = this.add.rectangle( 530, 750, 650, 100, 0x003366);
            buttonC.setOrigin(0.5, 0.5);
            var textC = this.add.text(480, 750, 'C. 10^9 Hz', {
                fontSize: '30px',
                fill: '#ffffff', 
                fontFamily: 'Times New Roman', 
                align: 'center'
            });
            textC.setOrigin(0.5, 0.5);
            var buttonD = this.add.rectangle(1350, 750, 650, 100, 0x003366);
            buttonD.setOrigin(0.5, 0.5);
            var textD = this.add.text(1220, 730, 'D. 10^12 Hz', {
                fontSize: '30px',
                fill: '#ffffff', 
                fontFamily: 'Times New Roman', 
                align: 'center'
            });
            textC.setOrigin(0.5, 0.5);
            return new Promise((resolve, reject) => {
                buttonC.setInteractive().on('pointerup', function () {
                    buttonC.setFillStyle(0x00ff00); 
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
            })
    },
    CauHoi5: function() {
            var questionBox = this.add.rectangle(config.width / 2, config.height / 2, 1600, 700, 0xffffff );
            questionBox.setOrigin(0.5, 0.5);
            questionBox.setStrokeStyle(13, 0x003366); 
            var questionText = this.add.text(config.width / 2, config.height / 2 - 200, 'Muốn khởi động lại hệ điều hành Windows XP ta thực hiện như sau?', {
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
            var textA = this.add.text(520, 550, 'A.Vào bảng chọn Start=>Turn off Computer\n=>hộp thoại xuất hiện, chọn lệnh Restart.', {
                fontSize: '28px',
                fill: '#ffffff', 
                fontFamily: 'Times New Roman', 
                align: 'center'
            });
            textA.setOrigin(0.5, 0.5);
            var buttonB = this.add.rectangle(1350, 550, 650, 100, 0x003366);
            buttonB.setOrigin(0.5, 0.5);
            var textB = this.add.text(1300, 550, 'B.Vào bảng chọn Start=>Turn off Computer\n=>hộp thoại xuất hiện, chọn lệnh Stand By', {
                fontSize: '28px',
                fill: '#ffffff', 
                fontFamily: 'Times New Roman',
                align: 'center'
            });
            textB.setOrigin(0.5, 0.5);
            var buttonC = this.add.rectangle( 530, 750, 650, 100, 0x003366);
            buttonC.setOrigin(0.5, 0.5);
            var textC = this.add.text(480, 750, 'C.Vào bảng chọn Start=>Turn off Computer\n=>hộp thoại xuất hiện, chọn lệnh Turn Off.', {
                fontSize: '28px',
                fill: '#ffffff', 
                fontFamily: 'Times New Roman', 
                align: 'center'
            });
            textC.setOrigin(0.5, 0.5);
            var buttonD = this.add.rectangle(1350, 750, 650, 100, 0x003366);
            buttonD.setOrigin(0.5, 0.5);
            var textD = this.add.text(1070, 720, 'D.Vào bảng chọn Start=>Turn off Computer\n=>hộp thoại xuất hiện, chọn lệnh Cancle', {
                fontSize: '28px',
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
            })
    },
    congDiem: function()    {
        this.ScoreCount += 500;
        this.ScoreText.setText('Điểm: ' + this.ScoreCount);
        this.oxi += 200;
        this.oxiText.setTint(0xffff00); 
        this.time.delayedCall(500, function () {
            this.oxiText.clearTint();
            this.oxiText.setText(this.oxi); 
        }, [], this);
    },
        // tau ngam cham vao nguoi tiep nhien lieu
        taungamNguoiTiepNhienLieuCollision: function (taungam, nguoitiepnhienlieu) {
            this.handleCollision(); 
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
    // ham xu li
        // ngu loi cham vao quai vat
    bomQuaivatCollision: function(bomnguloi, quaivat){
        quaivat.destroy();
        bomnguloi.destroy();
        this.backgroundMusic1.play();
        setTimeout(() => {
            this.backgroundMusic1.stop();
        }, 1000);
        this.ScoreCount += 100; // diem tang len
        this.ScoreText.setText('Điểm: ' + this.ScoreCount); 
        const animation = this.add.sprite(quaivat.x, quaivat.y, 'QuaiVatChet').setScale(2.5);
            animation.anims.play('QuaiVatChet');
            animation.on('animationcomplete', function () {
                animation.destroy();
        })
    },
        // tau ngam cham vao quai vat
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
            this.YouLost();
        }
            else     this.player.setPosition(1920 / 2 + 800, 1080 / 2 - 400);   
        }
    },
    // hien so ngu loi
    updateNguloiText: function () {
        this.nguloiText.setText(this.nguloi);
    },

    // tao bom ngu loi va toc do di chuyen cua no
    dropBomb: function () {
        // tao bom ngu loi xuat hien ơ vi tri cua tam ngam
        const bomb = this.bombs.create(this.player.x, this.player.y, 'bomnguloi').setScale(1.5);
        // set toc do
        const bombSpeed = -700;
        bomb.setVelocityX(bombSpeed);
    },
    // tao nguoi tiep nhien lieu
    spawnSwimmer: function () {
        if (this.isSwimmerSpawningEnabled) {

        const swimmer = this.physics.add.sprite(
            Phaser.Math.Between(0, 20),
            Phaser.Math.Between(200, 880),
            'tiepnhienlieu'
        ).setCollideWorldBounds(true);

        swimmer.setScale(1.8);
        this.swimmers.add(swimmer);
        // toc do nguoi boi di theo truc x
        const swimmerSpeed = 500; 
        swimmer.setVelocityX(swimmerSpeed);
        swimmer.on('outOfBounds', function () {
            swimmer.destroy();
            this.spawnSwimmer();
    }, this);
    
        // chay animation
    swimmer.anims.play('tiepnhienlieu');
    }
    },
    // thoi gian quai vat xuat hien moi con quai vat
    createMonsters: function () {
        this.time.addEvent({
            delay: 700,
            callback: this.spawnMonstersBatch,
            callbackScope: this,
            loop: true, 
        });
    },

    spawnMonster: function () {
        if (this.isMonsterSpawningEnabled) {

        const monster = this.physics.add.sprite(
            Phaser.Math.Between(0, 20),
            Phaser.Math.Between(200, 880),
            'QuaiVat_Lever3'
        ).setCollideWorldBounds(true);
    
        monster.setFlipX(false);
        monster.setScale(3.2);
        this.monsters.add(monster);
    
        monster.anims.play('QuaiVat_Lever3');
    
        const speed = 5000;
        monster.directionX = 1; // huong di chuyen ziczac
        monster.directionY = 1; 
    
        monster.on('outOfBounds', function () {
            monster.destroy();
            this.spawnMonster();
        }, this);
    
        this.moveMonsterZigzag(monster, speed);
    }
    },
    // ca du di chuyen
    moveMonsterZigzag: function (monster, speed) {
        this.time.addEvent({
            delay: 10,
            callback: function () {
                const delta = 5;
                const newX = monster.x + monster.directionX * delta;
                const newY = monster.y + monster.directionY * delta;
                // dung vao tren hoac duoi sẽ quay nguoc lai
                if (newY <= 200) {
                    monster.directionY = 1;
                } else if (newY >= 880) {
                    monster.directionY = -1;
                }
                monster.x = newX;
                monster.y = newY;
                this.moveMonsterZigzag(monster, speed);
            },
            callbackScope: this,
            loop: false
        });
    },
    // tao ca du
    spawnMonstersBatch: function () {
        const numberOfMonsters = 1;
        // thoi gian xuat hien
        const spawnDelay = Phaser.Math.Between(3600000, 7200000); 
        for (let i = 0; i < numberOfMonsters; i++) {
            this.spawnMonster();
        }
        this.time.addEvent({
            delay: spawnDelay,
            callback: this.spawnMonstersBatch,
            callbackScope: this,
            loop: false
        });
    },
    // cap nhat oxi
    updateOxiText: function () {
        this.oxiText.setText(this.oxi);
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
            this.scene.start('Victoryscene', { nextScene: 'HuongDanLevel4' });
            });
    },
    // thua tro choi
    YouLost: function () {
          this.physics.pause();
          this.backgroundMusic3.stop();
          this.cameras.main.fadeOut(500, 0, 0, 0);
          this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            this.scene.start('GameOverScene', { currentScene: 'HuongDanLevel3'});
          });
        
        },   
    update: function () {
        // Di chuyển
        if (cursors.up.isDown) {
            this.player.setVelocityY(-550);
        }
        else if (cursors.down.isDown) {
            this.player.setVelocityY(550);
        }
        else if (cursors.left.isDown) {
            this.player.setVelocityX(-550);
        }
        else if (cursors.right.isDown) {
            this.player.setVelocityX(650);
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
        if (this.isMoving) {

        // di chuyen man hinh
        bgParallax1.tilePositionX -= 2;
        bgParallax2.tilePositionX -= 4;
        bgParallax3.tilePositionX -= 6;
        bgParallax4.tilePositionX -= 8;
        }
    }
});

