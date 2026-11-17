require('dotenv').config();
const { seedProduct } = require('./lib/seedProduct');
const data = require('./seed-data/hw204');

seedProduct(data).then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });
