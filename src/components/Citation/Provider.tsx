'use client';

import React, { useContext, useMemo } from 'react';
import type { Citation } from '.';
import CitationWriter from './Writer';
import { H2 } from '@/components/BlogHeading';

type CitationPlus = Citation & { authorKey: string | null };

const CitationContext = React.createContext<CitationPlus[]>([]);

class Name {
  private readonly names: string[];

  constructor(names: string[]) {
    this.names = names;
  }

  last(): string {
    return this.names[this.names.length - 1];
  }

  matchesLast(other: Name): boolean {
    return this.last() == other.last();
  }

  static parse(input: string): Name {
    return new Name(input.split(' '));
  }

  static parseList(input: string): Name[] {
    const parts = input.split(/, |,? and /);
    return parts.map(Name.parse);
  }

  static toRef(input: string): string {
    return Name.parseList(input)
      .map((item) => item.last().toLowerCase())
      .join('-');
  }
}

function getAuthorKey(input: string | undefined): string | null {
  if (!input) {
    return null;
  }

  const processed = input.replace(/(, )?et al.$/, ', ...');

  const parts = processed.split(/,\s*|,?\s*and\s*/);
  const keys = parts.map((part) => part.replace(/^.* /, ''));
  return keys.filter((value) => !!value).join(',');
}

function findReference(references: CitationPlus[], author: string): number {
  const searchKey = getAuthorKey(author);
  return references.findIndex((reference) => reference.authorKey == searchKey);
}

type ReferenceProps = { n: number } | { author: string };

const Reference: React.FC<ReferenceProps> = (props) => {
  const references = useContext(CitationContext);

  if ('n' in props) {
    const n = props.n;

    return (
      <a href={`#citation-${n}`} className="invisible-link">
        [{n}]
      </a>
    );
  } else {
    const { author } = props;
    const match = findReference(references, author);
    if (match < 0) {
      return <>[Citation Needed]</>;
    }

    const n = match + 1;
    return (
      <>
        {author}{' '}
        <a href={`#citation-${n}`} className="invisible-link">
          [{n}]
        </a>
      </>
    );
  }
};

const Bibliography: React.FC = () => {
  const references = useContext(CitationContext);
  return (
    <>
      <H2 id="citations">References</H2>
      <ol>
        {references.map((citation, i) => {
          const id = `${i + 1}`;

          return (
            <li key={i} id={`citation-${id}`} className="target:font-semibold">
              <CitationWriter citation={citation} />
            </li>
          );
        })}
      </ol>
    </>
  );
};

const Provider: React.FC<{ value: Citation[]; children: React.ReactNode }> = ({
  value,
  children
}) => {
  const citations = useMemo(() => {
    return value.map((citation) => ({ ...citation, authorKey: getAuthorKey(citation.author) }));
  }, [value]);

  return <CitationContext value={citations}>{children}</CitationContext>;
};

export { Bibliography, Reference, CitationContext };
export default Provider;
