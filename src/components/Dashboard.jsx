import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, Droplets, Wind, Trees } from 'lucide-react';

const mockData = [
  { year: '2020', carbon: 4000, renewable: 2400 },
  { year: '2021', carbon: 3500, renewable: 2800 },
  { year: '2022', carbon: 3200, renewable: 3100 },
  { year: '2023', carbon: 2800, renewable: 3800 },
  { year: '2024', carbon: 2500, renewable: 4500 },
  { year: '2025', carbon: 2000, renewable: 5200 },
  { year: '2026', carbon: 1500, renewable: 6500 },
];

const StatCard = ({ title, value, icon: Icon, trend, trendUp }) => (
  <div className="glass-panel" style={{ flex: '1', display: 'flex', alignItems: 'center', gap: '16px' }}>
    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '16px', borderRadius: '12px' }}>
      <Icon size={24} color={trendUp ? 'var(--accent-green)' : 'var(--accent-blue)'} />
    </div>
    <div>
      <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '4px' }}>{title}</div>
      <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{value}</div>
      <div style={{ fontSize: '0.8rem', color: trendUp ? 'var(--accent-green)' : 'var(--accent-alert)', marginTop: '4px' }}>
        {trendUp ? '↑' : '↓'} {trend}
      </div>
    </div>
  </div>
);

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-panel" style={{ padding: '12px' }}>
        <p style={{ margin: '0 0 8px 0', fontWeight: 'bold' }}>{label}</p>
        <p style={{ margin: 0, color: 'var(--accent-alert)' }}>Carbon Output: {payload[0].value} T</p>
        <p style={{ margin: 0, color: 'var(--accent-green)' }}>Renewable Energy: {payload[1].value} GW</p>
      </div>
    );
  }
  return null;
};

export default function Dashboard() {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '24px', overflowY: 'auto' }}>
      <div style={{ display: 'flex', gap: '24px' }}>
        <StatCard title="Global Carbon Offset" value="1.2Gt" icon={Trees} trend="12% from last year" trendUp={true} />
        <StatCard title="Ocean Acidity Variance" value="8.05 pH" icon={Droplets} trend="0.02 pH anomaly" trendUp={false} />
        <StatCard title="Renewable Adoption" value="48.5%" icon={Wind} trend="5% from last year" trendUp={true} />
        <StatCard title="A.I. Model Accuracy" value="99.2%" icon={Activity} trend="0.5% improvement" trendUp={true} />
      </div>

      <div className="glass-panel" style={{ flex: 1, minHeight: '400px', display: 'flex', flexDirection: 'column' }}>
        <div className="flex-between" style={{ marginBottom: '24px' }}>
          <h3 style={{ margin: 0 }}>Planetary Energy Transition (Simulated Snowflake Data)</h3>
          <div style={{ display: 'flex', gap: '16px', fontSize: '0.85rem' }}>
            <div className="flex-center" style={{ gap: '8px' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--accent-alert)' }}></div>
              <span>Carbon Emissions</span>
            </div>
            <div className="flex-center" style={{ gap: '8px' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--accent-green)' }}></div>
              <span>Renewable Capacity</span>
            </div>
          </div>
        </div>
        
        <div style={{ flex: 1 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mockData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorCarbon" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--accent-alert)" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="var(--accent-alert)" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorRenewable" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--accent-green)" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="var(--accent-green)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="year" stroke="var(--text-muted)" />
              <YAxis stroke="var(--text-muted)" />
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="carbon" stroke="var(--accent-alert)" fillOpacity={1} fill="url(#colorCarbon)" />
              <Area type="monotone" dataKey="renewable" stroke="var(--accent-green)" fillOpacity={1} fill="url(#colorRenewable)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
