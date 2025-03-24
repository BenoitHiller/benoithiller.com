'use client';

import { useState, useEffect } from 'react';

const DATETIME_FORMAT: Intl.DateTimeFormatOptions = {
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  month: 'long',
  timeZoneName: 'short',
  year: 'numeric'
};

const DATE_FORMAT: Intl.DateTimeFormatOptions = {
  dateStyle: 'short'
};

const Timestamp: React.FC<{ value: Date; date?: boolean; format?: Intl.DateTimeFormatOptions }> = ({
  value,
  date,
  format
}) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const selectedFormat = format ?? (date ? DATE_FORMAT : DATETIME_FORMAT);
  // render without en-US on the server and then swap that out on the client.
  const locale = mounted ? undefined : 'en-US';

  return <>{value.toLocaleString(locale, selectedFormat)}</>;
};

export default Timestamp;
