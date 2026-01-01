import AnimeList from "@/animeList";
import { connectMongoDB } from "@/connectMongoDb";
import { NextResponse } from "next/server";

// CORS headers helper function
const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// Handle preflight OPTIONS request
export const OPTIONS = async () => {
    return NextResponse.json({}, { headers: corsHeaders });
};

export const GET = async (request) => {
    try {
        await connectMongoDB();
        const animeList = await AnimeList.find();
        return NextResponse.json({
            message: "AnimeVista anime list",
            count: animeList.length,
            animeList
        }, {
            status: 200,
            headers: corsHeaders
        });
    } catch (error) {
        return NextResponse.json({
            error: "Failed to fetch anime-vista anime list"
        }, {
            status: 500,
            headers: corsHeaders
        });
    }
};