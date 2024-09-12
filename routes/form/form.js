import { supabase } from "../../lib/supabase";

export const getAllForm = async (c) => {
  try {
    const { data, error } = await supabase.from("form").select("*");

    if (error) {
      return c.json({ message: "Get All Form Failed" + error.message }, 400);
    } else {
      return c.json({ message: "Get Succesfull" + data });
    }
  } catch (error) {
    return c.json({ message: "Internal Server Error" + error.message }, 500);
  }
};

export const getOneForm = async (c) => {
  const { id } = c.req.param();

  try {
    const { data, error } = await supabase
      .from("form")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      return c.json({ message: "Get Form Failed: " + error.message }, 400);
    }

    if (!data) {
      return c.json({ message: "Form Not Found" }, 404);
    }

    return c.json({ message: "Get Successful", data });
  } catch (error) {
    return c.json({ message: "Internal Server Error: " + error.message }, 500);
  }
};
