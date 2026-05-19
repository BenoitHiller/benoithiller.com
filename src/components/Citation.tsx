import React from 'react';
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
class CitationWriter<T extends { [K in keyof T]: React.ReactNode }> {
  private data: T;
  private nodes: React.ReactNode[];

  constructor(data: T) {
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
  format(key: keyof T, template: string) {
    const value = this.data[key];
    if (value) {
      // For now it is safe to put spaces between the individual elements and allow whitespace
      // collapsing to remove the initial one. There may eventually be cases where we need to be
      // more clever though.
      this.write(' ');
      const matches = template.matchAll(FORMAT_REGEX);
      for (const match of matches) {
        const key = match.groups?.['key'];
        if (key) {
          switch (key) {
            case 's':
              this.write(value);
              break;
            case 'italic':
              this.write(<i key={`${key} ${match}`}>{value}</i>);
              break;
            case 'url':
              this.write(
                <a
                  key={`${key} ${match}`}
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

interface ArticleProps {
  author?: string;
  title: string;
  journal: string;
  month: string;
  year: string;
  volume: number;
  number: number;
  doi?: string;
  pages: string;
}

const Article: React.FC<ArticleProps> = (props) => {
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

interface BlogProps {
  author?: string;
  title: string;
  journal?: string;
  month: string;
  day: string;
  year: string;
  url: string;
}

const Blog: React.FC<BlogProps> = (props) => {
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

interface LectureNotesProps {
  author?: string;
  title: string;
  year: string;
  howpublished: string;
  url: string;
}

const LectureNotes: React.FC<LectureNotesProps> = (props) => {
  const writer = new CitationWriter(props);

  writer.format('author', '%s.');
  writer.format('year', '(%s).');
  writer.format('title', '%s');
  writer.format('howpublished', '[%s].');
  writer.format('url', 'Available: %url');

  return writer.render();
};

interface BookProps {
  author: string;
  title: string;
  year: string;
  country?: string;
  state?: string;
  city?: string;
  publisher: string;
  edition?: string;
}

const Book: React.FC<BookProps> = (props) => {
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

interface MastersThesisProps {
  author: string;
  title: string;
  year: string;
  school: string;
  country?: string;
  state?: string;
  city?: string;
  month?: string;
  day?: string;
  url?: string;
}

const MastersThesis: React.FC<MastersThesisProps> = (props) => {
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

export { Article, Blog, Book, LectureNotes, MastersThesis };
