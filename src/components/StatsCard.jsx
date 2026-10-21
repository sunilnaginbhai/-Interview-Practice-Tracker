
const StatsCard = ({ label, value, icon }) => {
    return (
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
                <p className="text-xs font-medium text-gray-500">{label}</p>
                {icon && <span className="text-lg">{icon}</span>}
            </div>
            <p className="mt-1 text-2xl font-bold text-gray-900">{value}</p>
        </div>
    );
}

export default StatsCard;