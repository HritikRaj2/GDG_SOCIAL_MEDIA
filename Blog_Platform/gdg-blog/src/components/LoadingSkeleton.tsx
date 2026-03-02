'use client';

export default function LoadingSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-gray-800 border border-gray-700 rounded-xl p-6 animate-pulse">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gray-700"></div>
            <div className="space-y-2 flex-1">
              <div className="h-4 bg-gray-700 rounded w-1/4"></div>
              <div className="h-3 bg-gray-700 rounded w-1/6"></div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-700 rounded w-3/4"></div>
            <div className="h-4 bg-gray-700 rounded w-1/2"></div>
          </div>
          <div className="mt-4 h-48 bg-gray-700 rounded-lg"></div>
          <div className="flex space-x-4 mt-4">
            <div className="h-8 bg-gray-700 rounded w-16"></div>
            <div className="h-8 bg-gray-700 rounded w-16"></div>
            <div className="h-8 bg-gray-700 rounded w-16"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
