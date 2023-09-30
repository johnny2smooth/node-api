import * as dotenv from "dotenv";
import app from "./server";

dotenv.config();

app.listen(4321);
