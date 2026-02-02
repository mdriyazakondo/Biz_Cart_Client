import { NavLink } from "react-router";

const SidebarItem = ({ to, label, icon: Icon, onClick }) => {
  return (
    <NavLink
      to={to}
      end
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center gap-4 w-full px-4 py-3.5 rounded-2xl transition-all duration-200
        ${
          isActive
            ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
            : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
        }`
      }
    >
      {Icon && <Icon className={`text-xl ${"text-blue-400"}`} />}
      <span className="text-sm font-semibold tracking-tight">{label}</span>
    </NavLink>
  );
};

export default SidebarItem;
