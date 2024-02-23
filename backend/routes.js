const express = require("express");
const router = express.Router();
const {downloadPDF,generatePDF} =require('./controllers/pdf-actions.js')


router.route("/convert").post(generatePDF);

router.route("/getFile/:fileName").get(downloadPDF)



module.exports=router