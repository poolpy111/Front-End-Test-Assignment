import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import Login from './Login';

const AuthWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    setIsAuthenticated(!!loggedInUser);
  }, []);

  return (
    <Routes>
      <Route
        path="/main"
        element={isAuthenticated ? <MainPage /> : <Navigate to="/create" />}
      />
      <Route
        path="/create"
        element={
          isAuthenticated ? (
            <Navigate to="/main" />
          ) : (
            <Login setIsAuthenticated={setIsAuthenticated} />
          )
        }
      />
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Navigate to="/main" replace />
          ) : (
            <Navigate to="/create" replace />
          )
        }
      />
    </Routes>
  );
};

export default AuthWrapper;
