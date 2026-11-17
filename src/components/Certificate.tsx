import type { AppUser, Certificate as Cert } from "../types";
import { useStore } from "../store/useStore";

export default function Certificate({ cert, user }: { cert: Cert; user: AppUser }) {
  const pathOf = useStore((s) => s.path);
  const events = useStore((s) => s.events);
  const ev = events.find((e) => e.id === cert.event);
  return (
    <div className="cert">
      <div className="row" style={{ justifyContent: "center", gap: 10, marginBottom: 18 }}>
        <div className="logo-mark" style={{ background: "#0f1c33" }}>
          <svg
            width="95"
            height="121"
            viewBox="0 0 95 121"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <mask
              id="mask0_1_58"
              style={{ maskType: "luminance" }}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="96"
              height="121"
            >
              <path d="M0 0H95.0002V120.212H0V0Z" fill="white" />
            </mask>
            <g mask="url(#mask0_1_58)">
              <path
                d="M21.1119 25.3336V31.6623H10.556V0.781215C10.556 0.574495 10.474 0.376205 10.3281 0.229775C10.1822 0.0833447 9.9842 0.000724806 9.7775 4.80554e-06H0.778499C0.572299 0.000724806 0.3747 0.0829749 0.2289 0.228815C0.0830005 0.374655 0.00080063 0.572245 0.00010063 0.778495V38.0454C-0.0211994 52.9338 3.4724 67.617 10.1967 80.9005C10.2865 81.0747 10.556 81.0094 10.556 80.8134V42.2155H21.1119V97.6928C21.1119 97.7358 21.1255 97.7768 21.1527 97.8098C24.2689 101.654 27.6789 105.251 31.3521 108.567C31.3793 108.591 31.4128 108.606 31.4485 108.612C31.4843 108.617 31.5209 108.613 31.554 108.598C31.5871 108.583 31.6154 108.56 31.6356 108.53C31.6557 108.5 31.6669 108.464 31.6678 108.428V0.778495C31.6678 0.676035 31.6476 0.574575 31.6083 0.479955C31.569 0.385325 31.5114 0.299385 31.4388 0.227055C31.3662 0.154725 31.2801 0.0974448 31.1853 0.0584848C31.0906 0.0195148 30.9891 -0.000355194 30.8866 4.80554e-06H21.8904C21.6841 0.000724806 21.4865 0.0829749 21.3407 0.228815C21.1949 0.374655 21.1126 0.572245 21.1119 0.778495V25.3336Z"
                fill-rule="evenodd"
                clip-rule="evenodd"
                fill="white"
              />
              <path
                d="M85.2272 3.70555e-09C85.0202 -9.99629e-06 84.8222 0.08193 84.6752 0.22784C84.5292 0.37376 84.4462 0.57177 84.4462 0.77849V41.3254C84.4662 54.7412 80.8172 67.9071 73.8926 79.398V0.77849C73.8918 0.57177 73.8092 0.37376 73.6628 0.22784C73.5164 0.08193 73.3181 -9.99629e-06 73.1113 3.70555e-09H64.1151C63.9084 -9.99629e-06 63.7101 0.08193 63.5637 0.22784C63.4173 0.37376 63.3346 0.57177 63.3339 0.77849V93.0379C60.1012 96.3362 56.5682 99.3258 52.7807 101.969V0.77849C52.78 0.57177 52.6974 0.37376 52.551 0.22784C52.4045 0.08193 52.2062 -9.99629e-06 51.9995 3.70555e-09H43.0033C42.7968 3.70555e-09 42.5988 0.0820099 42.4528 0.22801C42.3068 0.37401 42.2248 0.57202 42.2248 0.77849V117.046C43.8172 118.113 45.4449 119.131 47.1026 120.103C47.3476 120.247 47.6552 120.247 47.9029 120.103C53.4111 116.878 58.5816 113.108 63.3366 108.85C71.9681 101.124 79.121 91.8909 84.4462 81.6028C91.4032 68.1389 95.0232 53.2005 95.0012 38.0454V0.78121C95.0022 0.67875 94.9822 0.57722 94.9432 0.48246C94.9042 0.38769 94.8472 0.30155 94.7742 0.22897C94.7022 0.15639 94.6162 0.09881 94.5222 0.05951C94.4272 0.02022 94.3252 -9.99629e-06 94.2232 3.70555e-09H85.2272Z"
                fill-rule="evenodd"
                clip-rule="evenodd"
                fill="white"
              />
            </g>
          </svg>
        </div>
        <b style={{ letterSpacing: 2 }}>THE RAMCO CEMENTS LIMITED</b>
      </div>
      <div className="ttl">Certificate of Completion</div>
      <div className="small muted mt">This is to certify that</div>
      <div className="name">{user.name}</div>
      <div className="small muted">
        Employee ID {user.emp} · {user.dept} · {user.plant}
      </div>
      <div className="mt2" style={{ marginTop: 18 }}>
        has successfully completed the product knowledge examination for
      </div>
      <div style={{ fontSize: 21, fontWeight: 700, margin: "8px 0", color: "#0f1c33" }}>
        {pathOf(cert.topic)}
      </div>
      <div className="small">
        with a score of <b>{cert.score}%</b> against a pass requirement of{" "}
        <b>{ev ? ev.pass : 70}%</b>
      </div>
      <div className="seal">
        CERTIFIED
        <br />
        {String(cert.date).slice(0, 4)}
      </div>
      <div className="meta">
        <div>
          <b>{cert.id}</b>
          <br />
          Certificate ID
        </div>
        <div>
          <b>{cert.date}</b>
          <br />
          Date of issue
        </div>
        {/* <div><b>Meenakshi Iyer</b><br />Authorised Trainer</div>
        <div><b>Digitally verified</b><br />LearnCert Platform</div> */}
      </div>
    </div>
  );
}
