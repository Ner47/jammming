import { useCallback, useState } from "react";
import "./SearchBar.css";

function SearchBar({ onSearch }) {
  const [term, setTerm] = useState('');

  const handleTermChange = useCallback(({ target }) => {
      setTerm(target.value);
  }, []);

  const search = useCallback(() => {
    onSearch(term);
  }, [onSearch, term])

  return (
    <div className="SearchBar">
      <input type="text" value={term} onChange={handleTermChange} />
      <button onClick={search}>Search</button>
    </div>
  );
}

export default SearchBar