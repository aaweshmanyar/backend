const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const articleRoutes = require('./routes/articleroute');
const bookRoutes = require('./routes/bookRoutes');
const postRoutes = require('./routes/postRoutes');
const viewRoutes = require('./routes/viewRoutes');
const writerRoutes = require('./routes/writerRoutes');
const path = require('path');
const os = require('os');
const dns = require('dns');
const ipCheckRoutes = require('./routes/testroute');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'frontend')));
app.use('/test', ipCheckRoutes);



dns.lookup(os.hostname(), (err, address) => {
  console.log('Server is running from IP:', address);
});
// Route Mounts
app.use('/api/articles', articleRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/views', viewRoutes);
app.use('/api/writers', writerRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
