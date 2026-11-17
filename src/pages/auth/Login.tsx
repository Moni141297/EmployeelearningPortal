import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../store/useStore";

export default function Login() {
  const [empId, setEmpId] = useState("");
  const [err, setErr] = useState("");
  const [sending, setSending] = useState(false);
  const setLoginEmp = useStore((s) => s.setLoginEmp);
  const setOtpTries = useStore((s) => s.setOtpTries);
  const requestOtp = useStore((s) => s.requestOtp);
  const toast = useStore((s) => s.toast);
  const navigate = useNavigate();

  async function sendOtp() {
    const v = empId.trim().toUpperCase();
    if (!v) {
      setErr("Please enter your Employee ID.");
      return;
    }
    setErr("");
    setSending(true);
    const res = await requestOtp(v);
    setSending(false);
    if ("error" in res) {
      setErr(res.error);
      return;
    }
    setLoginEmp(v);
    setOtpTries(0);
    toast(
      "OTP sent to registered mobile "
      // + res.mobile, "ok"
    );
    navigate("/otp");
  }

  return (
    <div className="auth">
      <div className="promo">
        <div
          className="logo"
          style={{ marginBottom: 26, display: "flex", gap: 11, alignItems: "center" }}
        >
          <div className="logo-mark" style={{ width: 40, height: 40, fontSize: 15 }}>
            ELP
          </div>
          <b style={{ fontSize: 16 }}>ELearning Portal</b>
        </div>
        <h1>
          Learn product
          <br />
          that moves you next steps
        </h1>
        <p>One place for practical skills, expert guidance, and the next step in your career.</p>
        <div className="feat">
          <div>
            <span>✦</span>
            <div>
              <b style={{ color: "#fff" }} />
              20+ product based learning paths
            </div>
          </div>
          <div>
            <span>✦</span>
            <div>
              <b style={{ color: "#fff" }} />
              Learn at your pace
            </div>
          </div>
          <div>
            <span>✦</span>
            <div>
              <b style={{ color: "#fff" }} />
              Gain skills with verified certification
            </div>
          </div>
        </div>
        {/* <div className="journey">
          {['Learn', 'Understand', 'Practice', 'Ask Expert', 'Assess', 'Certify', 'Analyze'].map((s) => <span key={s}>{s}</span>)}
        </div>
        <div className="feat">
          <div><span>▤</span><div><b style={{ color: '#fff' }}>Slide-based learning</b> — authored by trainers, tracked per participant</div></div>
          <div><span>✦</span><div><b style={{ color: '#fff' }}>Topic-aware AI assistant</b> — answers only from approved content, escalates to experts</div></div>
          <div><span>◉</span><div><b style={{ color: '#fff' }}>Live Kahoot-style examinations</b> — waiting room, randomised questions, live leaderboard</div></div>
          <div><span>❖</span><div><b style={{ color: '#fff' }}>Automatic certification</b> — issued on passing the official examination</div></div>
        </div>  */}
      </div>
      <div className="authbox">
        <div className="authcard">
          <h2 style={{ fontSize: 23 }}>Sign in</h2>
          <p className="muted small mb">
            Authenticate with your Employee ID. A one-time password will be sent to your registered
            company mobile number.
          </p>
          <label className="f">
            Employee ID <span className="req">*</span>
          </label>
          <input
            className="inp mono"
            placeholder="EMP1001"
            autoComplete="off"
            value={empId}
            onChange={(e) => setEmpId(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") sendOtp();
            }}
          />
          {err && (
            <div className="hint" style={{ color: "var(--bad)" }}>
              {err}
            </div>
          )}
          <button className="btn pri block lg mt2" onClick={sendOtp} disabled={sending}>
            {sending ? "Sending…" : "Send OTP →"}
          </button>
          <div className="xs muted center mt2">
            Protected by role-based access control · All activity is audit logged
          </div>
        </div>
      </div>
    </div>
  );
}
