import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Grid, Container } from '@mui/material';

export default function DashboardPage() {
  const [summary, setSummary] = useState({});
  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:5000/dashboard/summary', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setSummary(res.data));
  }, []);

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={4}><Card><CardContent><Typography>Inspections</Typography><Typography>{summary.count}</Typography></CardContent></Card></Grid>
        <Grid item xs={4}><Card><CardContent><Typography>Avg Rating</Typography><Typography>{summary.avgRating}</Typography></CardContent></Card></Grid>
        <Grid item xs={4}><Card><CardContent><Typography>Top Inspector</Typography><Typography>{summary?.topInspector?.id}</Typography></CardContent></Card></Grid>
      </Grid>
    </Container>
  );
}
