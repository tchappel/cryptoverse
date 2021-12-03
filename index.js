const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv").config();
const path = require("path");

const app = express();
app.use(express.static(path.join(__dirname, "client/build")));

const CryptoApiClient = axios.create({
  baseURL: "https://coinranking1.p.rapidapi.com",
  timeout: 5000,
  headers: {
    "x-rapidapi-host": "coinranking1.p.rapidapi.com",
    "x-rapidapi-key": process.env.RAPIDAPI_KEY,
  },
});

const CryptoNewsApiClient = axios.create({
  baseURL: "https://bing-news-search1.p.rapidapi.com",
  timeout: 5000,
  headers: {
    "x-bingapis-sdk": "true",
    "x-rapidapi-host": "bing-news-search1.p.rapidapi.com",
    "x-rapidapi-key": process.env.RAPIDAPI_KEY,
  },
});

app.get("/api/cryptoApi/coins", (req, res) => {
  CryptoApiClient.get(`/coins`)
    .then(function (response) {
      res.status(200).json(response.data);
    })
    .catch(function (error) {
      res.status(500);
    });
});

app.get("/api/cryptoApi/coin/:coinId", (req, res) => {
  const { coinId } = req.params;
  CryptoApiClient.get(`/coin/${coinId}`)
    .then(function (response) {
      res.status(200).json(response.data);
    })
    .catch(function (error) {
      console.log(error.response);
      res.status(500);
    });
});

app.get("/api/cryptoApi/coin/:coinId/history/:timePeriod", (req, res) => {
  const { coinId, timePeriod } = req.params;
  CryptoApiClient.get(`/coin/${coinId}/history/${timePeriod}`)
    .then(function (response) {
      res.status(200).json(response.data);
    })
    .catch(function (error) {
      console.log(error.response);
      res.status(500);
    });
});

app.get("/api/cryptoApi/exchanges", (req, res) => {
  CryptoApiClient.get(`/exchanges`)
    .then(function (response) {
      res.status(200).json(response.data);
    })
    .catch(function (error) {
      console.log(error.response);
      res.status(500);
    });
});

app.get("/api/cryptoNewsApi/news/search", (req, res) => {
  const { q: newsCategory, count } = req.query;
  if (!newsCategory || !count) {
    res.status(400).json({
      message: `Please provide newsCategory and count`,
    });
  }

  CryptoNewsApiClient.get(
    `/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`
  )
    .then(function (response) {
      res.status(200).json(response.data);
    })
    .catch(function (error) {
      console.log(error.response);
      res.status(500);
    });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "client/build/index.html"));
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
