import { processReminders } from './reminderService.js';

// Run the reminder check every 5 minutes
export const startReminderScheduler = () => {
  console.log('Starting reminder scheduler...');
  // Run immediately on startup
  processReminders();

  setInterval(processReminders, 5 * 60 * 1000);
};