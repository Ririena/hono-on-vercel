import { Hono } from 'hono'
import { handle } from 'hono/vercel'
const app = new Hono().basePath('/api')
import { supabase } from '../lib/supabase.js'
app.get('/', (c) => {
  return c.json({ message: "Congrats! You've deployed Hono to Vercel" })
})

app.get('/siswa', async (c) => {
  const { searchTerm = '', filterGender } = c.req.query();

  try {
    // Fetch user data
    const { data: userData, error: userError } = await supabase
      .from('user')
      .select('noIndukSiswa, username, profile_picture_url, banner_url');

    if (userError) throw new Error(userError.message);

    // Fetch siswa data with optional filtering
    let query = supabase.from('siswa').select('*');

    if (filterGender !== null) {
      query = query.eq('gender', parseInt(filterGender, 10));
    }

    const { data: siswaData, error: siswaError } = await query;

    if (siswaError) throw new Error(siswaError.message);

    // Merge user and siswa data
    const mergedData = siswaData
      .map((siswa) => {
        const user = userData.find(
          (user) => user.noIndukSiswa === siswa.noIndukSiswa
        );
        return {
          ...siswa,
          username: user ? user.username : 'Unknown',
          profile_picture_url: user ? user.profile_picture_url : null,
          banner_url: user ? user.banner_url : null,
        };
      })
      // Apply search filter by username
      .filter((siswa) =>
        siswa.username.toLowerCase().includes(searchTerm.toLowerCase())
      );

    return c.json(mergedData);
  } catch (error) {
    return c.json({ message: 'Error fetching data', error: error.message }, 500);
  }
});

const handler = handle(app);

export const GET = handler;
export const POST = handler;
export const PATCH = handler;
export const PUT = handler;
export const OPTIONS = handler;