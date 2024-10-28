import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, InputAdornment, Typography, Stack, Alert, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { api } from "../../../services/api";
import LockIcon from '@mui/icons-material/Lock';

export function UserSettings() {
    const [password, setPassword] = useState('');
    const [showInputError, setShowInputError] = useState(false);
    const [showUpdateError, setShowUpdateError] = useState(false);
    const [showUpdateSuccess, setShowUpdateSuccess] = useState(false);
  
  const loggedUser = sessionStorage.getItem('user');

  const handleSubmit = () => {
    if (!password) {
      setShowUpdateError(false);
      setShowUpdateSuccess(false);
      setShowInputError(true);
      return;
    } else {
      setShowInputError(false);
      handleUpdatePassword();
    }
  };

  const handleUpdatePassword = async () => {
    console.log(loggedUser);

    try {        
        const user = await api.get("/user", {params: {name: loggedUser}});

        await api.put("/user", { name: user.data.name, password: password, admin: user.data.admin });
        setShowUpdateError(false);
        setShowUpdateSuccess(true);
        setPassword('');
    } catch (error) {
        console.error("Erro ao atualizar senha", error);
        setShowUpdateSuccess(false);
        setShowUpdateError(true);
    }
  };

  return (
    <Box
      component='div'
      position='relative'
      display='flex'
      justifyContent='center'
      alignItems='center'
      minHeight='90vh'
      overflow='hidden'
      sx={{ marginTop: '120px' }}
    >
      <Box
        bgcolor='homeCardComponent.main'
        position='relative'
        borderRadius='24px'
        padding='24px'
        width='50%'
        display='flex'
        flexDirection='column'
        gap='2rem'
        color='secondary.dark'
        sx={{
          backdropFilter: 'blur(5px)',
        }}
      >
        <Typography color='secondary.dark' variant="h5" textAlign='center'>
          Alterar Senha
        </Typography>

        <Box component="form" sx={{ mb: 4 }} >
          <TextField
            placeholder="Nova Senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            sx={{ mb: 2, '& .MuiInputBase-root': { backgroundColor: '#FFF' } }}
          />

          <Button
            variant="contained"
            color="primary"
            sx={{ borderRadius: 2, textTransform: 'none', mt: 2 }}
            onClick={handleSubmit}
          >
            Atualizar Senha
          </Button>
        </Box>
        {showInputError && (
            <Stack spacing={2}>
              <Alert sx={{
                fontSize: '14px',
                backgroundColor: theme => theme.palette.dangerComponent.main,
                display: 'flex',
                alignItems: 'center'
              }} variant="filled" severity="error">
                Preencha o campo de senha.
              </Alert>
            </Stack>
          )}

          {showUpdateError && (
            <Stack spacing={2}>
              <Alert sx={{
                fontSize: '14px',
                backgroundColor: theme => theme.palette.dangerComponent.main,
                display: 'flex',
                alignItems: 'center'
              }} variant="filled" severity="error">
                Erro ao atualizar a senha. Tente novamente.
              </Alert>
            </Stack>
          )}

          {showUpdateSuccess && (
            <Stack spacing={2}>
              <Alert sx={{
                fontSize: '14px',
                color: "success",
                display: 'flex',
                alignItems: 'center'
              }} variant="filled" severity="success">
                Senha atualizada com sucesso!
              </Alert>
            </Stack>
          )}

      </Box>
    </Box>
  );
}