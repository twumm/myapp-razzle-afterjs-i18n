import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ensureReady, After } from '@jaredpalmer/after';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

import './client.css';
import routes from './routes';

ensureReady(routes).then(data =>
  hydrate(
    <I18nextProvider
      i18n={i18n}
      initialI18nStore={window.initialI18nStore}
      initialLanguage={window.initialLanguage}
    >
      <BrowserRouter>
        <After data={data} routes={routes} />
      </BrowserRouter>
    </I18nextProvider>,
    document.getElementById('root')
  )
);

if (module.hot) {
  module.hot.accept();
}
