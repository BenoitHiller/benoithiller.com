import type { BrightProps } from 'bright';

/* Remember: every single type which appears anywhere anywhere in a public API
 * needs to be exported somewhere from that same API. Otherwise building things
 * derived from your code involves dong something like this or worse: poking
 * around in your source and taking on some of your dependencies just to get
 * reasonable types.
 */
type Theme = Extract<NonNullable<BrightProps['theme']>, object>;
type ThemeColors = NonNullable<Theme['tokenColors']>;

// I've copied in the full palette from my vim theme, but some colors aren't
// used here yet.
const Black = '#1A1A1A';
// const DarkRed = '#C73205';
// const DarkGreen = '#58AD06';
const DarkYellow = '#C0751E';
const DarkBlue = '#5FD7FF';
// const DarkMagenta = '#7C5283';
// const DarkCyan = '#238789';
// const Gray = '#B6BEB1';
const DarkGray = '#696B66';
// const Red = '#EF5858';
const Green = '#A6E964';
const Yellow = '#F0D25E';
const Blue = '#95B3D4';
const Magenta = '#CC98C6';
const Cyan = '#79D6C5';
const White = '#E2E2DB';

const Normal = White;
const CommentColor = DarkGray;
const Constant = Cyan;
const Identifier = Cyan;
const NumberColor = Magenta;
const Keyword = Blue;
const Parameter = Blue;
const Statement = DarkBlue;
const FunctionName = DarkYellow;
const Operator = White;
const Regex = DarkYellow;
const Type = Yellow;
const StringColor = Green;
const Label = Statement;
const BlockDelimeter = DarkYellow;
const TypeFieldName = DarkYellow;

function mapColors(flatColors: { [key: string]: string }): ThemeColors {
  return Object.entries(flatColors).map(
    ([scope, foreground]) => ({ scope, settings: { foreground } }),
    flatColors
  );
}

/**
 * A variation on https://github.com/BenoitHiller/hiller.vim in the vscode
 * textmate-ish format for use with the Bright code highlighter.
 *
 * As a result of wanting to use it for web I swapped out a few of the bright
 * yellow tokens. They are quite jarring when used on a page that is mostly a
 * lighter colorscheme.
 */
const theme: Theme = {
  name: 'hiller',
  /*
   * I started with a list of every highlighting item in textmate-color.json in
   * https://github.com/wraith13/vscode-schemas then pruned it down gradually.
   *
   * Note to beware of the meta.* styles. They have really high precedence and
   * are applied very broadly.
   *
   * As a result of this approach there may be some redundant styles.
   */
  tokenColors: mapColors({
    comment: CommentColor,
    'comment.block': CommentColor,
    'comment.block.documentation': CommentColor,
    'comment.line': CommentColor,

    constant: Constant,
    'constant.character': Constant,
    'constant.character.escape': Constant,
    'constant.numeric': NumberColor,
    'constant.numeric.integer': NumberColor,
    'constant.numeric.float': NumberColor,
    'constant.numeric.hex': NumberColor,
    'constant.numeric.octal': NumberColor,
    'constant.other': Constant,
    'constant.regexp': Regex,
    'constant.rgb-value': Constant,

    // I'm using a font that is always bold so I don't do anything special here.
    emphasis: Normal,

    'entity.name.class': Type,
    'entity.name.function': FunctionName,
    'entity.name.method': FunctionName,
    'entity.name.section': Type,
    'entity.name.selector': Type,
    'entity.name.tag': Keyword,
    'entity.name.type': Identifier,
    'entity.name.type.alias': Normal,
    'entity.other': Type,
    'entity.other.attribute-name': Type,
    'entity.other.inherited-class': Type,

    invalid: Normal,
    'invalid.deprecated': Normal,
    'invalid.illegal': Normal,

    keyword: Keyword,
    'keyword.control': Statement,
    'keyword.operator': Operator,
    'keyword.operator.new': FunctionName,
    'keyword.operator.assignment': Operator,
    'keyword.operator.arithmetic': Operator,
    'keyword.operator.logical': Operator,
    'keyword.operator.expression': Statement,
    'keyword.other': Statement,

    //'meta.object.member': Parameter,
    'meta.objectliteral': Label,
    'meta.object-literal.key': Label,
    'meta.object-binding-pattern-variable': Parameter,
    'meta.type.parameters': TypeFieldName,
    'meta.type.declaration': Normal,
    // This sets a lower priority highlight underneath variables so that plain
    // ones are plain colored and other types, such as various forms of binding
    // and destructuring, will get a different highlight.
    'meta.var.expr': Normal,
    'meta.definition.variable variable.other.readwrite': Parameter,
    // meta.var.expr matches the entirety of any variable expression, so
    // including the right hand side. We use meta.block to undo that. This is
    // supposed to be textmate style which has a subtraction selector but
    // somewhere along the line it wasn't implemented correctly.
    'meta.var.expr variable.other.readwrite': Parameter,
    'meta.var.expr meta.block variable.other.readwrite': Normal,

    punctuation: Operator,
    'punctuation.definition.string': StringColor,
    'punctuation.definition.typeparameters': Operator,
    'punctuation.definition.tag': Keyword,
    'punctuation.definition.block': BlockDelimeter,
    'punctuation.definition.binding-pattern.object': BlockDelimeter,
    'punctuation.definition.binding-pattern.array': Parameter,
    'punctuation.definition.subexpression': Parameter,
    'punctuation.definition.template-expression': Statement,
    'punctuation.section.group': Keyword,
    'punctuation.separator': Operator,
    'punctuation.separator.continuation': Operator,
    'punctuation.section.embedded': BlockDelimeter,
    'punctuation.terminator': Operator,

    'storage.modifier': Keyword,
    'storage.type': Constant,
    // I don't know how my arrows ended up yellow, but I like it.
    'storage.type.function.arrow': Yellow,

    string: StringColor,

    'support.function': FunctionName,
    'support.class': FunctionName,
    'support.class.component': FunctionName,
    'support.type.primitive': Type,

    'variable.parameter': Parameter,
    'variable.other.readwrite.alias': Normal,
    'variable.other.constant.ruby': Parameter
  }),
  // For these https://github.com/code-hike/lighter/blob/main/lib/src/theme.ts
  // has some guidance on which of these are actually used out of the full set
  // possible.
  colors: {
    'editor.background': Black,
    'editor.foreground': White,
    'editorWidget.background': Black,
    'editorCursor.foreground': White,
    'editorWhitespace.foreground': White,
    'editor.lineHighlightBackground': White,
    // I don't believe there is anything as smart as the reverse behaviour in
    // vim available, so comments are currently the same color which is less
    // than ideal.
    'editor.selectionBackground': DarkGray
  }
};

export default theme;
