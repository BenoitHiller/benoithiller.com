import type { Toc, TocEntry } from '@stefanprobst/rehype-extract-toc';
import type React from 'react';
import Link from 'next/link';

const Section: React.FC<{ entries?: Toc }> = ({ entries }) => {
  if (!entries || !entries.length) {
    return null;
  }

  return (
    <ul className="flex flex-col pl-3">
      {entries.map((entry) => (
        <Entry key={entry.id} entry={entry} />
      ))}
    </ul>
  );
};

const Entry: React.FC<{ entry: TocEntry }> = ({ entry }) => {
  const { id, value, children } = entry;
  return (
    <li className="flex flex-col">
      <Link className="inline-block text-sm/8 text-gray-600 hover:text-gray-950" href={`#${id}`}>
        {value}
      </Link>
      <Section entries={children} />
    </li>
  );
};

const TableOfContents: React.FC<{ className?: string; entries: Toc }> = ({
  className,
  entries
}) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <h3>Contents</h3>
      <Section entries={entries} />
    </div>
  );
};

export default TableOfContents;
