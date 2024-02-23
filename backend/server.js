require("dotenv").config();
const express = require("express");
var cors = require("cors");
const app = express();
const path = require("path");
const router = require("./routes");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/", router);

// app.post("/convert", async (req, res) => {
//   try {
//     console.log(req.body);
//     let { url } = req.body;
//     let fileName = Date.now();
//     let result = await convertapi
//       .convert(
//         "pdf",
//         {
//           Url: url,
//           PageRange: "1-2",
//           ConversionDelay: "2",
//           LoadLazyContent: "true",
//           ViewportWidth: "1800",
//           ViewportHeight: "2200",
//           Scale: "80",
//         },
//         "web"
//       )
//       .then(async function (result) {
//         console.log(result.Url);
//         const resp = await result
//           .saveFiles(`./public/${fileName}.pdf`)
//           .then((res) => {
//             console.log("done saving");
//             return "resp";
//           });
//         console.log(resp);
//         return "done2";
//       })
//       .catch((error) => {
//         console.log("some error");
//         throw Error(error);
//       });
//     console.log(result);
//     res.json({ status: "success", fileName });
//   } catch (error) {
//     console.log("error", error.message);
//     return res.json({ status: "error", message: error.message });
//   }
// });

// app.get("/getFile/:fileName", (req, res) => {
//   console.log(req.params);
//   // const pdfPath = path.join("./public", req.params.fileName);
//   const pdfPath = path.join(__dirname, "public", req.params.fileName);
//   console.log(pdfPath);
//   res.download(pdfPath);
// });

app.listen(process.env.APP_PORT || 8000, () => {
  console.log("SERVER STARTED");
});
