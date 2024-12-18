const express = require('express');
const { Client, LocalAuth } = require('whatsapp-web.js');

const app = express();
const port = process.env.PORT || 3000;

// Serve static files
app.use(express.static('public'));

// Endpoint para conectar ao WhatsApp e gerar o QR Code
app.get('/qr-code', (req, res) => {
  const client = new Client({
    authStrategy: new LocalAuth()  // Auth using local storage for the session
  });

  client.on('qr', (qr) => {
    res.send(qr);  // Send the QR code to the frontend
  });

  client.on('ready', () => {
    console.log('Bot is ready');
  });

  client.initialize();
});

// Endpoint para enviar mensagem
app.post('/api/send-message', express.json(), async (req, res) => {
  const { to, message } = req.body;

  try {
    const client = new Client({
      authStrategy: new LocalAuth()  // Ensure you use the same client instance
    });

    await client.initialize();
    await client.sendMessage(to, message);
    res.sendStatus(200);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
