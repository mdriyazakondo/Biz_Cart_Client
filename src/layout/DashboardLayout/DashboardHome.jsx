import StatCard from "../components/StatCard";
import ActionButton from "../components/ActionButton";

const DashboardHome = () => {
  return (
    <>
      <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
        <StatCard label="Revenue" value="$84,254" />
        <StatCard label="Sessions" value="1,240" />
        <StatCard label="Tasks" value="12" />
        <StatCard label="Conversions" value="3.8%" />
      </div>

      <div className="bg-[#0f172a] p-8 rounded-3xl border border-slate-800">
        Main chart goes here
      </div>
    </>
  );
};

export default DashboardHome;
