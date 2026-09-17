import Event from "@/database/eventModel";
import { v2 as cloudinary } from "cloudinary";
import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { rejects } from "node:assert/strict";

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

        event.image = result.secure_url;

        const createdEvent = await Event.create({...event, tags: tags, agenda: agenda});

        return NextResponse.json({message:'Event creates successfully', event: createdEvent}, { status: 201 })
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