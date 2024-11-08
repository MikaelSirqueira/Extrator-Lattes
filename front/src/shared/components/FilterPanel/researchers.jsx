import React from 'react';
import { Autocomplete, InputAdornment, TextField } from "@mui/material";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import TodayIcon from '@mui/icons-material/Today';
import EventIcon from '@mui/icons-material/Event';

export function ResearchersSection(props) {
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row', gap: 16 }}>
        <Autocomplete
            fullWidth
            options={props.colleges}
            onInputChange={(event, newInputValue) => {
                props.setCollegeName1(newInputValue);
                props.setResearcherName1('');
            }}
            renderInput={(params) => (
                <TextField
                {...params}
                placeholder="Ex: Pontifícia Universidade Católica do Paraná"    
                fullWidth
                InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                    <InputAdornment position="start">
                        <PersonOutlineIcon />
                    </InputAdornment>
                    ),
                }}
                sx={{
                    '& .MuiFormHelperText-root': { ml: '0', fontSize: 13, color: 'secondary.dark' },
                    '& .MuiInputBase-root': { backgroundColor: '#FFF' },
                }}
                helperText={`Insira o nome da instituição do primeiro pesquisador`}
                />
            )}
            getOptionLabel={(option) => option}
        />
         <Autocomplete
            fullWidth
            options={props.optionsToResearchers1}
            value={props.researcherName1} 
            onInputChange={(event, newInputValue) => {
                props.setResearcherName1(newInputValue);
            }}
            renderInput={(params) => (
                <TextField
                {...params}
                placeholder="Nome do Primeiro Pesquisador"
                fullWidth
                InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                    <InputAdornment position="start">
                        <PersonOutlineIcon />
                    </InputAdornment>
                    ),
                }}
                sx={{
                    '& .MuiFormHelperText-root': { ml: '0', fontSize: 13, color: 'secondary.dark' },
                    '& .MuiInputBase-root': { backgroundColor: '#FFF' },
                }}
                helperText={`Insira o nome completo do primeiro pesquisador`}
                />
            )}
            getOptionLabel={(option) => option}
        />
        
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', gap: 16 }}>
        <Autocomplete    
          fullWidth
          options={props.colleges}
          onInputChange={(event, newInputValue) => {
            props.setCollegeName2(newInputValue);
            props.setResearcherName2('');
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Ex: Universidade de Brasília" 
              fullWidth
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonOutlineIcon />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiFormHelperText-root': { ml: '0', fontSize: 13, color: 'secondary.dark' },
                '& .MuiInputBase-root': { backgroundColor: '#FFF' },
              }}
              helperText={`Insira o nome da instituição do segundo pesquisador`}
            />
            )}
          getOptionLabel={(option) => option}
        />
       
        <Autocomplete
          fullWidth
          options={props.optionsToResearchers2}
          value={props.researcherName2}
          onInputChange={(event, newInputValue) => {
            props.setResearcherName2(newInputValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Nome do Segundo Pesquisador"
              fullWidth
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonOutlineIcon />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiFormHelperText-root': { ml: '0', fontSize: 13, color: 'secondary.dark' },
                '& .MuiInputBase-root': { backgroundColor: '#FFF' },
              }}
              helperText={`Insira o nome completo do segundo pesquisador`}
            />
          )}
          getOptionLabel={(option) => option}
        />
      </div>

      {/* Datas */}
      <div style={{ display: 'flex', gap: 16 }}>
        <TextField
          placeholder="Ex: 2010"
          value={props.beginYear}
          onChange={(e) => props.setBeginYear(e.target.value)}
          fullWidth
          helperText='* Insira o ano inicial do filtro'
          sx={{
            '& .MuiFormHelperText-root': { ml: '0', fontSize: 13, color: 'secondary.dark' },
            '& .MuiInputBase-root': { backgroundColor: '#FFF' }
          }}
          InputProps={{ startAdornment: ( 
              <InputAdornment position="start">
                <TodayIcon />
              </InputAdornment>
            ),
          }}
          
        />
        <TextField
          placeholder="Ex: 2022"
          value={props.endYear}
          onChange={(e) => props.setEndYear(e.target.value)}
          fullWidth
          helperText='* Insira o ano final do filtro'
          sx={{
            '& .MuiFormHelperText-root': { ml: '0', fontSize: 13, color: 'secondary.dark' },
            '& .MuiInputBase-root': { backgroundColor: '#FFF' }
          }}
          InputProps={{ startAdornment: ( 
            <InputAdornment position="start">
              <EventIcon />
            </InputAdornment>
          ),
        }}
        />
      </div>
    </>
  );
}
