var Level4Scene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
  
  function Level3Scene() { Phaser.Scene.call(this, { key: 'level4scene' }); },
  preload: function () { 
    this.load.image('anhnen4.1', 'assets/level2_1.png');
    this.load.image('anhnen4.2', 'assets/level2_2.png');
    this.load.image('vien', 'assets/vien.png');
    this.load.image('nguloi', 'assets/NguLoi.png');
    this.load.image('oxi', 'assets/oxi.png');
    this.load.image('thoat', 'assets/Thoat.png');
    this.load.image('bom4', 'assets/bom_lever4.png');
    this.load.image('bomicon', 'assets/bomicon.png');
    this.load.image('icon_die', 'assets/icon_lever4.png');

    this.load.audio('nhacnenlevel4', 'assets/music/level4.mp3');
    this.load.audio('quaivatchet', 'assets/music/quaivatchet.mp3');
    this.load.audio('nguoi', 'assets/music/nguoi.mp3');
    this.load.audio('chonsai', 'assets/music/chonsai.mp3');

    this.load.spritesheet('Quaivat', 'assets/QuaiVat_lever4.png', { frameWidth: 54, frameHeight: 22 });
    this.load.spritesheet('taungam', 'assets/TauNgam.png', { frameWidth: 200, frameHeight: 70 });
    this.load.spritesheet('QuaiVatChet', 'assets/QuaiVat_die.png', { frameWidth: 78, frameHeight: 87 });
  },
  create: function () {
    // am thanh
    this.backgroundMusic1 = this.sound.add('quaivatchet', { loop: true });
    this.backgroundMusic2 = this.sound.add('nguoi', { loop: true });
    this.backgroundMusic3 = this.sound.add('nhacnenlevel4', { loop: true });
    this.backgroundMusic3.play();
    this.backgroundMusic4 = this.sound.add('chonsai', { loop: true });
    cursors = this.input.keyboard.createCursorKeys();
    // vien anh
    this.cameras.main.fadeIn(500, 0, 0, 0);
    bgParallax1 = this.add.tileSprite(1920 / 2, 1080 / 2, config.width, config.height - 200, 'anhnen4.1');
    bgParallax2 = this.add.tileSprite(1920 / 2, 1080 / 2, config.width, config.height - 200, 'anhnen4.2');
    var vienHeight = 170;
    var vienWidth = config.width;
    var vienTop = this.add.image(config.width / 2, vienHeight / 2, 'vien');
    vienTop.setDisplaySize(vienWidth, vienHeight);
    var vienBottom = this.add.image(config.width / 2, config.height - vienHeight / 2, 'vien');
    vienBottom.setDisplaySize(vienWidth, vienHeight);
    // cac bien
    this.DiversSavedCount = 1;
    this.isMonsterSpawningEnabled = true; 
    this.CollisionTimer = 0;
    // bien cap do
    var levelText = this.add.text(50, 95, 'Cấp độ: 4', { fontSize: '55px', fill: '#ffffff', fontFamily: 'pixel_font' });
    levelText.setDepth(1);
    // bien diem
    this.ScoreCount = 0;
    this.ScoreText = this.add.text(1320, 100, 'Điểm: ' + this.ScoreCount, {
      fontSize: '55px',
      fill: '#ffffff',
      fontFamily: 'Arial, sans-serif'
    });
    this.anims.create({
      key: 'taungam',
      frames: this.anims.generateFrameNumbers('taungam'),
      frameRate: 5,
      repeat: -1
    });
    // bien dem ngu loi
    this.add.image(config.width -200, config.height - 120,'bomicon').setScale(3);
    this.nguloi = 18;
    this.nguloiText = this.add.text(config.width -250, config.height -155, this.nguloi, {
      fontSize: '55px',
      fill: '#ffffff',
      fontFamily: 'pixel_font',
    }).setDepth(1);
      // nut thoat
      var thoatButton = this.add.image(config.width - 30, 100, 'thoat').setOrigin(1, 0).setScale(0.1);
      thoatButton.setTintFill(0xFFFFFF); 
      thoatButton.setInteractive();
      thoatButton.on('pointerup', function () {
          this.backgroundMusic3.stop();
          this.scene.start('MenuScene');
      }, this);
    // bien dem luot quai vat die
    this.add.image(900, config.height - 120,'icon_die').setScale(1.4);
    this.die = 5;
    this.dieText = this.add.text(920, config.height -155, this.die, {
      fontSize: '55px',
      fill: '#ffffff',
      fontFamily: 'pixel_font',
    }).setDepth(1);
    // bien oxi
    this.add.image(200, config.height - 120, 'oxi').setScale(1.4);

    this.oxi = 2000;
    this.oxiText = this.add.text(201, config.height - 155, this.oxi, {
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
      },
        callbackScope: this,
        loop: true,
    });
    // tao tau ngam
    this.player = this.physics.add.sprite(config.width /2, 230, 'taungam').setCollideWorldBounds(true);
    this.player.setFlipX(true);
    this.player.anims.play('taungam');
    this.player.setScale(1);

      // nhan phim space thì diem duoc cong
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
      if (this.nguloi == 0) {
      this.YouLost();
    }
    }, this);
    // tao quai vat
    const quaivats = this.physics.add.group();
    this.monsterCounter = 0;
    function createQuaivat() {
      if (this.isMonsterSpawningEnabled === true) {
        this.monsterCounter++;
        const spawnSide = Math.random() < 0.5 ? 'left' : 'right'; // xuat hien ngau nhien ben trai hoac ben phai
        const spawnX = spawnSide === 'left' ? 50 : config.width - 50; 
        const quaivat = quaivats.create(spawnX, config.height - 250, 'Quaivat').setScale(4);
        quaivat.isYellow = this.monsterCounter % 3 === 0; // con ca map mau vang
        if (quaivat.isYellow) {
          quaivat.setTintFill(0xffff00); 
          const quaivatSpeedYellow = 1100; // toc do con quai vat mau vang
          const velocityX = spawnSide === 'left' ? quaivatSpeedYellow : -quaivatSpeedYellow;
          quaivat.setVelocityX(velocityX);
          // qua nguoc lai neu xuat hien tu ben phai
          if (spawnSide === 'right') {
              quaivat.setFlipX(true);
          }
          } else {
            const quaivatSpeedNormal = 950; // toc do cua nhung con binh thuong
            const velocityX = spawnSide === 'left' ? quaivatSpeedNormal : -quaivatSpeedNormal;
            quaivat.setVelocityX(velocityX);
            if (spawnSide === 'right') {
                quaivat.setFlipX(true);
            }
          }
        // animation 
        this.anims.create({
          key: 'Quaivat',
          frames: this.anims.generateFrameNumbers('Quaivat'),
          frameRate: 6,
          repeat: -1
        });
        quaivat.anims.play('Quaivat');
        // khi ngu loi cham vao quai vat
        this.anims.create({
          key: 'QuaiVatChet',
          frames: this.anims.generateFrameNumbers('QuaiVatChet'),
          frameRate: 20,
          repeat: 0,
          hideOnComplete: true
        });
        if (this.monsterCounter === 3) {
          this.monsterCounter = 0;
        }
      }
    }
    //tao moi quai vat
    const createQuaivatEvent = this.time.addEvent({
        delay: Phaser.Math.Between(1000, 2000), 
        callback: createQuaivat,
        callbackScope: this,
        loop: true
    });
    this.physics.add.collider(this.bombs, quaivats, this.bomQuaivatCollision, null, this);  
  },

    handleCollision: function () {
      this.physics.pause();
      this.countdownEvent.paused = true;
      this.isMonsterSpawningEnabled = false;
    },
     resumeGame: function () {
      this.physics.resume();
      this.countdownEvent.paused = false;
      this.isMonsterSpawningEnabled = true;
     
    },
    congDiem: function()    {
      this.ScoreCount += 200; 
      this.ScoreText.setText('Điểm: ' + this.ScoreCount);
      this.oxiText.setTint(0xffff00); 
      this.time.delayedCall(2000, function () {
          this.oxiText.clearTint(); 
      }, [], this);
      this.oxi += 200;
      this.updateOxiText();
  },
  // tha bom va tra loi cau hoi
  bomQuaivatCollision: function(bomb, quaivat) {
    this.handleCollision(); 
    if(this.DiversSavedCount===1) {
      this.CauHoi1().then((isCorrect) => {
      console.log('Câu trả lời có đúng không?', isCorrect);
      if(isCorrect) {
        quaivat.destroy();
        bomb.destroy(); 
        this.backgroundMusic1.play();
        setTimeout(() => {
          this.backgroundMusic1.stop();
        }, 500);
        this.backgroundMusic2.play();
          setTimeout(() => {
          this.backgroundMusic2.stop();
        }, 500);
        this.die -= 1;
        this.dieText.setText(this.die);
          // thay doi thanh mau do trong 1 giay
        this.dieText.setColor('#ff0000'); 
        this.time.delayedCall(1000, function () {
            this.dieText.setColor('#ffffff'); // tro lai mau trang
        }, [], this);
        if (quaivat.isYellow) {
          this.nguloi += 3;
          this.updateNguloiText();
          this.nguloiText.setTint(0xffff00);
          this.time.delayedCall(2000, function () {
            // tro lai mau trang sau 2 giay
            this.nguloiText.clearTint();
          }, [], this);
        } 
        this.DiversSavedCount++;
        this.congDiem();
        }
      });
    } else if(this.DiversSavedCount===2) {
      this.CauHoi2().then((isCorrect) => {
      console.log('Câu trả lời có đúng không?', isCorrect);
      if(isCorrect) {
        quaivat.destroy();
        bomb.destroy(); 
        this.backgroundMusic1.play();
        setTimeout(() => {
          this.backgroundMusic1.stop();
        }, 500);
        this.backgroundMusic2.play();
          setTimeout(() => {
          this.backgroundMusic2.stop();
        }, 500);
        this.die -= 1;
        this.dieText.setText(this.die);
          // thay doi thanh mau do trong 1 giay
          this.dieText.setColor('#ff0000'); 
        this.time.delayedCall(1000, function () {
            this.dieText.setColor('#ffffff'); // mau trang sau 1 giay
        }, [], this);
        if (quaivat.isYellow) {
          this.nguloi += 3;
          this.updateNguloiText();
          this.nguloiText.setTint(0xffff00);
          this.time.delayedCall(2000, function () {
            // tro ve mau trang sau 2 giay
            this.nguloiText.clearTint();
          }, [], this);
        } 
        this.DiversSavedCount++;
        this.congDiem();
        }
      });
    } else if(this.DiversSavedCount===3) {
      this.CauHoi3().then((isCorrect) => {
      console.log('Câu trả lời có đúng không?', isCorrect);
      if(isCorrect) {
        quaivat.destroy();
        bomb.destroy(); 
        this.backgroundMusic1.play();
        setTimeout(() => {
          this.backgroundMusic1.stop();
        }, 500);
        this.backgroundMusic2.play();
          setTimeout(() => {
          this.backgroundMusic2.stop();
        }, 500);
        this.die -= 1;
        this.dieText.setText(this.die);
          // thay doi thanh mau do trong 1 giay
          this.dieText.setColor('#ff0000'); 
        this.time.delayedCall(1000, function () {
            this.dieText.setColor('#ffffff'); 
        }, [], this);
        if (quaivat.isYellow) {
          this.nguloi += 3;
          this.updateNguloiText();
          this.nguloiText.setTint(0xffff00);
          this.time.delayedCall(2000, function () {
          this.nguloiText.clearTint();
          }, [], this);
        } 
        this.DiversSavedCount++;
        this.congDiem();
        }
      });
    }else if(this.DiversSavedCount===4) {
      this.CauHoi4().then((isCorrect) => {
      console.log('Câu trả lời có đúng không?', isCorrect);
      if(isCorrect) {
        quaivat.destroy();
        bomb.destroy(); 
        this.backgroundMusic1.play();
        setTimeout(() => {
          this.backgroundMusic1.stop();
        }, 500);
        this.backgroundMusic2.play();
          setTimeout(() => {
          this.backgroundMusic2.stop();
        }, 500);
        this.die -= 1;
        this.dieText.setText(this.die);
          // thay doi thanh mau do trong 1 giay
          this.dieText.setColor('#ff0000'); // mau do
        this.time.delayedCall(1000, function () {
            this.dieText.setColor('#ffffff'); 
        }, [], this);
        if (quaivat.isYellow) {
          this.nguloi += 3;
          this.updateNguloiText();
          this.nguloiText.setTint(0xffff00);
          this.time.delayedCall(2000, function () {
            this.nguloiText.clearTint();
          }, [], this);
        } 
        this.DiversSavedCount++;
        this.congDiem();
        }
      });
    } else  {
      this.CauHoi5().then((isCorrect) => {
      console.log('Câu trả lời có đúng không?', isCorrect);
      if(isCorrect) {
        quaivat.destroy();
        bomb.destroy(); 
        this.backgroundMusic1.play();
        setTimeout(() => {
          this.backgroundMusic1.stop();
        }, 500);
        this.backgroundMusic2.play();
          setTimeout(() => {
          this.backgroundMusic2.stop();
        }, 500);
        this.die -= 1;
        this.dieText.setText(this.die);
          // thay doi thanh mau do trong 1 giay
          this.dieText.setColor('#ff0000'); 
        this.time.delayedCall(1000, function () {
            this.dieText.setColor('#ffffff'); // mau trang sau 1 giay
        }, [], this);
        if (quaivat.isYellow) {
          this.nguloi += 3;
          this.updateNguloiText();
          this.nguloiText.setTint(0xffff00);
          this.time.delayedCall(2000, function () {
            this.nguloiText.clearTint();
          }, [], this);
        } 
        this.congDiem();
        this.backgroundMusic3.stop();
        this.YouWon();
        }
      });
    }
    if (this.die === 0) {
      this.backgroundMusic3.stop();
      this.YouWon();
    }
    if (this.oxi === 0) {
      this.backgroundMusic3.stop();
      this.YouLost();
    }
  },
    // cap nhat oxi
    updateOxiText: function () {
      this.oxiText.setText(this.oxi);
      },
    // hien so ngu loi
    updateNguloiText: function () {
      this.nguloiText.setText(this.nguloi);
    },
    dropBomb: function () {
      // Tạo bom ngu loi xuat hien o vi tri cua tau ngam
      const bomb = this.bombs.create(this.player.x-50, this.player.y, 'bom4').setScale(0.12);
      const bombSpeed = 800;
      bomb.setFlipX(true);
      // goc xoay cua bom
      bomb.setAngle(90);
      const angleInRadians = Phaser.Math.DegToRad(bomb.angle); 
      bomb.setVelocity(Math.cos(angleInRadians) * bombSpeed, Math.sin(angleInRadians) * bombSpeed);
  },
      // hien thi cau hoi
  CauHoi1: function() {
    var questionBox = this.add.rectangle(config.width / 2, config.height / 2, 1600, 700, 0xffffff );
    questionBox.setOrigin(0.5, 0.5);
    questionBox.setStrokeStyle(13, 0x003366); 
    var questionText = this.add.text(config.width / 2, config.height / 2 - 200, 'ROM (Read Only Memory) trong máy tính được sử dụng để làm gì?', {
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
    var textA = this.add.text(450, 550, 'A.Lưu trữ chương trình khởi động và\n các chức năng cơ bản của máy tính', {
        fontSize: '28px',
        fill: '#ffffff', 
        fontFamily: 'Times New Roman', 
        align: 'center'
    });
    textA.setOrigin(0.5, 0.5);
    var buttonB = this.add.rectangle(1350, 550, 650, 100, 0x003366);
    buttonB.setOrigin(0.5, 0.5);
    var textB = this.add.text(1300, 550, 'B.Xử lý và thực thi các lệnh của máy tính', {
        fontSize: '30px',
        fill: '#ffffff', 
        fontFamily: 'Times New Roman', 
        align: 'center'
    });
    textB.setOrigin(0.5, 0.5);
    var buttonC = this.add.rectangle( 530, 750, 650, 100, 0x003366);
    buttonC.setOrigin(0.5, 0.5);
    var textC = this.add.text(500, 750, 'C.Lưu trữ dữ liệu tạm thời trong quá trình tính toán', {
        fontSize: '27px',
        fill: '#ffffff', 
        fontFamily: 'Times New Roman', 
        align: 'center'
    });
    textC.setOrigin(0.5, 0.5);
    var buttonD = this.add.rectangle(1350, 750, 650, 100, 0x003366);
    buttonD.setOrigin(0.5, 0.5);
    var textD = this.add.text(1100, 730, 'D.Ghi và đọc dữ liệu từ ổ cứng', {
        fontSize: '30px',
        fill: '#ffffff', 
        fontFamily: 'Times New Roman',
        align: 'center'
    });
    textC.setOrigin(0.5, 0.5);
       
  return new Promise((resolve, reject) => {
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
        buttonA.setFillStyle(0x00ff00); 
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
  var questionText = this.add.text(config.width / 2, config.height / 2 - 200, 'Bảng điều khiển (Control Panel/System Preferences) cung cấp quyền truy cập đến?', {
      fontSize: '44px',
      fill: '#000000',
      fontFamily: 'Times New Roman', 
      align: 'center',
      fontWeight: 'bold', 
      lineSpacing: 20
  });
  questionText.setOrigin(0.5, 0.5);
  var buttonA = this.add.rectangle(1500, 700, 650, 100, 0x003366);
  buttonA.setOrigin(2, 2);
  var textA = this.add.text(450, 550, 'A.Các trò chơi và giải trí', {
      fontSize: '28px',
      fill: '#ffffff', 
      fontFamily: 'Times New Roman', 
      align: 'center'
  });
  textA.setOrigin(0.5, 0.5);
  var buttonB = this.add.rectangle(1350, 550, 650, 100, 0x003366);
  buttonB.setOrigin(0.5, 0.5);
  var textB = this.add.text(1400, 550, 'B.Cài đặt hệ thống và tùy chọn điều chỉnh', {
      fontSize: '30px',
      fill: '#ffffff', 
      fontFamily: 'Times New Roman', 
      align: 'center'
  });
  textB.setOrigin(0.5, 0.5);
  var buttonC = this.add.rectangle( 530, 750, 650, 100, 0x003366);
  buttonC.setOrigin(0.5, 0.5);
  var textC = this.add.text(550, 750, 'C.Dịch vụ trực tuyến và lưu trữ đám mây', {
      fontSize: '27px',
      fill: '#ffffff', 
      fontFamily: 'Times New Roman', 
      align: 'center'
  });
  textC.setOrigin(0.5, 0.5);
  var buttonD = this.add.rectangle(1350, 750, 650, 100, 0x003366);
  buttonD.setOrigin(0.5, 0.5);
  var textD = this.add.text(1150, 730, 'D.Các ứng dụng văn phòng', {
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
CauHoi3: function() {
  var questionBox = this.add.rectangle(config.width / 2, config.height / 2, 1600, 700, 0xffffff );
  questionBox.setOrigin(0.5, 0.5);
  questionBox.setStrokeStyle(13, 0x003366); 
  var questionText = this.add.text(config.width / 2, config.height / 2 - 200, 'Trong việc thực hiện các tính toán nhị phân, vai trò chính của các mạch logic là gì?', {
      fontSize: '45px',
      fill: '#000000',
      fontFamily: 'Times New Roman', 
      align: 'center',
      fontWeight: 'bold', 
      lineSpacing: 20
  });
  questionText.setOrigin(0.5, 0.5);
  var buttonA = this.add.rectangle(1500, 700, 650, 100, 0x003366);
  buttonA.setOrigin(2, 2);
  var textA = this.add.text(450, 550, 'A.Lưu trữ dữ liệu nhị phân.', {
      fontSize: '28px',
      fill: '#ffffff', 
      fontFamily: 'Times New Roman', 
      align: 'center'
  });
  textA.setOrigin(0.5, 0.5);
  var buttonB = this.add.rectangle(1350, 550, 650, 100, 0x003366);
  buttonB.setOrigin(0.5, 0.5);
  var textB = this.add.text(1350, 550, 'B. Tạo ra giao diện người dùng cho tính toán nhị phân.', {
      fontSize: '27px',
      fill: '#ffffff', 
      fontFamily: 'Times New Roman', 
      align: 'center'
  });
  textB.setOrigin(0.5, 0.5);
  var buttonC = this.add.rectangle( 530, 750, 650, 100, 0x003366);
  buttonC.setOrigin(0.5, 0.5);
  var textC = this.add.text(530, 750, 'C.Thực hiện các phép toán nhị phân như AND, OR, NOT.', {
      fontSize: '27px',
      fill: '#ffffff', 
      fontFamily: 'Times New Roman', 
      align: 'center'
  });
  textC.setOrigin(0.5, 0.5);
  var buttonD = this.add.rectangle(1350, 750, 650, 100, 0x003366);
  buttonD.setOrigin(0.5, 0.5);
  var textD = this.add.text(1050, 730, 'D.Quản lý các kết nối mạng nhị phân.', {
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
  var questionText = this.add.text(config.width / 2, config.height / 2 - 200, 'Phần mềm nguồn mở (open source) và phần mềm thương mại (proprietary)\ncó điểm khác biệt chính là gì?', {
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
  var textA = this.add.text(480, 550, 'A.Sự phổ biến trong cộng đồng người dùng.', {
      fontSize: '28px',
      fill: '#ffffff', 
      fontFamily: 'Times New Roman', 
      align: 'center'
  });
  textA.setOrigin(0.5, 0.5);
  var buttonB = this.add.rectangle(1350, 550, 650, 100, 0x003366);
  buttonB.setOrigin(0.5, 0.5);
  var textB = this.add.text(1300, 550, 'B.Quyền truy cập và sửa đổi mã nguồn.', {
      fontSize: '30px',
      fill: '#ffffff', 
      fontFamily: 'Times New Roman', 
      align: 'center'
  });
  textB.setOrigin(0.5, 0.5);
  var buttonC = this.add.rectangle( 530, 750, 650, 100, 0x003366);
  buttonC.setOrigin(0.5, 0.5);
  var textC = this.add.text(400, 750, 'C.Tốn chi phí khi sử dụng.', {
      fontSize: '27px',
      fill: '#ffffff', 
      fontFamily: 'Times New Roman', 
      align: 'center'
  });
  textC.setOrigin(0.5, 0.5);
  var buttonD = this.add.rectangle(1350, 750, 650, 100, 0x003366);
  buttonD.setOrigin(0.5, 0.5);
  var textD = this.add.text(1100, 730, 'D.Được phát triển bởi các công ty lớn.', {
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
CauHoi5: function() {
  var questionBox = this.add.rectangle(config.width / 2, config.height / 2, 1600, 700, 0xffffff );
  questionBox.setOrigin(0.5, 0.5);
  questionBox.setStrokeStyle(13, 0x003366); 
  var questionText = this.add.text(config.width / 2, config.height / 2 - 200, 'Tiện ích chẩn đoán hệ thống (System Diagnostic Utilities) được sử dụng để?', {
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
  var textA = this.add.text(450, 550, 'A. Tạo sao lưu và khôi phục dữ liệu', {
      fontSize: '28px',
      fill: '#ffffff', 
      fontFamily: 'Times New Roman', 
      align: 'center'
  });
  textA.setOrigin(0.5, 0.5);
  var buttonB = this.add.rectangle(1350, 550, 650, 100, 0x003366);
  buttonB.setOrigin(0.5, 0.5);
  var textB = this.add.text(1300, 550, 'B. Quản lý các ứng dụng đa phương tiện', {
      fontSize: '30px',
      fill: '#ffffff', 
      fontFamily: 'Times New Roman', 
      align: 'center'
  });
  textB.setOrigin(0.5, 0.5);
  var buttonC = this.add.rectangle( 530, 750, 650, 100, 0x003366);
  buttonC.setOrigin(0.5, 0.5);
  var textC = this.add.text(420, 750, 'C. Tối ưu hóa hiệu suất đồ họa', {
      fontSize: '27px',
      fill: '#ffffff', 
      fontFamily: 'Times New Roman', 
      align: 'center'
  });
  textC.setOrigin(0.5, 0.5);
  var buttonD = this.add.rectangle(1350, 750, 650, 100, 0x003366);
  buttonD.setOrigin(0.5, 0.5);
  var textD = this.add.text(1050, 730, 'D. Chẩn đoán và kiểm tra sự cố hệ thống', {
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
  buttonD.setInteractive().on('pointerup', function () {
    buttonD.setFillStyle(0x00ff00); 
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
});
},
  // an cau hoi
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
    update: function () {
        // Di chuyen ban phim
         if (cursors.left.isDown) {
          this.player.setVelocityX(-550);
      }
      else if (cursors.right.isDown) {
          this.player.setVelocityX(550);
      }
      // khong nhan phim nao dung di chuyen
      else {
          this.player.setVelocity(0);
      }
      this.nguloiText.setText(this.nguloi);

      // ngu loi ve mau do neu duoi 5
      if (this.nguloi <= 5) {
          this.nguloiText.setColor('#ff0000'); 
      } else {
          // Nếu nguloi lớn hơn 5, thì đặt màu về trắng (mặc định)
          this.nguloiText.setColor('#ffffff');
      }
            // ngu loi ve mau do neu duoi 5
      if (this.oxi <= 500) {
        this.oxiText.setColor('#ff0000'); 
    } else {
        this.oxiText.setColor('#ffffff');
    }
       
  },
    // thua tro choi
    gameOver: function () {
      this.countdownEvent.remove();

      console.log('Game Over');
    },
  
  // thang tro choi
    YouWon: function () {
      this.StopCounter = true;
      this.FadeActive = true;
        this.physics.pause();
        this.cameras.main.fadeOut(500, 0, 0, 0);
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            this.scene.start('Victoryscene', { nextScene: 'HuongDanLevel5' });
        });
  },
    // thua tro choi
    YouLost: function () {
      this.physics.pause();
      this.cameras.main.fadeOut(500, 0, 0, 0);
      this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
        this.scene.start('GameOverScene', { currentScene: 'HuongDanLevel4'});
      });
    
    },
})