import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';

function AddLog() {
  const [symptoms, setSymptoms] = useState('');
  const [heartRate, setHeartRate] = useState('');
  const [systolic, setSystolic] = useState('');
  const [diastolic, setDiastolic] = useState('');
  const [temperature, setTemperature] = useState('');
  const [weight, setWeight] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const { token } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      await axios.post('http://localhost:5050/api/health', {
        symptoms,
        heart_rate: heartRate || null,
        blood_pressure_systolic: systolic || null,
        blood_pressure_diastolic: diastolic || null,
        temperature: temperature || null,
        weight: weight || null,
        notes
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add entry');
    }
  }

  return (
    <div>
      <Navbar />
      <div style={{ maxWidth: 500, margin: '40px auto', padding: 20 }}>
        <h2>Add Health Entry</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 12 }}>
            <label>Symptoms</label>
            <input
              type="text"
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              style={{ width: '100%', padding: 8 }}
              placeholder="e.g. headache, fatigue"
            />
          </div>
          <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
            <div style={{ flex: 1 }}>
              <label>Heart Rate (bpm)</label>
              <input
                type="number"
                value={heartRate}
                onChange={(e) => setHeartRate(e.target.value)}
                style={{ width: '100%', padding: 8 }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label>Temperature (°F)</label>
              <input
                type="number"
                step="0.1"
                value={temperature}
                onChange={(e) => setTemperature(e.target.value)}
                style={{ width: '100%', padding: 8 }}
              />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
            <div style={{ flex: 1 }}>
              <label>Blood Pressure (Systolic)</label>
              <input
                type="number"
                value={systolic}
                onChange={(e) => setSystolic(e.target.value)}
                style={{ width: '100%', padding: 8 }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label>Blood Pressure (Diastolic)</label>
              <input
                type="number"
                value={diastolic}
                onChange={(e) => setDiastolic(e.target.value)}
                style={{ width: '100%', padding: 8 }}
              />
            </div>
          </div>
          <div style={{ marginBottom: 12 }}>
            <label>Weight (lbs)</label>
            <input
              type="number"
              step="0.1"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              style={{ width: '100%', padding: 8 }}
            />
          </div>
          <div style={{ marginBottom: 12 }}>
            <label>Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              style={{ width: '100%', padding: 8 }}
              rows={3}
            />
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button type="submit" style={{ padding: '10px 20px' }}>
            Save Entry
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddLog;