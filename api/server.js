import express from "express";
import cors from "cors";
import alphaNumRouter from "./api.js";

const app = express();
app.use(cors()).use(express.json()).use("/api", alphaNumRouter);
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

export default app;
