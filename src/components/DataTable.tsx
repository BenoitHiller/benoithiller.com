import React from 'react';

type HeadingGroup = [string, string[]];

const Table: React.FC<React.ComponentPropsWithoutRef<'table'>> = (props) => (
  <table className="border-collapse border border-gray-400" {...props} />
);
const THead: React.FC<React.ComponentPropsWithoutRef<'thead'>> = (props) => (
  <thead className="bg-gray-50" {...props} />
);
const TH: React.FC<React.ComponentPropsWithoutRef<'th'>> = (props) => (
  <th className="text-left p-3 border border-gray-300" {...props} />
);
const TD: React.FC<React.ComponentPropsWithoutRef<'td'>> = (props) => (
  <td className="text-left p-3 border border-gray-300" {...props} />
);

const Head: React.FC<{
  headings: (string | HeadingGroup)[];
}> = ({ headings }) => {
  const row1 = [];
  const row2 = [];
  for (const heading of headings) {
    if (typeof heading === 'string') {
      row1.push({ group: heading });
    } else {
      const [group, subHeadings] = heading;
      row1.push({ group, span: subHeadings.length });
      row2.push(...subHeadings);
    }
  }
  if (row2.length) {
    return (
      <THead>
        <tr>
          {row1.map(({ group, span }) =>
            span ? (
              <TH key={group} colSpan={span}>
                {group}
              </TH>
            ) : (
              <TH key={group} rowSpan={2}>
                {group}
              </TH>
            )
          )}
        </tr>
        <tr>
          {row2.map((heading, i) => (
            <TH key={i}>{heading}</TH>
          ))}
        </tr>
      </THead>
    );
  } else {
    return (
      <THead>
        <tr>
          {row1.map(({ group }) => (
            <TH key={group}>{group}</TH>
          ))}
        </tr>
      </THead>
    );
  }
};

function hasChildren(
  node: React.ReactNode
): node is React.ReactNode & { props: { children: React.ReactNode } } {
  if (node && typeof node === 'object' && 'props' in node) {
    const props = node.props;
    if (props && typeof props === 'object' && 'children' in props) {
      return true;
    }
  }
  return false;
}

function extractStringChildren(children: React.ReactNode): string[] {
  return React.Children.toArray(children).flatMap((child) => {
    if (hasChildren(child)) {
      return extractStringChildren(child.props['children']);
    } else if (typeof child === 'string') {
      return [child];
    } else {
      return [];
    }
  });
}

const Body: React.FC<{
  columnDelimiter?: string | RegExp;
  rowDelimiter?: string | RegExp;
  children: React.ReactNode;
}> = ({ columnDelimiter = /\s*\|\s*/, rowDelimiter = '\n', children }) => {
  const data = extractStringChildren(children).join('');
  const rows = data.split(rowDelimiter).map((row) => row.split(columnDelimiter).slice(1, -1));

  return (
    <tbody>
      {rows.map((row, i) => (
        <tr key={i}>
          {row.map((column, j) => (
            <TD key={`${i},${j}`}>{column}</TD>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export { Head, Body, Table };
