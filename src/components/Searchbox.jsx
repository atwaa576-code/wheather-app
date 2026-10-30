function SearchBox({ city, setCity, onSearch }) {
  function handleSubmit(e) {
    e.preventDefault()
    onSearch()
  }

  return (
    <form className="search-box" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="اكتب اسم المدينة..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button type="submit">بحث</button>
    </form>
  )
}

export default SearchBox
