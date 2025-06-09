'use client';

import * as React from 'react';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import Container from '@mui/material/Container';
import BookCard from 'components/BookCard';
import Link from 'next/link';

import axios from 'utils/axios';
import { IBook } from 'types/book';

export default function BookListPage() {
  const [books, setBooks] = React.useState<IBook[]>([]);
  const [totalResults, setTotalResults] = React.useState<number>(0);
  const [currentPage, setPageNumber] = React.useState<number>(0);
  const [resultsPerPage, setResultsPerPage] = React.useState<number>(51);

  // vercel temp fix
  console.log(setResultsPerPage);

  React.useEffect(() => {
    axios
      .get(
        `https://tcss460-group1-web-api-d9b1e8b26f0f.herokuapp.com/c/books/cursor?limit=${resultsPerPage}&cursor=${resultsPerPage * currentPage - 1}`
      )
      .then((response) => {
        setBooks(response.data.entries);
        setTotalResults(response.data.pagination.totalRecords);
      })
      .catch((error) => console.error(error));
  }, [currentPage, resultsPerPage]);

  const handlePagination = (event: React.ChangeEvent<unknown>, page: number) => {
    setPageNumber(page);
  };

  return (
    <Container>
      <Grid container columns={3} spacing={2} sx={{ justifyContent: 'spaceAround', display: 'flex' }}>
        {books.map((data) => (
          <Grid item key={data.title} xs={1}>
            <Link href={`/viewbookdetails/${data.isbn13}`}>{BookCard(data)}</Link>
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={Math.ceil(totalResults / resultsPerPage)}
        sx={{ justifyContent: 'center', display: 'flex', mt: 4 }}
        onChange={handlePagination}
      />
    </Container>
  );
}
