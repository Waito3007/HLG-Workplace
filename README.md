# HLG Workplace

Hệ thống quản lý nội bộ cho Công ty Hoàng Long Giang (HLG), được thiết kế để nâng cao năng suất và hợp tác thông qua các công cụ tích hợp cho tổng quan dashboard, quản lý tác vụ, giao tiếp, quản lý tài liệu và đào tạo.

## 🚀 Tính năng chính

- **Dashboard**: Tổng quan về các KPI, tác vụ đang chờ và truy cập nhanh
- **Task Management**: Bảng Kanban để quản lý tác vụ theo từng giai đoạn
- **Communication**: Chat nội bộ với các kênh và tin nhắn trực tiếp
- **Document Management**: Hệ thống quản lý file và thư mục 
- **Training & Support**: Khóa học đào tạo, FAQ và AI chatbot hỗ trợ
- **Settings**: Cấu hình tài khoản và thông báo

## 📋 Yêu cầu hệ thống

- Node.js (phiên bản 18 trở lên)
- npm hoặc yarn
- Trình duyệt web hiện đại

## 🛠️ Cài đặt và chạy

### 1. Cài đặt dependencies:
```bash
npm install
```

### 2. Cấu hình API key (tùy chọn):
Tạo file `.env` trong thư mục gốc và thêm:
```
YOUR_API_KEY_PLACEHOLDER=your_gemini_api_key_here
```

### 3. Chạy ứng dụng:
```bash
npm run dev
```

Ứng dụng sẽ chạy tại: `http://localhost:5173` (hoặc port khác nếu bị xung đột)

## 🏗️ Build production:
```bash
npm run build
```

## 📁 Cấu trúc dự án

```
HLG-Workplace/
├── components/          # Các component React
│   ├── DashboardPage.tsx
│   ├── TaskManagementPage.tsx
│   ├── CommunicationPage.tsx
│   ├── DocumentManagementPage.tsx
│   └── TrainingSupportPage.tsx
├── services/           # Các service API
│   └── geminiService.ts
├── App.tsx            # Component chính
├── constants.tsx      # Hằng số và dữ liệu mẫu
├── types.ts          # TypeScript type definitions
└── index.tsx         # Entry point

```

## 🤖 AI Chatbot

Ứng dụng tích hợp AI chatbot trong phần Training & Support để hỗ trợ nhân viên:
- Trả lời câu hỏi về chính sách công ty
- Hướng dẫn sử dụng hệ thống HLG Workplace  
- Hỗ trợ IT cơ bản

## 🎨 Công nghệ sử dụng

- **Frontend**: React 19, TypeScript, React Router
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Build Tool**: Vite
- **AI**: Google Gemini API

## 📝 Ghi chú

- Dự án sử dụng dữ liệu mẫu cho demo
- Chatbot AI cần API key để hoạt động đầy đủ
- Giao diện được tối ưu cho desktop và mobile
