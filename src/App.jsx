import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  CartesianGrid, RadarChart, Radar, PolarGrid, PolarAngleAxis, 
  PolarRadiusAxis, BarChart, Bar, Cell
} from "recharts";
import {
  Shield, Mic, Zap, Sun, Atom, Layers, Activity, Users, 
  Award, Bell, BarChart3, Settings2, Power, Building, 
  MapPin, Heart, Beaker, Fingerprint, Microscope, 
  CheckCircle2, Download, MousePointer2, Cpu
} from "lucide-react";

// --- GLOBAL STYLES ---
const glassStyle = "bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(15,76,58,0.15)] rounded-[2rem]";

// --- SIMULATION DATA ---
const rnd = (a, b) => Math.random() * (b - a) + a;
const rndI = (a, b) => Math.floor(rnd(a, b));
const initialBio = Array.from({ length: 40 }, (_, i) => ({
  t: i,
  co2: 410 + rndI(0, 20),
  pm25: 8 + rndI(0, 4),
  ros: 30 + rndI(0, 10),
}));

export default function TBShieldOHCExpert() {
  const [page, setPage] = useState("surveillance");
  const [emergency, setEmergency] = useState(false);
  const [coughs, setCoughs] = useState(24);
  const [systemLogs, setSystemLogs] = useState([
    { id: 1, time: "17:10", msg: "OHC Nexus Engine Active", type: "info" },
    { id: 2, time: "17:12", msg: "Acoustic Sensors Calibrated", type: "success" }
  ]);
  
  const [bio, setBio] = useState(initialBio);
  const tickRef = useRef(40);

  // Real-time Engine
  useEffect(() => {
    const interval = setInterval(() => {
      tickRef.current++;
      const isCough = Math.random() < 0.1;
      const newEntry = {
        t: tickRef.current,
        co2: isCough ? rndI(650, 850) : 410 + rndI(0, 25),
        pm25: isCough ? rndI(18, 28) : 7 + rndI(0, 6),
        ros: isCough ? rndI(90, 120) : 35 + rndI(0, 10),
      };
      if (isCough) {
        setCoughs(c => c + 1);
        setSystemLogs(prev => [{ id: Date.now(), time: new Date().toLocaleTimeString("id-ID").slice(0,5), msg: "Alert: TB-Cough Pattern Detected", type: "alert" }, ...prev].slice(0, 5));
      }
      setBio(prev => [...prev.slice(1), newEntry]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 font-sans p-3 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-dot-grid.png')] opacity-[0.03]" />
      
      <div className={`${glassStyle} p-6 border-emerald-900/50`}>
        {/* HEADER */}
        <header className="flex justify-between items-center mb-8 pb-5 border-b border-white/5">
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => setPage("surveillance")}>
            <div className="w-12 h-12 rounded-xl bg-[#0f4c3a] border border-emerald-700 flex items-center justify-center shadow-xl">
                <Shield size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-black text-white tracking-widest leading-none mb-1 uppercase">TB SHIELD OHC DASHBOARD</h1>
              <div className="flex items-center gap-2">
                <MapPin size={10} className="text-emerald-500" />
                <p className="text-[9px] font-black text-slate-400 tracking-[0.3em] uppercase">PT. NUSA FORTUNE · SURVEILLANCE HUB</p>
              </div>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-1.5 bg-black/30 p-1 rounded-xl border border-white/5">
            {[
              { id: "surveillance", label: "Monitor", icon: LayoutDashboard },
              { id: "workforce", label: "Workforce", icon: Users },
              { id: "reports", label: "Laporan", icon: BarChart3 },
              { id: "teknologi", label: "Teknologi", icon: Microscope },
              { id: "sistem", label: "Sistem", icon: Settings2 },
            ].map(item => (
              <button key={item.id} onClick={() => setPage(item.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${page === item.id ? 'bg-[#0f4c3a] text-white shadow-lg border border-emerald-700' : 'text-slate-500 hover:text-slate-100'}`}>
                <item.icon size={14} /> {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
             <div className="text-right pr-4 border-r border-white/5">
                <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest animate-pulse">● Live</span>
                <div className="text-[10px] font-mono font-bold text-slate-500 mt-0.5">{new Date().toLocaleTimeString("id-ID")}</div>
             </div>
             <button onClick={() => setEmergency(true)} className="w-10 h-10 rounded-xl bg-rose-950 text-rose-300 flex items-center justify-center border border-rose-900"><Power size={18} /></button>
          </div>
        </header>

        <AnimatePresence mode="wait">
          {page === "surveillance" && (
            <motion.div key="db" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                <StatCard title="Cough Detected" val={coughs} icon={Mic} color="text-rose-400" />
                <StatCard title="Risk Scoring" val="42%" icon={Activity} color="text-amber-400" />
                <StatCard title="OHC Compliance" val="99.4%" icon={ShieldCheck} color="text-emerald-400" />
                <StatCard title="Inactivation" val="Optimal" icon={CheckCircle2} color="text-blue-400" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className={`${glassStyle} lg:col-span-2 p-10 border-white/5 shadow-2xl`}>
                    <div className="flex justify-between items-center mb-10 pb-5 border-b border-white/5">
                        <h3 className="text-xl font-black text-white uppercase tracking-wider">Holographic Bio-Telemetry</h3>
                        <div className="flex gap-4">
                             <Legend color="#0ea5e9" label="CO2" />
                             <Legend color="#10b981" label="PM2.5" />
                             <Legend color="#8b5cf6" label="ROS" />
                        </div>
                    </div>
                    <div className="h-[400px] -ml-5"><ChartMain data={bio} /></div>
                </div>
                <div className="space-y-8">
                    <div className={`${glassStyle} p-8 border-white/5 h-[320px] overflow-hidden`}>
                        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400 mb-6 flex items-center gap-2"><Bell size={14}/> Audit Trail</h3>
                        <div className="space-y-5">
                            {systemLogs.map(log => (
                                <div key={log.id} className={`flex gap-3 border-l-2 pl-4 py-1 ${log.type === 'alert' ? 'border-rose-600' : 'border-emerald-600'}`}>
                                    <span className="text-[9px] font-mono text-slate-500">{log.time}</span>
                                    <p className="text-xs font-bold text-slate-100">{log.msg}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={`${glassStyle} p-8 border-white/5`}>
                        <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-6 uppercase">System Control</h3>
                        <div className="space-y-3">
                            <MiniToggle label="UVC Source" icon={Sun} on={true} />
                            <MiniToggle label="TiO2 Active" icon={Atom} on={true} />
                        </div>
                    </div>
                </div>
              </div>
            </motion.div>
          )}

          {page === "workforce" && (
            <motion.div key="wf" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
              <div className="bg-white/5 p-10 rounded-[3rem] border border-white/5 shadow-xl">
                <table className="w-full text-left">
                  <thead className="text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-white/5">
                    <tr><th className="px-8 py-6">Pegawai</th><th className="px-8 py-6">Departemen</th><th className="px-8 py-6">Risk Score</th><th className="px-8 py-6">Status</th></tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {[
                      { name: "Bambang Sugio", dept: "Produksi A", risk: 12, status: "Healthy" },
                      { name: "Siti Aminah", dept: "Logistik", risk: 68, status: "Observation" },
                    ].map((e, i) => (
                      <tr key={i} className="hover:bg-white/5 transition-all">
                        <td className="px-8 py-6 font-black">{e.name}</td>
                        <td className="px-8 py-6 font-bold text-slate-400">{e.dept}</td>
                        <td className="px-8 py-6"><div className="w-24 h-2 bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-emerald-500" style={{width: `${e.risk}%`}} /></div></td>
                        <td className="px-8 py-6"><span className="px-3 py-1 bg-emerald-950 text-emerald-400 text-[9px] font-black rounded-full uppercase">{e.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {page === "reports" && (
             <motion.div key="lp" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="grid grid-cols-1 md:grid-cols-2 gap-8 py-10">
                <div className={`${glassStyle} p-10 flex flex-col items-center justify-center`}><h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-10">Kepatuhan K3</h4><div className="h-[250px] w-full"><ChartRadar /></div></div>
                <div className={`${glassStyle} p-10`}><h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-10">Trend Mingguan</h4><div className="h-[250px] w-full"><ChartBar /></div></div>
             </motion.div>
          )}

          {page === "teknologi" && (
            <motion.div key="tk" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-3 gap-6 py-10">
                <TechBox icon={Mic} title="Acoustic AI" desc="Deep Learning Wav2Vec2 untuk deteksi batuk." />
                <TechBox icon={Sun} title="Far-UVC" desc="Inaktivasi patogen tanpa merusak sel kulit." />
                <TechBox icon={Atom} title="TiO2 Coating" desc="Reaksi fotokatalitik pengoksidasi kuman." />
            </motion.div>
          )}

          {page === "sistem" && (
            <motion.div key="sys" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto py-10">
              <div className={`${glassStyle} p-16 text-center shadow-2xl`}>
                <Award size={60} className="mx-auto mb-6 text-emerald-500 opacity-50" />
                <h1 className="text-4xl font-black mb-4 tracking-tighter uppercase">Nexus Expert Hub</h1>
                <p className="text-emerald-400 font-bold uppercase tracking-widest text-[10px] mb-8">Universitas Airlangga - UGM Hackathon 2026</p>
                <div className="grid grid-cols-2 gap-6 text-left">
                  <div className="bg-black/20 p-6 rounded-2xl border border-white/5"><h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Architect</h4><p className="font-bold text-sm">Tim UNAIR</p></div>
                  <div className="bg-black/20 p-6 rounded-2xl border border-white/5"><h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Operation</h4><p className="font-bold text-sm">PT Nusa Fortune OHC</p></div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <footer className="text-center py-10 opacity-20">
        <p className="text-[9px] font-black tracking-[0.5em] uppercase">© 2026 TB-SHIELD · PT NUSA FORTUNE · UNAIR</p>
      </footer>

      {emergency && (
        <div className="fixed inset-0 z-[100] bg-rose-950/95 backdrop-blur-3xl flex flex-col items-center justify-center text-white p-6" onClick={() => setEmergency(false)}>
          <AlertTriangle size={80} className="mb-6 animate-bounce text-rose-500" />
          <h2 className="text-4xl font-black mb-4">EMERGENCY ACTIVE</h2>
          <p className="text-lg opacity-60 text-center max-w-md">Sistem sterilisasi maksimal diaktifkan di seluruh area PT Nusa Fortune.</p>
        </div>
      )}
    </div>
  );
}

// --- SUB COMPONENTS ---
function StatCard({ title, val, icon: Icon, color }) {
  return (
    <div className={`${glassStyle} p-8 border-white/5 hover:border-emerald-500 transition-all cursor-pointer group`}>
      <div className={`w-12 h-12 rounded-xl bg-black/40 flex items-center justify-center ${color} mb-6 group-hover:bg-[#0f4c3a] group-hover:text-white transition-all`}><Icon size={22}/></div>
      <div className={`text-4xl font-black tracking-tighter mb-1 ${color}`}>{val}</div>
      <div className="text-[9px] font-black uppercase tracking-widest text-slate-500">{title}</div>
    </div>
  );
}

function MiniToggle({ label, icon: Icon, on }) {
  return (
    <div className="flex justify-between items-center p-4 bg-black/40 rounded-xl border border-white/5">
      <div className="flex items-center gap-3"><Icon size={16} className="text-slate-500"/><span className="text-xs font-bold text-slate-300">{label}</span></div>
      <div className={`w-10 h-5 rounded-full ${on ? 'bg-emerald-600' : 'bg-slate-700'} flex items-center px-1`}><div className="w-3 h-3 bg-white rounded-full" /></div>
    </div>
  );
}

function TechBox({ icon: Icon, title, desc }) {
  return (
    <div className={`${glassStyle} p-10 border-white/5 text-center`}>
      <div className="w-16 h-16 rounded-2xl bg-black/40 text-emerald-500 flex items-center justify-center mx-auto mb-6 border border-white/5"><Icon size={30}/></div>
      <h3 className="font-black mb-4 uppercase tracking-wider">{title}</h3>
      <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
    </div>
  );
}

function Legend({ color, label }) {
  return <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full" style={{background: color}}/><span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{label}</span></div>;
}

// --- CHARTS ---
function ChartMain({ data }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="c" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.4}/><stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/></linearGradient>
          <linearGradient id="p" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/><stop offset="95%" stopColor="#10b981" stopOpacity={0}/></linearGradient>
          <linearGradient id="r" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4}/><stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/></linearGradient>
        </defs>
        <CartesianGrid stroke="rgba(255,255,255,0.02)" vertical={false} />
        <XAxis dataKey="t" hide />
        <YAxis tick={{fill: '#64748b', fontSize: 10, fontWeight: 900}} axisLine={false} tickLine={false} />
        <Tooltip contentStyle={{background: '#000', border: 'none', borderRadius: 12}} />
        <Area type="monotone" dataKey="co2" stroke="#0ea5e9" strokeWidth={4} fill="url(#c)" isAnimationActive={false} />
        <Area type="monotone" dataKey="pm25" stroke="#10b981" strokeWidth={4} fill="url(#p)" isAnimationActive={false} />
        <Area type="monotone" dataKey="ros" stroke="#8b5cf6" strokeWidth={4} fill="url(#r)" isAnimationActive={false} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

function ChartRadar() {
  const data = [{m: "Sensitivity", v: 94}, {m: "Privacy", v: 100}, {m: "Safety", v: 98}, {m: "Latency", v: 85}, {m: "Scale", v: 88}];
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart data={data}>
        <PolarGrid stroke="rgba(255,255,255,0.05)" />
        <PolarAngleAxis dataKey="m" tick={{fill: "#64748b", fontSize: 10, fontWeight: 900}} />
        <Radar name="TBS" dataKey="v" stroke="#10b981" fill="#10b981" fillOpacity={0.2} strokeWidth={3} />
      </RadarChart>
    </ResponsiveContainer>
  );
}

function ChartBar() {
  const data = [{n: "W1", v: 80}, {n: "W2", v: 95}, {n: "W3", v: 88}, {n: "W4", v: 99}];
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}><Bar dataKey="v" fill="#0f4c3a" radius={[10, 10, 0, 0]} /></BarChart>
    </ResponsiveContainer>
  );
}