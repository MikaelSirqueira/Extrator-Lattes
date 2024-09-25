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

  return (
    <>
      <Card 
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
        <IconButton onClick={zoomOut} sx={{textTransform: 'none', color:"secondary.dark"}} >
         <TextDecreaseRoundedIcon sx={{fontSize:"large"}} />
        </IconButton>
        <Slider
          value={fontSizeFactor * 100}
          valueLabelDisplay="auto"
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
        <IconButton onClick={zoomIn} sx={{textTransform: 'none', color:"secondary.dark"}} >
         <TextIncreaseRoundedIcon sx={{fontSize:"large"}} />
        </IconButton>
      </Card>
    </>
  )
}