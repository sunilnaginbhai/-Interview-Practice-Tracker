const ProgressBar = ({ percent }) => {
    const safe = Math.min(100, Math.max(0, percent || 0));

    return (
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Overall Progress</span>
                <span className="text-sm font-semibold text-gray-900">{safe}%</span>
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200">
                <div
                    className="h-full rounded-full bg-green-500 transition-all duration-500"
                    style={{ width: `${safe}%` }}
                />
            </div>
        </div>
    );
};

export default ProgressBar;