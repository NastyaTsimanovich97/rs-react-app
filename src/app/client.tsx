'use client';

import React, { StrictMode } from 'react';
import dynamic from 'next/dynamic';
import { Provider } from 'react-redux';
import { setupStore } from './store/store';

const App = dynamic(() => import('../App'), { ssr: false });

export default function ClientOnly() {
  return (
    <StrictMode>
      <Provider store={setupStore()}>
        <App />
      </Provider>
    </StrictMode>
  );
}
