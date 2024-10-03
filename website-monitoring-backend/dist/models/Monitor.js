"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const monitorSchema = new mongoose_1.default.Schema({
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
const MonitorModel = mongoose_1.default.model('Monitor', monitorSchema);
exports.default = MonitorModel;
