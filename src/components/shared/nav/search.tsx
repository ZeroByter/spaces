"use client";

import { FC, useEffect, useState } from "react";
import css from "./search.module.scss";
import SearchResult from "./searchResult";
import { useDebounce } from "usehooks-ts";

const Search: FC = () => {
  const [results, setResults] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 250);
  const [visible, setVisible] = useState(false);

  const clearSearch = () => {
    setSearch("");
    setResults([]);
  };

  useEffect(() => {
    const listener = (e: MouseEvent) => {
      setVisible(false);
    };

    window.addEventListener("click", listener);

    return () => {
      window.removeEventListener("click", listener);
    };
  }, []);

  useEffect(() => {
    setVisible(search != "");
  }, [search]);

  useEffect(() => {
    if (debouncedSearch == "") return;

    (async () => {
      const rawResponse = await fetch(
        `/api/search?search=${encodeURIComponent(debouncedSearch)}`
      );
      const response = await rawResponse.json();

      setResults(response.data);
    })();
  }, [debouncedSearch]);

  const renderNoResults = () => {
    if (results.length > 0) return;
    return (
      <div className={css.noResults}>
        No results, try searching for something else!
      </div>
    );
  };

  const renderResults = results.map((result) => {
    return (
      <SearchResult key={result.id} result={result} clearSearch={clearSearch} />
    );
  });

  return (
    <div className={css.root}>
      <input
        className={css.input}
        type="search"
        value={search}
        placeholder="Search for anything..."
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className={css.container} data-display={visible}>
        {renderResults}
        {renderNoResults()}
      </div>
    </div>
  );
};

export default Search;
