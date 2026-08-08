# ENGSE203 LAB 4 — Student Evidence README

## ผู้จัดทำ

* ชื่อ–นามสกุล: **[นายสันติ ปัญญาหน้อย]**
* รหัสนักศึกษา: **[68543210077-2]**
* Section: **[Section02]**

## URLs

* Repository: **[ใส่ Repository URL]**
* Pull Request: **[ใส่ Merged Pull Request URL]**
* GitHub Pages: **[ใส่ GitHub Pages URL]**

## Component Tree

```text
App
├── AppHeader
├── SummaryPanel
├── RequestForm
├── FilterBar
└── RequestList
    └── RequestCard
```

### State Owner

`App` เป็นเจ้าของ state หลักของระบบ ได้แก่

* `requests` — รายการคำร้องทั้งหมด
* `statusFilter` — filter สถานะที่เลือก

`RequestForm` เป็นเจ้าของ state ของ controlled form ได้แก่

* `formData` — ข้อมูลที่ผู้ใช้กำลังกรอก
* `errors` — validation errors
* `feedback` — ข้อความ feedback ของ form

### Props และ Callback

ข้อมูลไหลจาก Parent ไปยัง Child ผ่าน Props เช่น

```text
App
 ├─ summary → SummaryPanel
 ├─ requests → RequestList
 ├─ onDeleteRequest → RequestList
 ├─ value / onFilterChange → FilterBar
 └─ onAddRequest → RequestForm
```

`RequestForm` ส่งข้อมูลกลับไปยัง `App` ผ่าน `onAddRequest(requestData)` และ `RequestCard` ส่ง `request.id` กลับไปยัง `App` ผ่าน `onDeleteRequest(requestId)`

ดังนั้นการไหลของข้อมูลเป็นแบบ One-way Data Flow โดย state หลักอยู่ที่ `App` และ Child components ใช้ Props และ Callback เพื่อสื่อสารกับ Parent

## Setup และ Run

```bash
nvm use
npm install
npm run dev
npm run check
npm run build
npm run preview
```

## State / Props / Callback Explanation

ระบบใช้ React State-driven UI แทนการแก้ไข DOM โดยตรง

`App` owns `requests` และ `statusFilter` เพราะข้อมูลทั้งสองส่วนมีผลต่อหลาย components โดย `requests` ใช้คำนวณ Summary และ Filtered Requests ส่วน `statusFilter` ใช้กำหนดรายการที่แสดงใน `RequestList`

`RequestForm` owns `formData` และ `errors` เพื่อทำ Controlled Form โดยทุก field มีค่าเชื่อมกับ state และเปลี่ยนค่าผ่าน `onChange`

ข้อมูลไหลลงจาก `App` ไปยัง Child components ผ่าน Props เช่น `summary`, `requests`, `value`, `onAddRequest` และ `onDeleteRequest`

เมื่อเกิด event ใน Child component จะใช้ Callback ส่งข้อมูลกลับไปยัง `App` เช่น `onAddRequest(requestData)` สำหรับเพิ่มคำร้อง และ `onDeleteRequest(requestId)` สำหรับลบคำร้อง

## Test Evidence

| Test ID                | Actual Result                                                 | Pass/Fail | Evidence/Screenshot            |
| ---------------------- | ------------------------------------------------------------- | --------- | ------------------------------ |
| TC-01 Initial          | แสดงรายการเริ่มต้นและ Summary ถูกต้อง และ Console ไม่มี error | PASS      | `evidence/desktop.png`         |
| TC-02 Controlled input | ทุก field เปลี่ยนค่าตาม React state                           | PASS      | `evidence/desktop.png`         |
| TC-03 Invalid          | ไม่เพิ่มรายการ และแสดง validation error ใกล้ field            | PASS      | `evidence/validation.png`      |
| TC-04 Valid add        | เพิ่มคำร้องใหม่เป็น `pending`, Summary เพิ่ม และ form reset   | PASS      | `evidence/desktop.png`         |
| TC-05 Filter           | แสดงเฉพาะรายการตามสถานะที่เลือก                               | PASS      | `evidence/desktop.png`         |
| TC-06 All              | เลือก All แล้วแสดงรายการทุกสถานะ                              | PASS      | `evidence/desktop.png`         |
| TC-07 Empty            | แสดง Empty State เมื่อไม่มีรายการที่ตรงกับ filter             | PASS      | `evidence/empty-state.png`     |
| TC-08 Delete           | ลบรายการตาม `request.id` และ Summary/List อัปเดต              | PASS      | `evidence/empty-state.png`     |
| TC-09 Mobile           | หน้าเว็บที่ 375px ไม่เกิด horizontal scroll                   | PASS      | `evidence/mobile-375.png`      |
| TC-10 Keyboard         | ใช้ Tab เพื่อเลื่อน focus และเห็น focus indicator ได้         | PASS      | `evidence/mobile-375.png`      |
| TC-11 Build            | `npm run build` ทำงานสำเร็จและสร้าง `dist/`                   | PASS      | Terminal evidence              |
| TC-12 Pages            | GitHub Pages เปิดได้และ assets โหลดครบใน Incognito            | PASS      | `evidence/pages-incognito.png` |

## Screenshots

* Desktop: `evidence/desktop.png`
* Mobile 375px: `evidence/mobile-375.png`
* Validation: `evidence/validation.png`
* Empty State: `evidence/empty-state.png`
* GitHub Pages Incognito: `evidence/pages-incognito.png`

## Week 03 → Week 04 Reflection

ใน Week 03 ระบบใช้ DOM-driven approach โดย JavaScript ค้นหา element และแก้ไข DOM โดยตรง เช่น การเปลี่ยน `textContent` และสร้างรายการด้วย DOM API ส่วน Week 04 เปลี่ยนเป็น React แบบ State-driven UI ซึ่ง UI จะถูก render จาก state และ props แทนการแก้ DOM โดยตรง การเพิ่มและลบคำร้องจึงใช้ `setRequests()` ร่วมกับ immutable operations เช่น spread และ `filter()` ทำให้ state และ UI มีความสัมพันธ์ที่ชัดเจนมากขึ้น นอกจากนี้การแยกเป็น Components ทำให้แต่ละส่วนของระบบอ่านง่ายและสามารถนำกลับมาใช้ได้ง่ายขึ้น

## AI / External Resource Disclosure

ใช้ ChatGPT เป็นเครื่องมือช่วยอธิบายแนวคิด React และช่วยตรวจสอบโครงสร้างโค้ดของ LAB 4 โดยใช้คำถามเกี่ยวกับ React Components, Props, State, Controlled Form, Validation, Callback, Responsive CSS และ Accessibility

ส่วนที่นำมาปรับใช้ ได้แก่ แนวทางการจัดการ React state, controlled form, immutable state update, callback จาก Child ไป Parent, validation และ accessibility เช่น `aria-invalid` และ `role="status"`

ผู้จัดทำเป็นผู้ตรวจสอบและทดสอบโค้ดด้วยตนเอง โดยใช้ `npm run check`, `npm run build`, `npm run preview` รวมถึงทดสอบการเพิ่ม/ลบ/กรองข้อมูล, validation, responsive ที่ 375px และ keyboard navigation ก่อนส่งงาน
