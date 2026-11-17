const express = require("express");
const { sql, getPool } = require("../db");
const { asyncHandler, auditLog } = require("../utils");
const { mapUser } = require("../mappers");

const router = express.Router();

// Fixed test OTP for this environment — no SMS provider is configured, and
// login is gated by Employee ID + this known code rather than a random one.
const FIXED_OTP = "12345";
function genOtp() {
  return FIXED_OTP;
}

router.post(
  "/send-otp",
  asyncHandler(async (req, res) => {
    const emp = String(req.body.emp || "")
      .trim()
      .toUpperCase();
    const pool = await getPool();
    const result = await pool
      .request()
      .input("emp", sql.NVarChar, emp)
      .query("SELECT TOP 1 * FROM dbo.Lms_Users WHERE EmployeeId = @emp");
    const row = result.recordset[0];
    if (!row)
      return res.status(404).json({ error: "Employee ID not found. Please check and try again." });
    if (row.Status !== "Active")
      return res
        .status(403)
        .json({ error: "This account is deactivated. Contact the system administrator." });

    const code = genOtp();
    await pool.request().input("emp", sql.NVarChar, emp).input("code", sql.NVarChar, code)
      .query(`INSERT INTO dbo.Lms_OtpRequests (EmployeeId, OtpCode, ExpiresAt, Attempts, Consumed, CreatedAt)
            VALUES (@emp, @code, DATEADD(minute, 5, sysutcdatetime()), 0, 0, sysutcdatetime())`);

    res.json({ ok: true, mobile: row.Mobile || "—" });
  })
);

router.post(
  "/verify-otp",
  asyncHandler(async (req, res) => {
    const emp = String(req.body.emp || "")
      .trim()
      .toUpperCase();
    const otp = String(req.body.otp || "");
    const pool = await getPool();

    const userRow = (
      await pool
        .request()
        .input("emp", sql.NVarChar, emp)
        .query("SELECT TOP 1 * FROM dbo.Lms_Users WHERE EmployeeId = @emp")
    ).recordset[0];
    if (!userRow) return res.status(404).json({ error: "Employee ID not found." });

    const otpRow = (
      await pool
        .request()
        .input("emp", sql.NVarChar, emp)
        .query(
          `SELECT TOP 1 * FROM dbo.Lms_OtpRequests WHERE EmployeeId=@emp AND Consumed=0 ORDER BY OtpId DESC`
        )
    ).recordset[0];
    if (!otpRow)
      return res
        .status(400)
        .json({ error: "No OTP was requested for this Employee ID. Please request a new one." });
    if (new Date(otpRow.ExpiresAt).getTime() < Date.now())
      return res.status(400).json({ error: "OTP expired. Please request a new one." });
    if (otpRow.OtpCode !== otp) {
      await pool
        .request()
        .input("id", sql.Int, otpRow.OtpId)
        .query("UPDATE dbo.Lms_OtpRequests SET Attempts = Attempts + 1 WHERE OtpId=@id");
      return res.status(401).json({ error: "Invalid OTP." });
    }
    await pool
      .request()
      .input("id", sql.Int, otpRow.OtpId)
      .query("UPDATE dbo.Lms_OtpRequests SET Consumed=1 WHERE OtpId=@id");

    const user = mapUser(userRow);
    await auditLog(pool, sql, { action: "Login", entity: "User", userId: user.id });
    res.json({ user });
  })
);

router.post(
  "/logout",
  asyncHandler(async (req, res) => {
    const pool = await getPool();
    await auditLog(pool, sql, { action: "Logout", entity: "User", userId: req.body.userId });
    res.json({ ok: true });
  })
);

module.exports = router;
