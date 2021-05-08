import React, { useContext, useState, useCallback } from 'react';

import { Pane, SearchInput, Spinner, Alert } from 'evergreen-ui';

import { ResultTable } from '../ResultTable';
import { Pagination } from '../Pagination';
import { SearchContext } from '../../context/search';
import { debounce } from '../../utils/debounce';

export const SearchArea = () => {
  const searchContext = useContext(SearchContext);
  const [query, setQuery] = useState("")
  const { setSearchValue, searchResults, loading } = searchContext;

  const debouncedSetSearchValue = useCallback(debounce(setSearchValue, 300), [
    setSearchValue,
  ]);

  const handleChange = (event) => {
    setQuery(event.target.value)
    debouncedSetSearchValue(event.target.value);

  }

  return (
    <Pane
      flex={1}
      display="block"
      padding={20}
    >
      <h2>Search For Movies</h2>
      <SearchInput 
        placeholder="Search for movies" 
        height={40}
        width="80%"
        marginTop={20}
        marginBottom={40}
        value={query}
        onChange={handleChange}
      />
      { searchResults.length > 0 ? <Pagination/> : null }
      { 
        loading 
        ? <Spinner marginX="auto" marginY={120}/>
        : (
          searchResults.length === 0 
          ? <Alert
              intent="none"
              title="No movies to show you!"
              marginBottom={32}
            />
          : searchResults.map((movie, i)=>(
              <Pane
                width="50%"
                float="left"
                key={i}
              >
                <ResultTable movie={movie}/>
              </Pane>                
            ))
        )
      }
    </Pane>
  )
}
