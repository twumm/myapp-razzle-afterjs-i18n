import React, { Component } from 'react';
import { AfterRoot, AfterData } from '@jaredpalmer/after';
import { I18nextProvider } from 'react-i18next';
import { StaticRouter } from 'react-router-dom';

class Document extends Component {
  componentDidMount() {console.log(this.props)}
  static async getInitialProps({ req, res, assets, data, renderPage }) {
    const context = {};

    const renderer = Page => props => (
      <I18nextProvider i18n={req.i18n}>
        <StaticRouter context={context} location={req.url}>
          <Page {...props} />
        </StaticRouter>
      </I18nextProvider>
    );
    
    const page = await renderPage(renderer);
    // if (context.url) {
    //   res.redirect(context.url);
    // }

    const initialI18nStore = {};
    req.i18n.languages.forEach((l) => {
      initialI18nStore[l] = req.i18n.services.resourceStore.data[l];
    });
    const initialLanguage = req.i18n.language;

    return { assets, data, initialLanguage, initialI18nStore, context, ...page };
  }

  render() {
    // console.log(this.props)
    // const { helmet, assets, data, context } = this.props;
    const { helmet, assets, data, initialLanguage, initialI18nStore } = this.props;
    // console.log(this.props);
    // get attributes from React Helmet
    const htmlAttrs = helmet.htmlAttributes.toComponent()
    const bodyAttrs = helmet.bodyAttributes.toComponent()

    return (
      <html lang="" {...htmlAttrs}>
        <head>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta charSet="utf-8" />
          <title>Welcome to the Afterparty</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {helmet.title.toComponent()}
          {helmet.meta.toComponent()}
          {helmet.link.toComponent()}
          {assets.client.css && (
            <link rel="stylesheet" href={assets.client.css} />
          )}
          <script dangerouslySetInnerHTML={{ __html: `window.initialI18nStore = ${JSON.parse(JSON.stringify(initialI18nStore))}` }} />
          <script dangerouslySetInnerHTML={{ __html: `window.initialLanguage = ${initialLanguage}` }} />
        </head>
        <body {...bodyAttrs}>
          <AfterRoot />
          <AfterData data={data} />
          <script
            type="text/javascript"
            src={assets.client.js}
            defer
            crossOrigin="anonymous"
          />
        </body>
      </html>
    )
  }
}

export default Document;
