const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const os = require('os');
const dns = require('dns');

// Load environment variables
dotenv.config();

// Import route files
const articleRoutes = require('./routes/articleroute');
const topicRoutes = require('./routes/topicroute');
const bookRoutes = require('./routes/bookRoutes');
const postRoutes = require('./routes/postRoutes');
const viewRoutes = require('./routes/viewRoutes');
const writerRoutes = require('./routes/writerRoutes');
const ipCheckRoutes = require('./routes/testroute');
const Newarticle = require('./routes/newarticlesroute')


//Post Articles
const postArticle = require('./routes/postarticle');

// Initialize express app
const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'frontend')));

// Route for IP check
app.use('/test', ipCheckRoutes);

// Mount API routes
app.use('/api/articles', articleRoutes);
app.use('/api/topic', topicRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/views', viewRoutes);
app.use('/api/writers', writerRoutes);
app.use('/api/newarticle', Newarticle);


//Post article
app.use('/api/postarticle', postArticle);

// IP lookup log
dns.lookup(os.hostname(), (err, address) => {
  if (err) {
    console.error('❌ Failed to get server IP address:', err.message);
  } else {
    console.log(`🖥️  Server is running from IP: ${address}`);
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
