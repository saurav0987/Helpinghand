import React from 'react';

const SectionCard = ({ title, children, action }) => (
  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
    <div className="flex items-center justify-between">
      <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
      {action}
    </div>
    <div className="mt-4">{children}</div>
  </div>
);

export default SectionCard;
