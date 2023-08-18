import React, { useContext, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Alert,
  Collapse,
  // IconButton,
} from '@mui/material';
import { AuthContext } from '@saas-quick-start/platform/context/presentation/react';

export function LoginView() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(false);
  const { login } = useContext(AuthContext);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) {
      setOpen(true);
      return;
    }
    login(email, password);
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        bgcolor: 'primary',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          p: 3,
          boxShadow: 5,
          borderRadius: 2,
        }}
      >
        <Typography component="h1" variant="h5">
          Inicia Sesión
        </Typography>
        <form onSubmit={handleSubmit} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Correo Electrónico"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={handleEmailChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={handlePasswordChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Entrar
          </Button>
        </form>
        <Collapse in={open}>
          <Alert
            severity="error"
            // action={
            //   <IconButton
            //     aria-label="close"
            //     color="inherit"
            //     size="small"
            //     onClick={handleClose}
            //   >
            //   </IconButton>
            // }
            sx={{ mb: 2 }}
          >
            La contraseña debe tener al menos 8 caracteres
          </Alert>
        </Collapse>
      </Box>
    </Container>
  );
}

export default LoginView;
