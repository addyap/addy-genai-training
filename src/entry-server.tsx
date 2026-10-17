
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { HelmetProvider, type HelmetServerState } from 'react-helmet-async';
import App from './App';
import { BASE_PATH } from './lib/site';

export { preloadAllPages } from './routes';

export function render(url: string) {
  const helmetContext: { helmet?: HelmetServerState } = {};
  
  const html = ReactDOMServer.renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter basename={BASE_PATH} location={url}>
        <App />
      </StaticRouter>
    </HelmetProvider>
  );

  const { helmet } = helmetContext;
  
  return {
    html,
    head: helmet ?
      helmet.title.toString() +
      helmet.meta.toString() +
      helmet.link.toString() +
      helmet.script.toString()
      : '',
    htmlAttrs: helmet ? helmet.htmlAttributes.toString() : '',
  };
}
