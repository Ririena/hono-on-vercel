import { Hono } from 'hono'
import { handle } from 'hono/vercel'
const app = new Hono().basePath('/api')
import { cors } from 'hono/cors';
import { supabase } from '../lib/supabase.js'
app.get('/', (c) => {
  return c.json({ message: "Congrats! You've deployed Hono to Vercel" })
})

app.use('*', cors({
  origin: 'http://localhost:3000', // Replace with your frontend URL
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
}));


app.get('/siswa', async (c) => {
  const { searchTerm = '', filterGender } = c.req.query();

  try {
    // Fetch user data
    const { data: userData, error: userError } = await supabase
      .from('user')
      .select('noIndukSiswa, username, profile_picture_url, banner_url');

    if (userError) throw new Error(userError.message);

    // Prepare the query for siswa data
    let query = supabase.from('siswa').select('*');

    // Validate filterGender and apply filter if valid
    if (filterGender !== undefined && !isNaN(parseInt(filterGender, 10))) {
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