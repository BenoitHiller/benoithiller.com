'use client';

import React, { useState, useEffect, use } from 'react';

const ClientContext = React.createContext<boolean>(false);
/**
 * Provider which stores whether we are currently rendering on the client or not.
 *
 * This is to support the case where a static site specifically wants to
 * flicker on the client to switch in things like locale sensitive rendering.
 *
 * With Next.js this really needs to be high up in a fixed location in the tree
 * to prevent it from ever being toggled after the initial render. As this code
 * is only needed in the case of initial hydration, where changing things on the
 * frontend causes undesirable errors.
 */
const ClientContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  return <ClientContext value={isClient}>{children}</ClientContext>;
};

function useIsClient(): boolean {
  return use(ClientContext);
}

export { useIsClient };
export default ClientContextProvider;
