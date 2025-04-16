'use client';

import { useState, useEffect } from 'react';

/**
 * Hook that sets the current component to re-render explicitly on the client at least once after being mounted.
 * @returns {boolean} true if this render is on the client and false otherwise.
 */
function useIsClient(): boolean {
  // TODO: replace this with something a bit more robust.
  // The solution of setting this false by default avoids hydration errors but
  // will obviously re-render components that are instantiated only on the
  // frontend an extra time. This doesn't matter on the current site but would
  // be an interesting problem to solve.
  const [isClient, setClient] = useState(false);

  useEffect(() => {
    setClient(true);
  }, []);

  return isClient;
}

export default useIsClient;
