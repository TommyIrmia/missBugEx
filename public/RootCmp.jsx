import routes from './routes.js'
// const Router = ReactRouterDOM.HashRouter
const Router = ReactRouterDOM.BrowserRouter

const { Route, Routes } = ReactRouterDOM
import { AppHeader } from './cmps/AppHeader.jsx'
import { AppFooter } from './cmps/AppFooter.jsx'

export function App() {
  return (
    <Router>
      <div>
        <AppHeader />
        <main>
          <Routes>
            {routes.map((route) => (
              <Route key={route.path} exact element={route.component} path={route.path} />
            ))}
          </Routes>
        </main>
        <AppFooter />
      </div>
    </Router>
  )
}
