import React from 'react';
import express from 'express';
import { render, After } from '@jaredpalmer/after';
import path from 'path';
import fs from 'fs';

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
  .use('/locales', express.static(`${appSrc}/locales`))
  .use(i18nextMiddleware.LanguageDetector)
  .init(
    {
      preload: ['en', 'de'],
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
          try {
            const html = await render({
              req,
              res,
              document: Document,
              routes,
              assets,
            });
            res.send(html);
          } catch (error) {
            res.json(error);
          }
        });
    }
  )

export default server;
