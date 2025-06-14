import React, { useState, useEffect } from 'react';
import styles from './UserList.module.css';
import { eventBus } from '../../../packages/utils/src';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const usersPerPage = 5;
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchUsers();
    
    // Suscribirse a eventos
    const handleUserSelected = (user) => {
      console.log('Usuario seleccionado:', user);
    };
    
    eventBus.on('userSelected', handleUserSelected);
    
    const handleUserAdded = (newUser) => {
      setUsers(prev => [...prev, newUser]);
    };

    eventBus.on('userAdded', handleUserAdded);
    
    return () => {
      eventBus.off('userSelected', handleUserSelected);
      eventBus.off('userAdded', handleUserAdded);
    };
  }, [currentPage]);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://reqres.in/api/users?page=${currentPage}&per_page=${usersPerPage}`, {
        headers: {
          'x-api-key': 'reqres-free-v1'
        }
      });
      console.log('response', response);
      if (!response.ok) {
        throw new Error('Error al cargar los usuarios');
      }
      const data = await response.json();
      console.log('data', data);
      setUsers(data.data);
      setTotalPages(data.total_pages);
    } catch (error) {
      setError(error.message);
      console.error('Error fetching users:', error);
    }
    setLoading(false);
  };

  const handleUserClick = (user) => {
    eventBus.emit('userSelected', user);
  };

  const filteredUsers = users.filter(user =>
    `${user.first_name} ${user.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className={styles.loading}>Cargando usuarios...</div>;
  }

  return (
    <div className={styles.userListContainer}>
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Buscar usuarios por nombre o email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
      </div>
      
      {error && <div className={styles.errorMessage}>{error}</div>}
      
      <div className={styles.usersGrid}>
        {filteredUsers.map(user => (
          <div 
            key={user.id} 
            className={styles.userCard}
            onClick={() => handleUserClick(user)}
          >
            <img src={user.avatar} alt={`${user.first_name} ${user.last_name}`} style={{width: 80, borderRadius: '50%'}} />
            <h3>{user.first_name} {user.last_name}</h3>
            <p><strong>Email:</strong> {user.email}</p>
          </div>
        ))}
      </div>

      <div className={styles.pagination}>
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <span>Página {currentPage} de {totalPages}</span>
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default UserList; 