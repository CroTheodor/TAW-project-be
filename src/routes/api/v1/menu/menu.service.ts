import express from "express";
import { 
    addItem,
    deleteItem,
    getAllItems, 
    getAvailableItems,
    getById,
    updateItem,  
    } 
from "../../../../controllers/menu.controller";


const router = express.Router();

router.route("/")
    .get(getAvailableItems)
    .post(addItem);

router.route("/all").get(getAllItems);

router.route("/:id")
    .get(getById)
    .put(updateItem)
    .delete(deleteItem);





module.exports = router;