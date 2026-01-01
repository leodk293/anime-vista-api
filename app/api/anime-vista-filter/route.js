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
        const { searchParams } = new URL(request.url);
        const season = searchParams.get("season");
        const year = searchParams.get("year");
        const genre = searchParams.get("genre");
        const search = searchParams.get("search");

        await connectMongoDB();

        let filter = {};

        if (season) {
            filter.season = season.toLowerCase();
        }

        if (year) {
            filter.year = parseInt(year);
        }

        if (genre) {
            filter.genres = { $elemMatch: { $regex: new RegExp(genre, 'i') } };
        }

        if (search) filter.animeName = { $regex: search, $options: "i" };

        const animeList = await AnimeList.find(filter);

        return NextResponse.json({
            message: "AnimeVista anime list",
            count: animeList.length,
            appliedFilters: filter,
            animeList
        }, {
            status: 200,
            headers: corsHeaders
        });

    } catch (error) {
        console.error("Error fetching anime list:", error);
        return NextResponse.json({
            error: "Failed to fetch anime-vista anime list"
        }, {
            status: 500,
            headers: corsHeaders
        });
    }
};