const express = require("express");
const { sql, getPool } = require("../db");
const { asyncHandler, roleToDb, auditLog } = require("../utils");
const { mapUser } = require("../mappers");

const router = express.Router();

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const pool = await getPool();
    const result = await pool
      .request()
      .query("SELECT * FROM dbo.Lms_Users ORDER BY CreatedAt DESC");
    res.json(result.recordset.map(mapUser));
  })
);

// Manual refresh – execute SP and fetch updated users
router.get(
  "/refresh",
  asyncHandler(async (req, res) => {
    const pool = await getPool();

    // 1. Execute stored procedure
    await pool.request().execute("dbo.lms_user_data_dump");

    // 2. Fetch updated user records
    const result = await pool.request().query(`
      SELECT *
      FROM dbo.Lms_Users
      ORDER BY CreatedAt DESC
    `);

    // 3. Return updated records
    res.json(result.recordset.map(mapUser));
  })
);

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const o = req.body;
    const pool = await getPool();
    const dup = await pool
      .request()
      .input("emp", sql.NVarChar, o.emp)
      .query("SELECT UserId FROM dbo.Lms_Users WHERE EmployeeId = @emp");
    if (dup.recordset.length) return res.status(409).json({ error: "dup" });
    const inserted = await pool
      .request()
      .input("emp", sql.NVarChar, o.emp)
      .input("name", sql.NVarChar, o.name)
      .input("role", sql.NVarChar, roleToDb(o.role))
      .input("dept", sql.NVarChar, o.dept || null)
      .input("plant", sql.NVarChar, o.plant || null)
      .input("location", sql.NVarChar, o.location || null)
      .input("desig", sql.NVarChar, o.desig || null)
      .input("mobile", sql.NVarChar, o.mobile || null)
      .input("status", sql.NVarChar, o.status || "Active")
      .query(`INSERT INTO dbo.Lms_Users (EmployeeId, Name, Role, Department, Plant, Location, Designation, Mobile, Status, CreatedAt, UpdatedAt)
            OUTPUT INSERTED.UserId
            VALUES (@emp, @name, @role, @dept, @plant, @location, @desig, @mobile, @status, sysutcdatetime(), sysutcdatetime())`);
    const id = String(inserted.recordset[0].UserId);
    await auditLog(pool, sql, { action: "User creation", entity: "User " + id, userId: o.actorId });
    res.status(201).json({ id });
  })
);

router.put(
  "/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const o = req.body;
    const pool = await getPool();
    await pool
      .request()
      .input("id", sql.Int, Number(id))
      .input("emp", sql.NVarChar, o.emp)
      .input("name", sql.NVarChar, o.name)
      .input("role", sql.NVarChar, roleToDb(o.role))
      .input("dept", sql.NVarChar, o.dept || null)
      .input("plant", sql.NVarChar, o.plant || null)
      .input("location", sql.NVarChar, o.location || null)
      .input("desig", sql.NVarChar, o.desig || null)
      .input("mobile", sql.NVarChar, o.mobile || null)
      .input("status", sql.NVarChar, o.status)
      .query(`UPDATE dbo.Lms_Users SET EmployeeId=@emp, Name=@name, Role=@role, Department=@dept, Plant=@plant, Location=@location,
            Designation=@desig, Mobile=@mobile, Status=@status, UpdatedAt=sysutcdatetime() WHERE UserId=@id`);
    await auditLog(pool, sql, { action: "User modified", entity: "User " + id, userId: o.actorId });
    res.json({ ok: true });
  })
);

router.patch(
  "/:id/toggle-status",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const pool = await getPool();
    await pool
      .request()
      .input("id", sql.Int, Number(id))
      .query(
        `UPDATE dbo.Lms_Users SET Status = CASE WHEN Status = 'Active' THEN 'Inactive' ELSE 'Active' END, UpdatedAt=sysutcdatetime() WHERE UserId=@id`
      );
    await auditLog(pool, sql, {
      action: "Role/access change",
      entity: "User " + id,
      userId: req.body.actorId,
    });
    res.json({ ok: true });
  })
);

module.exports = router;
