import { useEffect, useState } from 'react';
import { NavLink, Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { initials } from '../../lib/helpers';
import { NAV } from './navConfig';
import { titleForPath } from './pageTitles';
import GlobalSearch from './GlobalSearch';
import NotifsModal from './NotifsModal';

export default function AppShell() {
  const currentUser = useStore((s) => s.currentUser);
  const logout = useStore((s) => s.logout);
  const notifs = useStore((s) => s.notifs);
  const expertQs = useStore((s) => s.expertQs);
  const navigate = useNavigate();
  const location = useLocation();
  const [sideOpen, setSideOpen] = useState(false);
  const [notifsOpen, setNotifsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const storedCollapsed = useStore((s) => s.sidebarCollapsed);
  // Below 821px the sidebar is an off-canvas drawer (see index.css): the
  // icon-only collapsed mode is a desktop affordance, so the drawer always
  // shows full labels regardless of the saved desktop preference.
  const [isDrawer, setIsDrawer] = useState(() => typeof window !== 'undefined' && window.matchMedia('(max-width: 820px)').matches);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 820px)');
    const on = () => setIsDrawer(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  const collapsed = storedCollapsed && !isDrawer;
  const setSidebarCollapsed = useStore((s) => s.setSidebarCollapsed);
  function toggleCollapsed() {
    setSidebarCollapsed(!storedCollapsed);
  }

  if (!currentUser) return <Navigate to="/login" replace />;

  const crumbTitle = titleForPath(location.pathname);

  const sections = NAV[currentUser.role];
  const unread = notifs.filter((n) => !n.read).length;
  const pendingExpert = expertQs.filter((x) => x.status === 'Raised').length;

  return (
    <div className={'shell' + (collapsed ? ' collapsed' : '')}>
      {sideOpen && <div className="sidebackdrop" onClick={() => setSideOpen(false)} />}
      <aside className={'side' + (sideOpen ? ' open' : '')}>
        <div className="brandbox">
          <div className="logo">
            <div className="logo-mark">LMS</div>
            {!collapsed && (
              <div>
                <b>Learning Platform</b>
                <div className="xs" style={{ color: '#64748b' }}>Product Learning &amp; Certification</div>
              </div>
            )}
          </div>
          <button type="button" className="sidebar-collapse-btn" title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'} onClick={toggleCollapsed}>
            {collapsed ? '›' : '‹'}
          </button>
        </div>
        {sections.map((sec) => (
          <div key={sec.title}>
            {!collapsed && <div className="navsec">{sec.title}</div>}
            <div className="nav">
              {sec.items.map((item) => {
                 const Icon = item.icon;
                return(
                <NavLink key={item.to} to={item.to} className={({ isActive }) => (isActive ? 'on' : '')} onClick={() => setSideOpen(false)} title={collapsed ? item.label : undefined}>
                  <span className="ic">
                    <Icon
                        size={18}
                        strokeWidth={1.8}
                        aria-hidden="true"
                      /></span>
                  {!collapsed && item.label}
                  {item.pillKey === 'expert' && pendingExpert > 0 && <span className="pill">{pendingExpert}</span>}
                </NavLink>
              )})}
            </div>
          </div>
        ))}
        {/* <div className="sidefoot">
          Signed in as <b style={{ color: '#c7d2e4' }}>{currentUser.name}</b><br />
          {currentUser.emp} · {currentUser.role.toUpperCase()}
          <div style={{ marginTop: 8 }}>
            <a onClick={() => { logout(); navigate('/login'); }} style={{ color: '#93c5fd', cursor: 'pointer' }}>Sign out</a>
          </div>
        </div> */}
      </aside>
      <div className="main">
        <div className="topbar">
          <button className="iconbtn menu-toggle" onClick={() => setSideOpen((v) => !v)}>☰</button>
          <div className="crumb"><b>{crumbTitle}</b></div>
          <div className="grow" />
          <GlobalSearch />
          <button className="iconbtn" onClick={() => setNotifsOpen(true)}>
            🔔{unread > 0 && <span className="dot">{unread}</span>}
          </button>
          <div className="profilewrap">
            <div className="avatar" title={currentUser.name} onClick={() => setProfileOpen((v) => !v)} style={{ cursor: 'pointer' }}>
              {initials(currentUser.name)}
            </div>
            {profileOpen && (
              <>
                <div className="profilebackdrop" onClick={() => setProfileOpen(false)} />
                <div className="profilecard">
                  <div className="profilecard-name">{currentUser.name}</div>
                  <div className="profilecard-row"><span>{currentUser.emp}</span></div>
                  <div className="profilecard-row"><span>{currentUser.role.toUpperCase()}</span></div>
                  <button className="btn" style={{ width: '100%', marginTop: 10, alignItems: 'center' }} onClick={() => { setProfileOpen(false); logout(); navigate('/login'); }}>Sign out</button>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="content">
          <Outlet />
        </div>
      </div>
      {notifsOpen && <NotifsModal onClose={() => setNotifsOpen(false)} />}
    </div>
  );
}
