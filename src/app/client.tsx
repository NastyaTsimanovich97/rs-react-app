'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const SearchPage = dynamic(() => import('../pages-old/SearchPage'), {
  ssr: false,
});

export default function ClientOnly() {
  return <SearchPage />;
}
