'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Container, Alert } from '@mui/material';
import axios from 'utils/axios';

import CreateBookForm from 'components/CreateBookForm';
import { BookFormData } from 'types/book';

const BookCreateView: React.FC = () => {
  const router = useRouter();
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleBookSubmit = async (formData: BookFormData) => {
    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      // Prepare data for API (remove empty optional fields)
      const apiData: any = {
        isbn13: formData.isbn13,
        authors: formData.authors,
        publication_year: formData.publication_year,
        original_title: formData.original_title,
        title: formData.title,
        rating_1: formData.rating_1,
        rating_2: formData.rating_2,
        rating_3: formData.rating_3,
        rating_4: formData.rating_4,
        rating_5: formData.rating_5
      };

      // Only include optional image fields if they have values
      if (formData.image_url?.trim()) {
        apiData.image_url = formData.image_url;
      }
      if (formData.image_small_url?.trim()) {
        apiData.image_small_url = formData.image_small_url;
      }

      const response = await axios.post('https://tcss460-group1-web-api-d9b1e8b26f0f.herokuapp.com/c/books', apiData);

      console.log('Book created successfully:', response.data);
      setSubmitMessage({ type: 'success', text: 'Book created successfully! Redirecting to book list...' });

      // Navigate to book list after a short delay
      setTimeout(() => {
        router.push('/viewbooks'); // Adjust this path to match your book list route
      }, 2000);
    } catch (error: any) {
      console.error('Error creating book:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Unknown error occurred';
      setSubmitMessage({
        type: 'error',
        text: `Failed to create book: ${errorMessage}`
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Box mt={4}>
        {submitMessage && (
          <Alert severity={submitMessage.type} sx={{ mb: 3 }}>
            {submitMessage.text}
          </Alert>
        )}

        <CreateBookForm onSubmit={handleBookSubmit} isSubmitting={isSubmitting} onMessageClear={() => setSubmitMessage(null)} />
      </Box>
    </Container>
  );
};

export default BookCreateView;
