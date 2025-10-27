import { useState } from "react";

function SalaryRangeSlider({ filters, handleFilterChange }) {
  const [minSalary, setMinSalary] = useState(filters?.minSalary || 0);
  const [maxSalary, setMaxSalary] = useState(filters?.maxSalary || 0);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Minimum Salary */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Min Salary
          </label>
          <input
            type="number"
            placeholder="0"
            min="0"
            step="1000"
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={minSalary || ""}
            onChange={({ target }) => setMinSalary(target.value)}
            onBlur={() =>
              handleFilterChange(
                "minSalary",
                minSalary ? parseInt(minSalary) : ""
              )
            }
          />
        </div>

        {/* Maximum Salary */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Max Salary
          </label>
          <input
            type="number"
            placeholder="No limit"
            min="0"
            step="1000"
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={maxSalary || ""}
            onChange={({ target }) => setMaxSalary(target.value)}
            onBlur={() =>
              handleFilterChange(
                "maxSalary",
                maxSalary ? parseInt(maxSalary) : ""
              )
            }
          />
        </div>
      </div>

      {/* Display current range */}
      {(minSalary || maxSalary) && (
        <div className="text-sm text-gray-600 bg-gray-100 px-3 py-2 rounded-xl">
          Range:{" "}
          {minSalary ? `$${Number(minSalary).toLocaleString()}` : "$0"} -{" "}
          {maxSalary ? `$${Number(maxSalary).toLocaleString()}` : "No limit"}
        </div>
      )}
    </div>
  );
}

export default SalaryRangeSlider;
