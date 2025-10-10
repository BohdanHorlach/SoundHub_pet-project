import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AuthPage from './pages/AuthPage'
import { useAuth } from './components/auth/AuthProvider'
import LoadingPage from './pages/LoadingPage';
import AdminPanel from './pages/AdminPanel';
import ToastProvider from './components/common/ToastProvider';


function App() {
  const { loading } = useAuth();

  if (loading) return (<LoadingPage />);

  return (
    <div>
      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/auth' element={<AuthPage />}></Route>
        <Route path='/admin' element={<AdminPanel />}></Route>
      </Routes>
      <ToastProvider />
    </div>
  )
}

export default App
