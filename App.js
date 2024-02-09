import react from 'react';
import {store} from './App/Redux/store.js';
import { Provider } from 'react-redux';
import RootNavigator from "./App/navigation/screenNavigation.js";

const App=()=>{
  return(
    <Provider store={store}>
      <RootNavigator/>
      </Provider>
      
  )
}
export default App;