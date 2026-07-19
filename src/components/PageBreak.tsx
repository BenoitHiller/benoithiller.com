import type React from 'react';

const PageBreak: React.FC = () => (
  <div className="hidden print:block overflow-hidden break-after-page">
    <div className="break-after-page" />
  </div>
);

export default PageBreak;
