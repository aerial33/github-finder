const Search = ({
  onSearchChange,
  search,
  onSearchSubmit,
  onClearClick,
  showClear,
}) => {
  return (
    <div>
      <form className="form" onSubmit={onSearchSubmit}>
        <input
          type="text"
          name="text"
          value={search}
          placeholder="Search Users..."
          onChange={onSearchChange}
        />
        <input
          type="submit"
          value="Search"
          className="btn btn-dark btn-block"
        />
      </form>
      {showClear && (
        <button className="btn btn-light btn-block" onClick={onClearClick}>
          Clear
        </button>
      )}
    </div>
  );
};

export default Search;
