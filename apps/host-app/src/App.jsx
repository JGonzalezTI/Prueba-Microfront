import React, { Suspense } from 'react';
import './App.css';

// Importación dinámica del microfrontend UserList usando React.lazy y Module Federation
const UserList = React.lazy(() => import('userList/UserList'));

function App() {
  return (
    <div className="app">
      {/* Encabezado de la aplicación */}
      <header className="app-header">
        <h1>Lista de Usuarios</h1>
        <p>Microfrontend Demo</p>
      </header>
      
      {/* Contenido principal */}
      <main className="app-main">
        {/* Suspense muestra un fallback mientras se carga el microfrontend */}
        <Suspense fallback={
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Cargando lista de usuarios...</p>
          </div>
        }>
          {/* Renderiza el microfrontend UserList */}
          <UserList />
        </Suspense>
      </main>

      <footer className="app-footer">
        <p>© 205 Microfrontend Demo</p>
      </footer>
    </div>
  );
}

export default App; 