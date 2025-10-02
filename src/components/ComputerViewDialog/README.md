# ComputerViewDialog - Separation of Concerns

## 📁 โครงสร้างไฟล์ใหม่

```
src/
├── components/
│   ├── ComputerViewDialog.tsx              # Main UI component (entry point)
│   └── ComputerViewDialog/
│       ├── index.ts                        # Re-exports
│       ├── DialogHeaderFooter.tsx          # Header + Footer UI
│       ├── Section.tsx                     # Section wrapper
│       └── DialogSections.tsx              # Content sections
└── hooks/
    └── useComputerViewDialog.ts             # Business logic hook
```

## 🧩 แยก Logic ออกจาก UI

### 1. **Main Component** (`ComputerViewDialog.tsx`)

- **หน้าที่**: Entry point และ layout หลัก
- **ขนาด**: ~90 บรรทัด (ลดลงจาก ~350 บรรทัด)
- **มีแค่**: JSX structure และ imports

### 2. **Business Logic** (`useComputerViewDialog.ts`)

- **หน้าที่**: คำนวณและจัดการ state
- **ฟีเจอร์**:
  - Image management (active image, sorting primary)
  - State handling (activeIndex)
  - Computed values (hasOwnershipInfo, hasTags, etc.)

### 3. **UI Components** (`ComputerViewDialog/`)

#### `DialogHeaderFooter.tsx`

- DialogHeader: Avatar + title + condition chip + close button
- DialogFooter: Action buttons (Edit, Duplicate, Export)

#### `Section.tsx`

- Reusable section wrapper with title and divider
- Consistent spacing and typography

#### `DialogSections.tsx`

- ImageSection: Main image + thumbnails
- OwnershipSection: Owner + location chips
- HardwareSection: CPU, RAM, Storage specs
- TagsSection: Tags display
- MetadataSection: System info (code, dates)
- SpecRow: Label-value row component

## ✅ ประโยชน์ของการแยก

1. **Maintainability**: แต่ละไฟล์มีหน้าที่ชัดเจน
2. **Reusability**: Components สามารถนำไปใช้ที่อื่นได้
3. **Testing**: ง่ายต่อการเขียน unit tests
4. **Performance**: ลด re-renders ที่ไม่จำเป็น
5. **Code Size**: ไฟล์หลักสั้นลง อ่านง่ายขึ้น

## 🔄 วิธีใช้งาน (ไม่เปลี่ยนแปลง)

```tsx
import { ComputerViewDialog } from "@/components";

<ComputerViewDialog
  open={open}
  onClose={onClose}
  computer={selectedComputer}
  onEdit={handleEdit}
  onDuplicate={handleDuplicate}
  onExport={handleExport}
/>;
```

## 🎯 Pattern สำหรับโปรเจกต์

### Section Pattern

```tsx
<Section title="หัวข้อ">
  <Content />
</Section>
```

### SpecRow Pattern

```tsx
<SpecRow
  icon={<Icon />}
  label="ป้ายกำกับ"
  value="ค่า"
  mono={true} // สำหรับรหัส/โค้ด
/>
```

นำ pattern เหล่านี้ไปใช้ในหน้าอื่น ๆ ได้เลย!
