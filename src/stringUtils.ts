const joined: typeof String.raw = (template, ...expressions) => {
  let string = String.raw(template, ...expressions);

  string = string.replace(/^[ \t]+/m, '');
  const initialWhitespace = string.match(/^\s+/m);
  if (initialWhitespace) {
    const whitespaceRegex = new RegExp(initialWhitespace[0], 'gm');
    string = string.replaceAll(whitespaceRegex, ' ');
  }

  return string;
};

export { joined };
