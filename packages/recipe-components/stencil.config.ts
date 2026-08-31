import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'recipe-planner-components',
  globalStyle: 'src/global.css',
  outputTargets: [
    { type: 'dist' },
    { type: 'docs-readme' },
    { type: 'www', serviceWorker: null }
  ],
  testing: { browserHeadless: 'new' }
};
