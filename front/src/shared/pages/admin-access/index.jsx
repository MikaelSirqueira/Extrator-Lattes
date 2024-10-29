import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, InputAdornment, Typography, Stack, Alert, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { api } from "../../../services/api";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

export function AdminPanel() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [admin, setAdmin] = useState(false);
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserError, setShowUserError] = useState(false);
  const [showInputError, setShowInputError] = useState(false);
  const [showProfileError, setShowProfileError] = useState(false);
  const [showUpdateError, setShowUpdateError] = useState(false);
  const [showUnexpectedDeleteError, setShowUnexpectedDeleteError] = useState(false);
  const [showUnexpectedFormError, setShowUnexpectedFormError] = useState(false);
  const [labelChart, setLabelChart] = useState('Pesquisador');
  
  useEffect(() => {
    fetchUsers();
  }, []);

  // Função para resgatar todos os usuários da API
  const fetchUsers = async () => {
    try {
      const response = await api.get("/users");
      setUsers(response.data);
    } catch (error) {
      console.error('Erro ao buscar usuários', error);
    }
  };

  const handleSubmit = () => {
    console.log(labelChart);

    if (labelChart === 'Administrador') {
      setAdmin(true);
    } else {
      setAdmin(false);
    }

    console.log(admin);

    if (editUser) {
      handleEditSubmit();
    } else if (!editUser){
      handleNewSubmit();
    }
  }

  // Função para criar um usuário
  const handleNewSubmit = async () => {

    // Verifica se não existe nenhum campo em branco
    if (!name || !password){
      setShowUserError(false);
      setShowProfileError(false);
      setShowUpdateError(false);
      setShowUnexpectedDeleteError(false);
      setShowUnexpectedFormError(false);
      setShowInputError(true);
      return
    }else{
      setShowInputError(false);
    }
    
    // Verifica se o nome de usuário já existe ou não
    const userVerification = await api.get('/user', {params: {name: name}});


    if (userVerification.status == 200 && userVerification.data !== null){
      setShowInputError(false);
      setShowProfileError(false);
      setShowUpdateError(false);
      setShowUnexpectedDeleteError(false);
      setShowUnexpectedFormError(false);
      setShowUserError(true);
      return
    } else{
      setShowUserError(false);
    }
    
    try {
      await api.post("/user", { name, password, admin });
      setShowUnexpectedFormError(false);
      fetchUsers(); 
      clearForm();
    } catch (error) {
      setShowUnexpectedFormError(true);
      console.error('Erro ao salvar usuário', error);
    }
  };

  // Função para editar um usuário
  const handleEditSubmit = async () => {

    // Verifica se não existe nenhum campo em branco
    if (!name || !password){
      setShowUserError(false);
      setShowProfileError(false);
      setShowUpdateError(false);
      setShowUnexpectedDeleteError(false);
      setShowUnexpectedFormError(false);
      setShowInputError(true);
      return
    }else{
      setShowInputError(false);
    }
    
    // Verifica se o nome de usuário já existe ou não
    const userVerification = await api.get('/user', {params: {name: name}});

    if (userVerification.status !== 200){
      setShowInputError(false);
      setShowUserError(false);
      setShowProfileError(false);
      setShowUnexpectedDeleteError(false);
      setShowUnexpectedFormError(false);
      setShowUpdateError(true);
      return
    } else{
      setShowUpdateError(false);
    }

    try {
      await api.put("/user", { name, password, admin });
      setShowUnexpectedFormError(false);
      fetchUsers(); 
      clearForm();
    } catch (error) {
      setShowUnexpectedFormError(true);
      console.error('Erro ao salvar usuário', error);
    }
  };

  // Função para deletar um usuário
  const handleDelete = async (id) => {

    const loggedUser = sessionStorage.getItem('user');

    // Caso o usuário queira se deletar ou deletar outro admin
    const userToDelete = users.find((user) => user.id === id);
    if (loggedUser.name === userToDelete.name || userToDelete.admin) {
      setShowInputError(false);
      setShowUserError(false);
      setShowUpdateError(false);
      setShowUnexpectedDeleteError(false);
      setShowUnexpectedFormError(false);
      setShowProfileError(true);
      return;
    } else {
      setShowProfileError(false);
    }

    try {
      await api.delete("/user", {params: {id: Number(id)}});
      setShowUnexpectedDeleteError(false);
      fetchUsers();
      clearForm();
    } catch (error) {
      console.error('Erro ao deletar usuário', error);
      setShowUnexpectedDeleteError(true);
    }
  };

  // Função para preencher o formulário ao editar um usuário
  const handleEdit = (user) => {
    clearForm();
    setEditUser(true);
    setSelectedUser(user);
    setName(user.name);
    setAdmin(user.admin);
    setPassword(''); 

    window.scrollTo({
      top: 500,
      behavior: 'instant'
    });
  };

  // Função para limpar o formulário
  const clearForm = () => {
    setShowInputError(false);
    setShowUserError(false);
    setShowUpdateError(false);
    setShowProfileError(false);
    setShowUnexpectedDeleteError(false);
    setEditUser(false);
    setName('');
    setPassword('');
    setAdmin(false);
    setSelectedUser(null);
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
      sx={{ marginTop: '20px' }}
    >
      <Box 
        bgcolor='homeCardComponent.main' 
        position='relative'
        borderRadius='24px'
        padding='24px'
        width='80%'
        display='flex'
        flexDirection='column'
        gap='2rem'
        color='secondary.dark'
        sx={{
          backdropFilter: 'blur(5px)',
        }}
      >
        <Typography color='secondary.dark' variant="h5" textAlign='center'>
          Gerenciamento de Usuários
        </Typography>

        <Box id="about" component={'section'} maxWidth={'780px'} pb={2} >
        <Typography variant="h6" color='secondary.dark' pb={2}>Sobre o Gerenciamento</Typography>
        
        <Typography variant="body1" color='secondary.light'>
          Esta tela para administradores deve ser utilizada para cadastrar novos usuários e para atualizar ou deletar usuários já existentes.
          <br />
          <br />
          Criar Usuário {'->'} O usuário será registrado no sistema com os dados informados e será mostrado ao final da lista de usuários presente na tela.
          <br />
          Editar {'->'} O nome do usuário será pré-preenchido no formulário, permitindo que você altere todos os campos necessários.
          <br />
          Deletar {'->'} O sistema irá apagar o usuário sem solicitar uma segunda confirmação.
          <br />
          <br />
          Importante: Os usuários com perfil do tipo "Pesquisador" visualizam uma tela contendo apenas opção de alterar a própria senha.
        </Typography>
      </Box>

      <Typography color='secondary.dark' variant="h6" textAlign='left'>
          Formulário
        </Typography>

        <Box component="form" sx={{ mb: 4 }} >
          <TextField 
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            sx={{ mb: 2, color:'secondary.dark', '& .MuiInputBase-root': { backgroundColor: '#FFF' }}}
          />
          <TextField 
            placeholder="Senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            sx={{ mb: 2, '& .MuiInputBase-root': { backgroundColor: '#FFF' }}}
          />

          <FormControl
          fullWidth
          sx={{
            mb: 2,
            '& .MuiInputBase-root': { backgroundColor: '#FFF' },
            '.MuiFormHelperText-root' : { color: 'secondary.dark'},
            '.MuiList-root' : {color: 'secondary.dark'},
          }}>
          <InputLabel id="file-select-label">Tipo de Perfil</InputLabel>
          <Select
            labelId="file-select-label"
            id='profile-select'    
            label="Tipo de Perfil"
            value={labelChart}
            onChange={(event) => setLabelChart(event.target.value)}
            sx={{ 
              '& .MuiSelect-select': { color: 'secondary.dark', borderColor: 'secondary.headerFooterComponent'  }
            }}
            MenuProps={{
              sx: {
                '& .MuiMenuItem-root': {
                  color: 'secondary.dark',                  
                },
                '& .Mui-selected': {
                  backgroundColor: 'homeCardComponent.light',
                },
              },
            }}
          >
            <MenuItem value="Pesquisador"
            sx={{'& .MuiMenuItem-gutters': {color:'secondary.dark'}}}>Pesquisador</MenuItem>
            <MenuItem value="Administrador">Administrador</MenuItem>
          </Select>
          </FormControl>

          <Button 
            variant="contained"
            color="primary"
            sx={{ borderRadius: 2, textTransform: 'none', mt: 2 }}
            onClick={(handleSubmit)}
            startIcon={<PersonAddIcon />}
          >
            {selectedUser ? 'Atualizar Usuário' : 'Criar Usuário'}
          </Button>

          {selectedUser && (
            <Button 
              variant="outlined"
              color="secondary"
              onClick={clearForm}
              sx={{ ml: 2, mt: 2 }}
            >
              Cancelar
            </Button>
          )}
        </Box>

        { showUserError && (
            <Stack spacing={10}>
              <Alert  sx={{
                fontSize:'14px',
                backgroundColor: theme => theme.palette.dangerComponent.main,
                display:'flex',
                alignItems:'center'
                }} variant="filled" severity="error">
                Este usuário já existe.
                <br/>
                Tente novamente.
              </Alert>
            </Stack>
          )}

          { showInputError && (
            <Stack spacing={2}>
              <Alert  sx={{
                fontSize:'14px',
                backgroundColor: theme => theme.palette.dangerComponent.main,
                display:'flex',
                alignItems:'center'
                }} variant="filled" severity="error">
                Preencha todos os campos
                <br/>
                Tente novamente.
              </Alert>
            </Stack>
          )}

          { showUpdateError && (
            <Stack spacing={2}>
              <Alert  sx={{
                fontSize:'14px',
                backgroundColor: theme => theme.palette.dangerComponent.main,
                display:'flex',
                alignItems:'center'
                }} variant="filled" severity="error">
                Este usuário não existe.
                <br/>
                Tente novamente.
              </Alert>
            </Stack>
          )}

          { showUnexpectedFormError && (
            <Stack spacing={2}>
              <Alert  sx={{
                fontSize:'14px',
                backgroundColor: theme => theme.palette.dangerComponent.main,
                display:'flex',
                alignItems:'center'
                }} variant="filled" severity="error">
                Erro inesperado.
                <br/>
                Tente novamente.
              </Alert>
            </Stack>
          )}
  

        {/* Tabela de usuários */}
        <TableContainer component={Paper} color='secondary.dark' sx={{ bgcolor: 'background.default', borderRadius: '12px', boxShadow: 5}}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><Typography color="secondary.dark">Nome</Typography></TableCell>
                <TableCell><Typography color="secondary.dark">Tipo de Perfil</Typography></TableCell>
                <TableCell><Typography color="secondary.dark">Data de Criação</Typography></TableCell>
                <TableCell><Typography color="secondary.dark">Ações</Typography></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell><Typography color="secondary.dark">{user.name}</Typography></TableCell>
                  <TableCell><Typography color="secondary.dark">{user.admin ? 'Administrador' : 'Pesquisador'}</Typography></TableCell>
                  <TableCell><Typography color="secondary.dark">
                    {new Date(user.created_at).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  })}
                  </Typography></TableCell>
                  <TableCell>
                    <Button 
                      variant="outlined"
                      color="primary"
                      onClick={() => handleEdit(user)}
                      sx={{ mr: 2 }}
                      startIcon={<EditIcon />}
                    >
                      Editar
                    </Button>
                    <Button 
                      variant="outlined"
                      color="secondary"
                      onClick={() => handleDelete(user.id)}
                      startIcon={<DeleteIcon />}
                    >
                      Deletar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        { showProfileError && (
            <Stack spacing={2}>
              <Alert  sx={{
                fontSize:'14px',
                backgroundColor: theme => theme.palette.dangerComponent.main,
                display:'flex',
                alignItems:'center'
                }} variant="filled" severity="error">
                Você não pode deletar este usuário.
                <br/>
                Tente novamente.
              </Alert>
            </Stack>
          )}

          { showUnexpectedDeleteError && (
            <Stack spacing={2}>
              <Alert  sx={{
                fontSize:'14px',
                backgroundColor: theme => theme.palette.dangerComponent.main,
                display:'flex',
                alignItems:'center'
                }} variant="filled" severity="error">
                Erro inesperado.
                <br/>
                Tente novamente.
              </Alert>
            </Stack>
          )}

      </Box>
    </Box>
  );

}
