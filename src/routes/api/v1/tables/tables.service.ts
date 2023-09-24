import express from 'express'
import { addTable, deleteTable, getTableById, getTables, updateTable } from '../../../../controllers/table.controller';


const router = express.Router();

router.route('/')
      .get( getTables)
      .post( addTable );

router.route('/:id')
      .get(getTableById)
      .put(updateTable)
      .delete(deleteTable);

module.exports = router;
