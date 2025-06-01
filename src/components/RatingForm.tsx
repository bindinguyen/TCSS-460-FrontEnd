import React from 'react';
import { Typography, TextField, Grid, Accordion, AccordionSummary, AccordionDetails, Divider } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Field } from 'formik';

const RatingForm: React.FC = () => {
  return (
    <>
      <Divider sx={{ my: 3 }} />

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Rating Details (Optional)</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Enter the number of ratings for each star level (1-5 stars)
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6} md={2.4}>
              <Field name="rating_1">
                {({ field, meta }: any) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="1-Star Ratings"
                    type="number"
                    error={meta.touched && !!meta.error}
                    helperText={meta.touched && meta.error}
                    inputProps={{ min: 0 }}
                    size="small"
                  />
                )}
              </Field>
            </Grid>

            <Grid item xs={6} md={2.4}>
              <Field name="rating_2">
                {({ field, meta }: any) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="2-Star Ratings"
                    type="number"
                    error={meta.touched && !!meta.error}
                    helperText={meta.touched && meta.error}
                    inputProps={{ min: 0 }}
                    size="small"
                  />
                )}
              </Field>
            </Grid>

            <Grid item xs={6} md={2.4}>
              <Field name="rating_3">
                {({ field, meta }: any) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="3-Star Ratings"
                    type="number"
                    error={meta.touched && !!meta.error}
                    helperText={meta.touched && meta.error}
                    inputProps={{ min: 0 }}
                    size="small"
                  />
                )}
              </Field>
            </Grid>

            <Grid item xs={6} md={2.4}>
              <Field name="rating_4">
                {({ field, meta }: any) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="4-Star Ratings"
                    type="number"
                    error={meta.touched && !!meta.error}
                    helperText={meta.touched && meta.error}
                    inputProps={{ min: 0 }}
                    size="small"
                  />
                )}
              </Field>
            </Grid>

            <Grid item xs={6} md={2.4}>
              <Field name="rating_5">
                {({ field, meta }: any) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="5-Star Ratings"
                    type="number"
                    error={meta.touched && !!meta.error}
                    helperText={meta.touched && meta.error}
                    inputProps={{ min: 0 }}
                    size="small"
                  />
                )}
              </Field>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default RatingForm;
