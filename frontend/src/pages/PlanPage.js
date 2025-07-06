import { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container } from '@mui/material';

export default function PlanPage() {
  const [date, setDate] = useState('');
  const [schoolId, setSchoolId] = useState('');
  const [inspectors, setInspectors] = useState('');

  const createPlan = async () => {
    await axios.post('http://localhost:5000/plans', {
      school: schoolId,
      date,
      inspectors: inspectors.split(',') // comma-separated IDs
    }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    alert('Plan created');
  };

  return (
    <Container>
      <TextField label="School ID" fullWidth value={schoolId} onChange={e => setSchoolId(e.target.value)} />
      <TextField label="Date" fullWidth type="date" onChange={e => setDate(e.target.value)} />
      <TextField label="Inspector IDs (comma separated)" fullWidth onChange={e => setInspectors(e.target.value)} />
      <Button onClick={createPlan}>Create Plan</Button>
    </Container>
  );
}
