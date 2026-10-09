'use client';

import React, { useContext, useMemo } from 'react';
import type { Citation } from '.';
import CitationWriter from './Writer';
import { H2 } from '@/components/BlogHeading';
import * as R from 'ramda';

type CitationPlus = Citation & { authorKey: string[] };

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

function getAuthorKey(input: string | undefined): string[] {
  if (!input) {
    return [];
  }

  const processed = input.replace(/(, )?et al.$/, ', ...');

  const parts = processed.split(/,\s*|,?\s*and\s*/);
  const keys = parts.map((part) => part.replace(/^.* /, ''));
  return keys.filter((value) => !!value);
}

function findReference(references: CitationPlus[], author: string): number {
  const searchKey = getAuthorKey(author);
  return references.findIndex((reference) => R.equals(reference.authorKey, searchKey));
}

function formatAuthor(input: string[]): string | undefined {
  if (input.length <= 1) {
    return input[0];
  } else if (input.length < 3) {
    return input[0] + ' and ' + input[1];
  } else {
    return input.slice(0, -1).join(', ') + ', and ' + input.at(-1);
  }
}

type ReferenceSpecifier = { n: number } | { author: string };
type ReferenceProps = ReferenceSpecifier & {
  style?: 'minimal' | 'author';
  details?: string;
};

const Reference: React.FC<ReferenceProps> = (props) => {
  const references = useContext(CitationContext);
  const { details } = props;
  let index: number;
  let style = props.style;
  if ('n' in props) {
    index = props.n - 1;
    style ||= 'minimal';
  } else {
    const { author } = props;
    index = findReference(references, author);
    style ||= 'author';
  }

  const reference = references[index];

  if (!reference) {
    return <>[Citation Needed]</>;
  }

  // displayed citation numbers are 1 indexed
  index += 1;

  let refString = `${index}`;
  if (details) {
    refString += `, ${details}`;
  }

  switch (style) {
    case 'author':
      const { authorKey } = reference;
      return (
        <>
          {formatAuthor(authorKey)}{' '}
          <a href={`#citation-${index}`} className="invisible-link">
            [{refString}]
          </a>
        </>
      );
    case 'minimal':
      return (
        <a href={`#citation-${index}`} className="invisible-link">
          [{refString}]
        </a>
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
