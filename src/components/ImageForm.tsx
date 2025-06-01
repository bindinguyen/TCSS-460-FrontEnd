import React from 'react';
import { Typography, TextField, Grid, Divider } from '@mui/material';
import { Field } from 'formik';

const ImageForm: React.FC = () => {
  return (
    <>
      <Divider sx={{ my: 3 }} />

      <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
        Book Cover Images
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Field name="image_url">
            {({ field, meta }: any) => (
              <TextField
                {...field}
                fullWidth
                label="Large Cover Image URL"
                type="url"
                error={meta.touched && !!meta.error}
                helperText={meta.touched && meta.error ? meta.error : 'Optional: URL for the large book cover image'}
                placeholder="https://images.gr-assets.com/books/1474171184m/136251.jpg"
              />
            )}
          </Field>
        </Grid>

        <Grid item xs={12} md={6}>
          <Field name="image_small_url">
            {({ field, meta }: any) => (
              <TextField
                {...field}
                fullWidth
                label="Small Cover Image URL"
                type="url"
                error={meta.touched && !!meta.error}
                helperText={meta.touched && meta.error ? meta.error : 'Optional: URL for the small book cover image'}
                placeholder="https://images.gr-assets.com/books/1474171184s/136251.jpg"
              />
            )}
          </Field>
        </Grid>
      </Grid>
    </>
  );
};

export default ImageForm;
