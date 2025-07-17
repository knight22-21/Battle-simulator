const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Example API route
app.post('/api/simulate', (req, res) => {
  const { scenario, weapons, targets } = req.body;

  // You will later implement your simulate logic here
  const result = { success: true, message: 'Simulation done!' };

  res.json(result);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
