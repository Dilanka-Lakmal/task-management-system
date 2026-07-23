function DashboardCards({ stats }) {
  const cards = [
    {
      title: "Total Tasks",
      value: stats.total ?? 0,
      style: "primary",
    },
    {
      title: "Pending",
      value: stats.pending ?? 0,
      style: "secondary",
    },
    {
      title: "In Progress",
      value: stats.progress ?? 0,
      style: "info",
    },
    {
      title: "Completed",
      value: stats.completed ?? 0,
      style: "success",
    },
    {
      title: "Overdue",
      value: stats.overdue ?? 0,
      style: "danger",
    },
  ];

  return (
    <div className="row g-3">
      {cards.map((card) => (
        <div
          className="col-12 col-sm-6 col-lg"
          key={card.title}
        >
          <div
            className={`card border-${card.style} h-100 shadow-sm`}
          >
            <div className="card-body">
              <p className="text-muted mb-2">
                {card.title}
              </p>

              <h2
                className={`display-6 fw-bold text-${card.style} mb-0`}
              >
                {card.value}
              </h2>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DashboardCards;