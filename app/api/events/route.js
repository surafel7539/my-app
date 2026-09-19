import Event from "@/database/eventModel";
import { v2 as cloudinary } from "cloudinary";
import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(NextRequest){
    try {
        await connectDB()
        const data = await NextRequest.formData();

        let event;
        try {
            event = Object.fromEntries(data.entries())
        } catch (e) {
            return NextResponse.json({message:'Invalid JSON data format',error: e instanceof Error ? e.message : 'Unknown'}, {status: 400})
        }
        const file = await data.get("image");

        if (!file || !(file instanceof File)) {
        return NextResponse.json(
            { message: "Image file is required" },
            { status: 400 }
        );
        }
        let tags = JSON.parse(data.get('tags'))
        let agenda = JSON.parse(data.get('agenda'))

        const { cloud_name, api_key, api_secret } = cloudinary.config();
        if (!cloud_name || !api_key || !api_secret) {
            return NextResponse.json(
                { message: "Image upload is not configured" },
                { status: 500 }
            );
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const result = await new Promise((resolve, reject) => {
        cloudinary.uploader
            .upload_stream(
            { folder: "events" },
            (error, result) => {
                if (error) reject(error);
                else resolve(result);
            }
            )
            .end(buffer);
        });

        if (!result?.secure_url || !result.secure_url.startsWith("https://")) {
            return NextResponse.json(
                { message: "Image upload did not return a usable URL" },
                { status: 502 }
            );
        }

        event.image = result.secure_url;

// Generate a unique slug before saving to the database
const baseSlug = event.title
    ? event.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-\$)+/g, '')
    : 'event';
const uniqueSlug = `${baseSlug}-${Date.now()}`; // Appends timestamp (e.g., "cloud-next-2028-1718912345")

// Inject the slug into the document creation payload
const createdEvent = await Event.create({
    ...event, 
    slug: uniqueSlug, // 🚀 This fixes the duplicate key error!
    tags: tags, 
    agenda: agenda
});

return NextResponse.json({ message: 'Event created successfully', event: createdEvent }, { status: 201 });

    } catch (e) {
        console.error(e);
        return NextResponse.json({message:'Event Creation Failed',error: e instanceof Error ? e.message : 'Unknown'}, {status: 500})
        
    }
}

export async function GET(){
    try {
        await connectDB()

        const event = await Event.find().sort({createdAt: -1})

        return NextResponse.json({message:  `Events fetched succecfully`, event}, { status: 200})

    } catch (e) {
        return NextResponse.json({message:"Couldnt fetch Events"}, {status: 500})
    }
}