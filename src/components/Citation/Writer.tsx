import React from 'react';
import type { CitationProps, Citation } from '.';

/**
 * @module components/Citation
 *
 * Simple renderer for the IEEE citation format.
 *
 * The individual items in the bibliography are defined using React components with props that
 * mirror those used in BibTex.
 *
 * Style guide:
 *   https://docs.google.com/document/d/1j1L96U2NagwWI9MEVDNVKt9pXxRzTH7h3krI3Mb6wZE/edit?tab=t.0
 *
 * Note: there is one major place where the output deviates from IEEE, which is that while urls are
 * not styled as being hyperlinked they are still linked. As having the links not work for no reason
 * on a website would be obnoxious.
 */

const FORMAT_REGEX = /%(?<key>\w+);?|[^%]+|%%/g;

/**
 * Outputs formatted React using a printf style format definition to append values based on the data
 * object the writer is initialized with.
 */
class CitationWriter<T extends string> {
  private data: CitationProps<T>;
  private nodes: React.ReactNode[];

  constructor(data: CitationProps<T>) {
    this.data = data;
    this.nodes = [];
  }

  /**
   * Append the value for a given key, using the specified formatting template to render it.
   *
   * The format replacements are defined as being `%\w+;?`, meaning a % followed by some number of
   * alphanumeric characters or underscores, then optionally terminated with a semicolon.
   *
   * This ends up forming something more similar to {} based formatting, but using the {} characters
   * in particular in react is obnoxious because those are the characters used for substitutions.
   *
   * The current implementation accepts only a single argument to be inserted in place of all of the
   * defined replacements.
   *
   * The supported replacement sequences are:
   * * %s which inserts the provided value as is.
   * * %italic which inserts the value wrapped in <i> tags
   * * %url which inserts the value wrapped in a <a> tag with href also set to value
   * * %% which inserts the % character
   *
   * Some styling is applied to the %url components specifically for use in citations.
   */
  format(key: keyof CitationProps<T>, template: string) {
    const value = this.data[key] as React.ReactNode;
    if (value) {
      // For now it is safe to put spaces between the individual elements and allow whitespace
      // collapsing to remove the initial one. There may eventually be cases where we need to be
      // more clever though.
      this.write(' ');
      const matches = template.matchAll(FORMAT_REGEX);
      for (const match of matches) {
        const formatter = match.groups?.['key'];
        if (formatter) {
          switch (formatter) {
            case 's':
              this.write(value);
              break;
            case 'italic':
              this.write(<i key={`${String(key)} ${match}`}>{value}</i>);
              break;
            case 'url':
              this.write(
                <a
                  key={`${String(key)} ${match}`}
                  href={`${value}`}
                  target="_blank"
                  className="invisible-link"
                >
                  {value}
                </a>
              );
              break;
          }
        } else if (match[0] === '%%') {
          this.write('%');
        } else {
          this.write(match[0]);
        }
      }
    }
  }

  /**
   * Append content directly without formatting anything.
   *
   * Note that when the value is a ReactElement it should have a key specified to avoid a warning.
   * The formatter is normally responsible for adding necessary keys, so this is not done
   * automatically for you when using this method directly.
   */
  write(value: React.ReactNode) {
    this.nodes.push(value);
  }

  render(): React.ReactNode {
    return <span>{this.nodes}</span>;
  }
}

const Article: React.FC<CitationProps<'article'>> = (props) => {
  const writer = new CitationWriter(props);
  writer.format('author', '%s,');
  writer.format('title', '"%s,"');
  writer.format('journal', '%italic,');
  writer.format('volume', 'vol. %s,');
  writer.format('number', 'no. %s,');
  writer.format('pages', 'pp. %s,');
  writer.format('month', '%s.');
  writer.format('year', '%s,');
  writer.format('doi', 'doi: %url');
  writer.write('.');

  return writer.render();
};

