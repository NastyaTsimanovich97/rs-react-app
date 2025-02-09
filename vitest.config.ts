import { defineConfig } from 'vitest/config';

// https://vite.dev/config/
export default defineConfig({
  test: {
    include: ['**/*.tsx'],
    exclude: [
      '**/node_modules/**',
      '**/*.test.tsx',
      '**/*.spec.tsx',
      'src/__tests__/setup.ts',
      'src/main.tsx',
    ],
  },
});
