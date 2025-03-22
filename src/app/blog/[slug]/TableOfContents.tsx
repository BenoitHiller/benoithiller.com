'use client';

import type { Toc, TocEntry } from '@stefanprobst/rehype-extract-toc';
import type React from 'react';
import { useEffect, useState, useContext, createContext } from 'react';
import Link from 'next/link';
import * as R from 'ramda';
import classNames from 'classnames';
import debounce from 'lodash.debounce';

const CurrentIdContext = createContext<string | null>(null);

const Entry: React.FC<{ entry: TocEntry }> = ({ entry }) => {
  const { id, value, children } = entry;
  const currentId = useContext(CurrentIdContext);

  const className = classNames('inline-block text-sm/8 text-gray-600 hover:text-gray-950', {
    'font-semibold': currentId == id
  });

  return (
    <li className="flex flex-col">
      <Link className={className} href={`#${id}`}>
        {value}
      </Link>
      <Section entries={children} />
    </li>
  );
};

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

const TableOfContents: React.FC<{ className?: string; entries: Toc }> = ({
  className,
  entries
}) => {
  const [currentId, setCurrentId] = useState<string | null>(null);

  // I'm using a scroll and resize handler her in place of an
  // IntersectionObserver because sadly that would require me to transform the
  // output from the MDX to add in sections. As to check if a given section
  // insersects with the viewport, well you need the section to check.
  useEffect(() => {
    // Cache the headings under the assumption that they can only change when
    // the passed Toc is updated.
    //
    // We save the list in reverse so that we can easily find the lowest
    // element that is above a certain point on the page.
    const headings = R.reverse(
      Array.from(document.querySelectorAll<HTMLElement>('article :is(h2, h3, h4)'))
    );

    const rootElement = document.documentElement;

    const updateHeading = () => {
      const lowerSelectionLimit = (rootElement.clientHeight - 56) / 2 + 56;
      const lowerBound = lowerSelectionLimit + rootElement.scrollTop;

      const selectedHeading = R.find((heading) => heading.offsetTop < lowerBound, headings);

      if (selectedHeading) {
        setCurrentId(selectedHeading.id);
      } else {
        setCurrentId(null);
      }
    };

    const debouncedUpdate = debounce(updateHeading, 100);

    // Call the function immediately to compute the initial heading to highlight.
    updateHeading();

    // We don't want to throttle or debounce the scroll event because then it
    // lags obviously when the user scrolls quickly. The scroll event should
    // max out at once per frame and we should instead make an effort to do
    // work that fits well in a single frame.
    window.addEventListener('scroll', updateHeading);
    // Meanwhile the resize even is not at all suspicious if it waits until the
    // user is done resizing before it updates the highlighted heading so we
    // it is safe to debounce.
    window.addEventListener('resize', debouncedUpdate);

    return () => {
      window.removeEventListener('scroll', updateHeading);
      window.removeEventListener('resize', debouncedUpdate);
      debouncedUpdate.cancel();
    };
  }, [entries]);

  return (
    <div className={classNames('flex flex-col gap-2', className)}>
      <h3>Contents</h3>
      <CurrentIdContext value={currentId}>
        <Section entries={entries} />
      </CurrentIdContext>
    </div>
  );
};

export default TableOfContents;
