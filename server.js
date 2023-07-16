require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const server = require('http').createServer(app);

const { Contact } = require('./models');


// Middleware for parsing JSON request body
app.use(express.json());


app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

app.get('/contacts', async (req, res) => {
    try {
        const contacts = await Contact.findAll();
        res.json(contacts);
    } catch (error) {
        console.error('Error fetching contacts:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.use((req, res, next) => {
    const err = new ApiError(404, 'Not Found', 'Resource Not Found!');
    next(err);
});

server.listen(port, () => {
    console.log(`Express server listening on port ${port}`);
});

module.exports = app;