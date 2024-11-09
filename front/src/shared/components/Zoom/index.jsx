import { useFontSize } from '../../contexts/ThemeContext';
import { Card, IconButton, Slider } from "@mui/material";
import TextDecreaseRoundedIcon from '@mui/icons-material/TextDecreaseRounded';
import TextIncreaseRoundedIcon from '@mui/icons-material/TextIncreaseRounded';

export function Zoom() {
  const { fontSizeFactor, setFontSizeFactor } = useFontSize();

  function zoomIn() {
    if (fontSizeFactor < 2) {
      setFontSizeFactor(prevFactor => prevFactor + 0.25);
    }
  }

  function zoomOut() {
    if (fontSizeFactor > 1) {
      setFontSizeFactor(prevFactor => prevFactor - 0.25);
    }
  }

  function handleSliderChange(event, newValue) {
    setFontSizeFactor(newValue / 100); // Divide por 100 para manter o fator dentro do intervalo desejado
  }

  return (
    <>
      <Card 
        aria-label="Ajuste o tamanho da fonte"
        sx={{ 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'fixed', 
          backgroundColor: 'headerFooterComponent.main',      
          padding: '6px 0',    
          borderRadius: '16px',          
          marginX: 2,
          right: 0, 
          top: '70%', 
        }}
      >      
        <IconButton 
          onClick={zoomOut} 
          sx={{ textTransform: 'none', color:"secondary.dark" }} 
          aria-label="Diminuir tamanho da fonte"
        >
          <TextDecreaseRoundedIcon sx={{ fontSize:"large" }} />
        </IconButton>

        <Slider
          value={fontSizeFactor * 100}
          onChange={handleSliderChange}
          aria-labelledby="font-size-slider"
          min={100}
          max={200} 
          step={25}
          sx={{ 
            width: '60px', 
            marginX: '4px',
            '& .MuiSlider-rail': {
              opacity: 1,
              height: 3,             
            },
            '& .MuiSlider-valueLabel': { display: 'none' },
          }}
        />

        <IconButton 
          onClick={zoomIn} 
          sx={{ textTransform: 'none', color:"secondary.dark" }} 
          aria-label="Aumentar tamanho da fonte"
        >
          <TextIncreaseRoundedIcon sx={{ fontSize:"large" }} />
        </IconButton>
      </Card>
    </>
  );
}
