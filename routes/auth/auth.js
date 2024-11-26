import { supabase } from "../../lib/supabase";

export const login = async(c) => {
  const { email, password} = await c.req.json()
  try {
    const {data, error} = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if(error) throw new Error(error.message)
    
      const {data: userData, error: userError} = await supabase.from("User").select("*").eq('email', email).maybeSingle()

      if(userError) {
        console.error(error.message);
        return c.json({message: "Error Fetching Data" + userError.message}, 500)
      }

      if(!userData) {
        const {error: insertError} = await supabase.from('User').insert([{email}])

        if(insertError) {
          console.error(insertError)
          return c.json({message: "Error Inserting Data" + insertError.message}, 500)
        }
      }

      return c.json({message: 'Login Succesfull', user: data.user})
  } catch(error) {
    return c.json({message: "Error During Login", error: error.message}, 500)
  }
}