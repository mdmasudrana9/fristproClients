import { useState, useEffect } from "react";

export default function AppTableLoader() {
  const [isPulsing, setIsPulsing] = useState(true);

  // Toggle the pulsing effect for visual feedback
  useEffect(() => {
    const interval = setInterval(() => {
      setIsPulsing((prev) => !prev);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  // Generate skeleton rows
  const renderSkeletonRows = (count: any) => {
    return Array(count)
      .fill(0)
      .map((_, index) => (
        <tr key={index} className="border-b border-gray-200">
          {Array(5)
            .fill(0)
            .map((_, cellIndex) => (
              <td key={cellIndex} className="py-3 px-4">
                <div
                  className={`h-4 rounded ${
                    isPulsing ? "bg-gray-300" : "bg-gray-200"
                  } transition-colors duration-500`}
                ></div>
              </td>
            ))}
        </tr>
      ));
  };

  return (
    <div className="w-full overflow-hidden shadow-md rounded-lg border border-gray-200">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-gray-100 border-b border-gray-200">
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <th key={index} className="py-3 px-4 text-left">
                  <div
                    className={`h-5 w-24 rounded ${
                      isPulsing ? "bg-gray-300" : "bg-gray-200"
                    } transition-colors duration-500`}
                  ></div>
                </th>
              ))}
          </tr>
        </thead>
        <tbody>{renderSkeletonRows(6)}</tbody>
      </table>
    </div>
  );
}
