require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Route Imports
const authRoutes = require('./routes/auth');
const schoolRoutes = require('./routes/schools');
const inspectorRoutes = require('./routes/inspectors');
const reportRoutes = require('./routes/reports');
const planRoutes = require('./routes/plans');
const dashboardRoutes = require('./routes/dashboard');
const checklistRoutes = require('./routes/checklists');
const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log(` MongoDB connected at: ${process.env.MONGO_URI}`))
.catch(err => console.error(' MongoDB connection failed:', err));

// Route Handlers
app.use('/auth', authRoutes);
app.use('/schools', schoolRoutes);
app.use('/inspectors', inspectorRoutes);
app.use('/reports', reportRoutes);
app.use('/plans', planRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/checklists', checklistRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
