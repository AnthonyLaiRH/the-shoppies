import React, { useContext, useState, useEffect } from 'react';
import {
  IconButton,
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleChevronLeftIcon,
  DoubleChevronRightIcon,
  Badge,
} from 'evergreen-ui';

import { PaginationContainer } from './styled';
import { SearchContext } from '../../context/search';

export const Pagination = () => {
  const searchContext = useContext(SearchContext);
  const { page, setPage, resultCount } = searchContext;

  const [lastPage, setLastPage] = useState(-1);

  const determineLastPage = () => setLastPage(Math.ceil(resultCount / 10));

  const handleGoToFirst = () => {
    setPage(1);
  };
  const handleGoBack = () => {
    setPage(page-1);
  };
  const handleGoNext = () => {
    setPage(page+1);
  };
  const handleGoToLast = () => {
    setPage(lastPage);
  };

  useEffect(() => {
    determineLastPage();
  }, [resultCount]);

  return (
    <PaginationContainer>
      {page > 2 ? <IconButton onClick={handleGoToFirst} appearance="minimal" icon={DoubleChevronLeftIcon}/> : null}
      {page > 1 ? <IconButton onClick={handleGoBack} appearance="minimal" icon={ChevronLeftIcon}/> : null}
      <Badge color="neutral" isSolid>{page}</Badge>
      {page < lastPage ? <IconButton onClick={handleGoNext} appearance="minimal" icon={ChevronRightIcon}/> : null}
      {page < lastPage-1 ? <IconButton onClick={handleGoToLast} appearance="minimal" icon={DoubleChevronRightIcon}/> : null}
    </PaginationContainer>
  )
}
