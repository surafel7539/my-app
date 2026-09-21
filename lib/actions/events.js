import Event from "@/database/eventModel";
import connectDB from "../mongodb";

const toPlain = (doc) => JSON.parse(JSON.stringify(doc));

export const getAllEvents = async () => {
  await connectDB();
  const events = await Event.find().sort({ createdAt: -1 }).lean();
  return toPlain(events);
};

export const getEventBySlug = async (slug) => {
  await connectDB();
  const event = await Event.findOne({ slug: slug.trim().toLowerCase() }).lean();
  return event ? toPlain(event) : null;
};
