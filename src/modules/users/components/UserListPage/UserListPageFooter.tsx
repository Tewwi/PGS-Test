import { Button, Modal, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

interface Props {
  btnDisable: boolean;
  handleRemovebtn(): void;
}

const UserListPageFooter = (props: Props) => {
  const { btnDisable, handleRemovebtn } = props;
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  return (
    <div
      style={{
        display: 'flex',
        position: 'fixed',
        width: '60%',
        height: '50px',
        backgroundColor: '#323259',
        bottom: 0,
        left: 0,
        right: 0,
        margin: '0 auto',
        boxShadow: '1px 1px 10px 10px #b18aff',
        borderRadius: '3px',
        zIndex: '1',
      }}
    >
      <Button
        variant="contained"
        disabled={btnDisable}
        style={{ maxWidth: '120px', maxHeight: '35px', minWidth: '120px', minHeight: '35px' }}
        sx={{
          padding: '10px',
          backgroundColor: '#efa945',
          '&: hover': {
            backgroundColor: '#efa945',
            color: 'black',
          },
          alignSelf: 'center',
          marginLeft: '20px',
          textTransform: 'none',
        }}
        onClick={() => setIsModalOpen(true)}
      >
        <Typography sx={{ fontSize: '13px' }} noWrap>
          Remove
        </Typography>
      </Button>
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="modal_content" style={{ backgroundColor: '#323259' }}>
          <div style={{ display: 'flex', color: 'white', borderBottom: '1px solid black' }}>
            <Typography variant="h6" style={{ margin: '15px' }}>
              Confirm Delete
            </Typography>
          </div>
          <div style={{ display: 'flex', color: 'white', marginBottom: '20px', borderBottom: '1px solid black' }}>
            <Typography style={{ margin: '20px 15px' }}>Do you want to delete this product?</Typography>
          </div>
          <div style={{ display: 'flex', color: 'white', justifyContent: 'space-between', margin: '0px 40px' }}>
            <Button
              variant="contained"
              sx={{ color: 'white', backgroundColor: '#a16eff' }}
              onClick={() => {
                handleRemovebtn();
                setIsModalOpen(false);
              }}
            >
              Yes
            </Button>
            <Button
              variant="contained"
              sx={{ color: 'white', backgroundColor: '#ff3d71' }}
              onClick={() => setIsModalOpen(false)}
            >
              No
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default UserListPageFooter;
