import React, { useState } from 'react';
import {
    Users,
    Puzzle,
    Bell,
    CreditCard,
    Shield,
    Smartphone,
    CheckCircle2,
    Copy,
    ExternalLink
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Avatar } from '../components/ui/Avatar';
import { Badge } from '../components/ui/Badge';

const SettingsPage: React.FC = () => {
    const [activeSetting, setActiveSetting] = useState<'team' | 'integrations' | 'notifications' | 'billing'>('team');

    const menuItems = [
        { id: 'team', label: 'Membros da Equipe', icon: Users },
        { id: 'integrations', label: 'Integrações', icon: Puzzle },
        { id: 'notifications', label: 'Notificações', icon: Bell },
        { id: 'billing', label: 'Plano e Cobrança', icon: CreditCard },
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div>
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Configurações</h1>
                <p className="text-slate-500 font-medium">Gerencie sua agência e membros da equipe.</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Navigation Sidebar */}
                <aside className="w-full lg:w-72 flex flex-col gap-1">
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveSetting(item.id as any)}
                            className={`
                flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all
                ${activeSetting === item.id
                                    ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-[1.02]'
                                    : 'text-slate-500 hover:bg-slate-50 hover:text-primary'}
              `}
                        >
                            <item.icon size={20} />
                            {item.label}
                        </button>
                    ))}
                </aside>

                {/* Content Area */}
                <div className="flex-1">
                    {activeSetting === 'team' && (
                        <Card hover={false} className="space-y-6">
                            <div className="flex items-center justify-between border-b border-slate-100 pb-6">
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900">Membros da Equipe</h3>
                                    <p className="text-sm text-slate-500">Convide novos colaboradores para sua agência.</p>
                                </div>
                                <Button size="sm" className="gap-2">
                                    <span className="text-xl">+</span> Convidar Membro
                                </Button>
                            </div>

                            <div className="space-y-4">
                                {[
                                    { name: 'Pedro Rodrigues', email: 'pedro@agencia.com', role: 'Dono', status: 'Ativo' },
                                    { name: 'Bia Santos', email: 'bia@agencia.com', role: 'Designer', status: 'Ativo' },
                                    { name: 'João Silva', email: 'joao@agencia.com', role: 'Gestor', status: 'Pendente' },
                                ].map((member, i) => (
                                    <div key={i} className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                                        <div className="flex items-center gap-4">
                                            <Avatar name={member.name} size="md" />
                                            <div>
                                                <p className="text-sm font-bold text-slate-900">{member.name}</p>
                                                <p className="text-xs text-slate-400 font-medium">{member.email}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-6">
                                            <div className="text-right">
                                                <p className="text-xs font-bold text-slate-700">{member.role}</p>
                                                <p className={`text-[10px] font-bold uppercase tracking-widest ${member.status === 'Ativo' ? 'text-emerald-500' : 'text-amber-500'}`}>
                                                    {member.status}
                                                </p>
                                            </div>
                                            <button className="p-2 hover:bg-white rounded-lg text-slate-400">
                                                <Shield size={18} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    )}

                    {activeSetting === 'integrations' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card hover={false} className="border-emerald-100 bg-emerald-50/20">
                                <div className="flex items-start justify-between mb-6">
                                    <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-200">
                                        <Smartphone size={24} />
                                    </div>
                                    <div className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-extrabold uppercase tracking-widest flex items-center gap-1.5">
                                        <CheckCircle2 size={12} />
                                        Conectado
                                    </div>
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 mb-2">WhatsApp via n8n</h3>
                                <p className="text-sm text-slate-500 mb-6 leading-relaxed">
                                    Conecte seu fluxo do n8n para enviar e receber mensagens diretamente do Paralello.
                                </p>
                                <div className="space-y-4">
                                    <div className="bg-white border border-emerald-100 p-4 rounded-xl">
                                        <p className="text-[10px] font-bold text-emerald-600 uppercase mb-2">Webhook URL</p>
                                        <div className="flex items-center gap-2">
                                            <code className="text-[11px] font-mono text-slate-600 truncate flex-1">
                                                https://n8n.agencia.com/webhook/paralello
                                            </code>
                                            <button className="p-1.5 hover:bg-slate-50 rounded-lg text-slate-400">
                                                <Copy size={16} />
                                            </button>
                                        </div>
                                    </div>
                                    <Button variant="outline" className="w-full text-xs font-bold gap-2 border-emerald-200 text-emerald-700 hover:bg-emerald-100">
                                        Instruções de Configuração
                                        <ExternalLink size={14} />
                                    </Button>
                                </div>
                            </Card>

                            <Card hover={false} className="border-slate-100 opacity-60">
                                <div className="flex items-start justify-between mb-6">
                                    <div className="w-12 h-12 rounded-2xl bg-blue-500 text-white flex items-center justify-center">
                                        <Puzzle size={24} />
                                    </div>
                                    <div className="px-3 py-1 bg-slate-100 text-slate-500 rounded-full text-[10px] font-extrabold uppercase tracking-widest">
                                        Em breve
                                    </div>
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 mb-2">Google Drive</h3>
                                <p className="text-sm text-slate-500">
                                    Sincronize arquivos e assets diretamente nos cards de tarefas e CRM.
                                </p>
                            </Card>
                        </div>
                    )}

                    {activeSetting === 'billing' && (
                        <Card hover={false} className="space-y-8">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900">Seu Plano Atual</h3>
                                    <div className="flex items-center gap-2 mt-1">
                                        <Badge variant="info">Professional Plan</Badge>
                                        <span className="text-xs text-slate-400 font-medium">Renova em 15 Jan, 2026</span>
                                    </div>
                                </div>
                                <Button className="font-bold">Upgrade de Plano</Button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {[
                                    { label: 'Projetos', used: 12, total: 20 },
                                    { label: 'Membros', used: 4, total: 10 },
                                    { label: 'Espaço', used: 85, total: 100, unit: 'GB' },
                                ].map((stat, i) => (
                                    <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase mb-3">{stat.label}</p>
                                        <div className="flex justify-between items-end mb-2">
                                            <span className="text-lg font-bold text-slate-800">{stat.used}</span>
                                            <span className="text-xs text-slate-400 font-bold">/ {stat.total} {stat.unit}</span>
                                        </div>
                                        <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                                            <div className="h-full bg-primary" style={{ width: `${(stat.used / stat.total) * 100}%` }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
