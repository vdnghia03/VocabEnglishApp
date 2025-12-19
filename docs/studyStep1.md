# FLOW TRIỂN KHAI: CHẾ ĐỘ HỌC - BƯỚC 1 (GHI NHỚ MẶT CHỮ)

## 1. Mục tiêu
- Chuyển người dùng từ màn hình "Chi tiết bài học" sang màn hình "Học tập".
- Hiển thị danh sách từ vựng để người dùng chép vào vở (theo đúng phương pháp Active Recall thủ công).
- Có nút xác nhận "Đã xong" để chuyển sang Bước 2 (Luyện tập).

## 2. Cấu trúc dữ liệu & State (Trạng thái)
- **State `view`**: Thêm trạng thái `'study'` (ngoài 'list' và 'detail').
- **State `studyStep`**: Quản lý các bước nhỏ trong lúc học.
    - `1`: Bước chép từ (Hiện tại).
    - `2`: Bước nhồi từ/Luyện tập (Tương lai).

## 3. Quy trình xử lý (Logic)
1.  **Người dùng bấm "HỌC NGAY"**:
    - Set `view` = `'study'`.
    - Set `studyStep` = `1`.
    
2.  **Giao diện Bước 1 hiện ra**:
    - Hiển thị lại bảng từ vựng của bài đang chọn.
    - Tiêu đề hướng dẫn: "Chép tất cả từ dưới đây vào vở".
    - Ẩn nghĩa tiếng Việt (hoặc hiển thị tùy chọn, nhưng theo thiết kế của bạn là hiển thị full để chép).
    
3.  **Người dùng bấm "ĐÃ XONG"**:
    - Chuyển `studyStep` sang `2` (Chuẩn bị cho bước Flashcard/Nhồi từ).
    - (Tạm thời ở bước này mình sẽ alert thông báo xong bước 1).

## 4. UI/UX (Giao diện)
- Sử dụng Card lớn ở giữa màn hình.
- Màu nền dịu nhẹ (tập trung sự chú ý).
- Nút bấm to, rõ ràng ở cuối trang.