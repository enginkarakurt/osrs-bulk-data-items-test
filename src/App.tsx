import { useState } from "react";
import "./App.css";
import ItemTable from "./components/ItemTable";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [inputValue, setInputValue] = useState("");

  return (
    <main className="grid gap-8">
      <SearchBar
        setSearchResults={setSearchResults}
        inputValue={inputValue}
        setInputValue={setInputValue}
      />
      <SearchResults results={searchResults} setInputValue={setInputValue} />
      <ItemTable />
    </main>
  );
}

export default App;
