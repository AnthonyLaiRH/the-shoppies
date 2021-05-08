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

    //console.log(`url ${url}`)

    let res = await fetch(url);
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

  useEffect(() => {
    //console.log(`page: ${page}`);
    //console.log(`searchValue: ${searchValue}`);
    setLoading(true);
    debouncedSearch();
  }, [searchValue, page, debouncedSearch]);

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