import {createStore, compose, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {createLogger} from 'redux-logger';
import {persistStore} from 'redux-persist';
import rootReducer from './reducers';
import rootSaga from './sagas';

const configureStore = initialState => {
  const sagaMiddleware = createSagaMiddleware();
  const composeEnhancers = compose;
  if (process.env.NODE_ENV === 'development') {
    const loggerMiddleware = createLogger({collapsed: true});
    const store = {
      ...createStore(
        rootReducer,
        initialState,
        composeEnhancers(applyMiddleware(sagaMiddleware, loggerMiddleware)),
      ),
      runSaga: sagaMiddleware.run(rootSaga),
    };
    const persistor = persistStore(store);
    return {store, persistor};
  }
  const store = {
    ...createStore(
      rootReducer,
      initialState,
      composeEnhancers(applyMiddleware(sagaMiddleware)),
    ),
    runSaga: sagaMiddleware.run(rootSaga),
  };
  const persistor = persistStore(store);
  return {store, persistor};
};
export default configureStore;
