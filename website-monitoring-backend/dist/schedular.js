"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_cron_1 = __importDefault(require("node-cron"));
const monitoringService_1 = __importDefault(require("./monitoringService"));
// Schedule the monitoring job to run every hour
node_cron_1.default.schedule('0 * * * *', async () => {
    console.log('Running website monitoring job...');
    await (0, monitoringService_1.default)();
});
