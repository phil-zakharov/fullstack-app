import { server } from './server.ts';

const PORT = Number(process.env.PORT || 3000);
const HOST = process.env.HOST || 'localhost'

server.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});