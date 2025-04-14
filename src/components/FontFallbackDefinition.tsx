import React from 'react';

function toPercent(value: number): string {
  return value * 100 + '%';
}

// values extracted manually from fontdrop.info Data section
const nanum = {
  xAvgCharWidth: 500,
  unitsPerEm: 1000,
  ascender: 800,
  descender: -200
};

const courier = {
  xAvgCharWidth: 1229,
  unitsPerEm: 2048,
  ascender: 1705,
  descender: -615
};

const emRatio = nanum.unitsPerEm / courier.unitsPerEm;
/* To align a fallback font we scale it based on the horizontal ratio, then fix
 * everything else in vertical alignment.
 *
 * These are both monospaced fonts so we can use the average character width for scaling.
 */
const scaleFactor = nanum.xAvgCharWidth / courier.xAvgCharWidth / emRatio;

/* The size-adjust also scales the ascender and descender values so we account
 * for that by multiplying the values by the previously computed scale factor.
 *
 * For some reason we also need to account for the emRatio again in the
 * ascenders, but not in the descenders.
 */
const ascentOverride = nanum.ascender / (courier.ascender * scaleFactor * emRatio);
const descentOverride = nanum.descender / (courier.descender * scaleFactor);
const fallbackFont = `
  @font-face {
    font-family: 'Nanum Gothic Coding Fallback';
    src: local(Courier New);
    size-adjust: ${toPercent(scaleFactor)};
    ascent-override: ${toPercent(ascentOverride)};
    descent-override: ${toPercent(descentOverride)};
  }
  :root {
    --font-nanum-coding-fallback: 'Nanum Gothic Coding Fallback';
  }
`;

const FontFallbackDefinition: React.FC = () => <style>{fallbackFont}</style>;

export default FontFallbackDefinition;
