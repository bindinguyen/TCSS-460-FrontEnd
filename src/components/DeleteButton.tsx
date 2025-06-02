'use client';

import React from 'react';
import { Box, Button, Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const DeleteBook = () => {
  const handleDeleteClick = () => {
    // TODO: Implement delete functionality
    console.log('Delete button clicked for book');
    alert('Delete functionality coming soon!');
  };

  return (
    <Box maxWidth={600} mx="auto" mt={2} mb={4}>
      <Stack direction="row" justifyContent="center" spacing={2}>
        <Button variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={handleDeleteClick} size="large">
          Delete Book
        </Button>
      </Stack>
    </Box>
  );
};

export default DeleteBook;
