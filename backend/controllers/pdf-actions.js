require("dotenv").config();
const express = require("express");
const convertapi = require("convertapi")(process.env.APP_CONVERTAPI_SECRET_ID);
const fs = require("fs");
const path = require("path");

const generatePDF = async (req, res) => {
  try {
    console.log(req.body);
    let { url } = req.body;
    let fileName = Date.now();
    let result = await convertapi
      .convert(
        "pdf",
        {
          Url: url,
          PageRange: "1-2",
          ConversionDelay: "2",
          LoadLazyContent: "true",
          ViewportWidth: "1800",
          ViewportHeight: "2200",
          Scale: "80",
        },
        "web"
      )
      .then(async function (result) {
        const resp = await result
          .saveFiles(`./public/${fileName}.pdf`)
          .then((res) => {
            console.log("done saving");
            return "resp";
          });
        console.log(resp);
        return "done2";
      })
      .catch((error) => {
        console.log("some error");
        throw Error(error);
      });
    console.log(result);
    res.json({ status: "success", fileName });
  } catch (error) {
    console.log("error", error.message);
    return res.json({ status: "error", message: error.message });
  }
};

const downloadPDF = (req, res) => {
  try {
    // console.log(path.join(__dirname, "../public"));
    const pdfPath = path.join(__dirname, "../public", req.params.fileName);
    // console.log(pdfPath);
    res.download(pdfPath);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { generatePDF, downloadPDF };
