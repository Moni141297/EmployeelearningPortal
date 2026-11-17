import { useEffect, useState } from "react";
import { useStore } from "../../store/useStore";
import { api } from "../../lib/api";
import LiveBar from "./LiveBar";
import { StatusTag } from "../../components/ui/Tags";
import { initials } from "../../lib/helpers";
import { openUserEditor } from "./userEditor";

// Derive the user type directly from Zustand
type AppUser = ReturnType<typeof useStore.getState>["users"][number];

export default function Users() {
  const users = useStore((s) => s.users);
  const f = useStore((s) => s.userFilters);
  const setUserFilters = useStore((s) => s.setUserFilters);
  const toggleUserStatus = useStore((s) => s.toggleUserStatus);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [updatedAt, setUpdatedAt] = useState<Date | null>(null);

  // Initial load: Fetch existing records from lms_users.
  // No stored procedure execution here.
  useEffect(() => {
    let mounted = true;

    const loadUsers = async () => {
      try {
        setLoading(true);
        setError("");

        const rows = (await api.users.list()) as AppUser[];

        if (mounted) {
          useStore.setState({ users: rows || [] });
          setUpdatedAt(new Date());
        }
      } catch (err) {
        console.error("Error loading users:", err);

        if (mounted) {
          setError("Unable to load users.");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadUsers();

    return () => {
      mounted = false;
    };
  }, []);

  // Manual refresh: Execute stored procedure and fetch updated records.
  const refreshUsers = async () => {
    if (loading) return;

    try {
      setLoading(true);
      setError("");

      const rows = (await api.users.refresh()) as AppUser[];

      useStore.setState({ users: rows || [] });
      setUpdatedAt(new Date());
    } catch (err) {
      console.error("Error refreshing users:", err);
      setError("Unable to refresh user data.");
    } finally {
      setLoading(false);
    }
  };

  // LiveBar properties
  const live = {
    loading,
    error,
    updatedAt,
    refresh: refreshUsers,
  };

  // Apply filters
  let list = users;

  if (f.q) {
    list = list.filter((u) =>
      (u.name + u.emp + u.dept + u.plant).toLowerCase().includes(f.q.toLowerCase())
    );
  }

  if (f.role) {
    list = list.filter((u) => u.role === f.role);
  }

  if (f.status) {
    list = list.filter((u) => u.status === f.status);
  }

  return (
    <div>
      <div className="spread mb">
        <h2 style={{ fontSize: 20 }}>User management</h2>

        <div className="row">
          <button className="btn pri" onClick={() => openUserEditor(null)}>
            + Create user
          </button>
        </div>
      </div>

      <LiveBar live={live} />

      <div className="card pad mb">
        <div className="row wrap">
          <input
            className="inp"
            style={{ maxWidth: 250 }}
            placeholder="Search name, employee ID, plant…"
            value={f.q}
            onChange={(e) => setUserFilters({ q: e.target.value })}
          />

          <select
            className="inp"
            style={{ width: "auto" }}
            value={f.role}
            onChange={(e) => setUserFilters({ role: e.target.value })}
          >
            <option value="">All roles</option>
            <option>admin</option>
            <option>trainer</option>
            <option>participant</option>
          </select>

          <select
            className="inp"
            style={{ width: "auto" }}
            value={f.status}
            onChange={(e) => setUserFilters({ status: e.target.value })}
          >
            <option value="">Any status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>

          <div className="grow" />

          <span className="small muted">
            {list.length} of {users.length} users
          </span>
        </div>
      </div>

      <div className="card">
        <div className="tbl-wrap">
          <table>
            <thead>
              <tr>
                <th>Employee</th>
                <th>Employee ID</th>
                <th>Role</th>
                <th>Department</th>
                <th>Plant</th>
                <th>Status</th>
                <th>Created</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {!list.length && (
                <tr>
                  <td colSpan={8} className="muted small">
                    {loading
                      ? "Loading…"
                      : error
                        ? "Unable to load users."
                        : users.length
                          ? "No users match these filters."
                          : "No users found."}
                  </td>
                </tr>
              )}

              {list.map((u) => (
                <tr key={u.id}>
                  <td>
                    <div className="row">
                      <div
                        className="avatar"
                        style={{
                          width: 28,
                          height: 28,
                          fontSize: 10,
                        }}
                      >
                        {initials(u.name)}
                      </div>

                      <div>
                        <b className="small">{u.name}</b>
                        <div className="xs muted">{u.desig}</div>
                      </div>
                    </div>
                  </td>

                  <td className="mono small">{u.emp}</td>

                  <td>
                    <span
                      className={
                        "tag " + (u.role === "admin" ? "r" : u.role === "trainer" ? "p" : "b")
                      }
                    >
                      {u.role}
                    </span>
                  </td>

                  <td className="small">{u.dept}</td>
                  <td className="small">{u.plant}</td>

                  <td>
                    <StatusTag status={u.status} />
                  </td>

                  <td className="small muted">{u.created}</td>

                  <td className="right">
                    <button className="btn sm" onClick={() => openUserEditor(u.id)}>
                      Edit
                    </button>{" "}
                    <button
                      className={"btn sm " + (u.status === "Active" ? "dan" : "")}
                      onClick={() => toggleUserStatus(u.id)}
                    >
                      {u.status === "Active" ? "Deactivate" : "Activate"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
