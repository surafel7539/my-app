'use server'

import Event from "@/database/eventModel";
import connectDB from "./mongodb";

export const getSimilarEventsBySlug = async(slug) =>{
    try {
        await connectDB()

        const event = await Event.findOne({slug}).lean()
        if (!event) return []

        const similarEvents = await Event.find({_id: {$ne: event._id }, tags: {$in: event.tags}}).lean()

        return similarEvents.map((similarEvent) => ({
            id: similarEvent._id.toString(),
            slug: similarEvent.slug,
            title: similarEvent.title,
            image: similarEvent.image,
            location: similarEvent.location,
            date: similarEvent.date,
            time: similarEvent.time,
        }))
    } catch  {
        return [];
    }
}