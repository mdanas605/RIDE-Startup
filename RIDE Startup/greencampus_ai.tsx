import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { 
  Leaf, Zap, Droplet, Recycle, Wind, TreePine, Car, 
  LayoutDashboard, TrendingUp, Award, Bell, Settings, 
  Menu, X, Sun, Moon, ChevronRight, CheckCircle2, Shield,
  BrainCircuit, Activity, Users, MapPin, Download, Share2,
  Camera, ArrowRight
} from 'lucide-react';


// --- MOCK DATA ---
const energyData = [
  { name: 'Mon', actual: 4000, predicted: 4200 },
  { name: 'Tue', actual: 3000, predicted: 3100 },
  { name: 'Wed', actual: 2000, predicted: 2300 },
  { name: 'Thu', actual: 2780, predicted: 2800 },
  { name: 'Fri', actual: 1890, predicted: 1900 },
  { name: 'Sat', actual: 2390, predicted: 2500 },
  { name: 'Sun', actual: 3490, predicted: 3300 },
];

const wasteData = [
  { name: 'Organic', value: 400, color: '#10B981' },
  { name: 'Plastic', value: 300, color: '#3B82F6' },
  { name: 'Paper', value: 300, color: '#F59E0B' },
  { name: 'Metal', value: 200, color: '#6366F1' },
];

const carbonData = [
  { name: 'Jan', emissions: 120, target: 100 },
  { name: 'Feb', emissions: 110, target: 95 },
  { name: 'Mar', emissions: 105, target: 90 },
  { name: 'Apr', emissions: 98, target: 85 },
  { name: 'May', emissions: 90, target: 80 },
  { name: 'Jun', emissions: 85, target: 75 },
];

const aiRecommendations = [
  { id: 1, text: "Reduce electricity usage in Block C after 6 PM. Potential savings: 15%", impact: "high", type: "energy" },
  { id: 2, text: "Repair detected minor water leakage near Science Building.", impact: "medium", type: "water" },
  { id: 3, text: "Increase recycling bins in Hostel Area based on recent overflow data.", impact: "low", type: "waste" },
];

const leaderboard = [
  { rank: 1, name: "Sarah Jenkins", points: 2450, badge: "Platinum", dept: "Computer Science" },
  { rank: 2, name: "David Chen", points: 2100, badge: "Gold", dept: "Architecture" },
  { rank: 3, name: "Maya Patel", points: 1850, badge: "Silver", dept: "Environmental Studies" },
];


// --- UI COMPONENTS ---
const Card = ({ children, className = '', hover = false }) => (
  <div className={`
    bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl 
    border border-slate-200/50 dark:border-slate-700/50 
    rounded-3xl shadow-xl shadow-slate-200/20 dark:shadow-none
    overflow-hidden transition-all duration-300
    ${hover ? 'hover:shadow-2xl hover:-translate-y-1 hover:border-emerald-500/30' : ''}
    ${className}
  `}>
    {children}
  </div>
);

