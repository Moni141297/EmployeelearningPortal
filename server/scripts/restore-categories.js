/*
 * Restores the three top-level learning categories: Cement, General, Hardworker.
 * - Renames the existing "Hard Worker" category (holding the real HW101 product) to "Hardworker".
 * - Adds "Cement" as an empty category (0 products/topics) — intentional, per request.
 * - Adds "General" as an empty category for now — its "Introduction to Ramco Cements"
 *   video/content is added separately once the source video is supplied.
 */
require('dotenv').config();
const { sql, getPool } = require('../src/db');

async function main() {
  const pool = await getPool();

  console.log('Renaming "Hard Worker" -> "Hardworker"...');
  await pool.request().input('name', sql.NVarChar, 'Hardworker')
    .query(`UPDATE dbo.Lms_Categories SET Name=@name WHERE Name='Hard Worker'`);

  console.log('Creating "Cement" category (empty)...');
  const cement = await pool.request().input('name', sql.NVarChar, 'Cement')
    .input('desc', sql.NVarChar, 'Blended cement product knowledge for sales, technical services and plant teams.')
    .query(`INSERT INTO dbo.Lms_Categories (Name, Description, Status, CreatedAt) OUTPUT INSERTED.CategoryId
            VALUES (@name, @desc, 'Active', sysutcdatetime())`);
  console.log('  CategoryId =', cement.recordset[0].CategoryId);

  console.log('Creating "General" category (empty, content pending)...');
  const general = await pool.request().input('name', sql.NVarChar, 'General')
    .input('desc', sql.NVarChar, 'Organisation-wide training that every employee and contractor must complete.')
    .query(`INSERT INTO dbo.Lms_Categories (Name, Description, Status, CreatedAt) OUTPUT INSERTED.CategoryId
            VALUES (@name, @desc, 'Active', sysutcdatetime())`);
  console.log('  CategoryId =', general.recordset[0].CategoryId);

  const all = await pool.request().query('SELECT CategoryId, Name FROM dbo.Lms_Categories ORDER BY CategoryId');
  console.log('\nFinal categories:', JSON.stringify(all.recordset, null, 2));
  process.exit(0);
}

main().catch((e) => { console.error(e); process.exit(1); });
