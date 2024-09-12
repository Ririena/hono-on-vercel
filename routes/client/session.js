import { supabase } from "../../lib/supabase.js";

export const getSession = async (c) => {
    try {
        
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return c.json({ message: 'Session Failed' }, 401);
        } else {
            
            const { data, error } = await supabase.from("user").select("*").eq("email", user.email).single();

            if (error) {
                return c.json({ message: 'Get User Failed: ' + error.message }, 401);
            } else {
                return c.json({ message: 'Session Successful', data });
            }
        }
    } catch (error) {
        
        return c.json({ message: 'An error occurred: ' + error.message }, 500);
    }
};
