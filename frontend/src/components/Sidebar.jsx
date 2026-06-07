import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";
import {
  LayoutDashboard,
  FolderOpen,
  Briefcase,
  Wallet,
  LogOut,
} from "lucide-react";

const navItems = [
  { to: "/", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/projects", icon: FolderOpen, label: "Projects" },
  { to: "/portfolio", icon: Briefcase, label: "Portfolio" },
  { to: "/wallet", icon: Wallet, label: "Wallet" },
];

export default function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((s) => s.auth.user);

  function handleLogout() {
    dispatch(logout());
    navigate("/login");
  }

  return (
    <aside className="w-64 min-h-screen bg-stone-900 flex flex-col shrink-0">
      
      <div className="px-6 py-7 border-b border-stone-700">
        <span className="text-2xl font-bold text-amber-400 tracking-tight">
          FundFlow
        </span>
        <p className="text-stone-400 text-xs mt-0.5">Investor Platform</p>
      </div>

      
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                isActive
                  ? "bg-amber-400 text-stone-900"
                  : "text-stone-400 hover:bg-stone-800 hover:text-white"
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* User info + logout */}
      <div className="px-4 py-5 border-t border-stone-700">
        <div className="flex items-center gap-3 px-3 mb-4">
          <div className="w-9 h-9 rounded-full bg-amber-400 flex items-center justify-center text-stone-900 font-bold text-sm shrink-0">
            {user?.name?.[0]?.toUpperCase() ?? "U"}
          </div>
          <div className="min-w-0">
            <p className="text-white text-sm font-medium truncate">
              {user?.name ?? "Investor"}
            </p>
            <p className="text-stone-500 text-xs truncate">{user?.email ?? ""}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-stone-400 hover:bg-red-900/30 hover:text-red-400 text-sm transition-colors"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </aside>
  );
}
