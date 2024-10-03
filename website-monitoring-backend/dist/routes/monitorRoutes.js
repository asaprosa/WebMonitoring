"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Monitor_1 = __importDefault(require("../models/Monitor"));
const router = express_1.default.Router();
// Add a monitor
router.post('/', async (req, res) => {
    const { url, errorType, email } = req.body;
    try {
        const newMonitor = new Monitor_1.default({ url, errorType, email });
        await newMonitor.save();
        res.status(201).send(newMonitor);
    }
    catch (error) {
        console.error('Error adding monitor:', error);
        res.status(500).send({ error: 'Error creating monitor' });
    }
});
// Fetch all monitors
router.get('/', async (req, res) => {
    try {
        const monitors = await Monitor_1.default.find();
        res.status(200).json(monitors);
    }
    catch (error) {
        console.error('Error fetching monitors:', error);
        res.status(500).send({ error: 'Error fetching monitors' });
    }
});
// Delete a monitor
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const monitor = await Monitor_1.default.findByIdAndDelete(id);
        if (!monitor) {
            return res.status(404).send({ error: 'Monitor not found' });
        }
        res.status(200).send({ message: 'Monitor deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting monitor:', error);
        res.status(500).send({ error: 'Server error. Unable to delete monitor.' });
    }
});
exports.default = router;
