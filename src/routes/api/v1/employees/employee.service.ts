import express from "express";
import { deleteEmployee, getAllEmployees, getAllRoles, getEmployeeById, updateEmployee } from "../../../../controllers/employee.controller";

const router = express.Router();

router.route("/")
        .get(getAllEmployees)
        .put(updateEmployee)
        .delete(deleteEmployee);
router.get('/roles', getAllRoles);
router.get("/:id", getEmployeeById);

module.exports = router;