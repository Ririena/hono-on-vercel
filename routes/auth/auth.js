import { supabase } from "../../lib/supabase";

export const login = async(c) => {
  const { email, password } = await c.req.json();

  try {
    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) throw new Error(signInError.message);

    const { data: userData, error: userError } = await supabase
      .from('User')
      .select('*')
      .eq('email', email)
      .maybeSingle();

    if (userError) {
      console.error(userError);
      return c.json({ message: 'Error fetching user data: ' + userError.message }, 500);
    }

    if (!userData) {
      const { error: insertError } = await supabase.from('User').insert([{ email }]);

      if (insertError) {
        console.error(insertError);
        return c.json({ message: 'Error inserting user: ' + insertError.message }, 500);
      }
    }

    return c.json({ message: 'Login successful', user: data.user });
  } catch (error) {
    return c.json({ message: 'Error during login', error: error.message }, 500);
  }
}