const express = require('express');
const path = require('path');
const fallback = require('express-history-api-fallback');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '50mb' }));
app.use(express.static('build'));
app.use(express.static('public'));
app.use(fallback('index.html', { root: path.join(__dirname, 'build') }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
