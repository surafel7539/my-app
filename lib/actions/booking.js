'use server'
import Booking from "@/database/bookingModel";
import connectDB from "../mongodb";

export const createBooking = async ({eventId, slug, email}) => {
    try {
        await connectDB()
        console.log("Creating booking:", {
      eventId,
      slug,
      email,
    });
        await Booking.create({eventId,  email})
        
        return { success: true}
    } catch (e) {
        console.error('create booking failed', e);
        if (e.code === 11000) {
            return {
                success: false,
                message: "You have already booked this event.",
            };
        }

    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
    }
}