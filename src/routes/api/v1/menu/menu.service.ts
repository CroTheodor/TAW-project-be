import express from "express";
import { addDrink, getAllItems, getAvailableItems } from "../../../../controllers/menu.controller";


const router = express.Router();

router.route("/")
    .get(getAllItems);

router.route("/menu").get(getAvailableItems);
router.route("/drinks").post(addDrink);


module.exports = router;