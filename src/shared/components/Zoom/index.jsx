import { Box, Button, Card, IconButton, Slider } from "@mui/material";
import TextDecreaseRoundedIcon from '@mui/icons-material/TextDecreaseRounded';
import TextIncreaseRoundedIcon from '@mui/icons-material/TextIncreaseRounded';

export function Zoom() {
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
        <IconButton  sx={{textTransform: 'none', color:"secondary.dark", marginRight: '6px'}} >
         <TextDecreaseRoundedIcon sx={{fontSize:"large"}} />
        </IconButton>
        <Slider
          valueLabelDisplay="auto"
          min={0}
          max={5}
          sx={{ width: '60px', 
            '& .MuiSlider-rail': {
              opacity: 1,
              height: 3,             
            },
            '& .MuiSlider-valueLabel': { display: 'none' },


          }}
        />
        <IconButton 
          sx={{textTransform: 'none', color:"secondary.dark"}}          
        >
         <TextIncreaseRoundedIcon sx={{fontSize:"large"}} />
        </IconButton>
      </Card>
    </>
  )
}