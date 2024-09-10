import { supabase } from "../../lib/supabase.js";

export const registerUser = async (c) => {
  const { email, password } = await c.req.json();

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw new Error(error.message);

    return c.json({ message: 'Registration successful', user: data.user });
  } catch (error) {
    return c.json({ message: 'Error during registration', error: error.message }, 500);
  }
};

export const loginUser = async (c) => {
  const { email, password } = await c.req.json();

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw new Error(error.message);

    return c.json({ message: 'Login successful', user: data.user });
  } catch (error) {
    return c.json({ message: 'Error during login', error: error.message }, 500);
  }
};
