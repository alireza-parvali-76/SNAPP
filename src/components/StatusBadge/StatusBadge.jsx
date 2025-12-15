export function StatusBadge({ label, value, icon }) {
  return (
    <div className="flex items-center gap-1 bg-white px-3 py-1.5 rounded-full shadow-sm whitespace-nowrap">
      <span>{icon}</span>
      <span className="text-gray-500">{label}:</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
