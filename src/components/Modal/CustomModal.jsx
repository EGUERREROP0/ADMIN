import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import palette from '../../utils/palette';

const CustomModal = ({ show, onHide, title, children }) => (
  <Dialog
    open={show}
    onClose={onHide}
    maxWidth="xs" // Modal más angosto
    fullWidth
    hideBackdrop
    PaperProps={{
      sx: {
        borderRadius: 2,
        boxShadow: '0 8px 32px #b0b8c1cc',
        background: palette.blanco,
        fontFamily: 'Nunito, Arial, sans-serif',
        width: 420,
        maxWidth: '95vw'
      }
    }}
  >
    <DialogTitle
      sx={{
        background: palette.blanco,
        color: palette.celeste,
        fontWeight: 800,
        fontSize: 26,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        pb: 1,
        pt: 2,
        px: 3,
        fontFamily: 'Nunito, Arial, sans-serif',
        letterSpacing: 0.5,
      }}
    >
      <span>{title}</span>
      <IconButton
        aria-label="close"
        onClick={onHide}
        sx={{
          color: palette.celeste,
          ml: 2,
          '&:hover': {
            background: palette.grisClaro,
          }
        }}
      >
        <CloseIcon fontSize="medium" />
      </IconButton>
    </DialogTitle>
    <DialogContent
      sx={{
        px: 3,
        py: 2.5,
        background: palette.blanco,
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
        fontFamily: 'Nunito, Arial, sans-serif',
      }}
    >
      {children}
    </DialogContent>
  </Dialog>
);

export default CustomModal;