import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3060;

// Middleware בסיסי
app.use(cors());
app.use(express.json());

// נתיב פשוט לבדיקה
app.get('/health', (req, res) => {
    res.json({
        status: 'success',
        message: 'Server is running!',
        timestamp: new Date().toISOString()
    });
});

// נתיב API בסיסי
app.get('/api/test', (req, res) => {
    res.json({
        message: 'API is working!',
        data: { test: true }
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📚 Health check: http://localhost:${PORT}/health`);
});
