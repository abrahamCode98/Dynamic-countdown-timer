import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
const app = express();


const __filename = fileURLToPath(import.meta.url);
const __dirname =  path.dirname(__filename);

// Middleware to serve static files
app.use(express.static('public'));

// Set up the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Calculate the time difference to the next New Year
function displayTimeToNewYear() {
    const presentDate = new Date();
    const getCurrentYear = presentDate.getFullYear();
    const nextYear = new Date(`January 1, ${getCurrentYear + 1} 00:00:00`);
    const timeDiff = nextYear - presentDate;

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
}

// Route to render the countdown
app.get('/', (req, res) => {
    const timeToNewYear = displayTimeToNewYear();
    res.render('index', { timeToNewYear });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});



