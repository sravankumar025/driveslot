const express = require('express');
const app = express();
const vehicleRoutes = require('./routes/vehicleRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const cors = require('cors');
app.use(cors());

app.use(express.json());

// Vehicle routes
app.use('/api', vehicleRoutes);

// Booking routes
app.use('/api', bookingRoutes);
app.use('/api/vehicleTypes', require('./routes/vehicleTypes'));


// Error handling for undefined routes
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});