import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, InputAdornment, Typography } from '@mui/material';
import { api } from "../../../services/api";
import PersonIcon from '@mui/icons-material/Person';

export function AdminPanel() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [profile, setProfile] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

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

  // Função para criar ou atualizar um usuário
  const handleSubmit = async () => {
    try {
      if (selectedUser) {
        await api.put(`/user/${selectedUser.id}`, { name, password, profile });
      } else {
        await api.post("/user", { name, password, profile });
      }
      fetchUsers(); 
      clearForm();
    } catch (error) {
      console.error('Erro ao salvar usuário', error);
    }
  };

  // Função para deletar um usuário
  const handleDelete = async (id) => {
    try {
      await api.delete(`/user/${id}`);
      fetchUsers();
    } catch (error) {
      console.error('Erro ao deletar usuário', error);
    }
  };

  // Função para preencher o formulário ao editar um usuário
  const handleEdit = (user) => {
    setSelectedUser(user);
    setName(user.name);
    setProfile(user.profile);
    setPassword(''); 
  };

  // Função para limpar o formulário
  const clearForm = () => {
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
        sx={{
          backdropFilter: 'blur(5px)',
        }}
      >
        <Typography color='secondary.dark' variant="h5" textAlign='center'>
          Gerenciamento de Usuários
        </Typography>

        {/* Formulário para adicionar ou atualizar usuários */}
        <Box component="form" sx={{ mb: 4 }}>
          <TextField 
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            sx={{ mb: 2, '& .MuiInputBase-root': { backgroundColor: '#FFF' }}}
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
            onClick={handleSubmit}
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

        {/* Tabela de usuários */}
        <TableContainer component={Paper} sx={{ bgcolor: 'background.default', borderRadius: '12px', boxShadow: 1 }}>
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
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.profile}</TableCell>
                  <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
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
