"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRoutes = void 0;
/**********************************************************************
 *                 Import des modules nécessaires
 **********************************************************************/
const common_routes_config_1 = require("../common/common.routes.config");
const users_controller_1 = __importDefault(require("./controllers/users.controller"));
const users_middleware_1 = __importDefault(require("./middleware/users.middleware"));
class UsersRoutes extends common_routes_config_1.CommonRoutesConfig {
    constructor(app) {
        super(app, 'UsersRoutes');
    }
    configureRoutes() {
        this.app
            .route(`/users`)
            .get(users_controller_1.default.listUsers)
            .post(users_middleware_1.default.validateRequiredUserBodyFields, users_middleware_1.default.validateSameEmailDoesntExist, users_controller_1.default.createUser);
        this.app.param(`userId`, users_middleware_1.default.extractUserId);
        this.app
            .route(`/users/:userId`)
            .all(users_middleware_1.default.validateUserExists)
            .get(users_controller_1.default.getUserById)
            .delete(users_controller_1.default.removeUser);
        this.app.put(`/users/:userId`, [
            users_middleware_1.default.validateRequiredUserBodyFields,
            users_middleware_1.default.validateSameEmailBelongToSameUser,
            users_controller_1.default.put,
        ]);
        this.app.patch(`/users/:userId`, [
            users_middleware_1.default.validatePatchEmail,
            users_controller_1.default.patch,
        ]);
        return this.app;
    }
}
exports.UsersRoutes = UsersRoutes;
// ----------------------------------------- Start v2 -------------------------------------------//
// import { CommonRoutesConfig } from "../common/common.routes.config";
// import express from 'express';
// export class UsersRoutes extends CommonRoutesConfig {
//     constructor(app: express.Application) {
//         super(app, 'UsersRoutes');
//     }
//     configureRoutes(): express.Application {
//         this.app.route(`/users`)
//         .get((req: express.Request, res: express.Response) => {
//             res.status(200).send(`List of users`);
//         })
//         .post((req: express.Request, res: express.Response) => {
//             res.status(200).send(`Post to users`);
//         });
//         this.app.route(`/users/:userId`)
//         .all((req: express.Request, res: express.Response, next: express.NextFunction) => {
//             // this middleware function runs before any request to /users/:userId
//             // but it doesn't accomplish anything just yet---
//             // it simply passes control to the next applicable function below using next()
//             next();
//         })
//         .get((req: express.Request, res: express.Response) => {
//             res.status(200).send(`GET requested for id ${req.params.userId}`);
//         })
//         .put((req: express.Request, res: express.Response) => {
//             res.status(200).send(`PUT requested for id ${req.params.userId}`);
//         })
//         .patch((req: express.Request, res: express.Response) => {
//             res.status(200).send(`PATCH requested for id ${req.params.userId}`);
//         })
//         .delete((req: express.Request, res: express.Response) => {
//             res.status(200).send(`DELETE requested for id ${req.params.userId}`);
//         });
//         // (we'll add the actual route configuration here next)       
//         return this.app;
//     }
// }
// ----------------------------------------- End v2 --------------------------------------------//
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMucm91dGVzLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3VzZXJzL3VzZXJzLnJvdXRlcy5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7O3dFQUV3RTtBQUN2RSx5RUFBb0U7QUFDcEUsc0ZBQTZEO0FBQzdELHFGQUE0RDtBQUc1RCxNQUFhLFdBQVksU0FBUSx5Q0FBa0I7SUFFL0MsWUFBWSxHQUF3QjtRQUNoQyxLQUFLLENBQUMsR0FBRyxFQUFFLGFBQWEsQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFFRCxlQUFlO1FBQ1gsSUFBSSxDQUFDLEdBQUc7YUFDSCxLQUFLLENBQUMsUUFBUSxDQUFDO2FBQ2YsR0FBRyxDQUFDLDBCQUFlLENBQUMsU0FBUyxDQUFDO2FBQzlCLElBQUksQ0FDRCwwQkFBZSxDQUFDLDhCQUE4QixFQUM5QywwQkFBZSxDQUFDLDRCQUE0QixFQUM1QywwQkFBZSxDQUFDLFVBQVUsQ0FDN0IsQ0FBQztRQUVOLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSwwQkFBZSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3hELElBQUksQ0FBQyxHQUFHO2FBQ0gsS0FBSyxDQUFDLGdCQUFnQixDQUFDO2FBQ3ZCLEdBQUcsQ0FBQywwQkFBZSxDQUFDLGtCQUFrQixDQUFDO2FBQ3ZDLEdBQUcsQ0FBQywwQkFBZSxDQUFDLFdBQVcsQ0FBQzthQUNoQyxNQUFNLENBQUMsMEJBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUV4QyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRTtZQUMzQiwwQkFBZSxDQUFDLDhCQUE4QjtZQUM5QywwQkFBZSxDQUFDLGlDQUFpQztZQUNqRCwwQkFBZSxDQUFDLEdBQUc7U0FDdEIsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLEVBQUU7WUFDN0IsMEJBQWUsQ0FBQyxrQkFBa0I7WUFDbEMsMEJBQWUsQ0FBQyxLQUFLO1NBQ3hCLENBQUMsQ0FBQztRQUVILE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQztJQUNwQixDQUFDO0NBQ0o7QUFwQ0Qsa0NBb0NDO0FBcUJGLG1HQUFtRztBQUVuRyx1RUFBdUU7QUFDdkUsaUNBQWlDO0FBRWpDLHdEQUF3RDtBQUV4RCw4Q0FBOEM7QUFFOUMscUNBQXFDO0FBRXJDLFFBQVE7QUFFUiwrQ0FBK0M7QUFFL0MsbUNBQW1DO0FBQ25DLGtFQUFrRTtBQUNsRSxxREFBcUQ7QUFDckQsYUFBYTtBQUNiLG1FQUFtRTtBQUNuRSxxREFBcUQ7QUFDckQsY0FBYztBQUVkLDJDQUEyQztBQUMzQyw4RkFBOEY7QUFDOUYsb0ZBQW9GO0FBQ3BGLGdFQUFnRTtBQUNoRSw2RkFBNkY7QUFDN0Ysc0JBQXNCO0FBQ3RCLGFBQWE7QUFDYixrRUFBa0U7QUFDbEUsaUZBQWlGO0FBQ2pGLGFBQWE7QUFDYixrRUFBa0U7QUFDbEUsaUZBQWlGO0FBQ2pGLGFBQWE7QUFDYixvRUFBb0U7QUFDcEUsbUZBQW1GO0FBQ25GLGFBQWE7QUFDYixxRUFBcUU7QUFDckUsb0ZBQW9GO0FBQ3BGLGNBQWM7QUFFZCx5RUFBeUU7QUFDekUsMkJBQTJCO0FBQzNCLFFBQVE7QUFFUixJQUFJO0FBQ0osa0dBQWtHIn0=