import type { Item } from "./ItemTable";

function SearchResults({ results, setInputValue }) {
  function handleItemClick(name: string) {
    setInputValue(name);
  }

  return results.length === 0 ? (
    ""
  ) : (
    <ul
      id="searchResults"
      className="w-full absolute top-8 bg-white z-10 flex flex-col shadow-2xl border-2 border-blue-200 rounded-lg mt-2 max-h-80 overflow-y-scroll"
    >
      {results.map((item: Item, id: number) => {
        const regExSpace = new RegExp(" ", "g");
        const regExAnd = new RegExp("&amp;", "g");
        const iconUrl = item.icon
          ? `https://oldschool.runescape.wiki/images/${item.icon
              .replace(regExSpace, "_")
              .replace(regExAnd, "&")}`
          : "";
        return (
          <li
            key={id}
            className="flex items-center gap-4 p-2 cursor-pointer border-b-2 last:border-b-0"
            onClick={() => handleItemClick(item.name)}
          >
            {iconUrl && <img loading="lazy" src={iconUrl} alt={item.name} />}
            {item.name}
          </li>
        );
      })}
    </ul>
  );
}

export default SearchResults;
