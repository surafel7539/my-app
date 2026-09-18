'use server'

import Event from "@/database/eventModel";
import connectDB from "../mongodb";

export const getSimilarEventsBySlug = async(slug) =>{
    try {
        await connectDB()

        const event = await Event.findOne({slug})
        const similarEvents = await Event.find({_id: {$ne: event._id }, tags: {$in: event.tags}}).lean()

        return similarEvents
    } catch  {
        return [];
    }
}