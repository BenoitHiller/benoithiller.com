'use client';

import { useState, useEffect } from 'react';

const DateTime: React.FC<{ value: Date }> = ({ value }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // render without locale on the server and then swap that out on the
    // client.
    return <>{value.toUTCString()}</>;
  } else {
    return <>{value.toString()}</>;
  }
};

export default DateTime;
