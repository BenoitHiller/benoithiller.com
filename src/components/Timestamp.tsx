'use client';

import useIsClient from '@/useIsClient';

const DATETIME_FORMAT: Intl.DateTimeFormatOptions = {
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  month: 'long',
  timeZoneName: 'short',
  year: 'numeric'
};

function formatTimestamp(
  value: Date,
  locale?: string,
  timeZone?: string,
  format?: Intl.DateTimeFormatOptions
) {
  const selectedFormat = format ?? DATETIME_FORMAT;

  return value.toLocaleString(locale, Object.assign({ timeZone }, selectedFormat));
}

const Timestamp: React.FC<{ value: Date; format?: Intl.DateTimeFormatOptions }> = ({
  value,
  format
}) => {
  const isClient = useIsClient();

  // render with a fixed default timezone and locale on the server and then
  // swap that out on the client.
  const locale = isClient ? undefined : process.env.fallbackLocale;
  const timeZone = isClient ? undefined : process.env.fallbackTimeZone;

  return (
    <time dateTime={value.toISOString()}>{formatTimestamp(value, locale, timeZone, format)}</time>
  );
};

export { formatTimestamp };
export default Timestamp;
