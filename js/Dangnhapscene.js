var Dangnhapscene = new Phaser.Class({
    Extends: Phaser.Scene,
// form nay khong con xai
    initialize: function Dangnhapscene() {
        Phaser.Scene.call(this, { key: 'Dangnhapscene' });
    },
   
    preload: function () {
        this.load.image('anhnen', 'assets/anhnen.png');
    },

    create: function () {
        console.log('Đã vào Dangnhapscene');
        var backgroundImage = this.add.tileSprite(0, 0, 1920, 1080, 'anhnen');
        backgroundImage.setOrigin(0, 0);
        var titleText = this.add.text(this.game.config.width / 2 - 200, 240, 'Đăng Nhập', {
            fontSize: '110px',
            fill: '#ff0',
            fontFamily: 'pixel_font'
        });
        this.load.html('form', 'index.html'); // Thay đổi đường dẫn đến file HTML của bạn
        var formCache = this.cache.html.get('form');
        console.log(formCache);
        console.log(this.cache.html.entries);

        // Tạo đối tượng DOMElement cho tên đăng nhập
        this.tendangnhapInput = this.add.dom(this.game.config.width / 2 - 200, 400).createFromCache("form");
        this.tendangnhapInput.getChildByName('ten-dang-nhap-input').addEventListener('input', function () {
            // Xử lý sự kiện khi người dùng nhập vào ô tên đăng nhập
            console.log('Tên Đăng Nhập:', this.getChildByName('ten-dang-nhap-input').value);
        });
    
        // Tạo đối tượng DOMElement cho mật khẩu
        this.matkhauInput = this.add.dom(this.game.config.width / 2 - 200, 500).createFromCache("form");
        this.matkhauInput.getChildByName('mat-khau-input').addEventListener('input', function () {
            // Xử lý sự kiện khi người dùng nhập vào ô mật khẩu
            console.log('Mật Khẩu:', this.getChildByName('mat-khau-input').value);
        });
    },
    

    update: function () {
        this.children.list.forEach(function (child) {
            if (child instanceof Phaser.GameObjects.TileSprite) {
                child.tilePositionX -= 2; // Điều chỉnh tốc độ chạy của hình nền
            }
        }, this);

    },
});
