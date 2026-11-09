import astro from 'eslint-plugin-astro';

export default [
  ...astro.configs.recommended,
  ...astro.configs['jsx-a11y-recommended'],
  { ignores: ['dist/**', '.astro/**'] },
];