const GlassButton = ({ children, onClick, variant = 'primary', className = '', icon: Icon }) => {
  const baseStyle = "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 active:scale-95";
  const variants = {
    primary: "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 hover:bg-emerald-400 hover:shadow-emerald-500/50",
    secondary: "bg-white/10 text-slate-800 dark:text-white border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800",
    outline: "border-2 border-emerald-500 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10",
    ghost: "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
  };

  return (
    <button onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className}`}>
      {Icon && <Icon size={18} />}
      {children}
    </button>
  );
};

const SectionHeading = ({ title, subtitle }) => (
  <div className="mb-8">
    <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-blue-600 dark:from-emerald-400 dark:to-blue-400">
      {title}
    </h2>
    {subtitle && <p className="text-slate-500 dark:text-slate-400 mt-2">{subtitle}</p>}
  </div>
);


// --- VIEWS ---

const LandingPage = ({ onNavigate }) => {
  return (
    <div className="min-h-screen pt-24">
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-12 md:py-24 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 font-medium text-sm border border-emerald-200 dark:border-emerald-800">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            Platform Live 2.0
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white leading-tight">
            AI-Powered <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-blue-500">
              Sustainability
            </span><br/>
            for Smart Campuses
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed">
            Monitor electricity, water, waste, carbon emissions, and green initiatives using advanced Artificial Intelligence. Transform your campus into a zero-carbon ecosystem.
          </p>
          <div className="flex flex-wrap gap-4">
            <GlassButton variant="primary" onClick={() => onNavigate('dashboard')} icon={ArrowRight}>
              Explore Dashboard
            </GlassButton>
            <GlassButton variant="secondary" onClick={() => {}} icon={CheckCircle2}>
              Request Demo
            </GlassButton>
          </div>
        </motion.div>

        {/* Abstract Hero Illustration */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}
          className="relative h-[500px] w-full rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-700/50 bg-gradient-to-br from-emerald-500/10 to-blue-500/10 flex items-center justify-center backdrop-blur-3xl"
        >
           {/* Decorative background blobs */}
          <div className="absolute top-10 left-10 w-64 h-64 bg-emerald-400/20 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-screen animate-blob"></div>
          <div className="absolute top-10 right-10 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-screen animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-64 h-64 bg-purple-400/20 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-screen animate-blob animation-delay-4000"></div>
          
          <div className="relative z-10 grid grid-cols-2 gap-4 p-8 w-full">
             <Card className="p-4 flex flex-col items-center justify-center bg-white/40 dark:bg-slate-900/40 border-white/40">
                <Leaf className="text-emerald-500 mb-2 h-8 w-8" />
                <span className="font-bold text-slate-800 dark:text-white text-xl">92%</span>
                <span className="text-xs text-slate-500 text-center">Eco Score</span>
             </Card>
             <Card className="p-4 flex flex-col items-center justify-center bg-white/40 dark:bg-slate-900/40 border-white/40">
                <Zap className="text-amber-500 mb-2 h-8 w-8" />
                <span className="font-bold text-slate-800 dark:text-white text-xl">-15%</span>
                <span className="text-xs text-slate-500 text-center">Energy Saved</span>
             </Card>
             <Card className="col-span-2 p-6 flex flex-col items-center justify-center bg-white/40 dark:bg-slate-900/40 border-white/40">
                <BrainCircuit className="text-blue-500 mb-2 h-10 w-10" />
                <span className="font-bold text-slate-800 dark:text-white text-lg">AI Analytics Active</span>
                <span className="text-sm text-slate-500 mt-2">Monitoring 1,204 sensors in real-time</span>
             </Card>
          </div>
        </motion.div>
      </section>

      {/* Features Preview */}
      <section className="bg-slate-50/50 dark:bg-slate-900/50 py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Complete Campus Intelligence</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Our unified platform brings all sustainability metrics into one investor-ready dashboard.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Zap, title: "Smart Energy", desc: "Predictive consumption monitoring and peak hour optimization.", color: "text-amber-500" },
              { icon: Droplet, title: "Water Intelligence", desc: "Real-time leak detection and usage analytics across all blocks.", color: "text-blue-500" },
              { icon: Recycle, title: "AI Waste Management", desc: "Computer vision based waste sorting and recycling tracking.", color: "text-emerald-500" },
              { icon: Wind, title: "Carbon Tracking", desc: "Live CO2 footprint calculation and offset recommendations.", color: "text-slate-500" },
              { icon: TreePine, title: "Flora Management", desc: "Map and monitor tree health, age, and carbon absorption.", color: "text-green-600" },
              { icon: Car, title: "Green Transport", desc: "Track EV charging, carpooling, and cycle sharing metrics.", color: "text-indigo-500" }
            ].map((feat, i) => (
              <Card key={i} hover className="p-8">
                <div className={`p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/50 w-max mb-6 ${feat.color}`}>
                  <feat.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{feat.title}</h3>
                <p className="text-slate-500 dark:text-slate-400">{feat.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};


const Dashboard = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      className="container mx-auto px-4 py-8 pt-24 space-y-6"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Overview</h1>
          <p className="text-slate-500">Welcome back! Campus sustainability is looking good.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-white dark:bg-slate-800 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700">
            <span className="text-sm font-medium text-slate-500">Sustainability Score</span>
            <span className="text-xl font-bold text-emerald-500">A-</span>
          </div>
          <GlassButton variant="primary" icon={Download}>Report</GlassButton>
        </div>
      </div>

      {/* Top Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500">Energy Usage</p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">12.4MWh</h3>
            </div>
            <div className="p-3 bg-amber-100 dark:bg-amber-900/30 text-amber-600 rounded-xl">
              <Zap size={20} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp size={16} className="text-emerald-500 mr-1" />
            <span className="text-emerald-500 font-medium">5% decrease</span>
            <span className="text-slate-500 ml-2">vs last week</span>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500">Water Consumption</p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">45k Gal</h3>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-xl">
              <Droplet size={20} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
             <Activity size={16} className="text-red-500 mr-1" />
             <span className="text-red-500 font-medium">1 leak detected</span>
             <span className="text-slate-500 ml-2">in Block B</span>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500">Waste Recycled</p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">68%</h3>
            </div>
            <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-xl">
              <Recycle size={20} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp size={16} className="text-emerald-500 mr-1" />
            <span className="text-emerald-500 font-medium">+2%</span>
            <span className="text-slate-500 ml-2">vs last month</span>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500">Carbon Offset</p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">2.4 Tons</h3>
            </div>
            <div className="p-3 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-xl">
              <Wind size={20} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp size={16} className="text-emerald-500 mr-1" />
            <span className="text-emerald-500 font-medium">On Target</span>
            <span className="text-slate-500 ml-2">for Q3 goals</span>
          </div>
        </Card>
      </div>

      {/* Main Charts Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Energy Chart */}
        <Card className="p-6 lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Energy Consumption Forecast</h3>
            <select className="bg-transparent text-sm text-slate-500 border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1 outline-none">
              <option>This Week</option>
              <option>This Month</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={energyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: 'none', borderRadius: '12px', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }}/>
                <Area type="monotone" dataKey="actual" name="Actual Usage (kWh)" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorActual)" />
                <Area type="monotone" dataKey="predicted" name="AI Prediction" stroke="#3B82F6" strokeDasharray="5 5" strokeWidth={2} fillOpacity={1} fill="url(#colorPredicted)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Waste Breakdown Pie Chart */}
        <Card className="p-6">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Waste Composition</h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={wasteData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {wasteData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {wasteData.map(item => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-sm text-slate-600 dark:text-slate-300">{item.name}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

       {/* AI Insights & Alerts Row */}
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-6">
             <BrainCircuit className="text-blue-500" />
             <h3 className="text-lg font-bold text-slate-900 dark:text-white">AI Recommendations</h3>
          </div>
          <div className="space-y-4">
            {aiRecommendations.map(rec => (
              <div key={rec.id} className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50">
                <div className={`p-2 rounded-lg ${
                  rec.impact === 'high' ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' :
                  rec.impact === 'medium' ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400' :
                  'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400'
                }`}>
                  <Zap size={18} />
                </div>
                <div>
                  <p className="text-sm text-slate-700 dark:text-slate-200">{rec.text}</p>
                  <span className="text-xs text-slate-500 mt-1 block uppercase font-medium">Impact: {rec.impact}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Mini Module Status */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-5 flex flex-col justify-between">
            <div className="flex items-center gap-2 text-emerald-500 mb-2">
              <TreePine size={20} />
              <h4 className="font-semibold">Plantation</h4>
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">1,240</p>
              <p className="text-sm text-slate-500">Trees Monitored</p>
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5 mt-3">
                <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '92%' }}></div>
              </div>
              <p className="text-xs text-slate-500 mt-1 text-right">92% Health</p>
            </div>
          </Card>
          
          <Card className="p-5 flex flex-col justify-between">
            <div className="flex items-center gap-2 text-indigo-500 mb-2">
              <Car size={20} />
              <h4 className="font-semibold">Transport</h4>
            </div>
            <div>
               <p className="text-2xl font-bold text-slate-900 dark:text-white">450</p>
              <p className="text-sm text-slate-500">Active Cyclists Today</p>
               <div className="mt-3 flex items-center text-xs text-emerald-500 font-medium">
                  <TrendingUp size={14} className="mr-1" /> +12% from avg
               </div>
            </div>
          </Card>

          <Card className="col-span-2 p-5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-bold text-lg mb-1">Carbon Neutrality Goal</h4>
                <p className="text-emerald-100 text-sm">Target: 2030</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-extrabold">42%</p>
                <p className="text-emerald-100 text-sm">Achieved</p>
              </div>
            </div>
          </Card>
        </div>
       </div>
    </motion.div>
  );
};


const Analytics = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container mx-auto px-4 py-8 pt-24 space-y-8">
    <SectionHeading title="Advanced Analytics" subtitle="Deep dive into ML predictions and long-term trends." />
    
    <Card className="p-6">
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Carbon Emission Trajectory (YTD)</h3>
      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={carbonData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2}/>
            <XAxis dataKey="name" axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false} />
            <Tooltip cursor={{fill: 'rgba(148, 163, 184, 0.1)'}} contentStyle={{ borderRadius: '8px' }}/>
            <Legend />
            <Bar dataKey="emissions" name="Actual Emissions (Tons)" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="target" name="Target Goal" fill="#10B981" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  </motion.div>
);

const SmartWaste = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container mx-auto px-4 py-8 pt-24 max-w-4xl">
    <SectionHeading title="Smart Waste Scanner" subtitle="Upload an image of waste for AI identification and sorting instructions." />
    
    <Card className="p-8 text-center border-dashed border-2 border-slate-300 dark:border-slate-600 bg-slate-50/50 dark:bg-slate-800/20">
      <div className="mx-auto w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center mb-6">
        <Camera size={32} className="text-emerald-600" />
      </div>
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Upload or Take Photo</h3>
      <p className="text-slate-500 mb-6">Supported formats: JPG, PNG, WEBP (Max 5MB)</p>
      
      <div className="flex justify-center gap-4">
        <GlassButton variant="primary">Browse Files</GlassButton>
        <GlassButton variant="outline">Open Camera</GlassButton>
      </div>
    </Card>

    <div className="mt-8">
       <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Recent Identifications</h3>
       <div className="grid md:grid-cols-2 gap-4">
          {/* Mock previous scans */}
          <Card className="p-4 flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl bg-slate-200 dark:bg-slate-700 flex-shrink-0 flex items-center justify-center">
              <span className="text-xs text-slate-500">Image</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/30 rounded text-xs font-bold uppercase">Plastic</span>
                <span className="text-xs text-slate-500">98% Match</span>
              </div>
              <p className="font-semibold text-slate-900 dark:text-white mt-1">PET Bottle</p>
              <p className="text-xs text-slate-500">Bin: Blue (Recyclable)</p>
            </div>
          </Card>
          <Card className="p-4 flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl bg-slate-200 dark:bg-slate-700 flex-shrink-0 flex items-center justify-center">
              <span className="text-xs text-slate-500">Image</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 rounded text-xs font-bold uppercase">Organic</span>
                <span className="text-xs text-slate-500">95% Match</span>
              </div>
              <p className="font-semibold text-slate-900 dark:text-white mt-1">Apple Core</p>
              <p className="text-xs text-slate-500">Bin: Green (Compost)</p>
            </div>
          </Card>
       </div>
    </div>
  </motion.div>
);

const Gamification = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container mx-auto px-4 py-8 pt-24 max-w-5xl">
    <SectionHeading title="Eco Leaderboard" subtitle="Earn points for sustainable actions and compete with other departments." />
    
    <div className="grid lg:grid-cols-3 gap-8">
      <Card className="lg:col-span-2 p-0 overflow-hidden">
        <div className="p-6 border-b border-slate-100 dark:border-slate-700/50 bg-slate-50 dark:bg-slate-800/30 flex justify-between items-center">
          <h3 className="font-bold text-lg text-slate-900 dark:text-white">Top Contributors</h3>
          <select className="bg-white dark:bg-slate-800 text-sm border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 outline-none">
            <option>This Month</option>
            <option>All Time</option>
          </select>
        </div>
        <div className="divide-y divide-slate-100 dark:divide-slate-700/50">
          {leaderboard.map((user, idx) => (
            <div key={user.rank} className="p-4 flex items-center gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm
                ${idx === 0 ? 'bg-amber-100 text-amber-600' : 
                  idx === 1 ? 'bg-slate-200 text-slate-600' : 
                  idx === 2 ? 'bg-orange-100 text-orange-700' : 'bg-slate-100 text-slate-500 dark:bg-slate-800'}`}>
                {user.rank}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-slate-900 dark:text-white">{user.name}</h4>
                <p className="text-xs text-slate-500">{user.dept}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-emerald-500">{user.points} pts</p>
                <p className="text-xs text-slate-400">{user.badge}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="space-y-6">
        <Card className="p-6 bg-gradient-to-br from-emerald-500 to-teal-600 text-white text-center">
          <Award size={48} className="mx-auto mb-4 opacity-80" />
          <h3 className="text-xl font-bold mb-1">Current Challenge</h3>
          <p className="font-medium text-emerald-100 mb-4">"No Plastic Week"</p>
          <div className="w-full bg-black/20 rounded-full h-2 mb-2">
            <div className="bg-white h-2 rounded-full" style={{ width: '65%' }}></div>
          </div>
          <p className="text-xs text-emerald-100">65% Campus Participation</p>
          <button className="mt-6 w-full py-2 bg-white text-emerald-600 rounded-xl font-bold hover:bg-slate-50 transition">
            Join Challenge
          </button>
        </Card>

        <Card className="p-6">
          <h3 className="font-bold text-slate-900 dark:text-white mb-4">How to earn points?</h3>
          <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
            <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500"/> Scan recycled items (+10)</li>
            <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500"/> Use EV/Carpool (+20)</li>
            <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500"/> Report water leak (+50)</li>
            <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500"/> Participate in drives (+100)</li>
          </ul>
        </Card>
      </div>
    </div>
  </motion.div>
);



