// --- Imports and Configuration ---
require("dotenv").config();
const express = require("express");
const path = require("node:path");
const app = express();
const setupSession = require('./config/session');
const addUserToLocals = require('./middleware/addUserToLocals')

// --- Route Imports ---
const indexRouter = require('./routes/indexRouter');

// --- View Engine Setup ---
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static('public'));


// --- Middleware Setup ---
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
setupSession(app);
app.use(addUserToLocals);

// --- Routes ---
app.use('/', indexRouter)

// --- Server Configuration and Startup ---
const PORT = parseInt(process.env.USE_PORT, 10) || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Visit: http://localhost:${PORT}/`);
});