import express from "express";
import cors from "cors";
import "dotenv/config";
import routes from "./routes";

const app = express();

const corsOptions: cors.CorsOptions = {
	origin: "http://localhost:3000",
	methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
	credentials: true,
	optionsSuccessStatus: 204,
};

const PORT = 4000;
const HOST = "0.0.0.0";

app.use(cors(corsOptions));
app.use(express.json());

// Mount all routes
app.use("/api", routes);

app.listen(PORT, HOST, () => {
	console.log(`🚀 Server listening on http://${HOST}:${PORT}`);
});

// ## New API endpoints:
// GET  /api/pokemons/                              → Public pokemon list

// GET  /api/pokemons/admin                        → Admin pokemon list
// PATCH /api/pokemons/admin/toggle-availability/:id  → Toggle availability
