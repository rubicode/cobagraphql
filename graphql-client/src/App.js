import './App.css';
import TodoBox from './components/TodoBox';
import Home from './components/Home';
import rootReducer from './reducers';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

const store = createStore(rootReducer, applyMiddleware(thunk))

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="todo" element={<TodoBox />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
