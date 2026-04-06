import React, { useState } from 'react';
import { Bot, Key, Save, Server, Activity, Send, Sparkles } from 'lucide-react';
import './AgentView.css';
import './UsersView.css'; // Reusing generic button classes

const AgentView = () => {
  const [apiKey, setApiKey] = useState('');
  const [agentName, setAgentName] = useState('Assistant Agent Primary');
  const [isActive, setIsActive] = useState(false);
  const [adminQuery, setAdminQuery] = useState('');
  const [adminChat, setAdminChat] = useState([
    { role: 'assistant', content: "System ready. How can I assist with platform administration today?" }
  ]);

  const handleSave = () => {
    if (apiKey.length > 10) {
      setIsActive(true);
      alert('Agent configuration saved successfully!');
    } else {
      alert('Please enter a valid API Key.');
    }
  };

  const handleAdminSend = (e) => {
    e?.preventDefault();
    if (!adminQuery.trim()) return;

    const newChat = [...adminChat, { role: 'user', content: adminQuery }];
    setAdminChat(newChat);
    setAdminQuery('');

    setTimeout(() => {
      setAdminChat([...newChat, { 
        role: 'assistant', 
        content: `Acknowledged. I'm scanning system logs for "${adminQuery}". Generating the requested report based on the current platform activity...` 
      }]);
    }, 1200);
  };

  return (
    <div className="view-container fade-in">
      <div className="view-header">
        <div>
          <h1 className="view-title flex items-center gap-2">
            <Bot size={28} className="text-primary" />
            AI Agent Configuration
          </h1>
          <p className="view-subtitle">Configure the autonomous agent parameters and provide API keys for platform integration.</p>
        </div>
      </div>

      <div className="agent-layout">
        <div className="flex flex-col gap-6" style={{ flex: 1 }}>
          {/* Agent Settings */}
          <div className="agent-main glass">
            <div className="panel-toolbar border-b border-color mb-4 pb-4">
              <h2 className="panel-title m-0">Agent Settings</h2>
            </div>

            <div className="form-group mb-5">
              <label className="font-semibold text-primary">Agent Name / Identity</label>
              <input 
                type="text" 
                className="form-control" 
                value={agentName}
                onChange={e => setAgentName(e.target.value)}
              />
            </div>

            <div className="form-group mb-5">
              <label className="font-semibold text-primary flex items-center gap-2">
                <Key size={16} /> API Integration Key
              </label>
              <input 
                type="password" 
                className="form-control" 
                placeholder="Paste your secret API key here..." 
                value={apiKey}
                onChange={e => setApiKey(e.target.value)}
              />
            </div>

            <div className="pt-4 border-t border-color flex justify-end">
              <button className="btn-primary flex items-center gap-2" onClick={handleSave}>
                <Save size={16} /> Save Configuration
              </button>
            </div>
          </div>

          {/* Admin AI Console */}
          <div className="agent-main glass flex flex-col h-[500px]">
            <div className="panel-toolbar border-b border-color mb-4 pb-4">
              <h2 className="panel-title m-0 text-primary flex items-center gap-2">
                <Sparkles size={20} /> Platform Admin Console
              </h2>
            </div>
            
            <div className="flex-1 overflow-y-auto pr-2 mb-4 admin-chat-box">
               {adminChat.map((msg, idx) => (
                  <div key={idx} className={`mb-4 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`p-3 rounded-lg text-sm max-w-[80%] ${msg.role === 'user' ? 'bg-primary text-white' : 'bg-gray-100 text-primary font-medium'}`}>
                      {msg.content}
                    </div>
                  </div>
               ))}
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
               {["Revoke keys for suspicious sellers", "Generate weekly revenue report", "Show pending seller applications"].map(hint => (
                  <button key={hint} className="text-[10px] font-bold uppercase tracking-wider bg-indigo-50 text-primary px-2 py-1 rounded hover:bg-primary hover:text-white transition cursor-pointer" onClick={() => setAdminQuery(hint)}>
                    <Sparkles size={10} className="inline mr-1" /> {hint}
                  </button>
               ))}
            </div>

            <form className="flex gap-2" onSubmit={handleAdminSend}>
              <input 
                type="text" 
                className="form-control flex-1" 
                placeholder="Query the system agent..." 
                value={adminQuery}
                onChange={(e) => setAdminQuery(e.target.value)}
              />
              <button type="submit" className="btn-primary p-3">
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>

        <div className="agent-sidebar">
          <div className="glass p-4 rounded-lg shadow-sm mb-4">
            <h3 className="font-semibold mb-3 flex items-center gap-2 border-b border-color pb-2">
              <Activity size={18} /> Status Overview
            </h3>
            <div className="flex justify-between items-center py-2 border-b border-color">
              <span className="text-secondary text-sm">Connection Status</span>
              {isActive ? (
                <span className="status-badge badge-success text-xs">Online</span>
              ) : (
                <span className="status-badge badge-neutral text-xs">Offline</span>
              )}
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-secondary text-sm">Last Synced</span>
              <span className="font-mono text-xs text-primary">{isActive ? 'Just now' : 'Never'}</span>
            </div>
          </div>
          
          <div className="glass p-4 rounded-lg shadow-sm">
            <h3 className="font-semibold mb-3 flex items-center gap-2 border-b border-color pb-2">
              <Server size={18} /> Capabilities
            </h3>
            <ul className="text-sm text-secondary flex flex-col gap-2 list-inside list-disc">
              <li>Respond to Seller Support queries</li>
              <li>Automate Refund verifications</li>
              <li>Generate Product descriptions</li>
              <li>Flag suspicious User Accounts</li>
            </ul>
            <div className="mt-4 p-3 bg-blue-50 text-blue-800 text-xs rounded-md">
              <strong>Info:</strong> Additional capabilities will unlock automatically based on the permissions granted by the API Gateway.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentView;
