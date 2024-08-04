import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';
import { firestore } from '../lib/firebase';
import { Box, Button, AppBar, Toolbar, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { collection, doc, getDocs, query, setDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import LogoutIcon from '@mui/icons-material/Logout';
import AddItemModal from '../components/AddItemModal';
import UpdateItemModal from '../components/UpdateItemModal';
import DeleteItemModal from '../components/DeleteItemModal';

const categories = [
  'All',
  'Vegetables',
  'Fruits',
  'Dairy',
  'Meat',
  'Seafood',
  'Grains',
  'Snacks',
  'Beverages',
  'Condiments',
  'Other'
];

export default function Home() {
  const { currentUser, logout } = useAuth();
  const router = useRouter();

  const [inventory, setInventory] = useState<any[]>([]);
  const [filteredInventory, setFilteredInventory] = useState<any[]>([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (currentUser) {
      updateInventory();
    } else {
      router.push('/login');
    }
  }, [currentUser, router]);

  useEffect(() => {
    filterInventory();
  }, [selectedCategory, searchQuery, inventory]);

  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);

  const handleOpenUpdate = (item: any) => {
    setSelectedItem(item);
    setOpenUpdate(true);
  };
  const handleCloseUpdate = () => setOpenUpdate(false);

  const handleOpenDelete = (item: any) => {
    setSelectedItem(item);
    setOpenDelete(true);
  };
  const handleCloseDelete = () => setOpenDelete(false);

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, 'inventory'));
    const docs = await getDocs(snapshot);
    const inventoryList: any[] = [];
    docs.forEach((doc) => {
      inventoryList.push({ name: doc.id, ...doc.data() });
    });
    setInventory(inventoryList);
    filterInventory(inventoryList, selectedCategory, searchQuery);
  };

  const filterInventory = (inventoryList = inventory, category = selectedCategory, query = searchQuery) => {
    let filteredList = inventoryList;

    if (category !== 'All') {
      filteredList = filteredList.filter(item => item.category === category);
    }

    if (query) {
      const lowercasedQuery = query.toLowerCase();
      filteredList = filteredList.filter(
        item =>
          item.name.toLowerCase().includes(lowercasedQuery) ||
          item.category.toLowerCase().includes(lowercasedQuery)
      );
    }

    setFilteredInventory(filteredList);
  };

  const addItem = async (name: string, quantity: number, category: string) => {
    const docRef = doc(collection(firestore, 'inventory'), name);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { quantity: existingQuantity } = docSnap.data();
      await setDoc(docRef, { quantity: existingQuantity + quantity, category });
    } else {
      await setDoc(docRef, { quantity, category });
    }
    await updateInventory();
  };

  const updateItem = async (name: string, quantity: number, category: string) => {
    const docRef = doc(collection(firestore, 'inventory'), name);
    await setDoc(docRef, { quantity, category });
    await updateInventory();
  };

  const deleteItem = async () => {
    if (selectedItem) {
      const docRef = doc(collection(firestore, 'inventory'), selectedItem.name);
      await deleteDoc(docRef);
      await updateInventory();
      handleCloseDelete();
    }
  };

  if (!currentUser) return <div>Loading...</div>;

  return (
    <Box
      width="100vw"
      height="100vh"
      display={'flex'}
      flexDirection={'column'}
      alignItems={'center'}
      bgcolor={'#121212'}
      color={'#e0e0e0'}
      padding={3}
    >
      <AppBar position="static" sx={{ background: '#1e1e1e' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Pantry Tracker
          </Typography>
          <IconButton edge="end" color="inherit" onClick={logout}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        width="100%"
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        mt={4}
        gap={2}
        >
        <FormControl sx={{ minWidth: 200 }}>
            <InputLabel style={{ color: '#e0e0e0' }}>Category</InputLabel>
            <Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as string)}
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
        <TextField
            variant="outlined"
            placeholder="Search by item name"
            fullWidth
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputLabelProps={{ style: { color: '#e0e0e0' } }}
            InputProps={{
            style: { color: '#e0e0e0' },
            sx: { '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e0e0e0' } },
            }}
        />
        <Button variant="contained" onClick={handleOpenAdd}>
            Add New Item
        </Button>
      </Box>
      <TableContainer component={Paper} sx={{ mt: 4, backgroundColor: '#1e1e1e', color: '#e0e0e0' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ color: '#e0e0e0' }}>Item</TableCell>
              <TableCell style={{ color: '#e0e0e0' }} align="right">Quantity</TableCell>
              <TableCell style={{ color: '#e0e0e0' }} align="right">Category</TableCell>
              <TableCell style={{ color: '#e0e0e0' }} align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredInventory.map((item) => (
              <TableRow key={item.name}>
                <TableCell style={{ color: '#e0e0e0' }} component="th" scope="row">
                  {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                </TableCell>
                <TableCell style={{ color: '#e0e0e0' }} align="right">{item.quantity}</TableCell>
                <TableCell style={{ color: '#e0e0e0' }} align="right">{item.category}</TableCell>
                <TableCell style={{ color: '#e0e0e0' }} align="right">
                  <Button variant="contained" color="primary" onClick={() => handleOpenUpdate(item)}>
                    Update
                  </Button>
                  <Button variant="contained" color="error" onClick={() => handleOpenDelete(item)} sx={{ ml: 2 }}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <AddItemModal open={openAdd} onClose={handleCloseAdd} onAdd={addItem} />
      {selectedItem && (
        <UpdateItemModal
          open={openUpdate}
          onClose={handleCloseUpdate}
          onUpdate={updateItem}
          item={selectedItem}
        />
      )}
      {selectedItem && (
        <DeleteItemModal
          open={openDelete}
          onClose={handleCloseDelete}
          onDelete={deleteItem}
          item={selectedItem}
        />
      )}
    </Box>
  );
}