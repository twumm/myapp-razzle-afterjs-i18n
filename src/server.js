import React from 'react';
import express from 'express';
import { render, After } from '@jaredpalmer/after';
import path from 'path';
import fs from 'fs';
import { renderToString } from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router-dom';

import { I18nextProvider } from 'react-i18next';
import Backend from 'i18next-node-fs-backend';

import routes from './routes';
import Document from './Document';
import i18n from './i18n';

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
const appSrc = resolveApp('src');

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);
const i18nextMiddleware = require('i18next-express-middleware');

const server = express();

i18n
  .use(Backend)
  .use(i18nextMiddleware.LanguageDetector)
  .init(
    {
      preload: ['en', 'pt'],
      backend: {
        loadPath: `${appSrc}/locales/{{lng}}/{{ns}}.json`,
        addPath: `${appSrc}/locales/{{lng}}/{{ns}}.missing.json`,
      },
    },
    () => {
      server
        .disable('x-powered-by')
        .use(i18nextMiddleware.handle(i18n))
        .use('/locales', express.static(`${appSrc}/locales`))
        .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
        .get('/*', async (req, res) => {
          // const context = {};
          // const markup = renderToString(
          //   <I18nextProvider i18n={req.i18n}>
          //     <StaticRouter context={context} location={req.url}>
          //       <After routes={routes} />
          //     </StaticRouter>
          //   </I18nextProvider>
          // );
          // const { url } = context;
          // if (url) {
          //   res.redirect(url);
          // } else {
          //   const initialI18nStore = {};
          //   req.i18n.languages.forEach(l => {
          //     initialI18nStore[l] = req.i18n.services.resourceStore.data[l];
          //   });
          //   const initialLanguage = req.i18n.language;
          //   // console.log(initialLanguage)
          // }
          try {
            const html = await render({
              req,
              res,
              // document: Document,
              routes,
              assets,
              // Anything else you add here will be made available
              // within getInitialProps(ctx)
              // e.g a redux store...
              // customThing: 'thing',
            });
            res.send(html);
          } catch (error) {
            res.json(error);
          }
        });
    }
  )


export default server;
