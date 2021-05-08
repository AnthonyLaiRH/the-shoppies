import React, { useState, useEffect, useCallback } from "react";
import { debounce } from '../../utils/debounce';

const SearchContext = React.createContext();

const SearchProvider = (props) => {
  const [loading, setLoading] = useState(false);

  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [page, setPage] = useState(1)
  const [resultCount, setResultCount] = useState(0);

  // Debounce search, update the memoized callback on change of searchValue or page
  const debouncedSearch = useCallback(debounce(() => search(), 1000), [searchValue, page]);
  
  const search = async () => {
    const url = `${process.env.REACT_APP_OMDB_URL}&s=${searchValue}&page=${page}`;
    const movieResults = [];

    let res = await fetch(url, {mode: 'cors'});
    if (!res.ok) {
      const message = `An error has occured: ${res.status}`;
      throw new Error(message);
    }

    let movies = await res.json();
    if (movies.Response === "True"){
      movies.Search.forEach((movie)=>{
        movieResults.push({
          poster: movie.Poster,
          title: movie.Title,
          type: movie.Type,
          year: movie.Year,
          imdbID: movie.imdbID
        })
      })
      // Doesnt update instantly
      setSearchResults(movieResults);
      setResultCount(movies.totalResults);

    } else {
      setSearchResults([]);
    }
    setLoading(false);
  };

  // Only on change of searchValue, so when the value in the search bar is changed
  // Reset the page to 1
  useEffect(() => {
    setLoading(true);
    setPage(1)
    debouncedSearch();
  }, [searchValue]);

  // This is for changed to the debounceSearch function, which is changed when the page is changed
  // As commented above in the useCallback
  useEffect(() => {
    setLoading(true);
    debouncedSearch();
  }, [debouncedSearch])

  return (
    <SearchContext.Provider
      value={{
        searchValue,
        setSearchValue,
        searchResults,
        loading,
        page,
        setPage,
        resultCount,
      }}
    >
      {props.children}
    </SearchContext.Provider>
  );
};

export { SearchContext, SearchProvider };