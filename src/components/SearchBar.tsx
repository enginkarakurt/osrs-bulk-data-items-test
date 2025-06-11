import { Input } from "./ui/input";
import type { Item } from "./ItemTable";

function SearchBar({ setSearchResults, inputValue, setInputValue }) {
  const data = Object.values(
    JSON.parse(localStorage.getItem("bulkData") || "{}") as Record<number, Item>
  );

  function filterData(value: string) {
    const results = data.filter((item) => {
      return (
        value &&
        item &&
        item.name &&
        item.name.toLowerCase().includes(value.toLowerCase())
      );
    });

    setSearchResults(results);
  }

  function handleChange(value: string) {
    setInputValue(value);
    filterData(value);
  }

  return (
    <Input
      type="text"
      placeholder="Search for an item"
      value={inputValue}
      onChange={(e) => handleChange(e.target.value)}
    />
  );
}

export default SearchBar;
