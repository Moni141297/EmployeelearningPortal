const sql = require('mssql');
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });

const config = {
  server: process.env.DB_SERVER || '172.16.1.173',
  port: Number(process.env.DB_PORT) || 54321,
  database: process.env.DB_NAME || 'idblms',
  user: process.env.DB_USER || 'Testuser',
  password: process.env.DB_PASSWORD || '123$Testuser',
  options: {
    encrypt: process.env.DB_ENCRYPT === 'true',
    trustServerCertificate: process.env.DB_TRUST_SERVER_CERTIFICATE !== 'false',
  },
  pool: { max: 10, min: 0, idleTimeoutMillis: 30000 },
};

let poolPromise;

function getPool() {
  if (!poolPromise) {
    poolPromise = new sql.ConnectionPool(config)
      .connect()
      .then((pool) => {
        console.log(`Connected to MSSQL ${config.database} @ ${config.server}:${config.port}`);
        return pool;
      })
      .catch((err) => {
        poolPromise = undefined;
        throw err;
      });
  }
  return poolPromise;
}

module.exports = { sql, getPool };
