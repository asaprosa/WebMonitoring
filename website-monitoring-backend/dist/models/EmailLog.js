"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// models/EmailLog.ts
const mongoose_1 = __importDefault(require("mongoose"));
const emailLogSchema = new mongoose_1.default.Schema({
    email: { type: String, required: true },
    url: { type: String, required: true },
    status: { type: String, required: true },
    detectedAt: { type: Date, required: true },
    sentAt: { type: Date, default: Date.now }
});
const EmailLog = mongoose_1.default.model('EmailLog', emailLogSchema);
exports.default = EmailLog;
