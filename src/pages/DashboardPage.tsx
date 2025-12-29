import React from 'react';
import {
    Users,
    CheckSquare,
    TrendingUp,
    DollarSign,
    MessageSquare,
    Clock,
    ArrowUpRight,
    ArrowDownRight
} from 'lucide-react';
import { Card } from '../components/ui/Card';

const StatCard = ({ title, value, change, icon: Icon, trend }: any) => (
    <Card className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-600 flex items-center justify-center border border-slate-100">
                <Icon size={24} />
            </div>
            <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${trend === 'up' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                }`}>
                {trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {change}
            </div>
        </div>
        <div>
            <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
            <h3 className="text-2xl font-bold text-slate-900">{value}</h3>
        </div>
    </Card>
);

const DashboardPage: React.FC = () => {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div>
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Dashboard</h1>
                <p className="text-slate-500 font-medium">Bem-vindo de volta, Pedro! Aqui está o que está acontecendo hoje.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Tarefas Pendentes"
                    value="24"
                    change="+12%"
                    trend="up"
                    icon={CheckSquare}
                />
                <StatCard
                    title="Clientes Ativos"
                    value="15"
                    change="+2"
                    trend="up"
                    icon={Users}
                />
                <StatCard
                    title="Faturamento Mensal"
                    value="R$ 45.200"
                    change="+8.4%"
                    trend="up"
                    icon={DollarSign}
                />
                <StatCard
                    title="NPS (Média)"
                    value="9.2"
                    change="-0.3"
                    trend="down"
                    icon={TrendingUp}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Chart Column */}
                <div className="lg:col-span-2 space-y-8">
                    <Card hover={false} className="h-[400px] flex flex-col justify-between">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-slate-900">Produtividade da Equipe</h3>
                            <select className="bg-slate-50 border-none text-xs font-bold text-slate-500 rounded-lg px-3 py-2 outline-none cursor-pointer">
                                <option>Últimos 30 dias</option>
                                <option>Últimos 7 dias</option>
                            </select>
                        </div>
                        {/* Mock Chart Area */}
                        <div className="flex-1 flex items-end gap-3 px-4 pt-10 pb-4">
                            {[40, 60, 45, 90, 65, 80, 55, 70, 95, 60, 40, 85].map((h, i) => (
                                <div key={i} className="flex-1 group relative">
                                    <div
                                        className="w-full bg-primary/10 group-hover:bg-primary transition-all duration-300 rounded-t-lg"
                                        style={{ height: `${h}%` }}
                                    />
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                        {h} tasks
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between px-4 text-[10px] font-bold text-slate-400 border-t border-slate-50 pt-4">
                            <span>JAN</span>
                            <span>FEV</span>
                            <span>MAR</span>
                            <span>ABR</span>
                            <span>MAI</span>
                            <span>JUN</span>
                            <span>JUL</span>
                            <span>AGO</span>
                            <span>SET</span>
                            <span>OUT</span>
                            <span>NOV</span>
                            <span>DEZ</span>
                        </div>
                    </Card>

                    <Card hover={false}>
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold text-slate-900">Atividades Recentes</h3>
                            <button className="text-sm font-bold text-primary hover:underline">Ver todas</button>
                        </div>
                        <div className="space-y-6">
                            {[
                                { user: 'Bia Santos', action: 'concluiu a tarefa', target: 'Design Dashboard Nike', time: 'Há 5 min', icon: CheckSquare, color: 'emerald' },
                                { user: 'João Silva', action: 'enviou uma mensagem em', target: 'Nike Onboarding', time: 'Há 12 min', icon: MessageSquare, color: 'blue' },
                                { user: 'Bia Santos', action: 'adicionou um anexo em', target: 'Nike Onboarding', time: 'Há 45 min', icon: Clock, color: 'amber' },
                            ].map((activity, i) => (
                                <div key={i} className="flex items-center gap-4 group">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-${activity.color}-50 text-${activity.color}-600 border border-${activity.color}-100`}>
                                        <activity.icon size={18} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-slate-700">
                                            <span className="font-bold text-slate-900">{activity.user}</span> {activity.action} <span className="font-bold text-slate-900">{activity.target}</span>
                                        </p>
                                        <p className="text-xs text-slate-400 font-medium">{activity.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                {/* Sidebar Column */}
                <div className="space-y-8">
                    <Card hover={false} className="bg-indigo-600 border-none text-white shadow-xl shadow-indigo-200">
                        <h3 className="text-lg font-bold mb-2">Equipe Online</h3>
                        <p className="text-indigo-100 text-xs font-medium mb-6">4 membros ativos agora</p>
                        <div className="flex -space-x-3 mb-8">
                            {['BS', 'JS', 'ML', 'PA'].map((initials, i) => (
                                <div key={i} className="w-10 h-10 rounded-full bg-white/20 border-2 border-indigo-600 flex items-center justify-center text-xs font-bold backdrop-blur-sm">
                                    {initials}
                                </div>
                            ))}
                            <div className="w-10 h-10 rounded-full bg-indigo-500 border-2 border-indigo-600 flex items-center justify-center text-[10px] font-bold">
                                +2
                            </div>
                        </div>
                        <button className="w-full bg-white/10 hover:bg-white/20 py-2.5 rounded-xl text-sm font-bold transition-all border border-white/20">
                            Gerenciar Equipe
                        </button>
                    </Card>

                    <Card hover={false}>
                        <h3 className="text-lg font-bold text-slate-900 mb-6">Prazos Próximos</h3>
                        <div className="space-y-4">
                            {[
                                { title: 'Entrega MVP Nike', date: 'Amanhã', priority: 'Alta' },
                                { title: 'Reunião Nubank', date: '30 Dez', priority: 'Média' },
                                { title: 'Fix Bugs Chat', date: '31 Dez', priority: 'Urgente' },
                            ].map((item, i) => (
                                <div key={i} className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 flex flex-col gap-2">
                                    <div className="flex justify-between items-start">
                                        <span className="text-sm font-bold text-slate-800">{item.title}</span>
                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.priority === 'Urgente' ? 'bg-rose-100 text-rose-600' :
                                                item.priority === 'Alta' ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'
                                            }`}>
                                            {item.priority}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-slate-400">
                                        <Clock size={14} />
                                        <span className="text-[11px] font-bold uppercase">{item.date}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
