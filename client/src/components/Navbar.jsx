import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '12px 24px',
      backgroundColor: '#1A3C5E',
      color: 'white'
    }}>
      <Link to="/dashboard" style={{ color: 'white', fontWeight: 'bold', textDecoration: 'none' }}>
        MediTrack
      </Link>
      {user && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span>Hi, {user.name}</span>
          <button onClick={handleLogout} style={{ padding: '6px 12px' }}>
            Log Out
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;