import express from 'express';
import MonitorModel from '../models/Monitor';

const router = express.Router();

// Add a monitor
router.post('/', async (req, res) => {
  const { url, errorType, email } = req.body;

  try {
    const newMonitor = new MonitorModel({ url, errorType, email });
    await newMonitor.save();
    res.status(201).send(newMonitor);
  } catch (error) {
    console.error('Error adding monitor:', error);
    res.status(500).send({ error: 'Error creating monitor' });
  }
});

// Fetch all monitors
router.get('/', async (req, res) => {
  try {
    const monitors = await MonitorModel.find();
    res.status(200).json(monitors);
  } catch (error) {
    console.error('Error fetching monitors:', error);
    res.status(500).send({ error: 'Error fetching monitors' });
  }
});

// Delete a monitor
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const monitor = await MonitorModel.findByIdAndDelete(id);
    if (!monitor) {
      return res.status(404).send({ error: 'Monitor not found' });
    }
    res.status(200).send({ message: 'Monitor deleted successfully' });
  } catch (error) {
    console.error('Error deleting monitor:', error);
    res.status(500).send({ error: 'Server error. Unable to delete monitor.' });
  }
});

export default router;
