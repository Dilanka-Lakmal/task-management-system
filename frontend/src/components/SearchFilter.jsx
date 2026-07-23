function SearchFilter({
  search,
  setSearch,
  status,
  setStatus,
  priority,
  setPriority,
  sort,
  setSort,
}) {
  const clearFilters = () => {
    setSearch("");
    setStatus("");
    setPriority("");
    setSort("newest");
  };

  return (
    <div className="row g-3 mt-2">
      <div className="col-12 col-md-6 col-lg-3">
        <input
          type="search"
          className="form-control"
          placeholder="Search by task title"
          value={search}
          onChange={(event) =>
            setSearch(event.target.value)
          }
        />
      </div>

      <div className="col-12 col-md-6 col-lg-2">
        <select
          className="form-select"
          value={status}
          onChange={(event) =>
            setStatus(event.target.value)
          }
        >
          <option value="">All statuses</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">
            In Progress
          </option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <div className="col-12 col-md-6 col-lg-2">
        <select
          className="form-select"
          value={priority}
          onChange={(event) =>
            setPriority(event.target.value)
          }
        >
          <option value="">All priorities</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      <div className="col-12 col-md-6 col-lg-2">
        <select
          className="form-select"
          value={sort}
          onChange={(event) =>
            setSort(event.target.value)
          }
        >
          <option value="newest">Newest created</option>
          <option value="oldest">Oldest created</option>
          <option value="due">Due date</option>
        </select>
      </div>

      <div className="col-12 col-lg-3">
        <button
          type="button"
          className="btn btn-outline-secondary w-100"
          onClick={clearFilters}
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
}

export default SearchFilter;