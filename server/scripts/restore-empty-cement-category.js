/*
 * Re-adds the "Cement" category tile to the learning portal with 0 products —
 * the Cement category and its products/topics (with real history) were hard-deleted
 * per request on 2026-11-13; this restores just the empty tile, not the content.
 */
require('dotenv').config();
const { sql, getPool } = require('../src/db');

async function main() {
  const pool = await getPool();

  const existing = (await pool.request().query(`SELECT CategoryId FROM dbo.Lms_Categories WHERE Name='Cement'`)).recordset[0];
  if (existing) {
    console.log('Cement category already exists, CategoryId =', existing.CategoryId);
    process.exit(0);
  }

  const inserted = await pool.request().input('name', sql.NVarChar, 'Cement')
    .input('desc', sql.NVarChar, 'Blended cement product knowledge for sales, technical services and plant teams.')
    .query(`INSERT INTO dbo.Lms_Categories (Name, Description, Status, CreatedAt) OUTPUT INSERTED.CategoryId
            VALUES (@name, @desc, 'Active', sysutcdatetime())`);
  console.log('Created Cement category, CategoryId =', inserted.recordset[0].CategoryId);

  const all = await pool.request().query('SELECT CategoryId, Name, Status FROM dbo.Lms_Categories ORDER BY CategoryId');
  console.log('\nFinal categories:', JSON.stringify(all.recordset, null, 2));
  process.exit(0);
}

main().catch((e) => { console.error(e); process.exit(1); });
