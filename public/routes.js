import { HomePage } from './pages/HomePage.jsx'
import { AboutUs } from './pages/AboutUs.jsx'
import { BugIndex } from './pages/BugIndex.jsx'
import { BugDetails } from './pages/BugDetails.jsx'


export default [
    {
        path: '/',
        component: <HomePage />,
    },
    {
        path: '/bug',
        component: <BugIndex />,
    },
    {
        path: '/bug/:bugId',
        component: <BugDetails />,
    },
    {
        path: '/about',
        component: <AboutUs />,
    }
]