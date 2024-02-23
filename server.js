const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.send('Server is up and running!');
});


app.post('/api/moderation/predict', async (req, res) => {
  try {
    const { text, language } = req.body;
    const response = await axios.get('https://moderation.logora.fr/predict', {
      params: { text, language }
    });
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.post('/api/moderation/score', async (req, res) => {
  try {
    const { text, language } = req.body;
    const response = await axios.get('https://moderation.logora.fr/score', {
      params: { text, language }
    });
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
