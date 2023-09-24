import {Express} from 'express'

export function routes(app:Express){

    app.use('/auth', require('./routes/auth'));
    
    app.use(`/api/v1/employees`, require('./routes/api/v1/employees/employee.service'));

    app.use(`/api/v1/menu`, require('./routes/api/v1/menu/menu.service'));

    app.use(`/api/v1/tables`, require('./routes/api/v1/tables/tables.service'));
}