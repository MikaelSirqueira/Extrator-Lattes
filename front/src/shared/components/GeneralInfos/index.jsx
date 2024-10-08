import React from 'react';
import { Box, Divider } from '@mui/material';
import { CardResult } from './CardResult';
import styles from './styles';

export function GeneralInfos({ name1, name2, infos }) {
  return (
    <>
      <Box sx={styles.container}>
        <CardResult
          name={name1}
          idLattes={infos[0]?.id} // Adicionando o ID Lattes do primeiro pesquisador
          program={infos[0]?.ppg} // Adicionando o PPG do primeiro pesquisador
          college={infos[0]?.college} // Adicionando a Instituição do primeiro pesquisador
          area_avaliacao={infos[0]?.area_avaliacao} // Adicionando a Área de Avaliação do primeiro pesquisador
          nota={infos[0]?.nota} // Adicionando a Nota do primeiro pesquisador
          categoria={infos[0]?.Categoria} // Adicionando a Categoria do primeiro pesquisador
        />
        <CardResult
          name={name2}
          idLattes={infos[1]?.id} // Adicionando o ID Lattes do segundo pesquisador
          program={infos[1]?.ppg} // Adicionando o PPG do segundo pesquisador
          college={infos[1]?.college} // Adicionando a Instituição do segundo pesquisador
          area_avaliacao={infos[1]?.area_avaliacao} // Adicionando a Área de Avaliação do segundo pesquisador
          nota={infos[1]?.nota} // Adicionando a Nota do segundo pesquisador
          categoria={infos[1]?.Categoria} // Adicionando a Categoria do segundo pesquisador
        />
      </Box>
      <Divider sx={styles.divider} aria-hidden="true" />
    </>
  );
}
