const styles = {
  accordionContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '24px',
  },
  divider: {
    width: '80%',
    marginTop: '16px',
  },
  accordion: {
    width: '80%',
    background: '#FFFFFF',
    boxShadow: 'none',
  },
  title: {
    color: '#8A0538',
    fontWeight: '600',
  },
  accordionDetails: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  graphSectionContainer: {
    flex: 2, // 2/3 do espaço
    display: 'flex',
    flexDirection: 'column',
    background: 'rgba(217, 217, 217, 0.85)', 
    borderRadius: 8,
    padding: '16px',
    margin: '0 8px',
  },
  legendSectionContainer: {
    flex: 1, // 1/3 do espaço
    display: 'flex',
    flexDirection: 'column',
    background: 'rgba(217, 217, 217, 0.85)', 
    borderRadius: 8,
    padding: '16px',
    margin: '0 8px',
  },
  sectionTitle: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '16px',
    fontWeight: '600',
  }
};

export default styles;
