import { Hono } from "hono";
import { handle } from "hono/vercel";
import { cors } from "hono/cors";
import { registerUser, loginUser, signOutUser, requestPasswordReset, resetPassword } from "../routes/auth/auth.js";
import { getSession } from "../routes/client/session.js";

const app = new Hono().basePath("/api");

app.use(
  "*",
  cors({
    origin: ["https://example.com", "http://localhost:5173", 'http://localhost:5173', 'https://form-smkn7-fe.vercel.app'],
    allowHeaders: ["Content-Type", "Authorization"],
    exposeHeaders: ["Content-Length"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.get("/", (c) => {
  return c.json({ message: "Congrats! You've deployed Hono to Vercel" });
});


app.post("/v1/register", registerUser);
app.post("/v1/login", loginUser);
app.post("/v1/logout", signOutUser )
app.post("/v1/request-password-reset", requestPasswordReset);
app.post("/v1/reset-password", resetPassword);

app.get("/v1/session", getSession)
const handler = handle(app);

export const GET = handler;
export const POST = handler;
export const PATCH = handler;
export const PUT = handler;
export const OPTIONS = handler;
export const DELETE = handler;
