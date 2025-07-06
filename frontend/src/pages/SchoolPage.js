import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { TextField, Button } from '@mui/material';
import axios from 'axios';

export default function SchoolPage() {
  const [schools, setSchools] = useState([]);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    axios.get('/schools', {
      headers: { Authorization: localStorage.getItem('token') }
    }).then(res => setSchools(res.data));
  }, []);

  const onSubmit = () => {
    axios.post('/schools', {
      name, address, contact,
      location: { type: 'Point', coordinates: [selected.lng, selected.lat] }
    }, {
      headers: { Authorization: localStorage.getItem('token') }
    }).then(res => setSchools([...schools, res.data]));
  };

  return (
    <>
      <MapContainer center={[21.1458,79.0882]} zoom={5} style={{ height: 300, width: '100%' }}
        onclick={e => setSelected(e.latlng)}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
        {selected && <Marker position={selected} />}
      </MapContainer>
      <TextField label="School Name" value={name} onChange={e => setName(e.target.value)} fullWidth/>
      <TextField label="Address" value={address} onChange={e => setAddress(e.target.value)} fullWidth/>
      <TextField label="Contact" value={contact} onChange={e => setContact(e.target.value)} fullWidth/>
      <Button variant="contained" onClick={onSubmit}>Save School</Button>
      <pre>{JSON.stringify(schools, null, 2)}</pre>
    </>
  );
}
