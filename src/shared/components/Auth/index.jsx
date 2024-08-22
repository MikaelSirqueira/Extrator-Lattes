import { Alert, AlertTitle, Box, Button, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import ImageHome from "../../assets/bg-home.svg";
import styles from "../Auth/styles";
import { useNavigate } from "react-router-dom";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { useState } from "react";


export function Auth() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const [showError, setShowError] = useState(false);

  function logIn(state) {
    setShowError(true)
    // if (showError == false){
    //   navigate('/home');
    // }
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div style={styles.container}>
      <img 
        src={ImageHome} 
        alt="Imagem interna da parte central da PUC-PR exibindo a cruz, a igreja e a biblioteca." 
        style={styles.image} 
      />  
      <Box bgcolor='homeCardComponent.main' sx={styles.content} >
        <Typography color='secondary.dark' variant="h1" sx={styles.title}>Faça seu login</Typography>
        
        <TextField 
            placeholder="Usuário"
            sx={{
              '& .MuiFormHelperText-root': { ml: '0', fontSize: 13 },
              '& .MuiInputBase-root': { backgroundColor: '#FFF' },
              width: "225px"
            }}
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
              width: "225px",
            }}
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
        
        <Box sx={styles.buttonContainer}>
          <Button 
            variant='contained' 
            size="large"
            color="primary" 
            sx={styles.button}
            onClick={() => logIn(true)}
          >
            Entrar
          </Button>
        </Box>
      
      { showError && (
        <Stack spacing={2}>
          <Alert  sx={{
            fontSize:'14px',
            backgroundColor: theme => theme.palette.dangerComponent.main,
            display:'flex',
            alignItems:'center'
            }} variant="filled" severity="error">
            Usuário ou Senha errados.
            <br/>
            Tente novamente.
          </Alert>
        </Stack>
      )
      }
      

      </Box>
    </div>
  )
}