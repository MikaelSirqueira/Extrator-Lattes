import { Alert, Box, Button, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import ImageHome from "../../assets/bg-home.svg";
import { useNavigate } from "react-router-dom";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { useState, useEffect, useRef, FormEvent } from "react";
import { api } from "../../../services/api"

// interface UserProps {
//   id: string;
//   name: string;
//   password: string;
//   profile: string;
// }

export function Auth() {

  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const [showUserError, setShowUserError] = useState(false);
  const [showInputError, setShowInputError] = useState(false);
  const [user, setUser] = useState([]);
  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassword] = useState('');

  useEffect(() => {

  }, [])

  const handleUserName = (e) => {
    setUserName(e.target.value);
  };

  const handleUserPassword = (e) => {
    setUserPassword(e.target.value);
  };

  async function logIn() {

    // verifica se não há nenhum campo em branco
    if (!userName || !userPassword){
      setShowInputError(true)
    }else{
      setShowInputError(false)
    }

    // busca pelo usuário e retorna o registro
    try {
      const response = await api.get("/user", {
        params:{
          name: userName
        }
      });

      console.log(response.data);
      setUser(response.data);

      // verifica se as informações do usuário estão corretas
      if (user.password != userPassword){
        setShowUserError(true);
      } else{
        setShowUserError(false);
      }

      if (showUserError == false){
        navigate('/home');
      }

    } catch (error) {
      setShowUserError(true);
    }
    
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box component='div'
      position='relative'
      display='flex'
      justifyContent='center'
      alignItems='center'
      height='90vh'
      overflow='hidden'      
    >
      <img 
        src={ImageHome} 
        alt="Imagem interna da parte central da PUC-PR exibindo a cruz, a igreja e a biblioteca." 
        style={{
          position: 'absolute',
          height: '100%',
          width: '100%',
          objectFit: 'cover',
          filter: 'brightness(60%)'
        }} 
      />  

      <Box 
        bgcolor='homeCardComponent.main' 
        position='relative'
        borderRadius='24px'
        padding='24px'
        width='27.875rem'
        display='flex'
        flexDirection='column'
        gap='1rem'
        sx={{
          backdropFilter: 'blur(5px)',          
        }}
      >
        <Typography color='secondary.dark' variant="h5" textAlign='center' >Faça seu login</Typography>
        
        <div style={{display: 'flex', gap: 8, flexDirection: 'column'}}>
          <TextField 
            placeholder="Usuário"
            sx={{
              '& .MuiFormHelperText-root': { ml: '0', fontSize: 13 },
              '& .MuiInputBase-root': { backgroundColor: '#FFF' },  
              display: 'flex', 
              flexGrow: '1'           
            }}
            value= {userName}
            onChange={handleUserName}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonOutlineIcon />
                </InputAdornment>
              ),
            }}
          />

          <TextField 
            placeholder="Senha"
            type={showPassword ? "text" : "password"} 
            sx={{
              '& .MuiFormHelperText-root': { ml: '0', fontSize: 13 },
              '& .MuiInputBase-root': { backgroundColor: '#FFF' },
              display: 'flex', 

              flexGrow: '1'  
              
            }}
            value = {userPassword}
            onChange={handleUserPassword}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonOutlineIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <Box color="secondary" onClick={handleClickShowPassword} sx={{
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {showPassword ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                  </Box>
                </InputAdornment>
              )
            }}
          />
        </div>        
        
        <Button 
          type='submit'
          variant='contained' 
          size="large"
          color="primary" 
          sx={{
            borderRadius: 2,  
            textTransform:'none'
          }}
          onClick = {() => logIn()}
        >
          Entrar
        </Button>
      
      { showUserError && (
        <Stack spacing={2}>
          <Alert  sx={{
            fontSize:'14px',
            backgroundColor: theme => theme.palette.dangerComponent.main,
            display:'flex',
            alignItems:'center'
            }} variant="filled" severity="error">
            Usuário ou Senha incorretos.
            <br/>
            Tente novamente.
          </Alert>
        </Stack>
      )
      }

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
      )
      }
      

      </Box>
    </Box>
  )
}