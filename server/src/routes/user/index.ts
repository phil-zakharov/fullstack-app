import { userController } from '../../controllers/user/index.ts'
import { Route } from '../types.ts'

export const userRoutes: Route = {
  create: {
    POST: userController.create
  }
}

// import { prisma } from '../../config/db.ts';
// import type { NestedRoute, Route } from '../types.ts';

// const create: Route = async (req, res) => {
//   if (req.method === 'POST') {
//     let body = '';

//     req.on('data', (chunk) => {
//       body += chunk.toString();
//     });

//     req.on('end', () => {
//       try {
//         console.log('>>', body, JSON.parse(body))
//         prisma.user
//           .create({
//             data: JSON.parse(body),
//           })
//           .then(() => {
//             res.writeHead(200, { 'Content-Type': 'application/json' });
//             res.end(JSON.stringify({ message: 'Success' }));
//           })
//           .catch((err) => {
//             res.writeHead(200, { 'Content-Type': 'application/json' });
//             res.end(JSON.stringify({ message: 'Error', reason: err }));
//           });
//       } catch (error) {
//         res.writeHead(400, { 'Content-Type': 'application/json' });
//         res.end(JSON.stringify({ error: 'Invalid JSON' }));
//       }
//     });
//   }
// };

// export const user: NestedRoute = (nested, req, res) => {
//   const [path] = nested;

//   switch (path) {
//     case 'create':
//       return create(req, res);
//   }
// };
