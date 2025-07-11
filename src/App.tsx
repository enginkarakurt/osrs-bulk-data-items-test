import { useEffect, useState } from "react";
import ItemTable from "./components/ItemTable";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetch(
          "https://chisel.weirdgloop.org/gazproj/gazbot/os_dump.json"
        );

        if (!data.ok) {
          throw new Error(`Response status: ${data.status}`);
        }

        const json = await data.json();
        localStorage.setItem("bulkData", JSON.stringify(json));
      } catch (error: any) {
        console.error(error.message);
      }
    }

    fetchData();
  }, []);

  return (
    <main className="grid gap-8 max-w-[1280px] mx-auto my-0 p-8 text-center">
      <div className="relative">
        <SearchBar
          setSearchResults={setSearchResults}
          inputValue={inputValue}
          setInputValue={setInputValue}
        />
        <SearchResults results={searchResults} setInputValue={setInputValue} />
      </div>
      <ItemTable />
    </main>
  );
}

export default App;
