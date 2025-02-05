import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Icon } from "../../../Icon/Icon";
import "./searchBar.css";

interface SearchBarProps {
  value: string;
  setSearchQuery: (query: string) => void;
  placeholder?: string;
}

export function SearchBar({
  value,
  setSearchQuery,
  placeholder = "Search...",
}: SearchBarProps) {
  return (
    <div>
      <div className="search-container">
        <input
          type="text"
          value={value}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={placeholder}
          className="search-input"
        />
        <Icon className="search-icon" icon={faSearch} size="1x" />
      </div>
    </div>
  );
}
export default SearchBar;
