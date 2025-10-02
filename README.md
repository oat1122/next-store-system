# ระบบจัดการคอมพิวเตอร์ (Next.js + Prisma + MUI)

ระบบจัดการและติดตามข้อมูลคอมพิวเตอร์ในองค์กร สร้างด้วย Next.js, Prisma, และ Material-UI

## 🚀 คุณสมบัติ

- ✅ แสดงข้อมูลคอมพิวเตอร์ในรูปแบบการ์ดและตาราง
- ✅ ระบบค้นหาและกรองข้อมูล
- ✅ การแบ่งหน้า (Pagination)
- ✅ ระบบแท็กสำหรับจัดหมวดหมู่
- ✅ การอัปโหลดและแสดงรูปภาพ
- ✅ UI สวยงามด้วย Material-UI
- ✅ Responsive Design

## 🛠️ เทคโนโลยีที่ใช้

- **Frontend**: Next.js 15, React 19, TypeScript
- **Database**: MySQL + Prisma ORM
- **UI**: Material-UI (MUI) v7
- **Styling**: Tailwind CSS + MUI System

## 📦 การติดตั้ง

1. **ติดตั้ง dependencies**

   ```bash
   npm install
   ```

2. **ตั้งค่าฐานข้อมูล**

   ```bash
   # คัดลอกไฟล์ .env.example
   cp .env.example .env

   # แก้ไข DATABASE_URL ใน .env
   DATABASE_URL="mysql://username:password@localhost:3306/next_store_system"
   ```

3. **รันการ migration และ seed ข้อมูล**

   ```bash
   # สร้างฐานข้อมูลตาม schema
   npm run db:push

   # เพิ่มข้อมูลตัวอย่าง
   npm run db:seed
   ```

4. **เริ่มต้นใช้งาน**

   ```bash
   npm run dev
   ```

   เปิด [http://localhost:3000](http://localhost:3000) ในเบราว์เซอร์

## 📋 คำสั่งที่มีประโยชน์

```bash
# รัน development server
npm run dev

# Build production
npm run build

# Push schema changes ไปยังฐานข้อมูล
npm run db:push

# Seed ข้อมูลใหม่
npm run db:seed

# Reset ฐานข้อมูลและ seed ใหม่
npm run db:reset
```
