// returns all boards
import { createClient } from "../../../../../../utils/supabase/client";
export const dynamic = "force-dynamic";
export async function GET(request: Request) {
    try {
        const receivedAvatarURL = request.url.split('/').pop(); 

        const supabase = createClient();

        const { data, error } = await supabase
            .storage
            .from("avatars")
            .download(receivedAvatarURL);
        


        if (error) {
            throw new Error(error.message);
        }

        if (!data) {
            return new Response(
                JSON.stringify({ message: "No avatar found" }),
                {
                    headers: { "Content-Type": "application/json" },
                    status: 200
                }
            );
        } else {
            return new Response(
                data,
                {
                    headers: { "Content-Type": "image/png" },
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
    