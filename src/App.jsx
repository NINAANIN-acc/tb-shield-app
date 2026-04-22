import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AreaChart, Area, LineChart, Line, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid, RadarChart, Radar,
  PolarGrid, PolarAngleAxis, PolarRadiusAxis, ReferenceLine,
  BarChart, Bar, Cell, ComposedChart, Scatter
} from "recharts";
import {
  Shield, Activity, Lock, Users, TrendingUp, ChevronRight, 
  Settings2, Sun, Atom, Flower2, Power, Mic, Database, 
  LayoutDashboard, Cpu, DollarSign, Info, AlertTriangle,
  Building, ShieldCheck, Zap, Heart, Award, Beaker, 
  Fingerprint, Microscope, BarChart3, Bell, Server, 
  CloudLightning, HardDrive, Share2, ClipboardCheck,
  Search, UserCheck, UserX, Thermometer, Pill, FileBarChart,
  Download, MousePointer2, RefreshCw, Layers
} from "lucide-react";

// ─── UTILITIES ─────────────────────────────────────────────────────────────────
const rnd = (a, b) => Math.random() * (b - a) + a;
const rndI = (a, b) => Math.floor(rnd(a, b));
const fmtNum = (n) => new Intl.NumberFormat("id-ID").format(Math.round(n));

// ─── DATA SIMULASI LOGIS ─────────────────────────────────────────────────────
const initialBio = Array.from({ length: 30 }, (_, i) => ({
  t: i,
  co2: 410 + rndI(0, 20),
  pm25: 8 + rndI(0, 5),
  ros: 30 + rndI(0, 10),
  noise: 40 + rndI(0, 5)
}));