// --- LAYOUT & NAVIGATION ---
const Navbar = ({ currentView, setView, isDark, toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'landing', label: 'Home' },
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'waste', label: 'Smart Waste' },
    { id: 'gamification', label: 'Rewards' },
  ];

  return (
    <nav className="fixed w-full z-50 top-0 transition-all duration-300 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('landing')}>
          <div className="bg-emerald-500 p-1.5 rounded-lg">
            <Leaf className="text-white h-5 w-5" />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-300">
            GreenCampus AI
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                currentView === item.id 
                  ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' 
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors">
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-700"></div>
          {currentView === 'landing' ? (
             <GlassButton variant="primary" onClick={() => setView('dashboard')} className="py-2 px-4 text-sm">
                Login
             </GlassButton>
          ) : (
             <div className="flex items-center gap-3">
                <button className="relative p-2 text-slate-500 hover:text-emerald-500">
                  <Bell size={20} />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-slate-900"></span>
                </button>
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-emerald-500 cursor-pointer border-2 border-white dark:border-slate-800 shadow-sm"></div>
             </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden p-2 text-slate-600 dark:text-slate-300" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 overflow-hidden"
          >
            <div className="flex flex-col p-4 space-y-2">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => { setView(item.id); setIsOpen(false); }}
                  className={`p-3 text-left rounded-xl ${currentView === item.id ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600' : 'text-slate-600 dark:text-slate-300'}`}
                >
                  {item.label}
                </button>
              ))}
               <div className="border-t border-slate-100 dark:border-slate-800 pt-4 flex justify-between items-center px-3">
                 <span className="text-slate-500 text-sm">Theme</span>
                 <button onClick={toggleTheme} className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {isDark ? <Sun size={20} /> : <Moon size={20} />}
                  </button>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// --- MAIN APP COMPONENT ---
