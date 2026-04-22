import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  CartesianGrid, RadarChart, Radar, PolarGrid, PolarAngleAxis, 
  BarChart, Bar, Cell, PieChart, Pie
} from "recharts";
import {
  Shield, Users, ChevronRight, Settings2, Sun, Atom, Power, Mic, 
  LayoutDashboard, Cpu, AlertTriangle, Building, ShieldCheck, 
  History, Search, UserCheck, UserX, FileBarChart, Download, 
  MousePointer2, Laptop, Globe, Heart
} from "lucide-react";

// --- DATA SIMULASI ---
const employeesData = [
  { id: "EMP-001", name: "Bambang Sugio", dept: "Produksi A", status: "Aman", risk: 12 },
  { id: "EMP-042", name: "Siti Aminah", dept: "Logistik", status: "Observasi", risk: 68 },
  { id: "EMP-103", name: "Budi Santoso", dept: "Produksi B", status: "Aman", risk: 24 },
  { id: "EMP-212", name: "Ahmad Rifai", dept: "Maintenance", status: "Observasi", risk: 72 },
];

const reportStats = [
  { name: "Kepatuhan K3", value: 98, color: "#10b981" },
  { name: "Efikasi UVC", value: 99.2, color: "#0ea5e9" },
  { name: "Keamanan Data", value: 100, color: "#8b5cf6" },
];

// --- KOMPONEN JAM ---
function SysClock() {
  const [t, setT] = useState(new Date());
  useEffect(() => { const id = setInterval(() => setT(new Date()), 1000); return () => clearInterval(id); }, []);
  return <span className="font-mono text-sm font-bold text-[#0f4c3a]">{t.toLocaleTimeString("id-ID")}</span>;
}

