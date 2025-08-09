import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AuthPage from './pages/AuthPage'
import { useAuth } from './components/auth/AuthProvider'
import LoadingPage from './pages/LoadingPage';
import AdminPanel from './pages/AdminPanel';


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
    </div>
  )
}

export default App
