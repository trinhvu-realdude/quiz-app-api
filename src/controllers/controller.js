const fs = require("fs");

exports.getAllExams = (req, res) => {
    const data = fs.readFileSync("data/data.json");
    const results = JSON.parse(data);
    res.send({data: results});
}

exports.getPracticeByCert = (req, res) => {
    try {
        const {exam, certificate} = req.body;
        const data = fs.readFileSync(`data/${exam}/${certificate}/data.json`);
        const results = JSON.parse(data);

        // check and remove null object
        const updatedResults = results.filter(obj => Object.values(obj).some(val => val !== null)).map((obj, index) => ({
            ...obj,
            id: index + 1
        }));

        res.send({data: updatedResults});
    } catch (error) {
        res.status(500).json({error: error});
    }
}

exports.getTestByExam = (req, res) => {
    try {
        const {exam, certificate} = req.body;
        const data = fs.readFileSync(`data/${exam}/${certificate}/data.json`);
        const results = JSON.parse(data);

        let responseData = [];

        for (let i = 0; i < 65; i++) {
            const random = Math.floor(Math.random() * results.length);

            if (results[random].id != null) {
                results[random].answers.filter(item => delete item.isCorrect);
                delete results[random].explanations;
                responseData.push(results[random]);
                results.splice(random, 1);
            }
        }

        res.send({data: responseData});
    } catch (error) {
        res.status(500).json({error: error});
    }

}

exports.getCertsByExam = (req, res) => {
    try {
        const {exam} = req.body;
        const data = fs.readFileSync(`data/${exam}/data.json`);
        const results = JSON.parse(data);
        res.send({data: results});
    } catch (error) {
        res.status(500).json({error: error});
    }
}

exports.checkAnswers = (req, res) => {
    try {
        const {exam, certificate, questions} = req.body;
        const data = fs.readFileSync(`data/${exam}/${certificate}/data.json`);
        const results = JSON.parse(data);

        let responseData = [];

        questions.forEach(element => {
            for (let i = 0; i < results.length; i++) {
                if (results[i].id == element.id) {
                    responseData.push(results[i]);
                }
            }
        });

        res.send({data: responseData});
    } catch (error) {
        res.status(500).json({error: error});
    }
}
