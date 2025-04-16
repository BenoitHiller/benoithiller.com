/**
 * This seems to be the current "solution" for having a baseUrl in a nextjs application.
 *
 * Obviously this is not a robust, or even reasonable, way of handling
 * configuration in an application of any kind. As the whole point of having
 * configuration that allows for overriding with an evaluation order is that
 * you are able to fetch a singular "current" value in a given context without
 * awareness of the layers.
 *
 * In this case we have something different where only Next.js internals
 * construct such a consistent view, while we as a user need to figure
 * something else out. Given that it is hard to build an application of any
 * scale without at least needing to do something like I'm doing here where we
 * need awareness of what url to use for cases requiring an absolute url within
 * the current site, it is hard to imagine this setup is here to stay. There are
 * obviously going to be complaints and this is a well studied problem with many
 * more robust options for them to consider.
 *
 * Documentation of this approach as of 15.3.0:
 * https://nextjs.org/docs/app/building-your-application/optimizing/metadata#merging
 */
const metadataBase = new URL(
  process.env.NEXT_PUBLIC_BASE_URL || `http://localhost:${process.env.PORT || 3000}`
);
export { metadataBase };
