// models/EmailLog.ts
import mongoose from 'mongoose';

const emailLogSchema = new mongoose.Schema({
  email: { type: String, required: true },
  url: { type: String, required: true },
  status: { type: String, required: true },
  detectedAt: { type: Date, required: true },
  sentAt: { type: Date, default: Date.now }
});

const EmailLog = mongoose.model('EmailLog', emailLogSchema);

export default EmailLog;