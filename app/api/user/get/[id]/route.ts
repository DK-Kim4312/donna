// returns all boards
import { createClient } from "../../../../../utils/supabase/client";
export const dynamic = "force-dynamic";
export async function GET(request: Request) {
    try {
        const receivedUserID = request.url.split('/').pop(); // Extracting post ID from URL
        const supabase = createClient();
        const { data, error } = await supabase
            .from("users")
            .select("*")
            .eq("id", receivedUserID);


        if (error) {
            throw new Error(error.message);
        }

        if (!data) {
            return new Response(
                JSON.stringify({ message: "No user found" }),
                {
                    headers: { "Content-Type": "application/json" },
                    status: 200
                }
            );
        } else {
            return new Response(
                JSON.stringify(data),
                {
                    headers: { "Content-Type": "application/json" },
                    status: 200
                }
            );
        }

    } catch (error) {
        return new Response(
            JSON.stringify({ message: "Error processing request" }),
            {
                headers: { "Content-Type": "application/json" },
                status: 400
            }
        );
    }
}
    