// ─── APLIKASI UTAMA ───────────────────────────────────────────────────────────
export default function TBShieldOHCExpert() {
  const [page, setPage] = useState("dashboard");
  const [emergency, setEmergency] = useState(false);
  const [hw, setHw] = useState({ uvc: true, tio2: true, autoActuation: true });
  const [coughs, setCoughs] = useState(24);
  const [systemLogs, setSystemLogs] = useState([
    { id: 1, time: "16:01", msg: "OHC Nexus Core Initialized", type: "info" },
    { id: 2, time: "16:05", msg: "Acoustic Triage: Model Wav2Vec2 Ready", type: "success" }
  ]);
  
  const [bio, setBio] = useState(initialBio);
  const tickRef = useRef(30);

  // Financial Variables
  const [units, setUnits] = useState(25);
  const [workers, setWorkers] = useState(650);

  // Simulasi Real-time Dinamis
  useEffect(() => {
    const interval = setInterval(() => {
      tickRef.current++;
      const isCough = Math.random() < 0.12;
      
      // Logika: Jika batuk terdeteksi, CO2 naik sedikit, ROS naik tajam karena aktuasi UVC/TiO2
      const newEntry = {
        t: tickRef.current,
        co2: isCough ? rndI(600, 850) : 410 + rndI(0, 30),
        pm25: isCough ? rndI(15, 25) : 7 + rndI(0, 8),
        ros: isCough ? rndI(85, 115) : 35 + rndI(0, 15),
        noise: isCough ? rndI(70, 95) : 40 + rndI(0, 10)
      };

      if (isCough) {
        setCoughs(c => c + 1);
        const log = { 
          id: Date.now(), 
          time: new Date().toLocaleTimeString("id-ID", {hour12:false}).slice(0,5), 
          msg: "Anomaly Detected: Acoustic Signature Matches TB-Cough Pattern", 
          type: "alert" 
        };
        setSystemLogs(prev => [log, ...prev].slice(0, 6));
      }

      setBio(prev => [...prev.slice(1), newEntry]);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#f1f5f9] text-slate-900 font-sans selection:bg-emerald-200">
      
      {/* HEADER LUXURY */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-2xl border-b border-slate-200 shadow-sm">
        <div className="max-w-[1500px] mx-auto px-8 py-5 flex justify-between items-center">
          <div className="flex items-center gap-5 cursor-pointer" onClick={() => setPage("dashboard")}>
            <div className="w-14 h-14 rounded-2xl bg-[#0f4c3a] flex items-center justify-center shadow-xl shadow-emerald-900/20">
                <Shield size={28} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-[1000] text-[#0f4c3a] tracking-tighter leading-none mb-1">TB-SHIELD <span className="font-light text-slate-300">EXPERT</span></h1>
              <p className="text-[10px] font-black text-slate-400 tracking-[0.3em] uppercase italic">OHC PT. NUSA FORTUNE · SURVEILLANCE HUB</p>
            </div>
          </div>

          <nav className="hidden xl:flex items-center gap-1.5 bg-slate-100/50 p-1.5 rounded-[1.5rem] border border-slate-200">
            {[
              { id: "dashboard", label: "Surveillance", icon: LayoutDashboard },
              { id: "pegawai", label: "Workforce", icon: Users },
              { id: "laporan", label: "Executive Report", icon: FileBarChart },
              { id: "teknologi", label: "AI Analysis", icon: Microscope },
              { id: "sistem", label: "Settings", icon: Settings2 },
            ].map(item => (
              <button key={item.id} onClick={() => setPage(item.id)}
                className={`flex items-center gap-2.5 px-6 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all ${page === item.id ? 'bg-[#0f4c3a] text-white shadow-xl scale-105' : 'text-slate-400 hover:text-slate-900 hover:bg-white'}`}>
                <item.icon size={16} /> {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-6">
             <div className="hidden sm:flex flex-col items-end border-r pr-6 border-slate-200">
                <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest animate-pulse">● System Live</span>
                <span className="font-mono text-sm font-bold text-slate-500">{new Date().toLocaleTimeString("id-ID")}</span>
             </div>
             <button onClick={() => setEmergency(true)} className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center hover:bg-rose-600 hover:text-white transition-all shadow-sm">
                <Power size={22} />
             </button>
          </div>
        </div>
      </header>

      {/* EMERGENCY PROTOCOL */}
      <AnimatePresence>
        {emergency && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] bg-rose-950/98 backdrop-blur-3xl flex flex-col items-center justify-center text-white p-6">
            <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ repeat: Infinity, duration: 0.5 }} className="mb-10 text-rose-500"><AlertTriangle size={120} /></motion.div>
            <h2 className="text-6xl font-black mb-6 tracking-tighter">EMERGENCY ACTUATION</h2>
            <p className="text-xl opacity-70 mb-12 max-w-2xl text-center font-medium leading-relaxed">Sistem mendeteksi konsentrasi aerosol tinggi. Aktuasi Far-UVC 222nm dan TiO2 Nanocrystalline diaktifkan pada intensitas 100%.</p>
            <button onClick={() => setEmergency(false)} className="bg-white text-rose-950 px-16 py-6 rounded-[2.5rem] font-black text-xl shadow-2xl hover:scale-105 active:scale-95 transition-all">TERMINATE EMERGENCY MODE</button>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="max-w-[1500px] mx-auto px-8 py-10 pb-32">
        <AnimatePresence mode="wait">
          
          {/* ===================== SURVEILLANCE HUB (DASHBOARD) ===================== */}
          {page === "dashboard" && (
            <motion.div key="dashboard" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-8">
              
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <QuickStat title="Total Cough Events" val={coughs} icon={Mic} color="text-rose-500" bg="bg-rose-50" sub="Classified by Wav2Vec2" onClick={() => setPage("teknologi")} />
                <QuickStat title="Avg Risk Score" val="42%" icon={Activity} color="text-amber-500" bg="bg-amber-50" sub="Environmental Index" onClick={() => setPage("teknologi")} />
                <QuickStat title="System Efficacy" val="99.4%" icon={ShieldCheck} color="text-emerald-500" bg="bg-emerald-50" sub="Sterilization Rate" onClick={() => setPage("laporan")} />
                <QuickStat title="OHC Compliance" val="A+" icon={Award} color="text-blue-500" bg="bg-blue-50" sub="K3 Standards Met" onClick={() => setPage("laporan")} />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* BIO-TELEMETRY REAL TIME */}
                <div className="lg:col-span-2 bg-white rounded-[3rem] p-10 border border-slate-200 shadow-sm relative overflow-hidden">
                    <div className="flex justify-between items-center mb-12">
                        <div>
                            <h3 className="text-2xl font-black text-slate-800 tracking-tight">Bio-Surveillance Telemetry</h3>
                            <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">Real-time Environmental Response Data</p>
                        </div>
                        <div className="flex items-center gap-5 bg-slate-50 p-2 rounded-2xl border border-slate-100">
                             <LegendItem color="#0ea5e9" label="CO2 (ppm)" />
                             <LegendItem color="#10b981" label="PM2.5" />
                             <LegendItem color="#8b5cf6" label="ROS" />
                        </div>
                    </div>
                    <div className="h-[400px]">
                        <SurveillanceChart data={bio} />
                    </div>
                </div>

                {/* SYSTEM LOGS & ACTUATORS */}
                <div className="space-y-8">
                    <div className="bg-[#0f4c3a] rounded-[3rem] p-10 text-white h-[350px] relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 p-8 opacity-5"><Activity size={150} /></div>
                        <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-emerald-400 mb-8 flex items-center gap-2"><Bell size={16}/> Live Audit Trail</h3>
                        <div className="space-y-6 relative z-10">
                            {systemLogs.map(log => (
                                <div key={log.id} className="flex gap-4 border-l-2 border-emerald-500/30 pl-5 py-1">
                                    <span className="text-[10px] font-mono opacity-50">{log.time}</span>
                                    <p className="text-sm font-bold leading-tight tracking-tight">{log.msg}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    <div className="bg-white rounded-[3rem] p-10 border border-slate-200 shadow-sm">
                        <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-8">Hardware Actuation</h3>
                        <div className="space-y-4">
                            <ControlSwitch label="Far-UVC Source" on={hw.uvc} set={() => setHw({...hw, uvc:!hw.uvc})} icon={Sun} />
                            <ControlSwitch label="TiO2 Activator" on={hw.tio2} set={() => setHw({...hw, tio2:!hw.tio2})} icon={Atom} />
                            <ControlSwitch label="Adaptive Mode" on={hw.autoActuation} set={() => setHw({...hw, autoActuation:!hw.autoActuation})} icon={Zap} />
                        </div>
                    </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ===================== WORKFORCE (PEGAWAI) ===================== */}
          {page === "pegawai" && (
            <motion.div key="pegawai" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="space-y-10">
                <div className="flex justify-between items-end">
                    <div>
                        <h2 className="text-5xl font-black text-[#0f4c3a] tracking-tighter">Workforce Surveillance</h2>
                        <p className="text-slate-500 mt-2 font-medium">Monitoring anomali akustik dan riwayat skrining mandiri pegawai.</p>
                    </div>
                    <div className="flex gap-4">
                        <button className="bg-white border border-slate-200 p-4 rounded-2xl hover:border-[#0f4c3a] transition-all"><Search size={20} className="text-slate-400"/></button>
                        <button onClick={() => setPage("laporan")} className="bg-[#0f4c3a] text-white px-8 py-4 rounded-2xl font-black text-xs tracking-widest uppercase shadow-xl">Generate Global Report</button>
                    </div>
                </div>

                <div className="bg-white rounded-[3.5rem] border border-slate-200 overflow-hidden shadow-sm">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50/50 border-b border-slate-100">
                            <tr className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                                <th className="px-12 py-7">Employee Profile</th>
                                <th className="px-12 py-7">Department</th>
                                <th className="px-12 py-7">Acoustic Score</th>
                                <th className="px-12 py-7">Health Status</th>
                                <th className="px-12 py-7 text-right">Audit</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {[
                                { id: "NF-001", name: "Bambang Sugio", dept: "Produksi A", score: 12, status: "Healthy" },
                                { id: "NF-042", name: "Siti Aminah", dept: "Logistik", score: 68, status: "Observation" },
                                { id: "NF-103", name: "Budi Santoso", dept: "Produksi B", score: 24, status: "Healthy" },
                                { id: "NF-212", name: "Ahmad Rifai", dept: "Maintenance", score: 72, status: "Alert" },
                            ].map(emp => (
                                <tr key={emp.id} className="hover:bg-slate-50/50 transition-all group cursor-pointer">
                                    <td className="px-12 py-8">
                                        <div className="flex items-center gap-5">
                                            <div className="w-14 h-14 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center font-black text-slate-400 text-xs">{emp.id.split('-')[1]}</div>
                                            <div><div className="font-black text-slate-800 text-lg tracking-tight">{emp.name}</div><div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{emp.id}</div></div>
                                        </div>
                                    </td>
                                    <td className="px-12 py-8"><span className="text-sm font-bold text-slate-500 uppercase tracking-wider">{emp.dept}</span></td>
                                    <td className="px-12 py-8">
                                        <div className="flex items-center gap-4">
                                            <div className="w-24 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                                                <div className={`h-full transition-all duration-1000 ${emp.score > 60 ? 'bg-rose-500' : 'bg-emerald-500'}`} style={{ width: `${emp.score}%` }} />
                                            </div>
                                            <span className="font-mono text-xs font-black">{emp.score}%</span>
                                        </div>
                                    </td>
                                    <td className="px-12 py-8">
                                        <span className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest ${emp.status === 'Healthy' ? 'bg-emerald-50 text-emerald-600' : emp.status === 'Observation' ? 'bg-amber-50 text-amber-600' : 'bg-rose-50 text-rose-600'}`}>
                                            {emp.status}
                                        </span>
                                    </td>
                                    <td className="px-12 py-8 text-right">
                                        <button className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-[#0f4c3a] group-hover:text-white transition-all"><ChevronRight size={18}/></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>
          )}

          {/* ===================== EXECUTIVE REPORT ===================== */}
          {page === "laporan" && (
            <motion.div key="laporan" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-12">
                <div className="text-center max-w-3xl mx-auto space-y-4">
                    <h2 className="text-5xl font-black text-[#0f4c3a] tracking-tighter">Executive OHC Analysis</h2>
                    <p className="text-slate-500 text-xl font-medium italic">Audit kepatuhan K3 dan analisis efisiensi sterilisasi bulanan.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="bg-white rounded-[3.5rem] p-12 border border-slate-200 shadow-sm text-center flex flex-col items-center">
                        <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-10">Kepatuhan Standar K3</h4>
                        <div className="w-full h-[280px]"><PieChartReport /></div>
                        <div className="mt-8 space-y-4 w-full">
                            <ComplianceBadge label="Pathogen Inactivation" val={99.4} color="#10b981" />
                            <ComplianceBadge label="Data Privacy (PDP)" val={100} color="#8b5cf6" />
                            <ComplianceBadge label="Acoustic Accuracy" val={94.2} color="#0ea5e9" />
                        </div>
                    </div>
                    <div className="lg:col-span-2 bg-white rounded-[3.5rem] p-12 border border-slate-200 shadow-sm flex flex-col">
                        <div className="flex justify-between items-center mb-12">
                            <h3 className="text-2xl font-black text-slate-800 tracking-tight">Pathogen Detection Trend</h3>
                            <button className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest"><Download size={14}/> Export PDF</button>
                        </div>
                        <div className="flex-1 h-[400px]">
                            <BarChartReport />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <ReportFile icon={ClipboardCheck} title="OHC Quarterly Audit Q2 2026" date="22 Apr 2026" />
                    <ReportFile icon={ShieldCheck} title="UVC-222nm Safety Certification" date="15 Mar 2026" />
                    <ReportFile icon={Mic} title="Acoustic AI Performance Logs" date="01 Apr 2026" />
                </div>
            </motion.div>
          )}

          {/* ===================== AI ANALYSIS ===================== */}
          {page === "teknologi" && (
            <motion.div key="teknologi" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
               <div className="text-center max-w-4xl mx-auto space-y-6">
                    <h2 className="text-6xl font-black text-[#0f4c3a] tracking-tighter">TB-SHIELD Core Intelligence</h2>
                    <p className="text-slate-500 text-xl font-medium leading-relaxed italic">Integrasi Acoustic Triage dan Bio-Photonic Sterilization PT Nusa Fortune.</p>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <TechCard icon={Mic} title="Wav2Vec2 Acoustic AI" color="rose" desc="Deep learning model yang dilatih untuk membedakan spektrum frekuensi batuk Tuberkulosis dengan batuk normal secara instan." />
                    <TechCard icon={Sun} title="Far-UVC 222nm" color="emerald" desc="Gelombang fotonik yang memutus rantai DNA patogen airborne tanpa menembus lapisan sel hidup manusia." />
                    <TechCard icon={Layers} title="TiO2 Nanocrystalline" color="blue" desc="Fotokatalisator yang menghasilkan Reactive Oxygen Species (ROS) untuk oksidasi total membran sel kuman." />
                </div>

                <div className="bg-white rounded-[4rem] p-16 border border-slate-200 shadow-sm flex flex-col items-center">
                    <h3 className="text-3xl font-black text-slate-800 mb-12 tracking-tighter">AI Diagnostic Reliability Matrix</h3>
                    <div className="w-full max-w-2xl h-[450px]">
                        <RadarAnalysis />
                    </div>
                </div>
            </motion.div>
          )}

          {/* ===================== SETTINGS (SISTEM) ===================== */}
          {page === "sistem" && (
            <motion.div key="sistem" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl mx-auto space-y-12">
                <div className="bg-[#0f4c3a] rounded-[4rem] p-24 text-white text-center shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
                    <Cpu size={80} className="mx-auto text-emerald-400 mb-8 animate-pulse" />
                    <h1 className="text-6xl font-black mb-6 tracking-tighter">Surveillance Core v4.2</h1>
                    <p className="text-emerald-100/60 text-xl font-medium">Enterprise Management Hub - PT Nusa Fortune</p>
                    <div className="mt-12 flex justify-center gap-10">
                        <SystemBadge label="Encryption" val="AES-256" />
                        <SystemBadge label="Cloud" val="MQTT-TLS" />
                        <SystemBadge label="Privacy" val="Zero-Cloud" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white p-12 rounded-[3.5rem] border border-slate-200 shadow-sm space-y-10">
                        <h3 className="text-2xl font-black text-slate-800 flex items-center gap-3"><RefreshCw size={24} className="text-emerald-600"/> System Actuators</h3>
                        <div className="space-y-6">
                            <ControlSwitch label="AI-Acoustic Engine" on={true} set={()=>{}} icon={Mic} />
                            <ControlSwitch label="Auto-Inactivation" on={true} set={()=>{}} icon={ShieldCheck} />
                            <ControlSwitch label="Local Metadata Logging" on={false} set={()=>{}} icon={Database} />
                        </div>
                    </div>
                    <div className="bg-white p-12 rounded-[3.5rem] border border-slate-200 shadow-sm flex flex-col gap-10">
                        <div className="flex items-center gap-5">
                            <div className="w-20 h-20 rounded-[2rem] bg-emerald-50 text-emerald-700 flex items-center justify-center shadow-inner"><Building size={32}/></div>
                            <div>
                                <h3 className="font-black text-slate-800 text-xl tracking-tight uppercase">System Architect</h3>
                                <p className="text-emerald-600 font-black text-sm tracking-widest mt-1">UNIVERSITAS AIRLANGGA</p>
                                <p className="text-[10px] text-slate-400 font-black uppercase mt-1 tracking-widest">UGM Public Health Hackathon 2026</p>
                            </div>
                        </div>
                        <p className="text-slate-500 text-lg font-medium leading-relaxed italic">Inovasi multidisiplin untuk perlindungan airborne patogen berbasis AI, dirancang khusus untuk lingkungan industri masa depan.</p>
                    </div>
                </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 py-16 text-center bg-white">
          <div className="max-w-[1500px] mx-auto px-8 flex flex-col items-center gap-6">
            <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-300">
                <Shield size={24} />
            </div>
            <p className="text-[10px] font-black text-slate-400 tracking-[0.6em] uppercase leading-loose">© 2026 TB-SHIELD · PT NUSA FORTUNE OHC HUB · UNAIR · ALL RIGHTS RESERVED</p>
          </div>
      </footer>
    </div>
  );
}

// ─── REUSABLE UI COMPONENTS ────────────────────────────────────────────────────
function QuickStat({ title, val, icon: Icon, color, bg, sub, onClick }) {
    return (
        <div onClick={onClick} className="bg-white rounded-[2.5rem] p-9 border border-slate-200 shadow-sm hover:shadow-2xl hover:scale-[1.02] transition-all cursor-pointer group flex flex-col gap-8">
            <div className={`w-14 h-14 rounded-2xl ${bg} ${color} flex items-center justify-center group-hover:bg-[#0f4c3a] group-hover:text-white transition-colors`}>
                <Icon size={26} strokeWidth={2.5}/>
            </div>
            <div>
                <div className="text-5xl font-black text-slate-800 tracking-tighter mb-1">{val}</div>
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">{title}</div>
                <div className="text-[9px] font-bold text-slate-300 uppercase tracking-widest leading-tight">{sub}</div>
            </div>
        </div>
    );
}

function LegendItem({ color, label }) {
    return <div className="flex items-center gap-2.5"><div className="w-3.5 h-3.5 rounded-full" style={{ background: color }} /><span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{label}</span></div>;
}

function ControlSwitch({ label, on, set, icon: Icon }) {
    return (
        <div onClick={set} className="flex items-center justify-between p-5 bg-slate-50 rounded-[1.5rem] hover:bg-white transition-all border border-transparent hover:border-emerald-200 cursor-pointer shadow-sm">
            <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${on ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-400'}`}><Icon size={18} /></div>
                <span className="text-sm font-black text-slate-700 tracking-tight">{label}</span>
            </div>
            <div className={`w-12 h-6 rounded-full transition-all flex items-center px-1 ${on ? 'bg-emerald-600' : 'bg-slate-300'}`}>
                <div className={`w-4 h-4 bg-white rounded-full transition-all ${on ? 'translate-x-6' : 'translate-x-0'}`} />
            </div>
        </div>
    );
}

function ComplianceBadge({ label, val, color }) {
    return (
        <div className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{label}</span>
            <span className="text-sm font-black tracking-tight" style={{ color }}>{val}%</span>
        </div>
    );
}

function ReportFile({ icon: Icon, title, date }) {
    return (
        <div className="bg-white p-7 rounded-[2.5rem] border border-slate-200 shadow-sm flex items-center gap-6 hover:border-emerald-500 transition-all cursor-pointer group">
            <div className="w-16 h-16 rounded-2xl bg-slate-50 text-slate-400 group-hover:bg-[#0f4c3a] group-hover:text-white transition-all flex items-center justify-center shrink-0"><Icon size={24}/></div>
            <div><div className="text-base font-black text-slate-800 leading-tight mb-1">{title}</div><div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{date}</div></div>
        </div>
    );
}

function TechCard({ icon: Icon, title, color, desc }) {
    const colors = { rose: "bg-rose-50 text-rose-600", emerald: "bg-emerald-50 text-emerald-600", blue: "bg-blue-50 text-blue-600" };
    return (
        <div className="bg-white p-12 rounded-[3.5rem] border border-slate-200 shadow-sm flex flex-col items-center group hover:shadow-2xl transition-all">
            <div className={`w-20 h-20 rounded-[2rem] flex items-center justify-center mb-10 group-hover:scale-110 transition-all ${colors[color]}`}><Icon size={40}/></div>
            <h3 className="text-2xl font-black text-slate-800 mb-6 tracking-tight">{title}</h3>
            <p className="text-slate-500 text-sm font-medium leading-relaxed">{desc}</p>
        </div>
    );
}

function SystemBadge({ label, val }) {
    return (
        <div className="text-center">
            <div className="text-emerald-400 font-black text-2xl tracking-tighter mb-1">{val}</div>
            <div className="text-[9px] uppercase font-black opacity-40 tracking-widest">{label}</div>
        </div>
    );
}

// ─── CHART ENGINES (ADVANCED RECHARTS) ──────────────────────────────────────────
function SurveillanceChart({ data }) {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="g-co2" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/><stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/></linearGradient>
            <linearGradient id="g-pm" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/><stop offset="95%" stopColor="#10b981" stopOpacity={0}/></linearGradient>
            <linearGradient id="g-ros" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/><stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/></linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
          <XAxis dataKey="t" hide />
          <YAxis tick={{ fill: "#94a3b8", fontSize: 10, fontWeight: 900 }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={{ borderRadius: 24, border: "none", boxShadow: "0 20px 50px rgba(0,0,0,0.1)", padding: 20 }} />
          <Area type="monotone" dataKey="co2" stroke="#0ea5e9" strokeWidth={5} fill="url(#g-co2)" name="CO2" isAnimationActive={false} />
          <Area type="monotone" dataKey="pm25" stroke="#10b981" strokeWidth={5} fill="url(#g-pm)" name="PM2.5" isAnimationActive={false} />
          <Area type="monotone" dataKey="ros" stroke="#8b5cf6" strokeWidth={5} fill="url(#g-ros)" name="ROS" isAnimationActive={false} />
        </AreaChart>
      </ResponsiveContainer>
    );
}

function BarChartReport() {
    const data = [
        { name: "Mgg 1", healthy: 80, alert: 5 }, { name: "Mgg 2", healthy: 92, alert: 2 },
        { name: "Mgg 3", healthy: 85, alert: 8 }, { name: "Mgg 4", healthy: 98, alert: 1 },
    ];
    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ left: -20 }}>
                <XAxis dataKey="name" tick={{ fontSize: 10, fontWeight: 900, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: 24, border: "none" }} />
                <Bar dataKey="healthy" fill="#10b981" radius={[10, 10, 0, 0]} barSize={40} />
                <Bar dataKey="alert" fill="#f43f5e" radius={[10, 10, 0, 0]} barSize={40} />
            </BarChart>
        </ResponsiveContainer>
    );
}

function PieChartReport() {
    const data = [
        { name: "Pathogen Killed", value: 99.4, fill: "#10b981" },
        { name: "Active Patches", value: 0.6, fill: "#f1f5f9" },
    ];
    return (
        <ResponsiveContainer width="100%" height="100%">
            <PieChart>
                <Pie data={data} dataKey="value" innerRadius={70} outerRadius={100} paddingAngle={8} stroke="none">
                    {data.map((e, i) => <Cell key={i} fill={e.fill} />)}
                </Pie>
                <Tooltip />
            </PieChart>
        </ResponsiveContainer>
    );
}

function RadarAnalysis() {
    const data = [
        { m: "Sensitivity", v: 94 }, { m: "Specificity", v: 89 }, { m: "Latency", v: 85 },
        { m: "Privacy", v: 100 }, { m: "Bio-Safety", v: 98 }, { m: "Scalability", v: 91 }
    ];
    return (
        <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={data}>
                <PolarGrid stroke="#f1f5f9" />
                <PolarAngleAxis dataKey="m" tick={{ fill: "#64748b", fontSize: 12, fontWeight: 1000 }} />
                <Radar name="TB-SHIELD" dataKey="v" stroke="#10b981" fill="#10b981" fillOpacity={0.25} strokeWidth={4} />
            </RadarChart>
        </ResponsiveContainer>
    );
}