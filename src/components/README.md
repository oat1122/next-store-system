# การจัดระเบียบ Components

โปรเจคนี้ใช้โครงสร้างแบบแยกตามโดเมน (domain-based) เพื่อให้ง่ายต่อการค้นหาและดูแลรักษา

## โครงสร้าง

```
src/
└── components/
    ├── computer/           # ส่วนที่เกี่ยวกับ Computer โดยเฉพาะ
    │   ├── Actions.tsx     # ปุ่ม/การควบคุมการทำงานของ Computer
    │   ├── Cards.tsx       # Layout ของการ์ด Computer
    │   ├── Content.tsx     # ส่วนแสดงข้อมูลหลักของ Computer
    │   ├── Filters.tsx     # ตัวกรองของ Computer
    │   ├── Menu.tsx        # เมนูของ Computer
    │   ├── Pagination.tsx  # การแบ่งหน้าแสดงรายการ Computer
    │   ├── Specs.tsx       # แสดงสเปคของ Computer
    │   ├── Table.tsx       # ตารางแสดง Computer
    │   ├── ViewDialog.tsx  # กล่องแสดงรายละเอียด Computer
    │   ├── ViewDialog/     # Sub-component ของ ViewDialog
    │   │   ├── HeaderFooter.tsx # ส่วนหัวและท้าย Dialog
    │   │   ├── Section.tsx      # Component ของ Section
    │   │   ├── Sections.tsx     # รวม Sections ต่าง ๆ
    │   │   └── index.ts         # รวม export ของ ViewDialog
    │   └── index.ts        # รวม export ของ Computer components
    └── common/             # Components ที่ใช้ซ้ำได้
        ├── MuiThemeProvider.tsx    # ตัวกำหนด Theme ของ Material-UI
        ├── PageComponents.tsx      # Component สำหรับหน้าเพจทั่วไป
        ├── TableColumnControls.tsx # ตัวควบคุมคอลัมน์ตาราง
        ├── ViewToggle.tsx          # ปุ่มสลับโหมดการแสดงผล
        └── index.ts               # รวม export ของ common components
```

## ข้อดี

### ค้นหาง่ายขึ้น

* **ก่อน**: ทุกไฟล์ขึ้นต้นด้วย `Computer` → หายากเมื่อเปิดหลายแท็บ
* **หลัง**: แยกตามโดเมนและใช้ชื่อสั้น ชัดเจน

### การจัดหมวดหมู่ชัดเจน

* **computer/**: ทุกอย่างที่เกี่ยวกับ Computer
* **common/**: Component ที่เอาไปใช้ซ้ำในหลายที่

### นำทางง่ายขึ้น

* แยกชัดเจนระหว่างส่วนที่เจาะจงกับส่วนที่ใช้ร่วมกัน
* Sub-component ถูกวางไว้ในโฟลเดอร์ย่อยตรงกับ parent component

## ตัวอย่างการ import

```typescript
// Import components ทั้งหมดใน computer
import {
  ComputerTable,
  ComputerFilters,
  ComputerActions,
} from "@/components/computer";

// Import components เฉพาะจาก common
import { ViewToggle, PageHeader } from "@/components/common";

// Import ผ่าน index หลัก (ก็ยังใช้ได้)
import { ComputerTable, ViewToggle } from "@/components";
```

## หลักการตั้งชื่อ

### ไฟล์ Component

* **Root Components**: ใช้ชื่อเต็มชัดเจน เช่น `ViewDialog.tsx`
* **Sub-Components**: ใช้ชื่อสั้นลงเมื่ออยู่ในโฟลเดอร์ของโดเมน เช่น `Actions.tsx`
* **Common Components**: ใช้ชื่อบรรยายการทำงาน เช่น `TableColumnControls.tsx`

### โฟลเดอร์

* ใช้ตัวพิมพ์เล็กและคำอธิบายชัดเจน
* จัดกลุ่ม component ที่เกี่ยวข้องไว้ด้วยกัน
* โฟลเดอร์ย่อยตั้งชื่อตาม parent component

## หมายเหตุเรื่องการย้ายไฟล์

การ import เดิมยังคงใช้ได้ เพราะมีการ re-export ในไฟล์ `index.ts` รองรับไว้ การ refactor ครั้งนี้จึงไม่ทำให้โค้ดที่มีอยู่พัง
