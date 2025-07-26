import AnimeList from "@/animeList";
import { connectMongoDB } from "@/connectMongoDb";
import { NextResponse } from "next/server";

export const GET = async (request) => {
    try {
        await connectMongoDB();
        const animeList = await AnimeList.find();
        return NextResponse.json({
            message: "AnimeVista anime list",
            count: animeList.length,
            animeList
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch anime-vista anime list" }, { status: 500 });
    }
};