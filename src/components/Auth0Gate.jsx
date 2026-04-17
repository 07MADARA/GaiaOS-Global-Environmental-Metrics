import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Shield, Key, Fingerprint, CheckCircle2, ChevronRight, Server, Database } from 'lucide-react';

export default function Auth0Gate({ isAuthenticated, onLogin, onLogout }) {
  const [logs, setLogs] = useState([]);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const terminalRef = useRef(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs]);

  const addLog = (message, type = 'info') => {
    setLogs(prev => [...prev, { time: new Date().toISOString().split('T')[1].slice(0, 8), message, type }]);
  };

  const executeAuthFlow = async () => {
    setIsAuthenticating(true);
    setLogs([]);
    
    const steps = [
      { msg: 'Initializing Auth0 Agent Authentication Sequence...', delay: 500, type: 'info' },
      { msg: 'Connecting to dev-gaiaos.us.auth0.com...', delay: 800, type: 'info' },
      { msg: 'Connection established. Handshake OK (TLS 1.3).', delay: 400, type: 'success' },
      { msg: 'Requesting Machine-to-Machine (M2M) Token for Agent...', delay: 600, type: 'info' },
      { msg: 'POST /oauth/token?grant_type=client_credentials HTTP/1.1', delay: 400, type: 'warning' },
      { msg: 'Awaiting Auth0 Identity Provider response...', delay: 1200, type: 'info' },
      { msg: '200 OK - Access Token received.', delay: 300, type: 'success' },
      { msg: 'Validating JWT signature and RS256 algorithm...', delay: 700, type: 'info' },
      { msg: 'Token valid. Scopes verified: [read:climate_models, execute:gemini_agent]', delay: 500, type: 'success' },
      { msg: 'Agent Authentication Complete. System unlocked.', delay: 300, type: 'success' }
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, steps[i].delay));
      addLog(steps[i].msg, steps[i].type);
    }

    setIsAuthenticating(false);
    onLogin();
  };

  return (
    <div style={{ height: '100%', display: 'flex', gap: '24px' }}>
      {/* Visual representation panel */}
      <div className="glass-panel" style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div className="flex-center" style={{ gap: '12px', paddingBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <Shield size={24} color="var(--accent-blue)" />
          <h2 style={{ margin: 0 }}>Auth0 M2M Security</h2>
        </div>

        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>
          This prototype demonstrates an advanced <strong style={{color: 'var(--text-main)'}}>Machine-to-Machine (M2M)</strong> authentication flow using Auth0. 
          To secure the Gemini Oracle from malicious requests, the AI Agent must negotiate a signed JWT with Auth0 before accessing the core functionality.
        </p>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '20px 0', padding: '0 20px' }}>
          <div className="flex-center" style={{ flexDirection: 'column', gap: '8px' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '12px', background: 'rgba(59, 130, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--accent-blue)' }}>
              <Server size={30} color="var(--accent-blue)" />
            </div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>AI Agent</span>
          </div>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--accent-purple)', marginBottom: '4px' }}>OAuth 2.0 Flow</div>
            <div style={{ width: '100%', height: '2px', background: 'linear-gradient(90deg, var(--accent-blue), var(--accent-purple), var(--accent-green))', position: 'relative' }}>
              {isAuthenticating && (
                <div style={{ position: 'absolute', top: -3, left: '50%', width: '8px', height: '8px', borderRadius: '50%', background: 'white', animation: 'ping-pong 1s infinite alternate' }} />
              )}
            </div>
            <style>{`@keyframes ping-pong { from { left: 0%; } to { left: 100%; } }`}</style>
          </div>

          <div className="flex-center" style={{ flexDirection: 'column', gap: '8px' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '12px', background: 'rgba(139, 92, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--accent-purple)' }}>
              <Shield size={30} color="var(--accent-purple)" />
            </div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Auth0 IdP</span>
          </div>
        </div>

        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {!isAuthenticated ? (
             <button className="btn btn-primary" onClick={executeAuthFlow} disabled={isAuthenticating} style={{ width: '100%', padding: '16px', fontSize: '1.1rem', opacity: isAuthenticating ? 0.7 : 1 }}>
              {isAuthenticating ? (
                <><Fingerprint className="status-indicator" /> Negotiating Protocols...</>
              ) : (
                <><Key size={20} /> Execute Auth0 Handshake</>
              )}
            </button>
          ) : (
             <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
               <div style={{ padding: '16px', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--accent-green)' }}>
                 <CheckCircle2 size={24} />
                 <strong>Agent Authorized. Live connection established.</strong>
               </div>
               <button className="btn btn-outline" onClick={() => { onLogout(); setLogs([]); }} style={{ width: '100%' }}>
                 Revoke Agent Access
               </button>
             </div>
          )}
        </div>
      </div>

      {/* Terminal View */}
      <div className="glass-panel" style={{ flex: '1.2', background: '#050914', border: '1px solid rgba(255,255,255,0.1)', padding: '0', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div className="flex-between" style={{ padding: '12px 16px', background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="flex-center" style={{ gap: '8px' }}>
            <Terminal size={16} color="var(--text-muted)" />
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>auth0-agent-terminal</span>
          </div>
          <div style={{ display: 'flex', gap: '6px' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--accent-alert)' }}></div>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#fbbf24' }}></div>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--accent-green)' }}></div>
          </div>
        </div>

        <div ref={terminalRef} style={{ padding: '16px', flex: 1, overflowY: 'auto', fontFamily: 'monospace', fontSize: '0.85rem', lineHeight: '1.8' }}>
          <div><span style={{ color: 'var(--accent-green)' }}>agent@gaiaos</span>:<span style={{ color: 'var(--accent-blue)' }}>~</span>$ ./initiate_auth0_handshake.sh</div>
          
          {logs.map((log, index) => (
            <div key={index} style={{ display: 'flex', gap: '12px', marginTop: '4px' }}>
              <span style={{ color: 'var(--text-muted)' }}>[{log.time}]</span>
              <span style={{ 
                color: log.type === 'error' ? 'var(--accent-alert)' 
                : log.type === 'success' ? 'var(--accent-green)' 
                : log.type === 'warning' ? '#fbbf24' 
                : 'var(--text-main)' 
              }}>
                {log.message}
              </span>
            </div>
          ))}

          {isAuthenticating && (
            <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center' }}>
              <span style={{ width: '8px', height: '16px', background: 'var(--text-main)', display: 'inline-block', animation: 'blink 1s step-end infinite' }}></span>
            </div>
          )}
          <style>{`@keyframes blink { 50% { opacity: 0; } }`}</style>
        </div>
      </div>
    </div>
  );
}
