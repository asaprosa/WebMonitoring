import mongoose from 'mongoose';

const monitorSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  errorType: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

const MonitorModel = mongoose.model('Monitor', monitorSchema);
export default MonitorModel;
