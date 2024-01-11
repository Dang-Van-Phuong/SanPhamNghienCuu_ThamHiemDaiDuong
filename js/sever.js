// Import gói mssql
const sql = require('mssql');

// Tạo đối tượng kết nối
const config = {
  server: 'http://127.0.0.1:5501/', // Thay bằng tên máy chủ của bạn
  database: 'DoAn_KhamPhaDaiDuong', // Thay bằng tên cơ sở dữ liệu của bạn
  options: {
    encrypt: true // Bật mã hóa kết nối (khuyến nghị)
  }
};
const pool = new sql.ConnectionPool(config);

// Kiểm tra kết nối
const isConnected = pool.isConnected();

if (isConnected) {
  console.log('Kết nối thành công!');
} else {
  console.log('Kết nối thất bại!');
}