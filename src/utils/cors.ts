const prodCors = ['https://en1tech.com'];
const devCors = ['http://localhost:3000', 'http://localhost:3001'];

const allowedHosts = process.env.NODE_ENV === 'production' ? prodCors : devCors;

export default allowedHosts;
