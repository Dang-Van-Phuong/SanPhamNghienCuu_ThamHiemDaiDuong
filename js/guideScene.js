var GuideScene = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize: function LoadGame() {
        Phaser.Scene.call(this, { key: 'GuideScene' });
    },

    preload: function () {
        this.load.image('huongdan', 'assets/anhnen.png');
        this.load.image('backButton', 'assets/TroLai.png');
        this.load.audio('nhacnen', 'assets/music/nhacnen.mp3');
        this.load.image('thoat', 'assets/Thoat.png');
        this.load.image('nhanvao', 'assets/NutBam.png');
        this.load.image('vien', 'assets/vien.png');
        this.load.image('nguloi', 'assets/NguLoi.png');
        this.load.image('oxi', 'assets/oxi.png');
        this.load.image('thoat', 'assets/Thoat.png');
        this.load.image('bomnguloi', 'assets/bomnguloi.png');
        this.load.atlas('Nguoinhienlieu', 'assets/NguoiNhienLieu.png', 'assets/NguoiNhienLieu.json');
        this.load.atlas('CoHoi', 'assets/CoHoi.png', 'assets/CoHoi.json');
    },

    create: function () {
        console.log('Đã vào guideScene');
        this.cameras.main.fadeIn(500, 0, 0, 0);
        this.backgroundMusic3 = this.sound.add('nhacnen', { loop: true });
        this.backgroundMusic3.play();
        bgParallax1 = this.add.tileSprite(1920 / 2, 1080 / 2, config.width, config.height - 200, 'huongdan'); 
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
      

  

        this.rectangle = this.add.rectangle(config.width / 2, config.height / 2, 1300, 700, 0xFFFFFF);
        this.rectangle.setOrigin(0.5);
        this.rectangle.setStrokeStyle(7, 0x000000); // Độ rộng của đường nét và màu sắc (0x000000 là màu đen)

         // Tăng giá trị textY để xuống dòng mới
          var textY = config.height / 2 - 650 / 2 + 30;

            // Tạo văn bản cho dòng đầu tiên
            var message0 = "Hướng dẫn luật chơi cơ bản";
            var style0 = {
                fontSize: '70px',
                fill: '#FF0000',
                fontFamily: 'Arial',
                align: 'center',
                baselineY: 0,
            };

            var text0 = this.add.text(config.width / 2, textY, message0, style0);
            text0.setOrigin(0.5);
            textY += 250; // Thay đổi giá trị này tùy vào khoảng cách bạn muốn giữa hai dòng
                var message1 = "1. Nhiệm vụ:\nDi chuyển tàu ngầm để rước người tiếp nhiên liệu bằng\ncách trả lời câu hỏi ôn tập tri thức môn Tin học lớp 11.";
                var style1 = {
                    fontSize: '45px',
                    fill: '#000000',
                    fontFamily: 'Arial',
                    align: 'left',
                    lineSpacing: 50,  // Điều chỉnh khoảng cách giữa các dòng
                };

                var text1 = this.add.text(config.width / 2, textY, message1, style1);
                text1.setOrigin(0.5);
                textY += 250; // Thay đổi giá trị này tùy vào khoảng cách bạn muốn giữa hai dòng

            // Tạo văn bản cho dòng thứ hai
                var message2 = "         2. Cách di chuyển:\n           Sử dụng các phím mũi tên để di chuyển tàu ngầm.\n           Sử dụng phím space để phóng ngư lôi."
                //Hãy thám hiểm và tránh né các con quái vật\nĐón người tiếp nhiên liệu bằng \n cách rước và trả lời câu hỏi\nSử dụng bom ngư lôi khi cần thiết!";
                var style2 = {
                    fontSize: '50px', 
                    fill: 0xFFFFFF, // Màu trắng
                    fontFamily: 'Arial',
                    align: 'left',
                    lineSpacing: 50,  // Điều chỉnh khoảng cách giữa các dòng
                };
                var text2 = this.add.text(860, 500, message2, style2);
                text2.setOrigin(0.5);     
           
    
               //
               var message3 = "3. Thông tin cần biết:\n                          Cơ hội thám hiểm.\n                          Lượng oxi còn lại. \n                          Số ngư lôi hiện có.\n                          Người tiếp nhiên liệu.";
               var style3 = {
                   fontSize: '60px',
                   fill: 0xFFFFFF, // Màu trắng
                   fontFamily: 'Arial',
                   align: 'left',
                   lineSpacing: 50,  // Điều chỉnh khoảng cách giữa các dòng
               };
               var text3 = this.add.text(850, 500, message3, style3);
               text3.setOrigin(0.5);

               var message4 = "Xem thêm luật chơi chi tiết tại đây =>";
               var style4 = {
                   fontSize: '55px',
                   fill: 0xFFFFFF, // Màu trắng
                   fontFamily: 'Arial',
                   align: 'left',
                   lineSpacing: 30,  // Điều chỉnh khoảng cách giữa các dòng
               };
               var text4 = this.add.text(config.width / 2 -160, textY -260, message4, style4);
               text4.setOrigin(0.5);
               text4.visible = false; // Ẩn ngay từ đầu
               textY += 250; // Tăng giá trị textY để xuống dòng mới
               
                var button = this.add.sprite(1500, 800, 'nhanvao');
                button.setScale(0.3, 0.28);

                // Thêm văn bản lên trên nút bấm
                var buttonText = this.add.text(button.x, button.y, 'Tiếp tục', {
                    fontSize: '35px',
                    fill: '0xFFFFFF',
                    fontFamily: 'Arial, sans-serif',
                    align: 'center',
                });
                buttonText.setOrigin(0.5);
                  // Tạo sự kiện click cho nút
                  
            var instructionState = 1; // Trạng thái mặc định là 1
            this.tron1 = null;
            this.tron2 = null;
            this.tron3 = null;
            this.tron4 = null;
            this.hinhVuong1 = null;
            this.hinhVuong2 = null;
            this.hinhVuong3 = null;
            this.hinhVuong4 = null;

            text0.visible = true;
            text1.visible = true;
            text2.visible = false;
            text3.visible = false; // Ẩn ngay từ đầu

            // Tạo sự kiện click cho nút
            // Tạo sự kiện click cho nút
            button.setInteractive().on('pointerdown', function () {
                // Đặt giá trị mặc định cho các trạng thái mới
            
                switch (instructionState) {
                    case 1:
                        text0.visible = false;
                        text1.visible = false;
                        text2.visible = true;
                        console.log('dang o 1')
                        break;
                  
                    case 2:
                        text2.visible = false;
                        text3.visible = true;
                        this.tron1 = this.add.circle(170, config.height - 125, 100);
                        this.tron1.setAlpha(0.5);
                        this.tron1.setDepth(100);
                        this.tron1.setStrokeStyle(10, 0xFF0000, 2 ); // Đặt độ rộng và màu cho đường viền
                        this.tweens.add({
                            targets: this.tron1,
                            duration: 1000, // Thời gian animation (ms)
                            scaleX: 1.3, // Tăng kích thước theo chiều ngang lên 1.2 lần
                            scaleY: 1.3, // Tăng kích thước theo chiều dọc lên 1.2 lần
                            yoyo: true, // Quay lại kích thước ban đầu sau khi hoàn thành
                            repeat: -1 // Lặp vô hạn
                        });
                        this.hinhVuong1 = this.add.rectangle(1020,400, 500, 100);
                        this.hinhVuong1.setAlpha(0.5);
                        this.hinhVuong1.setDepth(100);
                        this.hinhVuong1.setStrokeStyle(10, 0xFF0000, 2); // Đặt độ rộng và màu cho đường viền
                        // Tạo animation cho hình vuông
                        this.tweens.add({
                            targets: this.hinhVuong1,
                            duration: 1000,
                            scaleX: 1.1,
                            scaleY: 1.1,
                            yoyo: true,
                            repeat: -1
                        });
                        break;
                    case 3:
                        if (this.tron1) {
                            this.tron1.destroy();
                            this.hinhVuong1.destroy();
                        }

                        this.tron2 = this.add.circle(670, config.height - 125, 100);
                        this.tron2.setAlpha(0.5);
                        this.tron2.setDepth(100);
                        this.tron2.setStrokeStyle(10, 0x000080, 2 ); // Đặt độ rộng và màu cho đường viền
                        this.tweens.add({
                            targets: this.tron2,
                            duration: 1000, // Thời gian animation (ms)
                            scaleX: 1.3, // Tăng kích thước theo chiều ngang lên 1.2 lần
                            scaleY: 1.3, // Tăng kích thước theo chiều dọc lên 1.2 lần
                            yoyo: true, // Quay lại kích thước ban đầu sau khi hoàn thành
                            repeat: -1 // Lặp vô hạn
                        });
                        this.hinhVuong2 = this.add.rectangle(1020,500, 500, 100);
                        this.hinhVuong2.setAlpha(0.5);
                        this.hinhVuong2.setDepth(100);
                        this.hinhVuong2.setStrokeStyle(10, 0x000080, 2); // Đặt độ rộng và màu cho đường viền
                        // Tạo animation cho hình vuông
                        this.tweens.add({
                            targets: this.hinhVuong2,
                            duration: 1000,
                            scaleX: 1.1,
                            scaleY: 1.1,
                            yoyo: true,
                            repeat: -1
                        }); 
                        break;
                    case 4:
                        if (this.tron2) {
                            this.tron2.destroy();
                            this.hinhVuong2.destroy();
                        }
                        this.tron3 = this.add.circle(1120, config.height - 125, 100);
                        this.tron3.setAlpha(0.5);
                        this.tron3.setDepth(100);
                        this.tron3.setStrokeStyle(10, 0x008000, 2 ); // Đặt độ rộng và màu cho đường viền
                        this.tweens.add({
                            targets: this.tron3,
                            duration: 1000, // Thời gian animation (ms)
                            scaleX: 1.3, // Tăng kích thước theo chiều ngang lên 1.2 lần
                            scaleY: 1.3, // Tăng kích thước theo chiều dọc lên 1.2 lần
                            yoyo: true, // Quay lại kích thước ban đầu sau khi hoàn thành
                            repeat: -1 // Lặp vô hạn
                        });
                        this.hinhVuong3 = this.add.rectangle(1020,600, 500, 100);
                        this.hinhVuong3.setAlpha(0.5);
                        this.hinhVuong3.setDepth(100);
                        this.hinhVuong3.setStrokeStyle(10, 0x008000, 2); // Đặt độ rộng và màu cho đường viền
                        // Tạo animation cho hình vuông
                        this.tweens.add({
                            targets: this.hinhVuong3,
                            duration: 1000,
                            scaleX: 1.1,
                            scaleY: 1.1,
                            yoyo: true,
                            repeat: -1
                        }); 
                        break;
                    case 5: 
                    if (this.tron3) {
                        this.tron3.destroy();
                        this.hinhVuong3.destroy();
                    }
                    this.tron4 = this.add.circle(1700, config.height - 125, 110);
                    this.tron4.setAlpha(0.5);
                    this.tron4.setDepth(100);
                    this.tron4.setStrokeStyle(10, 0xFFA500, 2 ); // Đặt độ rộng và màu cho đường viền
                    this.tweens.add({
                        targets: this.tron4,
                        duration: 1000, // Thời gian animation (ms)
                        scaleX: 1.8, // Tăng kích thước theo chiều ngang lên 1.2 lần
                        scaleY: 1.1, // Tăng kích thước theo chiều dọc lên 1.2 lần
                        yoyo: true, // Quay lại kích thước ban đầu sau khi hoàn thành
                        repeat: -1 // Lặp vô hạn
                    });
                    this.hinhVuong4 = this.add.rectangle(1060,730, 550, 100);
                    this.hinhVuong4.setAlpha(0.5);
                    this.hinhVuong4.setDepth(100);
                    this.hinhVuong4.setStrokeStyle(10, 0xFFA500, 2); // Đặt độ rộng và màu cho đường viền
                    // Tạo animation cho hình vuông
                    this.tweens.add({
                        targets: this.hinhVuong4,
                        duration: 1000,
                        scaleX: 1.1,
                        scaleY: 1.1,
                        yoyo: true,
                        repeat: -1
                    }); 
                    
                        break;
                    case 6:
                        text3.visible = false;
                        text4.visible = true;
                        if (this.tron4) {
                            this.tron4.destroy();
                            this.hinhVuong4.destroy();
                        }
                        // // Tạo đối tượng Text và đặt nó ngay trên nút3
                    var button = this.add.image(1350, 490, 'nhanvao').setScale(0.32, 0.2);
                    button.setInteractive();
                    var buttonText1 = this.add.text(1350, 490, 'Nhấp vào', {
                        fontSize: '35px',
                        fill: '#FF0000',
                        fontFamily: 'Time new roman'
                    });
                    buttonText1.setOrigin(0.5);
                    button.on('pointerdown', function () {
                        console.log("Nút đã được nhấp!");
                            var rectangle = this.add.rectangle(this.game.config.width / 2, this.game.config.height / 2, 1910, 900, 0xFFFFFF);
                            rectangle.setOrigin(0.5);
                            rectangle.setStrokeStyle(7, 0x000000);

                            var message = "Luật chơi chi tiết như sau";
                            var style = {
                                fontSize: '60px',
                                fill: '#000000',
                                fontFamily: 'Time new roman',
                                align: 'left',
                                lineSpacing: 20  // Điều chỉnh khoảng cách giữa các dòng
                            };
                            var text1 = this.add.text(830, 150, message, style);
                            text1.setOrigin(0.5);
                            var message = "NHIỆM VỤ:\n  -Hãy sử dụng các PHÍM MŨI TÊN để di chuyển tàu ngầm tránh quái vật và PHÍM SPACE để phóng ngư lôi vào \n quái vật khi cần thiết.\n  -Trong lúc đó hãy RƯỚC người tiếp nhiên liệu và TRẢ LỜI CÂU HỎI ôn tập Tin học lớp 11. Biết rằng:\n     +Nếu trả lời đúng thì sẽ rước được người tiếp nhiên liệu và ngược lại.\n     +Đủ 5 người tiếp nhiên liệu sẽ qua cấp độ tiếp theo.\nNHỮNG ĐIỀU CẦN CHÚ Ý:\n  -Số lượng cơ hội và oxi có hạn nên khi hết một trong hai bạn sẽ thua.\n  -Nếu quái vật chạm vào tàu ngầm thì sẽ mất đi một cơ hội.\n  -Khi rước người tiếp nhiên liệu thành công sẽ được cộng thêm oxi để duy trì.\n  -Và ở một số cấp độ sẽ có vài thay đổi nhỏ về cách chơi nên hãy chú ý nhé.\nChúc bạn may mắn!";
                            var style = {
                                fontSize: '40px',
                                fill: '#000000',
                                fontFamily: 'Time new roman',
                                align: 'left',
                                lineSpacing: 20  // Điều chỉnh khoảng cách giữa các dòng
                            };
                            var text2 = this.add.text(950, 540, message, style);
                            text2.setOrigin(0.5);
                        
                        var thoatButton = this.add.image(config.width - 100, 110, 'thoat').setOrigin(1, 0).setScale(0.1);
                        thoatButton.setInteractive();
                        thoatButton.on('pointerup', function () {
                            rectangle.setVisible(false);
                            text1.setVisible(false);
                            text2.setVisible(false);
                            thoatButton.setVisible(false); 
                        }, this);
                    }, this); 
                        buttonText.setText('Quay lại');
                        break;
                    case 7:
                        this.backgroundMusic3.stop();
                        this.scene.start('MenuScene');
                        break;
                }
                        instructionState++;
            }, this);

    }
});
