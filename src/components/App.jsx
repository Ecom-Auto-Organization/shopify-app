import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import reducers from '../reducers/index';
import rootSaga from '../sagas';
import { Layout } from 'antd';
import { BrowserRouter } from 'react-router-dom';
import SideBar from './SideBar'
import ContentWrapper from './ContentWrapper'

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducers, composeEnhancers(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(rootSaga);

const { Content } = Layout;

const App = () => (
  <Provider store={store}>
    <Layout>
      <BrowserRouter>
        <SideBar/>
        <Layout>
          <Content>
            <ContentWrapper/>
          </Content>
        </Layout>
      </BrowserRouter>
    </Layout>
  </Provider>
);

export default App;
