import { useEffect, useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, List, ListItem, Typography } from '@mui/material';

export default function InspectorPage() {
  const [inspectors, setInspectors] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', phone: '', designation: '' });

  const loadInspectors = () => {
    axios.get('http://localhost:5000/inspectors', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).then(res => setInspectors(res.data));
  };

  useEffect(() => loadInspectors(), []);

  const handleSubmit = async () => {
    await axios.post('http://localhost:5000/inspectors', { ...form, role: 'inspector' }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    loadInspectors();
  };

  return (
    <Container>
      <Typography variant="h5">Add Inspector</Typography>
      {['name', 'email', 'phone', 'designation'].map(key => (
        <TextField key={key} fullWidth label={key} onChange={e => setForm({ ...form, [key]: e.target.value })} />
      ))}
      <Button onClick={handleSubmit}>Add</Button>
      <List>{inspectors.map(i => <ListItem key={i._id}>{i.name} ({i.email})</ListItem>)}</List>
    </Container>
  );
}
