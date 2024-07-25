const commonContainerStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  borderRadius: 8,
  padding: '16px',
  margin: '0 8px',
  height: '305px',
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '24px',
    gap: '64px',
  },
  graphSectionContainer: {
    ...commonContainerStyles,
    flex: 2,
    width: '530px',
  },
  legendSectionContainer: {
    ...commonContainerStyles,
    flex: 1,
    width: '280px',
  },
  sectionTitle: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '16px',
    fontWeight: '600',
  }
};

export default styles;
