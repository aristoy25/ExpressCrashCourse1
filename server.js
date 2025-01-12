import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import posts from './routes/posts.js';
import logger from './middleware/logger.js';
import notFound from './middleware/notFound.js';
import errorHandler from './middleware/error.js';

const PORT = process.env.PORT || 8000;

const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Logger middleware
app.use(logger);

//const __dirname = path.dirname(fileURLToPath(import.meta.url));
// Set a static folder
// app.use(express.static(path.join(__dirname, 'public')));
    app.use('/api/posts', posts);
    app.use('/api/posts/:id', posts);
    // Handle 404 errors
    app.use(notFound);
    app.use(errorHandler);

    app.listen(PORT, () => console.log(`Server is running on port http://localhost:${PORT}`));
