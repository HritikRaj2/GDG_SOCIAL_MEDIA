export default function LoadingSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="bg-gray-800 rounded-xl p-4 animate-pulse space-y-3"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-700 rounded-full" />
            <div className="space-y-1 flex-1">
              <div className="h-3 bg-gray-700 rounded w-1/3" />
              <div className="h-2 bg-gray-700 rounded w-1/4" />
            </div>
          </div>
          <div className="h-4 bg-gray-700 rounded w-3/4" />
          <div className="h-4 bg-gray-700 rounded w-1/2" />
          <div className="h-40 bg-gray-700 rounded-lg" />
          <div className="flex gap-4">
            <div className="h-6 w-16 bg-gray-700 rounded" />
            <div className="h-6 w-16 bg-gray-700 rounded" />
            <div className="h-6 w-16 bg-gray-700 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}
