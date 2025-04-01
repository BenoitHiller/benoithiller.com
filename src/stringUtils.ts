/**
 * Join a template string onto a single line such that newlines, and any
 * whitespace immediately surrounding a that newline, is collapsed into a
 * single space.
 */
const joined: typeof String.raw = (template, ...expressions) => {
  let string = String.raw(template, ...expressions);

  string = string.replace(/^\s+/m, '');
  string = string.replace(/\s+$/, '');
  string = string.replaceAll(/\n\s*/gm, ' ');

  return string;
};

export { joined };
