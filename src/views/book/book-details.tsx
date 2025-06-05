'use client';

import React, { useState } from 'react';
import { Box, Typography, Card, CardMedia, CardContent, Rating, Stack } from '@mui/material';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useParams } from 'next/navigation';
import axios from 'utils/axios';
import { IBook } from 'types/book';

const BookDetails = () => {
  const { isbn13 } = useParams();
  const [book, setBook] = useState<IBook | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [userRating, setUserRating] = useState<number | null>(null);
  console.log('isbn: ', isbn13);

  React.useEffect(() => {
    if (!isbn13) return;

    axios
      .get(`https://tcss460-group1-web-api-d9b1e8b26f0f.herokuapp.com/c/books/${isbn13}`)
      .then((response) => {
        setBook(response.data.book);
        setLoading(false);
        console.log('API Response: ', response.data.book);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [isbn13]);

  if (loading) {
    return (
      <Box maxWidth={600} mx="auto" mt={4}>
        <Typography variant="h6" align="center" mt={4}>
          Loading book details...
        </Typography>
      </Box>
    );
  }

  if (!book) {
    return (
      <Box maxWidth={600} mx="auto" mt={4}>
        <Typography variant="h6" align="center" mt={4}>
          Book not found.
        </Typography>
      </Box>
    );
  }
  console.log('ISBN: ', book.isbn13);
  return (
    <Box maxWidth={600} mx="auto" mt={4}>
      <Card>
        <CardMedia component="img" height="350" image={book.image_url} alt={JSON.stringify(book.title)} />
        <CardContent>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="h4" gutterBottom>
              {book.title}
            </Typography>
            <Rating value={parseFloat(book.rating_avg)} precision={0.1} readOnly />
            <Typography>{book.rating_avg}</Typography>
            <Typography variant="body2">({book.rating_count} ratings)</Typography>
          </Stack>
          <Typography variant="subtitle1" color="text.secondary" style={{ fontStyle: 'italic' }}>
            Original Title: {book.original_title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            by {book.authors}
          </Typography>
          <Stack direction="row" spacing={2} mt={2}>
            <Typography variant="body2">Published: {book.publication_year}</Typography>
            <Typography variant="body2">ISBN: {book.isbn13}</Typography>
          </Stack>

          <Accordion sx={{ mt: 2 }}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography variant="subtitle2">More Details</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <strong>ISBN:</strong> {book.isbn13}
              </Typography>
              <Typography>
                <strong>Ratings by Stars:</strong>
              </Typography>
              <ul style={{ margin: 0, paddingLeft: 20 }}>
                <li>5 stars: {book.rating_5}</li>
                <li>4 stars: {book.rating_4}</li>
                <li>3 stars: {book.rating_3}</li>
                <li>2 stars: {book.rating_2}</li>
                <li>1 star: {book.rating_1}</li>
              </ul>
            </AccordionDetails>
          </Accordion>
          <Box mt={3}>
            <Typography variant="subtitle2">Your Rating:</Typography>
            <Rating value={userRating} onChange={(_, newValue: number | null) => setUserRating(newValue)} />
            {userRating !== null && (
              <Typography variant="caption" color="primary">
                You rated this book {userRating} star{userRating > 1 ? 's' : ''}
              </Typography>
            )}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default BookDetails;
