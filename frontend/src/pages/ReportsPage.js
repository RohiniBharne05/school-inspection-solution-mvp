import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  TextField,
  Button,
  MenuItem,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  Grid,
} from '@mui/material';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

export default function ReportsPage() {
  const [rating, setRating] = useState('');
  const [comments, setComments] = useState('');
  const [files, setFiles] = useState([]);
  const [reports, setReports] = useState([]);

  const [allSchools, setAllSchools] = useState([]);
  const [allInspectors, setAllInspectors] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);

  const [filterSchool, setFilterSchool] = useState('');
  const [filterInspector, setFilterInspector] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/reports')
      .then(res => {
        setReports(res.data);
        setFilteredReports(res.data);
      });

    axios.get('http://localhost:5000/schools').then(res => setAllSchools(res.data));
    axios.get('http://localhost:5000/inspectors').then(res => setAllInspectors(res.data));
  }, []);

  const applyFilters = async () => {
    try {
      const params = {};
      if (filterSchool) params.school = filterSchool;
      if (filterInspector) params.inspector = filterInspector;
      if (fromDate && toDate) {
        params.fromDate = fromDate;
        params.toDate = toDate;
      }
  
      const res = await axios.get('http://localhost:5000/reports', { params });
      setFilteredReports(res.data);
    } catch (err) {
      console.error('Filter fetch failed:', err);
    }
  };  

  const submitReport = async () => {
    const formData = new FormData();
    formData.append('rating', rating);
    formData.append('comments', comments);
    Array.from(files).forEach(f => formData.append('photos', f));

    try {
      await axios.post('http://localhost:5000/reports', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('Uploaded!');
      const res = await axios.get('http://localhost:5000/reports');
      setReports(res.data);
      setFilteredReports(res.data);
      setRating('');
      setComments('');
      setFiles([]);
    } catch (err) {
      console.error('Error uploading:', err);
    }
  };

  const exportToPDF = async () => {
    const input = document.getElementById('reportTable');
    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    pdf.addImage(imgData, 'PNG', 10, 10);
    pdf.save('inspection_reports.pdf');
  };

  const exportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Reports');

    sheet.columns = [
      { header: 'School', key: 'school' },
      { header: 'Inspector', key: 'inspector' },
      { header: 'Date', key: 'date' },
      { header: 'Rating', key: 'rating' },
    ];

    filteredReports.forEach(r => {
      sheet.addRow({
        school: r.school?.name || 'N/A',
        inspector: r.inspector?.name || 'N/A',
        date: new Date(r.date).toLocaleDateString(),
        rating: r.rating
      });
    });

    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([buffer]), 'inspection_reports.xlsx');
  };

  return (
    <Container>
      <Typography variant="h5" gutterBottom>Submit Inspection Report</Typography>
      <TextField fullWidth margin="normal" label="Rating" value={rating} onChange={e => setRating(e.target.value)} />
      <TextField fullWidth margin="normal" label="Comments" value={comments} onChange={e => setComments(e.target.value)} />
      <input type="file" multiple onChange={e => setFiles(e.target.files)} />
      <Button variant="contained" onClick={submitReport}>Upload</Button>

      <Typography variant="h6" sx={{ mt: 4 }}>Filters</Typography>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} sm={4}>
          <TextField
            select fullWidth label="Filter by School" value={filterSchool}
            onChange={e => setFilterSchool(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            {allSchools.map(s => (
              <MenuItem key={s._id} value={s._id}>{s.name}</MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            select fullWidth label="Filter by Inspector" value={filterInspector}
            onChange={e => setFilterInspector(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            {allInspectors.map(i => (
              <MenuItem key={i._id} value={i._id}>{i.name}</MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={6} sm={2}>
          <TextField fullWidth type="date" label="From" InputLabelProps={{ shrink: true }} value={fromDate} onChange={e => setFromDate(e.target.value)} />
        </Grid>
        <Grid item xs={6} sm={2}>
          <TextField fullWidth type="date" label="To" InputLabelProps={{ shrink: true }} value={toDate} onChange={e => setToDate(e.target.value)} />
        </Grid>
      </Grid>
      <Button variant="outlined" onClick={applyFilters}>Apply Filters</Button>

      <Typography variant="h6" sx={{ mt: 3 }}>Reports</Typography>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <Button onClick={exportToPDF}>Export PDF</Button>
        <Button onClick={exportToExcel}>Export Excel</Button>
      </div>

      <TableContainer component={Paper} id="reportTable">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>School</TableCell>
              <TableCell>Inspector</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Rating</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredReports.map(r => (
              <TableRow key={r._id}>
                <TableCell>{r.school?.name || 'N/A'}</TableCell>
                <TableCell>{r.inspector?.name || 'N/A'}</TableCell>
                <TableCell>{new Date(r.date).toLocaleDateString()}</TableCell>
                <TableCell>{r.rating}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
