require("dotenv").config({ path: "configs/.env" });
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const apis = require('./routes/routes')


app.use(express.json());
app.use(
  cors({
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);

app.use("/api", apis);

app.listen(process.env.PORT || 8000, () => console.log("server is listening on 8000"));
