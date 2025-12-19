Tuyệt vời. Yêu cầu của bạn giúp mọi thứ trở nên cực kỳ đơn giản: **Không Database, Không LocalStorage (để lưu tiến độ), Stateless (trạng thái tạm thời).**

Chúng ta sẽ làm việc theo kiểu "Cầm tay chỉ việc". Tôi sẽ là Tech Lead, bạn là Developer.

**BƯỚC 1: KHỞI TẠO DỰ ÁN VÀ CÀI ĐẶT GIAO DIỆN CƠ BẢN**

Chúng ta sẽ dùng **Vite** thay vì Create-React-App vì nó nhanh hơn, nhẹ hơn và deploy lên GitHub Pages cực dễ. Chúng ta cũng sẽ cài **Tailwind CSS** ngay từ đầu để vẽ giao diện cho giống thiết kế của bạn.

Hãy mở **Terminal** (hoặc CMD/PowerShell) tại thư mục bạn muốn chứa dự án và chạy lần lượt các lệnh sau:

### 1. Tạo dự án React

```bash
npm create vite@latest my-vocab-app -- --template react
cd my-vocab-app
npm install

```

### 2. Cài đặt Tailwind CSS (Để làm giao diện đẹp)

Chạy 2 lệnh này để cài thư viện:

```bash
npm install -D tailwindcss postcss autoprefixer
npm install -D @tailwindcss/postcss
npx tailwindcss init -p

```

### 3. Cấu hình Tailwind

Bạn mở file `tailwind.config.js` vừa được tạo ra, xóa hết nội dung cũ và thay bằng đoạn này (để nó nhận diện các file code của bạn):

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

```

### 4. Nhúng Tailwind vào dự án

Mở file `src/index.css`. **Xóa sạch** mọi thứ trong đó và dán 3 dòng này vào đầu file:

```css
@import "tailwindcss";
```

### 5. Dọn dẹp file rác

Mở file `src/App.jsx`. Xóa hết nội dung và thay bằng đoạn code test này để chắc chắn mọi thứ hoạt động:

```jsx
function App() {
  return (
    <div className="h-screen flex items-center justify-center bg-blue-100">
      <h1 className="text-3xl font-bold text-blue-600">
        Sẵn sàng làm App Từ Vựng!
      </h1>
    </div>
  )
}

export default App

```

---

**NHIỆM VỤ CỦA BẠN:**

1. Thực hiện 5 bước trên.
2. Chạy lệnh `npm run dev` ở terminal.
3. Mở trình duyệt (thường là `http://localhost:5173`).

Nếu bạn thấy màn hình màu xanh nhạt có dòng chữ **"Sẵn sàng làm App Từ Vựng!"** nằm chính giữa, nghĩa là Bước 1 đã hoàn tất.

**Hãy làm và comment "Xong bước 1" để chúng ta sang Bước 2: Dựng màn hình Homepage.**