import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { fetchCoins } from "./services/fetchCoin.js";

const setupAndStartServer = async () => {
  const app = express();
  dotenv.config();
  const PORT = process.env.PORT;
  app.listen(PORT, () => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    fetchCoins();

    console.log(`Successfully started the server on PORT : ${PORT}`);
  });
};

setupAndStartServer();
