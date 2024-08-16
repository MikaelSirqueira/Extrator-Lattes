const styles = {
  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '2.5rem',
  },
  imageContainer: {
    flexGrow: 1, 
    display: 'flex', 
    alignItems: 'center' ,
    cursor: 'pointer',
    '&:hover': {
      opacity: 0.8,
    },
  },
  logo: {
    height: '65px',
    marginRight: '20px',
  },
  menuContainer: {
    display: 'flex',
    gap: '16px',
    alignItems: 'center' 
  },
  button: {
    borderRadius: '24px',
    textTransform: 'none',
  },
};

export default styles;