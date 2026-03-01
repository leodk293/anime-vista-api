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
        // Parse the requested letter from the query string: /api/alphabetical?letter=A
        const { searchParams } = new URL(request.url);
        const letter = searchParams.get("letter");

        if (!letter || letter.length !== 1) {
            return NextResponse.json(
                { error: "Query parameter 'letter' (single character) is required." },
                { status: 400, headers: corsHeaders }
            );
        }

        await connectMongoDB();

        // Case-insensitive "starts with" filter on animeName
        const regex = new RegExp(`^${letter}`, "i");
        const animes = await AnimeList.find({
            animeName: { $regex: regex },
        }).sort({ animeName: 1 });

        return NextResponse.json(animes, { headers: corsHeaders });
    } catch (error) {
        console.error("Error fetching alphabetical anime list:", error);
        return NextResponse.json(
            { error: "Failed to fetch anime list." },
            { status: 500, headers: corsHeaders }
        );
    }
} 