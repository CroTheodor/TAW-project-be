/**
 * @openapi
 * /api/v1/employees:
 *  get:
 *      tags: 
 *          - Employees
 *      description: Returns the list of employees
 *      responses:
 *          200:
 *              description: Successfully retrieved the list
 *
 */

/**
 * @openapi
 * /auth/register:
 *  post:
 *      tags:
 *          - User
 *      summary: Register a user
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/UserDTO'
 *      responses:
 *          200:
 *              description: Success
 *          409:
 *              description: Conflict
 *          500:
 *              description: Inernal Error
 */