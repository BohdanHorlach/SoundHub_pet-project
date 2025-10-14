import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AuthPage from './pages/AuthPage'
import { useAuth } from './app/providers/AuthProvider'
import LoadingPage from './pages/LoadingPage';
import AdminPanel from './pages/AdminPanel';
import ToastProvider from './app/providers/ToastProvider';
import UploadPage from './pages/UploadPage';
import SavedCardsPage from './pages/SavedCardsPage';


function App() {
  const { loading } = useAuth();

  if (loading) return (<LoadingPage />);

  return (
    <div>
      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/saved' element={<SavedCardsPage />}></Route>
        <Route path='/auth' element={<AuthPage />}></Route>
        <Route path='/admin' element={<AdminPanel />}></Route>
        <Route path='/upload' element={<UploadPage />}></Route>
      </Routes>
      <ToastProvider />
    </div>
  )
}

export default App
