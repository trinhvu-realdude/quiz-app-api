const express = require('express');
const router = express.Router();

const controller = require("../controllers/controller");

router.post("/getPracticeByCert", controller.getPracticeByCert);

router.post("/getTestByExam", controller.getTestByExam);

router.get("/getAllExams", controller.getAllExams);

router.post("/getCertsByExam", controller.getCertsByExam);

router.post("/checkAnswers", controller.checkAnswers);

module.exports = router;
