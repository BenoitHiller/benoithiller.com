import { metadataBase } from '@/sharedMetadata';

/**
 * Helper function that generates url strings relative to the current baseUrl.
 */
interface UrlHelper {
  (relativeUrl?: string | URL): string;
  /**
   * Helper function that generates URL objects relative to the current baseUrl.
   */
  URL: (relativeUrl?: string | URL) => URL;
}

const urlHelperInternal = (relativeUrl?: string | URL): URL => {
  if (relativeUrl == null) {
    return metadataBase;
  } else {
    return new URL(relativeUrl, metadataBase);
  }
};

const urlHelper = (relativeUrl?: string | URL): string => urlHelperInternal(relativeUrl).toString();
urlHelper.URL = urlHelperInternal;

export default urlHelper as UrlHelper;
