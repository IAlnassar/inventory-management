import { Box, Button, Modal, Typography } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#1e1e1e', /* Darker background */
  color: '#e0e0e0', /* Light text color */
  border: '2px solid #333',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: 3,
};

export default function DeleteItemModal({ open, onClose, onDelete, item }: { open: boolean, onClose: () => void, onDelete: () => void, item: any }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Delete Item
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Are you sure you want to delete the item "{item?.name}"?
        </Typography>
        <Box display="flex" justifyContent="space-between" mt={3}>
          <Button
            variant="contained"
            color="secondary"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={onDelete}
          >
            Delete
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