const Blog: React.FC<CitationProps<'blog'>> = (props) => {
  const writer = new CitationWriter(props);

  writer.format('author', '%s,');
  writer.format('title', '"%s",');
  writer.format('journal', '%s,');
  writer.format('month', '%s,');
  writer.format('day', '%s,');
  writer.format('year', '%s,');
  writer.write(' [Online].');
  writer.format('url', 'Available: %url');

  return writer.render();
};

const Book: React.FC<CitationProps<'book'>> = (props) => {
  const writer = new CitationWriter(props);

  writer.format('author', '%s,');
  writer.format('title', '%italic,');
  writer.format('edition', '%s ed.');
  writer.format('city', '%s,');
  writer.format('state', '%s,');
  writer.format('country', '%s:');
  writer.format('publisher', '%s,');
  writer.format('year', '%s');
  writer.write('.');

  return writer.render();
};

const ConferenceProceedings: React.FC<CitationProps<'conference-proceedings'>> = (props) => {
  const writer = new CitationWriter(props);

  writer.format('author', '%s,');
  writer.format('title', '"%s,"');
  writer.format('conference', 'in %italic,');
  writer.format('year', '%s,');
  writer.format('pages', 'pp. %s,');
  writer.format('doi', 'doi: %url');
  writer.write('.');

  return writer.render();
};

const GovernmentProceeding: React.FC<CitationProps<'government-proceeding'>> = (props) => {
  const writer = new CitationWriter(props);

  writer.format('country', '%s,');
  writer.format('legislativeBody', '%s,');
  writer.format('parliament', '%s,');
  writer.format('session', '%s.');
  writer.format('year', '(%s,');
  writer.format('month', '%s.');
  writer.format('day', '%s).');
  writer.format('number', '%italic,');
  writer.format('title', '%italic.');
  writer.format('url', '[Online]. Available: %url');

  return writer.render();
};

const GovernmentAct: React.FC<CitationProps<'government-act'>> = (props) => {
  const writer = new CitationWriter(props);

  writer.format('country', '%s');
  writer.format('title', '%italic.');
  writer.format('number', '%italic,');
  writer.format('year', '(%s,');
  writer.format('month', '%s.');
  writer.format('day', '%s).');
  writer.format('url', '[Online]. Available: %url');

  return writer.render();
};

const LectureNotes: React.FC<CitationProps<'lecture-notes'>> = (props) => {
  const writer = new CitationWriter(props);

  writer.format('author', '%s.');
  writer.format('year', '(%s).');
  writer.format('title', '%s');
  writer.format('howpublished', '[%s].');
  writer.format('url', 'Available: %url');

  return writer.render();
};

const MastersThesis: React.FC<CitationProps<'masters-thesis'>> = (props) => {
  const writer = new CitationWriter(props);

  writer.format('author', '%s,');
  writer.format('title', '"%s,"');
  writer.write(' M.S. Thesis,');
  writer.format('school', '%s,');
  writer.format('city', '%s,');
  writer.format('state', '%s,');
  writer.format('country', '%s,');
  writer.format('month', '%s,');
  writer.format('day', '%s,');
  writer.format('year', '%s');
  writer.write('.');
  writer.format('url', '[Online]. Available: %url');

  return writer.render();
};

const Writer: React.FC<{ citation: Citation }> = ({ citation }) => {
  switch (citation.type) {
    case 'article':
      return <Article {...citation} />;
    case 'blog':
      return <Blog {...citation} />;
    case 'book':
      return <Book {...citation} />;
    case 'conference-proceedings':
      return <ConferenceProceedings {...citation} />;
    case 'government-act':
      return <GovernmentAct {...citation} />;
    case 'government-proceeding':
      return <GovernmentProceeding {...citation} />;
    case 'lecture-notes':
      return <LectureNotes {...citation} />;
    case 'masters-thesis':
      return <MastersThesis {...citation} />;
  }
};

export default Writer;
