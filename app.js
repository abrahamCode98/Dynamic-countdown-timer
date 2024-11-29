import express from 'express'; // Import Express.js framework
import path from 'path'; // Import the 'path' module for handling file and directory paths
import { fileURLToPath } from 'url'; // Import 'fileURLToPath' to get the current file's path when using ES modules

const app = express();
const PORT = 3000; // Define the port the server will listen on


const __filename = fileURLToPath(import.meta.url);
const __dirname =  path.dirname(__filename);

// Serve static files using a middleware
app.use(express.static(path.join(__dirname, 'public')));

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


// Define the route to render the countdown
app.get('/', (req, res) => {
    const timeToNewYear = displayTimeToNewYear();
    res.render('index', { timeToNewYear });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});



