import { NextResponse } from "next/server";
import mongoose from "mongoose";

import connectDB from "@/lib/mongodb";
import Event from "@/database/eventModel";

export async function GET(_req, { params }) {
  try {
    await connectDB();
    const { slug } = await params;

    // Validate the dynamic route parameter.
    if (!slug || typeof slug !== "string" || !slug.trim()) {
      return NextResponse.json(
        { message: "A valid event slug is required" },
        { status: 400 }
      );
    }

    const normalizedSlug = slug.trim().toLowerCase();

    

    const event = await Event.findOne({
      slug: normalizedSlug,
    }).lean();

    // Return 404 when no event matches the slug.
    if (!event) {
      return NextResponse.json(
        { message: "Event not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Event fetched successfully",
        event,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET /api/events/[slug] error:", error);

    // Handle Mongoose validation errors.
    if (error instanceof mongoose.Error.ValidationError) {
      return NextResponse.json(
        {
          message: "Invalid event slug",
          error: error.message,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Failed to fetch event" },
      { status: 500 }
    );
  }
}

