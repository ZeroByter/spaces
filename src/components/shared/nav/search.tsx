"use client";

import { FC, useEffect, useState } from "react";
import css from "./search.module.scss";
import SearchResult from "./searchResult";

const Search: FC = () => {
  const [results, setResults] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [visible, setVisible] = useState(false);

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

    const timeout = setTimeout(() => {
      setDebouncedSearch(search);
    }, 250);

    return () => {
      clearTimeout(timeout);
    };
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

  const renderResults = results.map((result) => {
    return <SearchResult key={result.id} result={result} />;
  });

  return (
    <div className={css.root}>
      <input
        className={css.input}
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className={css.container} data-display={visible}>
        {renderResults}
      </div>
    </div>
  );
};

export default Search;
