import PublicWelcomePage from './Pages/Public/WelcomePage'
import LoginPage from './Pages/Public/LoginPage'
import RegisterPage from './Pages/Public/RegisterPage'
import AppWelcomePage from './Pages/App/WelcomePage'

export const routes = [
    {
        path: '/',
        component: PublicWelcomePage,
    },
    {
        path: '/login',
        component: LoginPage
    },
    {
        path: '/register',
        component: RegisterPage
    },
    {
        path: '/app',
        component: AppWelcomePage,
    }
]