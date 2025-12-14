import { Hono } from "hono";
import { cors } from "hono/cors";
import { serveStatic } from "hono/bun";
import type { ApiResponse } from "shared/dist";

export const app = new Hono()

.use(cors())

.get("/api", (c) => {
	return c.text("Hello Hono!");
})

.get("/api/hello", async (c) => {
	const data: ApiResponse = {
		message: "Hello BHVR!",
		success: true,
	};

	return c.json(data, { status: 200 });
})

.use("*", serveStatic({ root: "./static" }))

.get("*", serveStatic({ path: "./static/index.html" }));

Bun.serve({
	fetch: app.fetch,
	port: process.env.PORT || 3000,
});

console.log(`Server running on port ${process.env.PORT || 3000}`);

export default app;