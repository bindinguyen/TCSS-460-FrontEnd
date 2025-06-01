import React from 'react';
import { Typography, TextField, Grid } from '@mui/material';
import { Field, ErrorMessage } from 'formik';

const BasicInfoForm: React.FC = () => {
  return (
    <>
      <Typography variant="h6" gutterBottom sx={{ mt: 2, mb: 2 }}>
        Basic Information
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Field name="isbn13">
            {({ field, meta }: any) => (
              <TextField
                {...field}
                fullWidth
                label="ISBN-13"
                type="number"
                value={field.value || ''}
                error={meta.touched && !!meta.error}
                helperText={meta.touched && meta.error}
                required
                placeholder="9780545010220"
              />
            )}
          </Field>
        </Grid>

        <Grid item xs={12} md={6}>
          <Field name="publication_year">
            {({ field, meta }: any) => (
              <TextField
                {...field}
                fullWidth
                label="Publication Year"
                type="number"
                error={meta.touched && !!meta.error}
                helperText={meta.touched && meta.error}
                required
                inputProps={{
                  min: 1000,
                  max: new Date().getFullYear() + 5
                }}
              />
            )}
          </Field>
        </Grid>

        <Grid item xs={12}>
          <Field name="authors">
            {({ field, meta }: any) => (
              <TextField
                {...field}
                fullWidth
                label="Authors"
                error={meta.touched && !!meta.error}
                helperText={meta.touched && meta.error}
                required
                placeholder="J.K. Rowling, Mary GrandPré"
              />
            )}
          </Field>
        </Grid>

        <Grid item xs={12}>
          <Field name="title">
            {({ field, meta }: any) => (
              <TextField
                {...field}
                fullWidth
                label="Title"
                error={meta.touched && !!meta.error}
                helperText={meta.touched && meta.error}
                required
                placeholder="Harry Potter and the Deathly Hallows (Harry Potter, #7)"
              />
            )}
          </Field>
        </Grid>

        <Grid item xs={12}>
          <Field name="original_title">
            {({ field, meta }: any) => (
              <TextField
                {...field}
                fullWidth
                label="Original Title"
                error={meta.touched && !!meta.error}
                helperText={meta.touched && meta.error}
                required
                placeholder="Harry Potter and the Deathly Hallows"
              />
            )}
          </Field>
        </Grid>
      </Grid>
    </>
  );
};

export default BasicInfoForm;
