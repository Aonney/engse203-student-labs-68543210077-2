function RequestCard({ request, onDeleteRequest }) {
  const statusLabels = {
    pending: 'รอดำเนินการ',
    'in-progress': 'กำลังดำเนินการ',
    completed: 'เสร็จสิ้น',
  };

  const statusIcons = {
    pending: '⏳',
    'in-progress': '🔧',
    completed: '✓',
  };

  const priorityLabels = {
    normal: 'ปกติ',
    urgent: 'ด่วน',
  };

  return (
    <article className="request-card">
      <div className="request-content">
        <div className="request-header">
          <span className="request-id">{request.id}</span>

          <div className="request-actions">
            <span className={`badge status-${request.status}`}>
              <span aria-hidden="true">
                {statusIcons[request.status]}
              </span>
              {statusLabels[request.status]}
            </span>

            <button
              type="button"
              className="danger-button"
              onClick={() => onDeleteRequest(request.id)}
              aria-label={`ลบคำร้อง ${request.id}`}
            >
              ลบ
            </button>
          </div>
        </div>

        <h3>{request.requestType}</h3>

        <p>{request.location}</p>
        <p>{request.details}</p>

        <div className="badge-row">
          <span className={`badge priority-${request.priority}`}>
            {request.priority === 'urgent' ? '🚩' : '⚑'}
            {priorityLabels[request.priority]}
          </span>
        </div>
      </div>
    </article>
  );
}

export default RequestCard;