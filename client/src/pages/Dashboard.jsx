import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import HealthChart from '../components/HealthChart';

const API_URL = process.env.REACT_APP_API_URL || 'https://meditrack-czy4.onrender.com';

function Dashboard() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    if (token) {
      fetchLogs();
    }
  }, [token]); // Re-run when token is available

  async function fetchLogs() {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/api/health`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setLogs(res.data);
    } catch (err) {
      console.error("Fetch logs error:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Navbar />
      <div style={{ maxWidth: 800, margin: '40px auto', padding: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>Your Health Dashboard</h2>
          <Link to="/add-log">
            <button style={{ padding: '8px 16px' }}>+ Add Entry</button>
          </Link>
        </div>

        {loading && <p>Loading...</p>}
        {!loading && logs.length === 0 && <p>No health logs yet. Add your first entry!</p>}

        {!loading && logs.length > 0 && (
          <>
            <HealthChart logs={logs} />

            <h3 style={{ marginTop: 32 }}>Recent Entries</h3>
            {logs.map((log) => (
              <div key={log.id} style={{
                border: '1px solid #ddd',
                borderRadius: 8,
                padding: 16,
                marginBottom: 12
              }}>
                <strong>
                  {new Date(log.created_at || log.log_date).toLocaleDateString()}
                </strong>
                <p>Symptoms: {log.symptoms || 'None reported'}</p>
                <p>
                  Heart Rate: {log.heart_rate || '—'} bpm |{' '}
                  BP: {log.blood_pressure_systolic || '—'}/{log.blood_pressure_diastolic || '—'} |{' '}
                  Temp: {log.temperature || '—'}°F | Weight: {log.weight || '—'} lbs
                </p>
                {log.notes && <p>Notes: {log.notes}</p>}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;