import express from "express";
import { PORT } from "./secrets";
import rootRoutes from "./routes/root";
import { errorMiddleWare } from "./middleware/error";

const app = express();

app.use(express.json());

app.use("/api", rootRoutes);

app.use(errorMiddleWare);

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
