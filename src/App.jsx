import { useState } from 'react';
import { LayoutDashboard, MessageSquareText, ShieldCheck, Globe2, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Dashboard from './components/Dashboard';
import GeminiOracle from './components/GeminiOracle';
import Auth0Gate from './components/Auth0Gate';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const pageVariants = {
    initial: { opacity: 0, y: 10 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -10 }
  };

  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className="glass-panel" style={{ width: '260px', m: '16px', borderRadius: '16px', border: '1px solid var(--panel-border)', display: 'flex', flexDirection: 'column', padding: '24px 16px' }}>
        <div className="flex-center" style={{ gap: '12px', marginBottom: '40px' }}>
          <Globe2 color="var(--accent-green)" size={32} />
          <h1 className="text-gradient" style={{ fontSize: '1.5rem', margin: 0 }}>GaiaOS</h1>
        </div>
        
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <button 
            className={`btn ${activeTab === 'dashboard' ? 'btn-primary' : ''}`}
            style={{ justifyContent: 'flex-start', padding: '12px 16px', width: '100%', textAlign: 'left', background: activeTab === 'dashboard' ? '' : 'transparent' }}
            onClick={() => setActiveTab('dashboard')}
          >
            <LayoutDashboard size={20} />
            Earth Data
          </button>
          
          <button 
            className={`btn ${activeTab === 'oracle' ? 'btn-primary' : ''}`}
            style={{ justifyContent: 'flex-start', padding: '12px 16px', width: '100%', textAlign: 'left', background: activeTab === 'oracle' ? '' : 'transparent' }}
            onClick={() => setActiveTab('oracle')}
          >
            <MessageSquareText size={20} />
            Gemini Oracle
            {!isAuthenticated && <span style={{ marginLeft: 'auto', fontSize: '0.7rem', background: 'var(--accent-alert)', padding: '2px 6px', borderRadius: '4px' }}>LOCKED</span>}
          </button>

          <button 
            className={`btn ${activeTab === 'auth' ? 'btn-primary' : ''}`}
            style={{ justifyContent: 'flex-start', padding: '12px 16px', width: '100%', textAlign: 'left', background: activeTab === 'auth' ? '' : 'transparent' }}
            onClick={() => setActiveTab('auth')}
          >
            <ShieldCheck size={20} />
            Auth0 Agents
          </button>
        </nav>

        <div style={{ marginTop: 'auto', padding: '16px', background: 'rgba(0,0,0,0.2)', borderRadius: '12px' }}>
          <div className="flex-between" style={{ marginBottom: '8px' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>System Status</span>
            <div className="status-indicator"></div>
          </div>
          <span style={{ fontSize: '0.8rem', color: 'var(--accent-green)' }}>All Systems Nominal</span>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="glass-panel flex-between" style={{ padding: '16px 24px', borderRadius: '16px' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '4px' }}>
              {activeTab === 'dashboard' && 'Global Environmental Metrics'}
              {activeTab === 'oracle' && 'Planetary Intelligence Engine'}
              {activeTab === 'auth' && 'Auth0 Security Gateway'}
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>
              {activeTab === 'dashboard' && 'Snowflake Data Integration Mockup'}
              {activeTab === 'oracle' && 'Powered by Google Gemini 1.5 Pro'}
              {activeTab === 'auth' && 'Demonstrating OAuth 2.0 Agent Security'}
            </p>
          </div>
          <div className="flex-center" style={{ gap: '16px' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.9rem', fontWeight: 500 }}>{isAuthenticated ? 'Agent Access: Granted' : 'Agent Access: Pending'}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{isAuthenticated ? 'Secured by Auth0' : 'Authentication Required'}</div>
            </div>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-purple))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
              P
            </div>
          </div>
        </header>

        <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', position: 'relative' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={{ duration: 0.3 }}
              style={{ height: '100%', width: '100%', position: 'absolute' }}
            >
              {activeTab === 'dashboard' && <Dashboard />}
              {activeTab === 'oracle' && <GeminiOracle isAuthenticated={isAuthenticated} />}
              {activeTab === 'auth' && <Auth0Gate isAuthenticated={isAuthenticated} onLogin={() => setIsAuthenticated(true)} onLogout={() => setIsAuthenticated(false)} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

export default App;
