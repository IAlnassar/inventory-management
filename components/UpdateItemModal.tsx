import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, TextField, Typography } from '@mui/material';
import { useState, useEffect } from 'react';

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

const categories = [
  'Electronics',
  'Furniture',
  'Clothing',
  'Toys',
  'Books',
  'Kitchen',
  'Tools',
  'Sports',
  'Office Supplies',
  'Food',
  'Other'
];

export default function UpdateItemModal({ open, onClose, onUpdate, item }: { open: boolean, onClose: () => void, onUpdate: (name: string, quantity: number, category: string) => void, item: any }) {
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    if (item) {
      setItemName(item.name);
      setQuantity(item.quantity.toString());
      setCategory(item.category);
    }
  }, [item]);

  const handleUpdate = () => {
    onUpdate(itemName, parseInt(quantity, 10), category);
    setItemName('');
    setQuantity('');
    setCategory('');
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Update Item
        </Typography>
        <TextField
          id="item-name-update"
          label="Item"
          variant="outlined"
          fullWidth
          value={itemName}
          disabled
          InputLabelProps={{ style: { color: '#e0e0e0' } }}
          InputProps={{
            style: { color: '#e0e0e0' },
            sx: {
              '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e0e0e0' },
              '& .MuiInputBase-input.Mui-disabled': { WebkitTextFillColor: '#e0e0e0' }, // Ensure disabled text color
            },
          }}
        />
        <TextField
          id="quantity-update"
          label="Quantity"
          type="number"
          variant="outlined"
          fullWidth
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          InputLabelProps={{ style: { color: '#e0e0e0' } }}
          InputProps={{
            style: { color: '#e0e0e0' },
            sx: { '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e0e0e0' } },
          }}
          sx={{ mt: 2 }}
        />
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel style={{ color: '#e0e0e0' }}>Category</InputLabel>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value as string)}
            label="Category"
            sx={{
              color: '#e0e0e0',
              '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e0e0e0' },
              '& .MuiSvgIcon-root': { color: '#e0e0e0' },
            }}
          >
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          variant="outlined"
          onClick={handleUpdate}
          sx={{
            mt: 3,
            color: '#e0e0e0',
            borderColor: '#e0e0e0',
            '&:hover': {
              borderColor: '#e0e0e0',
            },
          }}
        >
          Update
        </Button>
      </Box>
    </Modal>
  );
}
