const prodCors = [];
const devCors = ['http://localhost:5173'];

const AllowedHosts = process.env.NODE_ENV === 'production' ? prodCors : devCors;

export default AllowedHosts;
