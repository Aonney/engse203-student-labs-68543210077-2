const items = [
  ['total', 'ทั้งหมด'],
  ['pending', 'รอดำเนินการ'],
  ['inProgress', 'กำลังดำเนินการ'],
  ['completed', 'เสร็จสิ้น'],
];

function SummaryPanel({ summary }) {
  return (
    <section className="summary-grid" aria-label="สรุปคำร้อง">
      {items.map(([status, label]) => (
        <div key={status} className="summary-card">
          <span>{label}</span>
          <strong>{summary[status]}</strong>
        </div>
      ))}
    </section>
  );
}

export default SummaryPanel;