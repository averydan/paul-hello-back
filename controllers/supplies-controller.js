let express = require("express");
let router = express.Router();
let sequelize = require("../db");
let Supply = sequelize.import("../models/supplies");
router.post("/new", function (req, res) {
    let pid = req.body.supplies.pid;
    let brand = req.body.supplies.brand;
    let item = req.body.supplies.item;
    let amount = req.body.supplies.amount
        
    Supply.create({
            pid: pid,
            brand: brand,
            item: item,
            amount: amount
        })
        .then(
            function supplyPSuccess() {
                console.log("Great!")
                res.status(200).json({
                    message: "Posted Supplies"
                })
            },
            function supplyPError(err) {
                console.log("^V^V^V^V^V^V^V^V^THIS_IS_WHERE_I_FAILED^V^V^V^V^V^V^V^V^V^", err)
                res.json(500, err.message)
            }
        )
})

router.delete("/delete/:id", function (req, res) {
    let input = req.params.id;
    Supply.findById(input)
        .then(
            function (item) {
                if (item !== undefined) {
                    Supply.destroy({ where: { id: input } })
                        .then(
                            function supplyDSuccess() {
                                res.status(200).send("Deleted Supply")
                            },
                            function supplyDError(err) {
                                res.send(500, err.message)
                            }
                        )
                } else {
                    res.send(500, "Supply does not exist.")
                }
            })
})

router.get("/get/:pid", function (req, res) {
    Supply.findAll({ where: { pid: req.params.pid } })
        .then(
            function supplyFSuccess(data) {
                res.status(200).json(data)
            },
            function supplyFError(err) {
                res.send(500, err.message)
            }
        )
})
router.put("/update/:id", function (req, res) {
    let input = req.params.id
    let brand = req.body.supplies.brand;
    let item = req.body.supplies.item
    let amount = req.body.supplies.amount
    Supply.update({
        brand: brand,
        item: item,
        amount: amount
    }, { where: { id: input } })
        .then(
            function createUpdateSuccess(updatedData) {
                res.status(200).json(updatedData)
            },
            function createUpdateError(err) {
                res.send(500, err.message)
            }
        )
})
module.exports = router;