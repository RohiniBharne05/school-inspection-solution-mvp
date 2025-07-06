import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container, TextField, Button, List, ListItem, ListItemText, IconButton, Typography
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function ChecklistPage() {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState('');

  const loadItems = async () => {
    const res = await axios.get('http://localhost:5000/checklists');
    setItems(res.data);
  };

  useEffect(() => {
    loadItems();
  }, []);

  const addItem = async () => {
    if (!title.trim()) return;
    await axios.post('http://localhost:5000/checklists', { title });
    setTitle('');
    loadItems();
  };

  const deleteItem = async (id) => {
    await axios.delete(`http://localhost:5000/checklists/${id}`);
    loadItems();
  };

  return (
    <Container>
      <Typography variant="h5" gutterBottom>Manage Checklist</Typography>
      <TextField
        label="New Checklist Item"
        value={title}
        onChange={e => setTitle(e.target.value)}
        fullWidth
      />
      <Button onClick={addItem} variant="contained" sx={{ mt: 2 }}>Add</Button>

      <List>
        {items.map(item => (
          <ListItem key={item._id}
            secondaryAction={
              <IconButton onClick={() => deleteItem(item._id)} edge="end">
                <DeleteIcon />
              </IconButton>
            }>
            <ListItemText primary={item.title} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}
