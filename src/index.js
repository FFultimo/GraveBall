import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './sass/index.css';
import HOApp from './App';
import registerServiceWorker from './registerServiceWorker';
import Kit from './kit';
import Games from './games';

const kit = new Kit(Games),
	App = HOApp(kit);

global.Kit = kit;

ReactDOM.render(
	<Provider
		store={kit.store}
	>
		<App />
	</Provider>,
	document.getElementById('root'),
);

registerServiceWorker();

export default kit;
