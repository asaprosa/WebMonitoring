"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const Monitor_1 = __importDefault(require("../models/Monitor"));
// Other imports...
mongoose_1.default.set('strictQuery', true); // or false, depending on your preference
dotenv_1.default.config();
const app = (0, express_1.default)();
exports.app = app;
const PORT = process.env.PORT || 5000;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// MongoDB Connection
mongoose_1.default.connect(process.env.MONGO_URI)
    .then(() => {
    console.log('MongoDB connected successfully');
})
    .catch(err => {
    console.error('MongoDB connection error:', err);
});
// Sample endpoint to fetch monitors
app.get('/monitors', async (req, res) => {
    try {
        const monitors = await Monitor_1.default.find();
        res.json(monitors);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching monitors' });
    }
});
// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
