import { supabase } from "../../lib/supabase";

export const getAllForm = async (c) => {
  try {
    const { data, error } = await supabase.from("Forums").select("*");

    if (error) {
      return c.json(
        { message: "Get All Forums Failed: " + error.message },
        400
      );
    }

    return c.json({ message: "Get Successful", data });
  } catch (error) {
    return c.json({ message: "Internal Server Error: " + error.message }, 500);
  }
};

export const createForm = async (c) => {
  const { user_id, title, description } = await c.req.json();

  try {
    const { data, error } = await supabase
      .from("Forums")
      .insert([{ user_id, title, description, isAccepted: false }]);

    if (error) {
      return c.json({ message: "Create Forum Failed: " + error.message }, 400);
    }

    return c.json({ message: "Forum Created Successfully", data });
  } catch (error) {
    return c.json({ message: "Internal Server Error: " + error.message }, 500);
  }
};

export const getOneForm = async (c) => {
  const { id } = c.req.params;

  try {
    const { data, error } = await supabase
      .from("Forums")
      .select("*")
      .eq("forum_id", id)
      .single();

    if (error) {
      return c.json({ message: "Get Forum Failed: " + error.message }, 400);
    }

    if (!data) {
      return c.json({ message: "Forum Not Found" }, 404);
    }

    return c.json({ message: "Get Successful", data });
  } catch (error) {
    return c.json({ message: "Internal Server Error: " + error.message }, 500);
  }
};

export const updateForm = async (c) => {
  const { id } = c.req.params;
  const { title, description, isAccepted } = await c.req.json();

  try {
    const { data, error } = await supabase
      .from("Forums")
      .update({ title, description, isAccepted })
      .eq("forum_id", id);

    if (error) {
      return c.json({ message: "Update Forum Failed: " + error.message }, 400);
    }

    return c.json({ message: "Forum Updated Successfully", data });
  } catch (error) {
    return c.json({ message: "Internal Server Error: " + error.message }, 500);
  }
};

export const deleteForm = async (c) => {
  const { id } = c.req.params;

  try {
    const { data, error } = await supabase
      .from("Forums")
      .delete()
      .eq("forum_id", id);

    if (error) {
      return c.json({ message: "Delete Forum Failed: " + error.message }, 400);
    }

    return c.json({ message: "Forum Deleted Successfully", data });
  } catch (error) {
    return c.json({ message: "Internal Server Error: " + error.message }, 500);
  }
};
