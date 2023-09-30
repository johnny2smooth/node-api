import * as dotenv from "dotenv";
import app from "./server";

dotenv.config();
console.log(process.env.JWT_SECRET);

app.listen(4321);