export default function App() {
  const [view, setView] = useState('landing');
  const [isDark, setIsDark] = useState(false);

  // Toggle Theme
  const toggleTheme = () => setIsDark(!isDark);

  useEffect(() => {
    // Add dark class to body for global background color if outside react root
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.body.style.backgroundColor = '#0F172A'; // slate-900
    } else {
      document.documentElement.classList.remove('dark');
      document.body.style.backgroundColor = '#F8FAFC'; // slate-50
    }
  }, [isDark]);

  return (
    <div className={`min-h-screen text-slate-900 dark:text-slate-100 transition-colors duration-300 ${isDark ? 'dark bg-slate-900' : 'bg-slate-50'}`}>
      
      {/* Background ambient light effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
         <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-500/5 blur-[120px]"></div>
         <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/5 blur-[120px]"></div>
      </div>

      <Navbar currentView={view} setView={setView} isDark={isDark} toggleTheme={toggleTheme} />
      
      <main className="relative z-10 pb-20">
        <AnimatePresence mode="wait">
          {view === 'landing' && <LandingPage key="landing" onNavigate={setView} />}
          {view === 'dashboard' && <Dashboard key="dashboard" />}
          {view === 'analytics' && <Analytics key="analytics" />}
          {view === 'waste' && <SmartWaste key="waste" />}
          {view === 'gamification' && <Gamification key="gamification" />}
        </AnimatePresence>
      </main>

      {/* Footer (Simplified for MVP) */}
      <footer className="relative z-10 border-t border-slate-200 dark:border-slate-800 py-8 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md text-center text-slate-500 dark:text-slate-400 text-sm">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4 gap-4">
          <div className="flex items-center gap-2">
            <Leaf className="text-emerald-500 h-4 w-4" />
            <span className="font-semibold text-slate-700 dark:text-slate-300">GreenCampus AI</span> © 2026
          </div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-emerald-500 transition">Privacy</a>
            <a href="#" className="hover:text-emerald-500 transition">Terms</a>
            <a href="#" className="hover:text-emerald-500 transition">Contact</a>
          </div>
        </div>
      </footer>

      {/* CSS for custom animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}} />
    </div>
  );
}