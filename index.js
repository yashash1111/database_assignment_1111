const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3010;

app.use(express.json());

const students = require('./data.json');

app.post('/students/above-threshold', (req, res) => {
  const { threshold } = req.body;

  if (threshold === undefined) {
    return res.status(400).json({ error: 'Threshold is required.' });
  }

  if (typeof threshold !== 'number' || isNaN(threshold)) {
    return res.status(400).json({ error: 'Invalid threshold value. It must be a number.' });
  }

  const filteredStudents = students
    .filter(student => student.total > threshold)
    .map(student => ({
      name: student.name,
      total: student.total
    }));

  const response = {
    count: filteredStudents.length,
    students: filteredStudents
  };

  res.json(response);
});


app.use(express.static('static'));


app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});