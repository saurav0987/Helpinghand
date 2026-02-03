import React from 'react';

const DataTable = ({ columns, rows }) => (
  <div className="overflow-x-auto rounded-xl border border-slate-100">
    <table className="min-w-full divide-y divide-slate-200 text-sm">
      <thead className="bg-slate-50">
        <tr>
          {columns.map((col) => (
            <th key={col.key} className="px-4 py-3 text-left font-semibold text-slate-600">
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-100 bg-white">
        {rows.map((row, index) => (
          <tr key={row.id || index} className="hover:bg-slate-50">
            {columns.map((col) => (
              <td key={col.key} className="px-4 py-3 text-slate-700">
                {row[col.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default DataTable;
