import express from "express";
import { deleteEmployee, getAllEmployees, getAllRoles, getEmployeeById, updateEmployee } from "../../../../controllers/employee.controller";

const router = express.Router();

router.route("/")
        .get(getAllEmployees);
router.get('/roles', getAllRoles);
router.route("/:id")
        .get(getEmployeeById)
        .put(updateEmployee)
        .delete(deleteEmployee);

module.exports = router;