var LoadGame = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize: function LoadGame() {
        Phaser.Scene.call(this, { key: 'LoadGame' });
    },
    preload: function () {
        // tai hinh len
        this.load.image('anhnen', 'assets/anhnen.png');
        this.load.image('dangtai', 'assets/dangtai.png');
        this.load.image('taixong', 'assets/taixong.png');
        this.load.image('playicon', 'assets/playicon.png')
    },

    create: function () {
        console.log('Đã vào loadgame');
         var backgroundImage = this.add.tileSprite(0, 0, 1920, 1080, 'anhnen');
         backgroundImage.setOrigin(0, 0);
    
        // dat toa do giua man hinh
        var dangtai = this.add.image(this.game.config.width / 2, this.game.config.height / 2, 'dangtai');
        dangtai.setOrigin(0.5); // Đat goc o giua hinh
        dangtai.setScale(2.2); // tang ti le gap 2.2 lan

        var taixong = this.add.image(this.game.config.width / 2, this.game.config.height / 2, 'taixong');
        taixong.setOrigin(0.5);
        taixong.setScale(2.2);
        taixong.alpha = 0; // 
        // tao tween animation thay doi anh tai xong tu 0 -> 100%
        this.tweens.add({
            targets: taixong,
            alpha: 1,
            duration: 1000, 
            delay: 1000,
            ease: 'Linear',
            onComplete: function () {
                // Ẩn hình dangtai và taixong
                dangtai.setVisible(false);
                taixong.setVisible(false);
            
                var message = "Trò chơi ôn tập tri thức lớp 11";
                var style = {
                    fontSize: '100px',
                    fill: '#FFFF00',
                    fontFamily: 'pixel_font',
                    align: 'left',
                    lineSpacing: 20  
                };
                var text1 = this.add.text(950, 200, message, style);
                text1.setOrigin(0.5);
                var playIconImage = this.add.image(this.game.config.width / 2, this.game.config.height / 2 - 20, 'playicon');
                playIconImage.setTintFill(0xFFFFFF); 
                playIconImage.setOrigin(0.5);
                playIconImage.setScale(0.7);
        
                var text = this.add.text(this.game.config.width / 2 -20 , this.game.config.height / 2 + 200, 'Bấm vào chơi!', {
                    fontSize: '80px',
                    fill: '#fff',
                    fontFamily: 'pixel_font'

                });
                text.setOrigin(0.5);
                // hieu ung chu 
                this.tweens.add({
                    targets: text,
                    scaleX: 1.1, // Phóng to 10%
                    scaleY: 1.1, // Phóng to 10%
                    duration: 1000, 
                    yoyo: true,
                    repeat: -1 
                });
                // Thêm sự kiện nhấp vào hình ảnh playicon
                playIconImage.setInteractive();
                playIconImage.on('pointerdown', function () {
                    this.scene.start('MenuScene');
                }, this);
            },
            callbackScope: this
        });
    },
    update: function () {
        this.children.list.forEach(function (child) {
            if (child instanceof Phaser.GameObjects.TileSprite) {
                child.tilePositionX -= 2; // toc do chay cua nen
            }
        }, this);
    }
});


