'use client';

import React, { useState } from 'react';
import { Box, Typography, Card, CardMedia, CardContent, Rating, Stack } from '@mui/material';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMore from '@mui/icons-material/ExpandMore';

const mockBook = {
  id: 5,
  title: 'The Hobbit',
  originalTitle: 'The Hobbit or There and Back Again',
  author: 'J.R.R. Tolkien',
  description: 'Bilbo Baggins embarks on a journey to win a share of the treasure guarded by Smaug the dragon.',
  coverImage: 'https://www.thebookdesigner.com/wp-content/uploads/2023/12/The-Hobbit-Book-Cover-by-Jemima-Catlin.jpg',
  published: '1937',
  isbn: '1234567890',
  rating: 4.7,
  ratingsCount: 5000,
  rating1: 500,
  rating2: 600,
  rating3: 700,
  rating4: 200,
  rating5: 450
};

const BookDetails = () => {
  const [userRating, setUserRating] = useState<number | null>(null);

  return (
    <Box maxWidth={600} mx="auto" mt={4}>
      <Card>
        <CardMedia component="img" height="350" image={mockBook.coverImage} alt={mockBook.title} />
        <CardContent>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="h4" gutterBottom>
              {mockBook.title}
            </Typography>
            <Rating value={mockBook.rating} precision={0.1} readOnly />
            <Typography>{mockBook.rating}</Typography>
            <Typography variant="body2">({mockBook.ratingsCount} ratings)</Typography>
          </Stack>
          <Typography variant="subtitle1" color="text.secondary" style={{ fontStyle: 'italic' }}>
            Original Title: {mockBook.originalTitle}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            by {mockBook.author}
          </Typography>
          <Typography variant="body2" mt={2}>
            {mockBook.description}
          </Typography>
          <Stack direction="row" spacing={2} mt={2}>
            <Typography variant="body2">Published: {mockBook.published}</Typography>
            <Typography variant="body2">ISBN: {mockBook.isbn}</Typography>
          </Stack>

          <Accordion sx={{ mt: 2 }}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography variant="subtitle2">More Details</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <strong>ISBN:</strong> {mockBook.isbn}
              </Typography>
              <Typography>
                <strong>Ratings by Stars:</strong>
              </Typography>
              <ul style={{ margin: 0, paddingLeft: 20 }}>
                <li>5 stars: {mockBook.rating5}</li>
                <li>4 stars: {mockBook.rating4}</li>
                <li>3 stars: {mockBook.rating3}</li>
                <li>2 stars: {mockBook.rating2}</li>
                <li>1 star: {mockBook.rating1}</li>
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
