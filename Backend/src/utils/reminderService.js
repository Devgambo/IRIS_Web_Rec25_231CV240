import { resend } from './resend.js';
import InfraBooking from '../models/infraRequest.model.js';
import Infrastructure from '../models/infrastructure.model.js';
import User from '../models/user.model.js';

// Function to send reminder email
export const sendReminderEmail = async (booking, user, infrastructure) => {
  try {
    const { data, error } = await resend.emails.send({
      from: 'notifications@nitk_SportsMate.com',
      to: user.email,
      subject: 'Reminder: Your booking is coming up soon',
      html: `
        <h1>Booking Reminder</h1>
        <p>Hello ${user.name},</p>
        <p>This is a friendly reminder that your booking for <strong>${infrastructure.name}</strong> is coming up in 30 minutes.</p>
        <p>Details:</p>
        <ul>
          <li>Date: ${new Date(booking.bookingDate).toLocaleDateString()}</li>
          <li>Time: ${booking.timeSlot}</li>
          <li>Status: ${booking.status}</li>
        </ul>
        <p>Please be on time. If you need to cancel, please do so through our platform.</p>
        <p>Thank you!</p>
      `
    });

    if (error) {
      console.error('Error sending reminder email:', error);
      return false;
    }

    // Update the booking to mark reminder as sent
    await InfraBooking.findByIdAndUpdate(booking._id, { reminderSent: true });
    return true;
  } catch (error) {
    console.error('Error in sendReminderEmail:', error);
    return false;
  }
};

// Function to check for upcoming bookings and send reminders
export const processReminders = async () => {
  try {
    const now = new Date();
    const thirtyMinutesFromNow = new Date(now.getTime() + 30 * 60 * 1000);
    
    // Get today's date at midnight
    const today = new Date(now);
    today.setHours(0, 0, 0, 0);
    
    // Get all pending/approved bookings for today that haven't had reminders sent
    const bookings = await InfraBooking.find({
      bookingDate: { $gte: today, $lt: new Date(today).setDate(today.getDate() + 1) },
      status: { $in: ['pending', 'approved'] },
      reminderSent: false
    });

    for (const booking of bookings) {
      // Parse the time slot (assuming format like "6:00am")
      const [hours, minutes] = booking.timeSlot.match(/(\d+):(\d+)/).slice(1, 3);
      const isPM = booking.timeSlot.toLowerCase().includes('pm');
      
      // Create a date object for the booking time
      const bookingTime = new Date(booking.bookingDate);
      bookingTime.setHours(
        isPM && hours !== '12' ? parseInt(hours) + 12 : parseInt(hours),
        parseInt(minutes),
        0,
        0
      );
      
      // If booking is within 30 minutes and reminder not sent
      const timeDiff = bookingTime.getTime() - now.getTime();
      if (timeDiff > 0 && timeDiff <= 30 * 60 * 1000) {
        // Get user and infrastructure details
        const user = await User.findById(booking.userId);
        const infrastructure = await Infrastructure.findById(booking.infrastructureId);
        
        if (user && infrastructure) {
          await sendReminderEmail(booking, user, infrastructure);
          console.log(`Reminder sent for booking: ${booking._id}`);
        }
      }
    }
    
    console.log('Reminder processing completed');
  } catch (error) {
    console.error('Error processing reminders:', error);
  }
};