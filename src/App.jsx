import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import TodoPage from './pages/TodoPage';
import RegisterPage from './pages/RegisterPage';
import { useEffect, useState } from 'react';
import PrivateRoute from './route/PrivateRoute';
import api from './utils/api';

function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    // 토큰을 통해 사용자 정보를 가져온다
    try {
      const storedToken = sessionStorage.getItem('token');
      if (storedToken) {
        // 사용자가 토큰이 만료되기 전에 한번이라도 로그인한 적이 있는 경우
        const resp = await api.get('/user/me');
        setUser(resp.data.user);
      }
    } catch (error) {
      setUser(null);
    }
  };

  return (
    <Routes>
      <Route
        path='/'
        element={
          <PrivateRoute user={user}>
            <TodoPage user={user} setUser={setUser} />
          </PrivateRoute>
        }
      />
      <Route path='/register' element={<RegisterPage />} />

      <Route
        path='/login'
        element={<LoginPage user={user} setUser={setUser} />}
      />
    </Routes>
  );
}

export default App;
