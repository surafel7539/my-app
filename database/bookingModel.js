import { Schema, model, models } from "mongoose";
import Event from "./eventModel.js";

const BookingSchema = new Schema(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: [true, "Event ID is required"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,

      validate: {
        validator: function (email) {
          const emailRegex =
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

          return emailRegex.test(email);
        },

        message: "Please provide a valid email address",
      },
    },
  },
  {
    timestamps: true,
  }
);

BookingSchema.pre("save", async function () {
  const booking = this;

  if (booking.isModified("eventId") || booking.isNew) {
    try {
      const eventExists = await Event.findById(booking.eventId).select("_id");

      if (!eventExists) {
        const error = new Error(
          `Event with ID ${booking.eventId} does not exist`
        );

        error.name = "ValidationError";
        throw error;
      }
    } catch (error) {
      if (error.name === "ValidationError") {
        throw error;
      }

      const validationError = new Error(
        "Invalid event ID format or database error"
      );

      validationError.name = "ValidationError";
      throw validationError;
    }  }
});

BookingSchema.index({ eventId: 1 });

BookingSchema.index({ eventId: 1, createdAt: -1 });

BookingSchema.index({ email: 1 });

BookingSchema.index(
  { eventId: 1, email: 1 },
  {
    unique: true,
    name: "uniq_event_email",
  }
);

const Booking =
  models.Booking || model("Booking", BookingSchema);

export default Booking;