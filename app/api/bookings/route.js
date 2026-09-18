import { NextResponse } from "next/server";
import mongoose from "mongoose";

import connectDB from "@/lib/mongodb";
import Booking from "@/database/bookingModel";

export async function POST(req) {
  try {
    await connectDB();

    let body;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { message: "A valid JSON body is required" },
        { status: 400 }
      );
    }

    const eventId = typeof body?.eventId === "string" ? body.eventId.trim() : "";
    const email = typeof body?.email === "string" ? body.email.trim() : "";

    if (!eventId || !email) {
      return NextResponse.json(
        { message: "Event ID and email are required" },
        { status: 400 }
      );
    }

    if (!mongoose.Types.ObjectId.isValid(eventId)) {
      return NextResponse.json(
        { message: "A valid event ID is required" },
        { status: 400 }
      );
    }

    const booking = await Booking.create({ eventId, email });

    return NextResponse.json(
      { message: "Booking created successfully", booking },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/bookings error:", error);

    // A repeat booking for the same event and email hits the unique index.
    if (error?.code === 11000) {
      return NextResponse.json(
        { message: "You have already booked this event" },
        { status: 409 }
      );
    }

    // An invalid email or a missing event surface as validation errors.
    if (error?.name === "ValidationError") {
      return NextResponse.json(
        { message: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Booking creation failed" },
      { status: 500 }
    );
  }
}
