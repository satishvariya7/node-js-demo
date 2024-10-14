const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const productRoute = require("./src/routes/productRoutes");
const userRoute = require("./src/routes/userRoutes");
const dotEnv = require("dotenv");
const errorHandling = require("./src/middleware/errorHandling");

dotEnv.config({ path: ".env" });

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());

//Routes...
app.use("/products", productRoute);
app.use("/users", userRoute);

app.use(errorHandling);

app.listen(process.env.PORT, () =>
  console.log(`Server started on ${process.env.PORT}`)
);
