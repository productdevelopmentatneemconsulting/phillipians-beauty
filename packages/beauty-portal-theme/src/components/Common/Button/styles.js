export default theme => ({
  PrimaryButton: {
    fontSize: '1.125rem',
    fontWeight: 700,
    width: 160,
    height: 40,
    marginLeft: -1,
    cursor: 'pointer',
    backgroundColor: theme.palette.primary.main,
    border: `1px solid ${theme.palette.primary.main}`,
    color: theme.palette.common.white,
    position: 'relative',
    transform: 'perspective(1px) translateZ(0)',
    '&:before': {
      content: '""',
      position: 'absolute',
      zIndex: -1,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: theme.palette.common.black,
      transform: 'scaleX(0)',
      transformOrigin: '0 50%',
      transitionProperty: 'transform',
      transitionDuration: '0.3s',
      transitionTimingFunction: 'ease-out',
    },
    '&:hover': {
      borderColor: theme.palette.common.black,
      '&:before': {
        transform: 'scaleX(1)',
      },
    },
  },
  SecondaryButton: {
    fontSize: '1.125rem',
    fontWeight: 700,
    width: 160,
    height: 40,
    marginLeft: -1,
    cursor: 'pointer',
    backgroundColor: theme.palette.common.black,
    border: `1px solid ${theme.palette.common.black}`,
    color: theme.palette.common.white,
    position: 'relative',
    transform: 'perspective(1px) translateZ(0)',
    '&:before': {
      content: '""',
      position: 'absolute',
      zIndex: -1,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: theme.palette.primary.main,
      transform: 'scaleX(0)',
      transformOrigin: '0 50%',
      transitionProperty: 'transform',
      transitionDuration: '0.3s',
      transitionTimingFunction: 'ease-out',
    },
    '&:hover': {
      borderColor: theme.palette.primary.main,
      '&:before': {
        transform: 'scaleX(1)',
      },
    },
  },
});