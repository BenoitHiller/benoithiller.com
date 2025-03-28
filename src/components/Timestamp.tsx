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
  const [isClient, setClient] = useState(false);

  // render with a fixed default timezone and locale on the server and then
  // swap that out on the client.
  const locale = isClient ? undefined : process.env.fallbackLocale;
  const timeZone = isClient ? undefined : process.env.fallbackTimeZone;

  useEffect(() => {
    setClient(true);
  }, []);

  const selectedFormat = format ?? (date ? DATE_FORMAT : DATETIME_FORMAT);

  return <>{value.toLocaleString(locale, Object.assign({ timeZone }, selectedFormat))}</>;
};

export default Timestamp;
