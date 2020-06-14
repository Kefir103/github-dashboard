const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '50mb' }));
app.use(express.static('build'));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile('/build/index.html');
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
