import { resend } from './resend.config.js';
import User from './user.model.js';
import InfraBooking from './infraBooking.model.js';
import ApiError from './utils/ApiError.js';
import ApiResponse from './utils/ApiResponse.js';

export const sendReminder = asyncHandler(async (req, res) => {
    const { bookingId } = req.params;

    const booking = await InfraBooking.findById(bookingId).populate('userId');

    if (!booking || booking.reminderSent) {
        throw new ApiError(404, "Booking not found or reminder already sent");
    }

    const user = booking.userId;

    try {
        const emailResponse = await resend.emails.send({
            from: 'no-reply@yourdomain.com',
            to: user.email,
            subject: 'Booking Reminder',
            html: `<p>Hi ${user.name},</p>
                   <p>This is a reminder for your upcoming booking on ${booking.bookingDate} at ${booking.timeSlot}.</p>
                   <p>Thank you!</p>`,
        });

        booking.reminderSent = true;
        await booking.save();

        return res.json(
            new ApiResponse(200, { emailResponse }, "Reminder sent successfully")
        );
    } catch (error) {
        throw new ApiError(500, "Failed to send reminder");
    }
});