export default function TBShieldNexus() {
  const [page, setPage] = useState("dashboard");
  const [emergency, setEmergency] = useState(false);
  const [coughs, setCoughs] = useState(14);
  const [logs, setLogs] = useState([
    { id: 1, time: "15:40", msg: "Sensor Akustik Siap", type: "info" },
    { id: 2, time: "15:42", msg: "Pemindaian Partikel Aktif", type: "info" }
  ]);

  const [bio, setBio] = useState(() => 
    Array.from({ length: 20 }, (_, i) => ({ t: `${i}s`, co2: 420 + Math.random()*20, pm25: 10 + Math.random()*5, ros: 25 + Math.random()*5 }))
  );

  // Animasi Data Real-time
  useEffect(() => {
    const interval = setInterval(() => {
      const isCough = Math.random() < 0.1;
      if (isCough) {
        setCoughs(prev => prev + 1);
        setLogs(prev => [{ id: Date.now(), time: new Date().toLocaleTimeString("id-ID").slice(0,5), msg: "TB-Pattern Terdeteksi: Filter Aktif", type: "warn" }, ...prev].slice(0, 5));
      }
      setBio(prev => [...prev.slice(1), { 
        t: `now`, 
        co2: isCough ? 700 : 420 + Math.random()*20, 
        pm25: 10 + Math.random()*5, 
        ros: isCough ? 90 : 30 + Math.random()*10 
      }]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans">
      
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-[1440px] mx-auto px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setPage("dashboard")}>
            <div className="w-10 h-10 rounded-xl bg-[#0f4c3a] flex items-center justify-center shadow-lg shadow-emerald-900/20">
                <Shield size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-lg font-black text-[#0f4c3a] leading-none uppercase">TB-SHIELD</h1>
              <p className="text-[9px] font-bold text-slate-400 tracking-widest uppercase">OHC Digital Dashboard</p>
            </div>
          </div>

          <nav className="hidden lg:flex bg-slate-100 p-1 rounded-full border border-slate-200">
            {[
              { id: "dashboard", label: "Utama", icon: LayoutDashboard },
              { id: "pegawai", label: "Pegawai", icon: Users },
              { id: "laporan", label: "Laporan", icon: FileBarChart },
              { id: "teknologi", label: "Teknologi", icon: Cpu },
              { id: "sistem", label: "Sistem", icon: Settings2 },
            ].map(item => (
              <button key={item.id} onClick={() => setPage(item.id)}
                className={`flex items-center gap-2 px-6 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all ${page === item.id ? 'bg-white text-[#0f4c3a] shadow-sm border border-slate-200' : 'text-slate-500 hover:text-slate-800'}`}>
                <item.icon size={14} /> {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
             <div className="hidden sm:block text-right pr-4 border-r border-slate-200">
                <p className="text-[10px] font-black text-slate-400 uppercase">Live Monitor</p>
                <SysClock />
             </div>
             <button onClick={() => setEmergency(true)} className="p-3 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-600 hover:text-white transition-all shadow-sm shadow-rose-100"><Power size={18} /></button>
          </div>
        </div>
      </header>

      <main className="max-w-[1440px] mx-auto px-8 py-8">
        <AnimatePresence mode="wait">
          
          {/* --- DASHBOARD --- */}
          {page === "dashboard" && (
            <motion.div key="db" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-8">
              <div className="bg-[#0f4c3a] rounded-[2.5rem] p-10 md:p-16 text-white relative overflow-hidden shadow-2xl">
                <div className="relative z-10 max-w-2xl">
                  <span className="inline-block px-3 py-1 bg-white/10 rounded-full text-[10px] font-black tracking-widest text-emerald-300 border border-white/10 mb-6 uppercase">System Implemented by PT Nusa Fortune</span>
                  <h2 className="text-4xl md:text-6xl font-black leading-[1.1] mb-6 tracking-tight">Smart Defense.<br/>Healthy Workforce.</h2>
                  <p className="text-emerald-100/60 text-lg mb-10 leading-relaxed font-medium">Sistem pemantauan kesehatan saluran napas otomatis berbasis AI untuk mendeteksi dini Tuberkulosis di area kerja.</p>
                  <div className="flex flex-wrap gap-4">
                    <button onClick={() => setPage("pegawai")} className="bg-emerald-500 hover:bg-emerald-400 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2 transition-all">Monitor Pegawai <MousePointer2 size={16}/></button>
                    <button onClick={() => setPage("laporan")} className="bg-white/10 hover:bg-white/20 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest border border-white/10 transition-all">Lihat Laporan</button>
                  </div>
                </div>
                <div className="absolute right-0 bottom-0 p-10 opacity-10"><Shield size={300} /></div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard icon={Mic} label="Deteksi Batuk" val={coughs} sub="Analisis Edge AI" color="text-rose-500" onClick={() => setPage("teknologi")} />
                <StatCard icon={UserX} label="Observasi" val="2" sub="Butuh Tindakan OHC" color="text-amber-500" onClick={() => setPage("pegawai")} />
                <StatCard icon={ShieldCheck} label="Kepatuhan K3" val="98%" sub="Standar Nusa Fortune" color="text-blue-500" onClick={() => setPage("laporan")} />
                <StatCard icon={Heart} label="Status Udara" val="Optimal" sub="Far-UVC Active" color="text-emerald-500" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm">
                   <h3 className="text-lg font-black mb-8 flex items-center gap-2"><Globe size={18} className="text-[#0f4c3a]"/> Telemetri Lingkungan</h3>
                   <div className="h-[300px]"><LiveChart data={bio} /></div>
                </div>
                <div className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm flex flex-col">
                   <h3 className="text-lg font-black mb-6 flex items-center gap-2"><History size={18} className="text-slate-400"/> Log Aktivitas</h3>
                   <div className="space-y-4 flex-1">
                      {logs.map(l => (
                        <div key={l.id} className="flex gap-4 p-3 hover:bg-slate-50 rounded-xl transition-all border-l-4 border-emerald-500">
                          <span className="text-[10px] font-mono font-bold text-slate-400">{l.time}</span>
                          <p className="text-xs font-bold text-slate-600">{l.msg}</p>
                        </div>
                      ))}
                   </div>
                   <button onClick={() => setPage("laporan")} className="mt-6 w-full py-3 bg-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-500 rounded-xl hover:bg-[#0f4c3a] hover:text-white transition-all">Lihat Seluruh Aktivitas</button>
                </div>
              </div>
            </motion.div>
          )}

          {/* --- PEGAWAI --- */}
          {page === "pegawai" && (
            <motion.div key="pg" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="space-y-8">
              <div className="flex justify-between items-end">
                <div><h2 className="text-3xl font-black text-[#0f4c3a]">Pemantauan Pegawai</h2><p className="text-slate-500 text-sm font-medium">Data kesehatan real-time PT Nusa Fortune</p></div>
                <button className="bg-[#0f4c3a] text-white px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg">Unduh Data Lengkap</button>
              </div>
              <div className="bg-white rounded-[2rem] border border-slate-200 overflow-hidden shadow-sm">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                    <tr><th className="px-8 py-5">Nama Pegawai</th><th className="px-8 py-5">Departemen</th><th className="px-8 py-5">Skor Risiko</th><th className="px-8 py-5">Status</th></tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {employeesData.map(e => (
                      <tr key={e.id} className="hover:bg-slate-50 transition-all">
                        <td className="px-8 py-6 font-black text-slate-800">{e.name}</td>
                        <td className="px-8 py-6 font-bold text-slate-500 text-sm">{e.dept}</td>
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-3">
                            <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden"><div className={`h-full ${e.risk > 50 ? 'bg-amber-500' : 'bg-emerald-500'}`} style={{width: `${e.risk}%`}} /></div>
                            <span className="text-xs font-mono font-black">{e.risk}%</span>
                          </div>
                        </td>
                        <td className="px-8 py-6"><span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase ${e.status === 'Aman' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>{e.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* --- LAPORAN --- */}
          {page === "laporan" && (
            <motion.div key="lp" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="space-y-8 text-center max-w-5xl mx-auto">
               <h2 className="text-4xl font-black text-[#0f4c3a]">Analisis & Laporan OHC</h2>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Efisiensi Sterilisasi</h4>
                    <div className="h-[200px]"><PieChartComp data={reportStats} /></div>
                  </div>
                  <div className="md:col-span-2 bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Insidensi Batuk Mingguan</h4>
                    <div className="h-[200px]"><BarChartComp /></div>
                  </div>
               </div>
               <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <DocLink title="Laporan K3 - April" />
                  <DocLink title="Audit Filter TiO2" />
                  <DocLink title="Log Privasi AI" />
               </div>
            </motion.div>
          )}

          {/* --- TEKNOLOGI --- */}
          {page === "teknologi" && (
            <motion.div key="tk" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-12 text-center max-w-4xl mx-auto py-10">
               <div>
                  <h2 className="text-4xl font-black text-[#0f4c3a] mb-4">Mekanisme Kerja TB-SHIELD</h2>
                  <p className="text-slate-500 font-medium">Inovasi multidisiplin untuk perlindungan airborne di PT Nusa Fortune.</p>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <TechCard icon={Mic} title="Acoustic Triage" desc="Edge AI yang mengenali tanda akustik batuk Tuberkulosis dengan akurasi 94%." />
                  <TechCard icon={Sun} title="Far-UVC 222nm" desc="Inaktivasi bakteri di udara tanpa merusak sel kulit atau mata manusia." />
                  <TechCard icon={Atom} title="TiO2 Coating" desc="Reaksi fotokatalitik untuk mendekomposisi patogen menjadi senyawa aman." />
               </div>
            </motion.div>
          )}

          {/* --- SISTEM --- */}
          {page === "sistem" && (
            <motion.div key="sys" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto space-y-10 py-10">
               <div className="bg-[#0f4c3a] rounded-[3rem] p-16 text-center text-white shadow-2xl relative overflow-hidden">
                  <Settings2 size={60} className="mx-auto mb-6 text-emerald-400 opacity-50" />
                  <h1 className="text-5xl font-black mb-4 tracking-tighter">Sistem Konfigurasi</h1>
                  <p className="text-emerald-100 opacity-60 font-medium italic">TB-SHIELD V4.2 - Enterprise Edition</p>
                  <div className="mt-8 flex justify-center gap-4 text-[10px] font-black uppercase tracking-widest text-emerald-300/40">
                    <span>MQTT Protocol</span><span>•</span><span>AES-256 Cloud</span><span>•</span><span>ISO 27001</span>
                  </div>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col gap-4">
                    <h3 className="font-black text-slate-800 flex items-center gap-2"><Laptop size={18}/> Pengembang Sistem</h3>
                    <p className="text-emerald-600 font-black text-sm uppercase tracking-wider">Tim Universitas Airlangga</p>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest leading-none">UGM Public Health Hackathon 2026</p>
                  </div>
                  <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col gap-4">
                    <h3 className="font-black text-slate-800 flex items-center gap-2"><Building size={18}/> Implementasi Operasional</h3>
                    <p className="text-emerald-600 font-black text-sm uppercase tracking-wider">Tim OHC PT Nusa Fortune</p>
                    <p className="text-slate-400 text-xs font-medium italic leading-snug">Diterapkan secara eksklusif untuk perlindungan kesehatan karyawan.</p>
                  </div>
               </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* FOOTER */}
      <footer className="text-center py-10 border-t border-slate-200 mt-20">
        <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.5em]">© 2026 Tim OHC PT Nusa Fortune x UNAIR · All Rights Reserved</p>
      </footer>

      {/* EMERGENCY OVERLAY */}
      <AnimatePresence>
        {emergency && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-rose-900/95 backdrop-blur-xl flex flex-col items-center justify-center text-white text-center p-6">
            <AlertTriangle size={80} className="mb-6 animate-pulse" />
            <h2 className="text-5xl font-black mb-4">PROTOKOL STERILISASI</h2>
            <p className="text-xl opacity-70 mb-12 max-w-xl">Daya UVC diaktifkan maksimal di seluruh area PT Nusa Fortune.</p>
            <button onClick={() => setEmergency(false)} className="bg-white text-rose-900 px-12 py-5 rounded-2xl font-black text-lg shadow-2xl hover:scale-105 transition-all">MATIKAN DARURAT</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- SUB-KOMPONEN ---
function StatCard({ icon: Icon, label, val, sub, color, onClick }) {
  return (
    <div onClick={onClick} className={`bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm flex flex-col gap-5 hover:shadow-xl hover:scale-[1.02] transition-all cursor-pointer group`}>
      <div className={`w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center ${color} group-hover:bg-[#0f4c3a] group-hover:text-white transition-colors`}>
        <Icon size={24} />
      </div>
      <div>
        <div className="text-4xl font-black text-slate-800 tracking-tighter mb-1">{val}</div>
        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{label}</div>
        <div className="text-[9px] font-bold text-slate-300 uppercase">{sub}</div>
      </div>
    </div>
  );
}

function TechCard({ icon: Icon, title, desc }) {
  return (
    <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col items-center group hover:border-emerald-200 transition-all">
      <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"><Icon size={32}/></div>
      <h3 className="text-xl font-black text-slate-800 mb-4">{title}</h3>
      <p className="text-slate-500 text-sm font-medium leading-relaxed">{desc}</p>
    </div>
  );
}

function DocLink({ title }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 flex items-center gap-4 hover:border-emerald-500 cursor-pointer transition-all">
      <div className="p-3 bg-slate-50 rounded-xl text-slate-400"><Download size={20}/></div>
      <div className="text-left font-black text-slate-800 text-xs">{title}</div>
    </div>
  );
}

// --- CHARTS ---
function LiveChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        <defs>
          <linearGradient id="c" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/><stop offset="95%" stopColor="#10b981" stopOpacity={0}/></linearGradient>
        </defs>
        <CartesianGrid stroke="#f1f5f9" strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="t" hide />
        <YAxis tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}} axisLine={false} tickLine={false} />
        <Tooltip contentStyle={{borderRadius: 20, border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)'}} />
        <Area type="monotone" dataKey="co2" stroke="#10b981" strokeWidth={3} fill="url(#c)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}

function PieChartComp({ data }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie data={data} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
          {data.map((e, i) => <Cell key={i} fill={e.color} />)}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}

function BarChartComp() {
  const data = [{d: "Sen", v: 12}, {d: "Sel", v: 8}, {d: "Rab", v: 15}, {d: "Kam", v: 11}, {d: "Jum", v: 19}];
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <XAxis dataKey="d" tick={{fontSize: 11, fontWeight: 800, fill: '#94a3b8'}} axisLine={false} tickLine={false} />
        <Bar dataKey="v" fill="#0f4c3a" radius={[10, 10, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}