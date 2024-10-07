import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, InputAdornment, Typography, Stack, Alert } from '@mui/material';
import { api } from "../../../services/api";
import PersonIcon from '@mui/icons-material/Person';

export function AdminPanel() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [profile, setProfile] = useState('');
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserError, setShowUserError] = useState(false);
  const [showInputError, setShowInputError] = useState(false);
  const [showProfileError, setShowProfileError] = useState(false);
  const [showUpdateError, setShowUpdateError] = useState(false);

  // Função para resgatar todos os usuários da API
  const fetchUsers = async () => {
    try {
      const response = await api.get("/users");
      setUsers(response.data);
    } catch (error) {
      console.error('Erro ao buscar usuários', error);
    }
  };

  // Carrega os usuários ao montar o componente
  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = () => {
    if (editUser) {
      handleEditSubmit();
    } else if (!editUser){
      handleNewSubmit();
    }
  }

  // Função para criar um usuário
  const handleNewSubmit = async () => {

    // Verifica se não existe nenhum campo em branco
    if (!name || !password || !profile){
      setShowUserError(false);
      setShowProfileError(false);
      setShowUpdateError(false);
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
      setShowUserError(true);
      return
    } else{
      setShowUserError(false);
    }
    
    try {
      await api.post("/user", { name, password, profile });
      fetchUsers(); 
      clearForm();
    } catch (error) {
      console.error('Erro ao salvar usuário', error);
    }
  };

  // Função para editar um usuário
  const handleEditSubmit = async () => {

    // Verifica se não existe nenhum campo em branco
    if (!name || !password || !profile){
      setShowUserError(false);
      setShowProfileError(false);
      setShowUpdateError(false);
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
      setShowUpdateError(true);
      return
    } else{
      setShowUpdateError(false);
    }
    
    try {
      await api.put("/user", { name, password, profile });
      fetchUsers(); 
      clearForm();
    } catch (error) {
      console.error('Erro ao salvar usuário', error);
    }
  };

  // Função para deletar um usuário
  const handleDelete = async (id) => {
    const loggedUser = sessionStorage.getItem('user');

    // Caso o usuário queira se deletar ou deletar outro admin
    if (loggedUser === name || profile === 'admin'){
      setShowInputError(false);
      setShowUserError(false);
      setShowUpdateError(false);
      setShowProfileError(true);
      return
    } else {
      setShowProfileError(false);
    }
    try {
      await api.delete("/user", {params: {id: id}});
      fetchUsers();
      clearForm();
    } catch (error) {
      console.error('Erro ao deletar usuário', error);
    }
  };

  // Função para preencher o formulário ao editar um usuário
  const handleEdit = (user) => {
    clearForm();
    setEditUser(true);
    setSelectedUser(user);
    setName(user.name);
    setProfile(user.profile);
    setPassword(''); 
  };

  // Função para limpar o formulário
  const clearForm = () => {
    setShowInputError(false);
    setShowUserError(false);
    setShowUpdateError(false);
    setShowProfileError(false);
    setEditUser(false);
    setName('');
    setPassword('');
    setProfile('');
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
      sx={{ marginTop: '120px' }} // Adicionando espaçamento abaixo do Header
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

        {/* Formulário para adicionar ou atualizar usuários */}
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
          <TextField 
            placeholder="Tipo de Perfil"
            value={profile}
            onChange={(e) => setProfile(e.target.value)}
            fullWidth
            sx={{ mb: 2, '& .MuiInputBase-root': { backgroundColor: '#FFF' }}}
          />
          <Button 
            variant="contained"
            color="primary"
            sx={{ borderRadius: 2, textTransform: 'none', mt: 2 }}
            onClick={(handleSubmit)}
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

        </Box>

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
                  <TableCell><Typography color="secondary.dark">{user.profile}</Typography></TableCell>
                  <TableCell><Typography color="secondary.dark">{new Date(user.created_at).toLocaleDateString()}</Typography></TableCell>
                  <TableCell>
                    <Button 
                      variant="outlined"
                      color="primary"
                      onClick={() => handleEdit(user)}
                      sx={{ mr: 2 }}
                    >
                      Editar
                    </Button>
                    <Button 
                      variant="outlined"
                      color="secondary"
                      onClick={() => handleDelete(user.id)}
                    >
                      Deletar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
