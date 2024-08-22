import shadows from "@mui/material/styles/shadows";

const styles = {
    container: {
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      overflow: 'hidden',
    },
    image: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      filter: 'brightness(60%)'
    },
    content: {
      position: 'relative',
      borderRadius: 3,
      padding: '2rem',
      margin: '1.25rem',
      maxWidth: '970px',
      textAlign: 'center',  
  
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '2rem',
    },
    title: {
      fontWeight: '700',
      fontSize: "5rem",
    },
    text: {
      fontSize: '24px', 
      lineHeight: '1.6', 
      fontWeight: '400',
  
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '40px',
    },
    button: {    
      borderRadius: '24px',
      textTransform: 'none',
    },
  };
  
  export default styles; 