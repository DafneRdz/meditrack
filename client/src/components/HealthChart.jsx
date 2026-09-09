import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function HealthChart({ logs }) {
  const chartData = [...logs]
    .reverse()
    .map((log) => ({
      date: new Date(log.log_date).toLocaleDateString(),
      heartRate: log.heart_rate,
      weight: log.weight
    }));

  return (
    <div style={{ marginTop: 24 }}>
      <h3>Health Trends</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="heartRate" stroke="#1A3C5E" name="Heart Rate (bpm)" />
          <Line type="monotone" dataKey="weight" stroke="#5E8B7E" name="Weight (lbs)" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default HealthChart;