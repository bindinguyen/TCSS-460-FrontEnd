import React from 'react';
import { Card, CardContent, Typography, Button, Stack, CircularProgress, Box } from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import BasicInfoForm from './BasicInfoForm';
import ImageForm from './ImageForm';
import RatingForm from './RatingForm';
import { BookFormData } from 'types/book';

interface CreateBookFormProps {
  onSubmit: (data: BookFormData) => void;
  isSubmitting: boolean;
  onMessageClear: () => void;
}

// Validation schema using Yup
const validationSchema = Yup.object({
  isbn13: Yup.number()
    .required('ISBN-13 is required')
    .test('len', 'ISBN-13 must be exactly 13 digits', (val) => (val ? val.toString().length === 13 : false)),
  title: Yup.string().required('Title is required').trim(),
  authors: Yup.string().required('Author(s) is required').trim(),
  original_title: Yup.string().required('Original title is required').trim(),
  publication_year: Yup.number()
    .required('Publication year is required')
    .min(1000, 'Please enter a valid publication year')
    .max(new Date().getFullYear() + 5, 'Please enter a valid publication year'),
  rating_1: Yup.number().min(0, 'Rating must be 0 or greater'),
  rating_2: Yup.number().min(0, 'Rating must be 0 or greater'),
  rating_3: Yup.number().min(0, 'Rating must be 0 or greater'),
  rating_4: Yup.number().min(0, 'Rating must be 0 or greater'),
  rating_5: Yup.number().min(0, 'Rating must be 0 or greater'),
  image_url: Yup.string().url('Please enter a valid URL'),
  image_small_url: Yup.string().url('Please enter a valid URL')
});

const CreateBookForm: React.FC<CreateBookFormProps> = ({ onSubmit, isSubmitting, onMessageClear }) => {
  const initialValues: BookFormData = {
    isbn13: 0,
    authors: '',
    publication_year: new Date().getFullYear(),
    original_title: '',
    title: '',
    rating_1: 0,
    rating_2: 0,
    rating_3: 0,
    rating_4: 0,
    rating_5: 0,
    image_url: '',
    image_small_url: ''
  };

  const handleSubmit = (values: BookFormData) => {
    onSubmit(values);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
          Create New Book
        </Typography>

        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ resetForm, values, setFieldValue }) => (
            <Form>
              <Box onChange={onMessageClear}>
                <BasicInfoForm />
                <ImageForm />
                <RatingForm />

                {/* Action Buttons */}
                <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 4 }}>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      resetForm();
                      onMessageClear();
                    }}
                    disabled={isSubmitting}
                  >
                    Reset
                  </Button>

                  <Button
                    type="submit"
                    variant="contained"
                    disabled={isSubmitting}
                    startIcon={isSubmitting ? <CircularProgress size={20} /> : undefined}
                  >
                    {isSubmitting ? 'Creating...' : 'Create Book'}
                  </Button>
                </Stack>
              </Box>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
};

export default CreateBookForm;
