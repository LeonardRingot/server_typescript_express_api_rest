/********************************************************************** 
 *                 Import des modules nécessaires
 **********************************************************************/
 import { CommonRoutesConfig } from '../common/common.routes.config';
 import UsersController from './controllers/users.controller';
 import UsersMiddleware from './middleware/users.middleware';
 import express from 'express';
 
 export class UsersRoutes extends CommonRoutesConfig {

     constructor(app: express.Application) {
         super(app, 'UsersRoutes');
     }
 
     configureRoutes(): express.Application {
         this.app
             .route(`/users`)
             .get(UsersController.listUsers)
             .post(
                 UsersMiddleware.validateRequiredUserBodyFields,
                 UsersMiddleware.validateSameEmailDoesntExist,
                 UsersController.createUser
             );
 
         this.app.param(`userId`, UsersMiddleware.extractUserId);
         this.app
             .route(`/users/:userId`)
             .all(UsersMiddleware.validateUserExists)
             .get(UsersController.getUserById)
             .delete(UsersController.removeUser);
 
         this.app.put(`/users/:userId`, [
             UsersMiddleware.validateRequiredUserBodyFields,
             UsersMiddleware.validateSameEmailBelongToSameUser,
             UsersController.put,
         ]);
 
         this.app.patch(`/users/:userId`, [
             UsersMiddleware.validatePatchEmail,
             UsersController.patch,
         ]);
 
         return this.app;
     }
 }




















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
