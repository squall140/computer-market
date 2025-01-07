import React from 'react';
import Search from './features/bar/components/Search';
import { IntlProvider } from 'react-intl';
import { getLocaleMessages } from './help/utils';
import './App.css';

function App() {
  // 默认使用英语
  const messages = getLocaleMessages('en');
  
  return (
    <IntlProvider messages={messages} locale="en">
      <div className="App">
        <div className="app-container">
          <Search />
        </div>
      </div>
    </IntlProvider>
  );
}

export default App;
