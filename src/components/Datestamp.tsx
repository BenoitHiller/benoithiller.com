'use client';

import { formatTimestamp } from '@/components/Timestamp';
import { useIsClient } from '@/components/ClientContext';

// I'm taking an opinionated stand here that the only reasonable format to
// represent year-month-day is in that order. This is not something you want to
// do in general, but this is a personal website so it is okay for me to
// provide a better experience to people who might otherwise be subjected to
// month/day/year.
const DATE_FORMAT = new Intl.DateTimeFormat('en-CA', { dateStyle: 'short' });

const Datestamp: React.FC<{ value: Date }> = ({ value }) => {
  const isClient = useIsClient();

  // This is all just to offer a precise timestamp on hover, but that is worth
  // it. It would be hard to overstate the value of knowing precise creation
  // times for even seeminly unimportant documents.
  const locale = isClient ? undefined : process.env.fallbackLocale;
  const timeZone = isClient ? undefined : process.env.fallbackTimeZone;

  return (
    <time title={formatTimestamp(value, locale, timeZone)} dateTime={value.toISOString()}>
      {DATE_FORMAT.format(value)}
    </time>
  );
};

export default Datestamp;
