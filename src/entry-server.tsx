
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';

export function render(url: string) {
  const helmetContext: { helmet?: any } = {};
  
  const html = ReactDOMServer.renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url}>
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
  };
}
