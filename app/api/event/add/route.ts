export const dynamic = "force-dynamic"; // Use this if you need to ensure the function is always executed dynamically
import { createClient } from "../../../../utils/supabase/client";
import { all } from "axios";

export async function POST(request: Request) {
    try {
        // Parse request body
        const receivedData = await request.json();

        // Log received data
        console.log("Received data:");
        console.log(receivedData);

        // Client-side Supabase query
        const supabase = createClient();
        const { error } = await supabase
            .from("events")
            .insert({
                id: receivedData.id,
                user_id: receivedData.user_id,
                title: receivedData.title,
                start: receivedData.start,
                end: receivedData.end,
                allDay: receivedData.allDay,
            })
        if (error) {
            console.error("Error inserting data:");
            console.error(error);
        }

        // Return response
        return new Response(
            JSON.stringify({
                message: "Event created successfully",
            }),
            {
                headers: { "Content-Type": "application/json" },
                status: 200,
            }
        );
    } catch (error) {
        if (error instanceof Error) {
            // Handle any errors
            return new Response(JSON.stringify({ message: "Error processing request", error: error.message }), {
                headers: { "Content-Type": "application/json" },
                status: 400,
            });
        } else {
            // Handle the case where the error is not an Error object
            console.log("An unknown error occurred");
            return new Response(JSON.stringify({ message: "An unknown error occurred" }), {
                headers: { "Content-Type": "application/json" },
                status: 500,
            });
        }
    }
}
