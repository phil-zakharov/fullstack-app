import http from 'node:http';
import { user } from './routes/user/index.ts';
import { prisma } from './config/db.ts';

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS',
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.url) {
    const [, , path, ...nested] = req.url.split('/');

    switch (path) {
      case 'user':
        user(nested, req, res);
        break;
      default:
        res.statusCode = 404;
        res.end();
    }
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

// dbClient.connect()
//   .then(() => console.log('Connected to PostgreSQL'))
//   .catch(err => console.error('Connection error', err.stack));

// dbClient.query('SELECT NOW()', (err, res) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   console.log('Time:', res.rows[0]);
//   dbClient.end();
// });

async function main() {
  // await prisma.user.create({
  //   data: {
  //     name: 'Alice',
  //     email: 'alice@prisma.io',
  //     password: "123"
  //   },
  // })
  // const allUsers = await prisma.user.findMany()
  // console.log(allUsers)
}

main();
