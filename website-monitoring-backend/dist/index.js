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
const monitorRoutes_1 = __importDefault(require("./routes/monitorRoutes")); // Import your routes
require("./schedular");
// Other imports...
mongoose_1.default.set('strictQuery', true); // or false, depending on your preference
dotenv_1.default.config();
const app = (0, express_1.default)();
exports.app = app;
const PORT = process.env.PORT || 5000;
app.use((0, cors_1.default)({
    origin: 'http://localhost:3000',
    credentials: true,
}));
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
// Register the monitor routes
app.use('/monitors', monitorRoutes_1.default); // This registers your /monitors route
// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
