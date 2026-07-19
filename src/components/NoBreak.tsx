import type React from 'react';

const NoBreak: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="break-inside-avoid no-break">{children}</div>
);

export default NoBreak;
