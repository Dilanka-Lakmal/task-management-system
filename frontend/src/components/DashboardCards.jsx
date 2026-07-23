function DashboardCards({ stats }) {

    return (

        <div
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(5,1fr)",
                gap: "15px",
                marginTop: "20px"
            }}
        >

            <div>Total : {stats.total || 0}</div>

            <div>Pending : {stats.pending || 0}</div>

            <div>Progress : {stats.progress || 0}</div>

            <div>Completed : {stats.completed || 0}</div>

            <div>Overdue : {stats.overdue || 0}</div>

        </div>

    );

}

export default DashboardCards;