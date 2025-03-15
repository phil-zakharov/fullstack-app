import http from 'node:http';
import { user } from './routes/user/index.ts'

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  if (req.url) {
    const [, path] = req.url?.split('/');
  
    switch(path) {
      case 'user':
        user.create(req, res);
        break;
      default:
        res.statusCode = 404;
        res.end()
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
  //   },
  // })

  // const allUsers = await prisma.user.findMany()
  // console.log(allUsers)
}

main()