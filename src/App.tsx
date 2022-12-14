import React from 'react'
import { Provider } from 'react-redux'
import RootComponent from './RootComponent'
import store from './store/index'

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <React.StrictMode>
                <RootComponent />
            </React.StrictMode>
        </Provider>
    )
}

export default App
