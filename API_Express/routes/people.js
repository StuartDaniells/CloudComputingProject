const express =  require('express');
const router = express.Router();
const path = require("path");

/* ---------------------------- Divya's Portfolio --------------------------- */
router.get("/divya", (req, res,) => {
   res.status(200).sendFile(path.join(__dirname, 'portfolios', 'divya', 'index.html'));
})

/* --------------------------- Yuting's Portfolio --------------------------- */
router.get("/yuting", (req, res) => {
   res.status(200).sendFile(path.join(__dirname, 'portfolios', 'yuting', 'index.html'));
})

/* --------------------------- Asif's Portfolio --------------------------- */
// router.get("/asif", (req, res) => {
//    res.status(200).sendFile(path.join(__dirname, '../', 'portfolios', 'asif', 'build', 'index.html'));
// })

/* ---------------------------- Harsh's Portfolio --------------------------- */
router.get("/harsh", (req, res) => {
   res.status(200).sendFile(path.join(__dirname, "portfolios", "harsh", "index.html"))
})

module.exports = router;