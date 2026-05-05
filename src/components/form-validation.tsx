import { useState } from 'react'
import {
  Alert,
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { Controller, useForm } from 'react-hook-form'

type LoginFormValues = {
  email: string
  password: string
  rememberMe: boolean
}

export function LoginForm() {
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null)

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: true,
    },
    mode: 'onTouched',
  })

  const onSubmit = async (values: LoginFormValues) => {
    await new Promise((resolve) => {
      window.setTimeout(resolve, 500)
    })

    setSubmittedEmail(values.email)
  }

  return (
    <Box className="login-shell">
      <Paper className="login-card" elevation={5}>
        <Stack spacing={1}>
          <Typography variant="overline" color="text.secondary">
            Account access
          </Typography>
          <Typography variant="h4" component="h1">
            Sign in
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Use your email and password to access the dashboard.
          </Typography>
        </Stack>

        {submittedEmail ? (
          <Alert severity="success">Signed in as {submittedEmail}.</Alert>
        ) : null}

        <form id="login" noValidate onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <Controller
              name="email"
              control={control}
              rules={{
                required: 'Email is required.',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Enter a valid email address.',
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="email"
                  label="Email"
                  autoComplete="email"
                  fullWidth
                  error={Boolean(errors.email)}
                  helperText={errors.email?.message}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              rules={{
                required: 'Password is required.',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters.',
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="password"
                  label="Password"
                  autoComplete="current-password"
                  fullWidth
                  error={Boolean(errors.password)}
                  helperText={errors.password?.message}
                />
              )}
            />
          </Stack>
        </form>
        <Button
          form="login"
          type="submit"
          variant="contained"
          size="large"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Signing in...' : 'Sign in'}
        </Button>
      </Paper>
    </Box>
  )
}
