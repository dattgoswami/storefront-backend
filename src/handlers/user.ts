// import express, { Request, Response } from 'express';
// imoprt { User, UserCollection } from '../models/user';
// import jwt from 'jsonwebtoken';
// import verifyAuthToken from '../middleware/auth';

// const store: UserCollection = new UserCollection();

// const index = async (req: Request, res: Response) => {
//     const users = await store.index();
//     res.json(users);
// }
// const show = async (req: Request, res: Response) => {
//    const article = await store.show(req.body.id);
//    res.json(article);
// }
// const create = async (req: Request, res: Response) => {
//     try {
//         const user: User = {
//             id: req.body.id,
//             firstName: req.body.firstName,
//             lastName: req.body.lastName,
//             password: req.body.password,
//         };
//         const newUser = await store.create(user);
//         var token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET);
//         res.json(token)
//         // res.json(newUser);
//     } catch(err) {
//         res.status(400);
//         res.json(err);
//     }
// }

// /* const destroy = async (req: Request, res: Response) => {
//     const deleted = await store.delete(req.body.id);
//     res.json(deleted);
// } */
// //add authentication
// const user_routes = (app: express.Applicatioin) => {
//     app.get('/users', verifyAuthToken, index);
//     app.get('/users/:id', verifyAuthToken, show);
//     app.post('/users', verifyAuthToken, create);
//     // app.delete('/users', destroy);
// }

// export default user_routes;
