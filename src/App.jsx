import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  CartesianGrid, RadarChart, Radar, PolarGrid, PolarAngleAxis, 
  BarChart, Bar, Cell, ComposedChart, Line, Legend as RechartsLegend,
  PieChart, Pie
} from "recharts";
import {
  Shield, Mic, Zap, Sun, Atom, Activity, Users, 
  Bell, BarChart3, Settings2, Power, Building, 
  MapPin, HeartPulse, Stethoscope, ShieldAlert,
  CheckCircle2, Download, Cpu, TrendingDown, Target
} from "lucide-react";

// --- GLOBAL STYLES ---
const glassPanel = "bg-[#020817]/60 backdrop-blur-2xl border border-emerald-900/30 shadow-[0_0_40px_-10px_rgba(16,185,129,0.1)] rounded-[2rem]";
const neonGlow = "drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]";

// --- SIMULATION DATA ENGINE ---
const rnd = (a, b) => Math.random() * (b - a) + a;
const rndI = (a, b) => Math.floor(rnd(a, b));
const initialBio = Array.from({ length: 45 }, (_, i) => ({
  t: i, co2: 410 + rndI(0, 15), pm25: 8 + rndI(0, 3), ros: 40 + rndI(0, 5), status: "Aman"
}));

export default function TBShieldMaster() {
  const [page, setPage] = useState("surveillance");
  const [emergency, setEmergency] = useState(false);
  const [coughs, setCoughs] = useState(128);
  const [prevented, setPrevented] = useState(14);
  const [logs, setLogs] = useState([
    { id: 1, time: "17:10", msg: "Acoustic AI Triage Initialized", type: "info" },
    { id: 2, time: "17:11", msg: "Bio-Photonic Sterilization Active", type: "success" }
  ]);
  
  const [bio, setBio] = useState(initialBio);
  const tickRef = useRef(45);

  // Real-time Dynamics
  useEffect(() => {
    const interval = setInterval(() => {
      tickRef.current++;
      const isAnomaly = Math.random() < 0.12;
      
      const newData = {
        t: tickRef.current,
        co2: isAnomaly ? rndI(700, 950) : 410 + rndI(0, 30),
        pm25: isAnomaly ? rndI(25, 45) : 8 + rndI(0, 5),
        ros: isAnomaly ? rndI(110, 140) : 40 + rndI(0, 10),
        status: isAnomaly ? "Airborne Risk" : "Aman"
      };

      if (isAnomaly) {
        setCoughs(c => c + 1);
        if (Math.random() < 0.3) setPrevented(p => p + 1);
        setLogs(prev => [{ id: Date.now(), time: new Date().toLocaleTimeString("id-ID").slice(0,5), msg: "Alert: TB-Signature Detected. UVC Boost Active.", type: "alert" }, ...prev].slice(0, 6));
      }
      setBio(prev => [...prev.slice(1), newData]);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#000208] text-slate-200 font-sans p-4 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-900/20 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[500px] bg-blue-900/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.02]" />

      <div className={`${glassPanel} max-w-[1600px] mx-auto p-8 relative z-10 border-emerald-500/20`}>
        {/* HEADER */}
        <header className="flex justify-between items-center mb-10 pb-6 border-b border-white/5">
          <div className="flex items-center gap-5">
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0f4c3a] to-emerald-900 border border-emerald-500/50 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.3)]`}>
                <Shield size={28} className="text-emerald-50" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-cyan-300 tracking-wider mb-1 uppercase">TB SHIELD OHC DASHBOARD</h1>
              <div className="flex items-center gap-2">
                <MapPin size={12} className="text-emerald-500 animate-pulse" />
                <p className="text-[10px] font-bold text-slate-400 tracking-[0.4em] uppercase">PT. NUSA FORTUNE · COMMAND CENTER</p>
              </div>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-2 bg-black/40 p-1.5 rounded-2xl border border-white/5 shadow-inner">
            {[
              { id: "surveillance", label: "Live Monitor", icon: Activity },
              { id: "reports", label: "Data & Analytics", icon: BarChart3 },
              { id: "workforce", label: "Workforce", icon: Users },
              { id: "sistem", label: "System Setup", icon: Cpu },
            ].map(item => (
              <button key={item.id} onClick={() => setPage(item.id)}
                className={`flex items-center gap-2.5 px-6 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all duration-300 ${page === item.id ? 'bg-gradient-to-r from-emerald-600 to-[#0f4c3a] text-white shadow-lg shadow-emerald-900/50 scale-105' : 'text-slate-400 hover:text-emerald-300 hover:bg-white/5'}`}>
                <item.icon size={16} /> {item.label}
              </button>
            ))}
          </nav>

          <button onClick={() => setEmergency(true)} className="w-12 h-12 rounded-2xl bg-rose-950/80 text-rose-400 flex items-center justify-center border border-rose-900/50 hover:bg-rose-600 hover:text-white transition-all shadow-[0_0_15px_rgba(225,29,72,0.2)]"><Power size={22} /></button>
        </header>

        <AnimatePresence mode="wait">
          {/* ==================== 1. LIVE MONITOR ==================== */}
          {page === "surveillance" && (
            <motion.div key="db" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <HighlightCard title="Acoustic Anomalies" val={coughs} icon={Mic} col="text-rose-400" bg="bg-rose-950/30" border="border-rose-900/50" sub="Total Batuk Terdeteksi" />
                <HighlightCard title="Estimated Prevention" val={prevented} icon={ShieldAlert} col="text-amber-400" bg="bg-amber-950/30" border="border-amber-900/50" sub="Kasus Potensial Dicegah" />
                <HighlightCard title="Sterilization Efficacy" val="99.8%" icon={Stethoscope} col="text-cyan-400" bg="bg-cyan-950/30" border="border-cyan-900/50" sub="Kuman Tereliminasi" />
                <HighlightCard title="Air Quality Index" val="Optimal" icon={CheckCircle2} col="text-emerald-400" bg="bg-emerald-950/30" border="border-emerald-900/50" sub="Sirkulasi Bersih" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* ADVANCED CHART WITH INTELLIGENT TOOLTIP */}
                <div className={`${glassPanel} lg:col-span-2 p-8 relative`}>
                    <div className="flex justify-between items-end mb-8">
                        <div>
                            <h3 className="text-xl font-black text-emerald-100 uppercase tracking-widest flex items-center gap-3"><Activity className="text-emerald-500"/> Real-Time Bio-Telemetry</h3>
                            <p className="text-[10px] text-slate-400 font-medium tracking-wider mt-2">Pemantauan spektrum CO2, Partikel Halus, dan Oksidator Pathogen.</p>
                        </div>
                        <div className="flex gap-4 bg-black/50 p-3 rounded-xl border border-white/5">
                             <ChartLegend color="#0ea5e9" label="CO2" />
                             <ChartLegend color="#10b981" label="PM2.5" />
                             <ChartLegend color="#8b5cf6" label="UVC/ROS" />
                        </div>
                    </div>
                    
                    {/* The Chart */}
                    <div className="h-[420px] w-full relative">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={bio} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                            <defs>
                              <linearGradient id="cGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.5}/><stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/></linearGradient>
                              <linearGradient id="pGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#10b981" stopOpacity={0.5}/><stop offset="95%" stopColor="#10b981" stopOpacity={0}/></linearGradient>
                              <linearGradient id="rGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.5}/><stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/></linearGradient>
                            </defs>
                            <CartesianGrid stroke="rgba(255,255,255,0.03)" vertical={false} strokeDasharray="4 4" />
                            <XAxis dataKey="t" hide />
                            <YAxis tick={{fill: '#475569', fontSize: 10, fontWeight: 900}} axisLine={false} tickLine={false} />
                            
                            {/* INTELLIGENT TOOLTIP */}
                            <Tooltip content={<CustomIntelligentTooltip />} cursor={{ stroke: 'rgba(16,185,129,0.2)', strokeWidth: 40 }} />
                            
                            <Area type="monotone" dataKey="co2" stroke="#0ea5e9" strokeWidth={3} fill="url(#cGrad)" isAnimationActive={false} />
                            <Area type="step" dataKey="pm25" stroke="#10b981" strokeWidth={3} fill="url(#pGrad)" isAnimationActive={false} />
                            <Area type="monotone" dataKey="ros" stroke="#8b5cf6" strokeWidth={3} fill="url(#rGrad)" isAnimationActive={false} />
                          </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* LOGS & ACTUATORS */}
                <div className="space-y-8">
                    <div className={`${glassPanel} p-8 h-[320px] overflow-hidden flex flex-col`}>
                        <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-emerald-400 mb-6 flex items-center gap-3 border-b border-white/5 pb-4"><Bell size={16}/> System Audit Log</h3>
                        <div className="space-y-4 overflow-y-auto flex-1 pr-2 custom-scrollbar">
                            {logs.map(log => (
                                <div key={log.id} className={`p-4 rounded-xl border ${log.type === 'alert' ? 'bg-rose-950/20 border-rose-900/50' : 'bg-emerald-950/20 border-emerald-900/50'}`}>
                                    <div className="flex items-center gap-2 mb-1">
                                        <div className={`w-1.5 h-1.5 rounded-full ${log.type === 'alert' ? 'bg-rose-500 animate-pulse' : 'bg-emerald-500'}`} />
                                        <span className="text-[10px] font-mono text-slate-400">{log.time}</span>
                                    </div>
                                    <p className={`text-xs font-bold leading-relaxed ${log.type === 'alert' ? 'text-rose-200' : 'text-emerald-100'}`}>{log.msg}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={`${glassPanel} p-8`}>
                        <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-500 mb-6">Hardware Control</h3>
                        <div className="space-y-4">
                            <ControlSwitch label="Far-UVC 222nm" icon={Sun} active={true} />
                            <ControlSwitch label="TiO2 Coating" icon={Atom} active={true} />
                            <ControlSwitch label="Auto-Triage AI" icon={Cpu} active={true} />
                        </div>
                    </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ==================== 2. COMPREHENSIVE REPORTS ==================== */}
          {page === "reports" && (
             <motion.div key="lp" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                <div className="flex justify-between items-end mb-4">
                    <div>
                        <h2 className="text-3xl font-black text-emerald-50 uppercase tracking-widest">Public Health Impact Analytics</h2>
                        <p className="text-slate-400 text-sm mt-2 font-medium">Analisis Korelasi Gejala, Kualitas Udara, dan Return on Investment (ROI) Kesehatan.</p>
                    </div>
                    <button className="bg-emerald-900/50 hover:bg-emerald-800 border border-emerald-500/30 text-emerald-100 px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest flex items-center gap-2 transition-all"><Download size={16}/> Unduh PDF OHC</button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* CHART 1: COMPOSED CORRELATION */}
                    <div className={`${glassPanel} lg:col-span-2 p-8`}>
                        <h3 className="text-sm font-black text-emerald-200 uppercase tracking-widest mb-8">Korelasi PM2.5 & Insidensi Batuk (30 Hari)</h3>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <ComposedChart data={[{d:'Mg1', pm:12, btk:4}, {d:'Mg2', pm:25, btk:15}, {d:'Mg3', pm:18, btk:8}, {d:'Mg4', pm:10, btk:2}]}>
                                    <CartesianGrid stroke="rgba(255,255,255,0.02)" vertical={false}/>
                                    <XAxis dataKey="d" tick={{fill: '#475569', fontSize:11, fontWeight:800}} axisLine={false} tickLine={false}/>
                                    <YAxis hide/>
                                    <Tooltip contentStyle={{background:'#020817', border:'1px solid #0f4c3a', borderRadius:'12px'}}/>
                                    <Bar dataKey="pm" name="Level PM2.5" fill="#0f4c3a" radius={[6,6,0,0]} barSize={40} />
                                    <Line type="monotone" dataKey="btk" name="Jumlah Batuk" stroke="#f43f5e" strokeWidth={4} dot={{r:6, fill:'#f43f5e', stroke:'#020817', strokeWidth:2}} />
                                </ComposedChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* CHART 2: SYSTEM EFFICACY DONUT */}
                    <div className={`${glassPanel} p-8 flex flex-col items-center justify-center`}>
                        <h3 className="text-sm font-black text-emerald-200 uppercase tracking-widest mb-6 w-full text-center">Efisiensi Dekontaminasi</h3>
                        <div className="h-[220px] w-full relative">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie data={[{n:"Eliminated", v:99.8, fill:"#10b981"}, {n:"Residue", v:0.2, fill:"#1e293b"}]} innerRadius={70} outerRadius={90} dataKey="v" stroke="none" cornerRadius={10}>
                                        {[{fill:"#10b981"}, {fill:"#1e293b"}].map((e,i)=><Cell key={i} fill={e.fill}/>)}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-4xl font-black text-emerald-400">99%</span>
                                <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest">Kuman Mati</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* HEALTH ECONOMICS IMPACT */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <ImpactBox title="Penghematan Biaya Medis" val="Rp 45.2 Juta" sub="Estimasi dari pencegahan transmisi." icon={TrendingDown} col="text-emerald-400" />
                    <ImpactBox title="Produktivitas Terjaga" val="1.200 Jam" sub="Waktu kerja tidak hilang akibat sakit." icon={Target} col="text-cyan-400" />
                    <ImpactBox title="Radar Akurasi AI" val="94.8%" sub="Sensitivitas membedakan batuk TB." icon={HeartPulse} col="text-violet-400" />
                </div>
             </motion.div>
          )}

          {/* ==================== OTHER PAGES (KEPT SLEEK) ==================== */}
          {page === "workforce" && (
            <motion.div key="wf" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
              <div className={`${glassPanel} p-10`}>
                <table className="w-full text-left border-collapse">
                  <thead className="text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-white/10">
                    <tr><th className="px-6 py-6">ID</th><th className="px-6 py-6">Nama Pegawai</th><th className="px-6 py-6">Area Kerja</th><th className="px-6 py-6">Acoustic Risk Index</th><th className="px-6 py-6">Action</th></tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {[
                      { id:"NF-01", name: "Bambang Sugio", dept: "Produksi A", risk: 15, status: "Safe" },
                      { id:"NF-88", name: "Siti Aminah", dept: "Gudang Logistik", risk: 78, status: "Alert" },
                      { id:"NF-24", name: "Ahmad Rifai", dept: "Produksi B", risk: 22, status: "Safe" },
                    ].map((e, i) => (
                      <tr key={i} className="hover:bg-white/5 transition-all">
                        <td className="px-6 py-6 font-mono text-xs text-slate-400">{e.id}</td>
                        <td className="px-6 py-6 font-black text-emerald-50">{e.name}</td>
                        <td className="px-6 py-6 font-bold text-slate-400 text-sm">{e.dept}</td>
                        <td className="px-6 py-6"><div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-white/5"><div className={`h-full ${e.risk > 50 ? 'bg-rose-500' : 'bg-emerald-500'}`} style={{width: `${e.risk}%`}} /></div></td>
                        <td className="px-6 py-6"><button className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest ${e.risk > 50 ? 'bg-rose-950 text-rose-400 border border-rose-900' : 'bg-emerald-950 text-emerald-400 border border-emerald-900'}`}>Review</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {page === "sistem" && (
             <motion.div key="sys" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-center py-20">
              <div className={`${glassPanel} p-20 text-center max-w-3xl w-full`}>
                <Shield size={80} className="mx-auto mb-8 text-emerald-500/50 drop-shadow-[0_0_30px_rgba(16,185,129,0.5)]" />
                <h1 className="text-4xl font-black mb-4 tracking-tighter uppercase text-white">NEXUS CORE SYSTEM</h1>
                <p className="text-emerald-400 font-bold uppercase tracking-[0.3em] text-xs mb-12">Universitas Airlangga - UGM Hackathon 2026</p>
                <div className="bg-black/30 p-8 rounded-2xl border border-white/5 text-left space-y-4">
                  <div className="flex justify-between items-center border-b border-white/5 pb-4"><span className="text-slate-400 font-bold text-sm">System Architect</span><span className="font-black text-emerald-100 uppercase">Tim UNAIR</span></div>
                  <div className="flex justify-between items-center border-b border-white/5 pb-4"><span className="text-slate-400 font-bold text-sm">Deployment Env</span><span className="font-black text-emerald-100 uppercase">PT Nusa Fortune</span></div>
                  <div className="flex justify-between items-center"><span className="text-slate-400 font-bold text-sm">Data Encryption</span><span className="font-black text-emerald-100 uppercase">AES-256 Cloud</span></div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// --- MICRO COMPONENTS ---
function HighlightCard({ title, val, icon: Icon, col, bg, border, sub }) {
  return (
    <div className={`${glassPanel} p-8 ${border} hover:scale-[1.02] transition-all duration-300`}>
      <div className="flex justify-between items-start mb-6">
          <div className={`w-14 h-14 rounded-2xl ${bg} flex items-center justify-center border ${border}`}><Icon size={24} className={col}/></div>
      </div>
      <div className={`text-4xl font-black tracking-tighter mb-2 ${col}`}>{val}</div>
      <div className="text-[11px] font-black uppercase tracking-widest text-slate-300 mb-1">{title}</div>
      <div className="text-[10px] font-medium text-slate-500">{sub}</div>
    </div>
  );
}

function ImpactBox({ title, val, sub, icon: Icon, col }) {
    return (
        <div className={`${glassPanel} p-8 text-center flex flex-col items-center justify-center`}>
            <Icon size={32} className={`${col} mb-6 opacity-80`} />
            <div className={`text-3xl font-black mb-3 ${col}`}>{val}</div>
            <div className="text-xs font-black uppercase tracking-widest text-slate-200 mb-2">{title}</div>
            <div className="text-[10px] text-slate-500 font-medium">{sub}</div>
        </div>
    );
}

function ControlSwitch({ label, icon: Icon, active }) {
  return (
    <div className="flex items-center justify-between p-4 bg-black/40 rounded-2xl border border-white/5">
      <div className="flex items-center gap-3"><Icon size={18} className="text-emerald-500"/><span className="text-sm font-bold text-slate-200">{label}</span></div>
      <div className="w-12 h-6 rounded-full bg-emerald-600/20 border border-emerald-500/50 flex items-center px-1"><div className="w-4 h-4 bg-emerald-400 rounded-full shadow-[0_0_10px_rgba(52,211,153,0.8)] translate-x-6" /></div>
    </div>
  );
}

function ChartLegend({ color, label }) {
  return <div className="flex items-center gap-2.5"><div className="w-3 h-3 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.3)]" style={{background: color}}/><span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{label}</span></div>;
}

// --- THE INTELLIGENT TOOLTIP ---
function CustomIntelligentTooltip({ active, payload }) {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const isDanger = data.status === "Airborne Risk";
      return (
        <div className={`p-5 rounded-2xl border backdrop-blur-xl shadow-2xl min-w-[200px] ${isDanger ? 'bg-rose-950/90 border-rose-500/50' : 'bg-[#020817]/90 border-emerald-500/30'}`}>
          <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-3">
              <Activity size={16} className={isDanger ? "text-rose-400" : "text-emerald-400"} />
              <span className={`text-xs font-black uppercase tracking-widest ${isDanger ? "text-rose-400" : "text-emerald-400"}`}>{isDanger ? "Anomali Terdeteksi" : "Kondisi Optimal"}</span>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center"><span className="text-[10px] font-bold text-slate-400 uppercase">CO2 Level</span><span className="text-sm font-black text-sky-400">{data.co2} ppm</span></div>
            <div className="flex justify-between items-center"><span className="text-[10px] font-bold text-slate-400 uppercase">PM2.5 Density</span><span className="text-sm font-black text-emerald-400">{data.pm25} µg</span></div>
            <div className="flex justify-between items-center"><span className="text-[10px] font-bold text-slate-400 uppercase">UVC/ROS Power</span><span className="text-sm font-black text-violet-400">{data.ros} %</span></div>
          </div>
          {isDanger && (
              <div className="mt-4 pt-3 border-t border-rose-500/20 text-[10px] font-bold text-rose-200 leading-relaxed italic">
                  *AI merekomendasikan observasi medis untuk area ini dan aktuasi UVC otomatis dimaksimalkan.
              </div>
          )}
        </div>
      );
    }
    return null;
}