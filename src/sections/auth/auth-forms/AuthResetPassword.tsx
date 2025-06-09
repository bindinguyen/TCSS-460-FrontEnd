'use client';

import React, { useState, FocusEvent, SyntheticEvent } from 'react';

// next
import { signIn } from 'next-auth/react';

// material-ui
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// third party
import * as Yup from 'yup';
import { preload } from 'swr';
import { Formik } from 'formik';

// project import
import IconButton from 'components/@extended/IconButton';
import AnimateButton from 'components/@extended/AnimateButton';

import { APP_DEFAULT_PATH } from 'config';
import { fetcher } from 'utils/axios';

// assets
import EyeOutlined from '@ant-design/icons/EyeOutlined';
import EyeInvisibleOutlined from '@ant-design/icons/EyeInvisibleOutlined';

export default function PasswordResetForm({ providers, csrfToken }: any) {
  const [capsWarning, setCapsWarning] = useState(false);

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const handleClickShowCurrentPassword = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };

  const handleClickShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleMouseDownPassword = (event: SyntheticEvent) => {
    event.preventDefault();
  };

  const onKeyDown = (keyEvent: any) => {
    if (keyEvent.getModifierState('CapsLock')) {
      setCapsWarning(true);
    } else {
      setCapsWarning(false);
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          email: '', // TODO for dev work, you can hardcode a known user and password here
          currentPassword: '',
          newPassword: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          currentPassword: Yup.string()
            .required('Current password is required')
            .test('no-leading-trailing-whitespace', 'Password cannot start or end with spaces', (value) => value === value.trim())
            .min(11, 'Password must be 11 or more characters'),
          newPassword: Yup.string()
            .required('New password is required')
            .test('no-leading-trailing-whitespace', 'Password cannot start or end with spaces', (value) => value === value.trim())
            .min(11, 'Password must be 11 or more characters')
            .test('passwords-different', 'New password must be different from current password', function (value) {
              return value !== this.parent.currentPassword;
            })
        })}
        onSubmit={(values, { setErrors, setSubmitting }) => {
          const trimmedEmail = values.email.trim();
          // TODO: Replace this with your password reset API call
          // This is a placeholder - you'll need to implement the actual password reset logic
          signIn('reset-password', {
            redirect: false,
            email: trimmedEmail,
            currentPassword: values.currentPassword,
            newPassword: values.newPassword,
            callbackUrl: APP_DEFAULT_PATH
          }).then(
            (res: any) => {
              if (res?.error) {
                setErrors({ submit: res.error });
                setSubmitting(false);
              } else {
                preload('api/menu/dashboard', fetcher);
                setSubmitting(false);
                // TODO: Add success message or redirect
              }
            },
            (res) => {
              setErrors({ submit: res.error });
              setSubmitting(false);
            }
          );
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="email-reset">Email Address</InputLabel>
                  <OutlinedInput
                    id="email-reset"
                    type="email"
                    value={values.email}
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter email address"
                    fullWidth
                    error={Boolean(touched.email && errors.email)}
                  />
                </Stack>
                {touched.email && errors.email && (
                  <FormHelperText error id="standard-weight-helper-text-email-reset">
                    {errors.email}
                  </FormHelperText>
                )}
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="current-password-reset">Current Password</InputLabel>
                  <OutlinedInput
                    fullWidth
                    color={capsWarning ? 'warning' : 'primary'}
                    error={Boolean(touched.currentPassword && errors.currentPassword)}
                    id="current-password-reset"
                    type={showCurrentPassword ? 'text' : 'password'}
                    value={values.currentPassword}
                    name="currentPassword"
                    onBlur={(event: FocusEvent<any, Element>) => {
                      setCapsWarning(false);
                      handleBlur(event);
                    }}
                    onKeyDown={onKeyDown}
                    onChange={handleChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle current password visibility"
                          onClick={handleClickShowCurrentPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          color="secondary"
                        >
                          {showCurrentPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                        </IconButton>
                      </InputAdornment>
                    }
                    placeholder="Enter current password"
                  />
                  {capsWarning && (
                    <Typography variant="caption" sx={{ color: 'warning.main' }} id="warning-helper-text-current-password">
                      Caps lock on!
                    </Typography>
                  )}
                </Stack>
                {touched.currentPassword && errors.currentPassword && (
                  <FormHelperText error id="standard-weight-helper-text-current-password-reset">
                    {errors.currentPassword}
                  </FormHelperText>
                )}
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="new-password-reset">New Password</InputLabel>
                  <OutlinedInput
                    fullWidth
                    color={capsWarning ? 'warning' : 'primary'}
                    error={Boolean(touched.newPassword && errors.newPassword)}
                    id="new-password-reset"
                    type={showNewPassword ? 'text' : 'password'}
                    value={values.newPassword}
                    name="newPassword"
                    onBlur={(event: FocusEvent<any, Element>) => {
                      setCapsWarning(false);
                      handleBlur(event);
                    }}
                    onKeyDown={onKeyDown}
                    onChange={handleChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle new password visibility"
                          onClick={handleClickShowNewPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          color="secondary"
                        >
                          {showNewPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                        </IconButton>
                      </InputAdornment>
                    }
                    placeholder="Enter new password"
                  />
                  {capsWarning && (
                    <Typography variant="caption" sx={{ color: 'warning.main' }} id="warning-helper-text-new-password">
                      Caps lock on!
                    </Typography>
                  )}
                </Stack>
                {touched.newPassword && errors.newPassword && (
                  <FormHelperText error id="standard-weight-helper-text-new-password-reset">
                    {errors.newPassword}
                  </FormHelperText>
                )}
              </Grid>

              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}

              <Grid item xs={12}>
                <AnimateButton>
                  <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                    Reset Password
                  </Button>
                </AnimateButton>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
}
