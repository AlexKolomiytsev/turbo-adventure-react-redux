import { AppContainer } from 'react-hot-loader';
import { render as ReactDomRender }  from 'react-dom';

import routes from './routes';
import './index.scss';

const root: HTMLElement = document.getElementById('root');

if (__isDEBUG__ && module.hot) {
    module.hot.accept('./routes', () => {
        ReactDomRender(
            <AppContainer>
                { require('./routes').default }
            </AppContainer>,
            root
        );
    });
}

ReactDomRender(routes, root);