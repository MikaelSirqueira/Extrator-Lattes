import { Box, Button, Divider, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export function AboutPage() {
  const navigate = useNavigate()

  return (
    <Box component='main' 
      px={'2.5rem'} 
      display={'flex'} 
      flexDirection={'column'} 
      rowGap={2}
      pb={3}
      pt={2}
    >
      <Box id="about" component={'section'} maxWidth={'780px'} pb={2} >
        <Typography variant="h2" color='secondary.dark' pb={2}>Sobre o sistema</Typography>
        
        <Typography variant="body1" color='secondary.light'>
          O sistema desenvolvido auxilia professores e pesquisadores na análise dos dados de seus respectivos currículos Lattes em comparação com os dados do currículo de qualquer outro pesquisador ativo no Brasil. Além disso, os usuários também podem consultar as informações dos seus respectivos Programas de Pós-Graduação e compará-las com outros programas existentes no país.
         
          <br />
          <br />
          O objetivo da aplicação é gerar gráficos, dashboards e tabelas que auxiliem o usuário a obter conclusões produtivas com base nos dados extraídos.

          <br />
          <br />
          Os dados dos pesquisadores e dos programas são extraídos diretamente da base de dados do CAPES.
        </Typography>
      </Box>

      <Divider aria-hidden="true"/>

      <Box id="guide" component={'section'} maxWidth={'780px'} pb={2}>
        <Typography variant="h2" color='secondary.dark' pb={2}>Manual de uso</Typography>
        
        <Typography variant="body1" color='secondary.light'>
          Na tela inicial do extrator, selecione se deseja extrair os dados de pesquisadores ou de programas de Pós-Graduação.
        
          <br />
          <br />
          Depois disso, digite os nomes dos pesquisadores ou programas desejados e clique em “Extrair”.
        
          <br />
          <br />
          Por último, você tem a opção de visualizar os dados por seções e, para visualizá-los, basta clicar em cima da seção desejada.
        
          <br />
          <br />
          Além disso, durante a navegação do sistema você tem a opção de aumentar ou diminuir o tamanho das fontes para melhor visualização das informações.
        
          <br />
          <br />
          Caso deseje, você pode salvar os resultados de inúmeras pesquisas. Esses registros estarão disponíveis na tela inicial do extrator, sob o tópico “Pesquisas Salvas”.
        </Typography>
      </Box>

      <Box sx={{display: 'flex', gap: 3}}>
        <Button 
          variant="outlined" 
          size="large" 
          sx={{borderRadius: 24, textTransform: 'none'}}
        >
          Voltar
        </Button>
        <Button 
          variant='contained' 
          color="primary" 
          size="large"
          sx={{borderRadius: 24, textTransform: 'none'} }      
          onClick={() => navigate('/extract')}    
        >
          Extrair
        </Button>
      </Box>
    </Box>
  )
}
