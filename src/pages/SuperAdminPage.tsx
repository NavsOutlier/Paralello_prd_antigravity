import React, { useEffect, useState } from 'react';
import {
    Users,
    Building2,
    TrendingUp,
    MoreVertical,
    ShieldCheck,
    Ban,
    Plus,
    Search
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { supabase } from '../lib/supabase';
import type { Database } from '../types/supabase';

type Organization = Database['public']['Tables']['organizations']['Row'];

const SuperAdminPage: React.FC = () => {
    const [orgs, setOrgs] = useState<Organization[]>([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalMRR: 0,
        totalOrgs: 0,
        activeUsers: 0,
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const { data: orgData, error: orgError } = await supabase
                .from('organizations')
                .select('*')
                .order('created_at', { ascending: false });

            if (orgError) throw orgError;

            // Mocking MRR calculation based on plans
            const mrr = orgData.reduce((acc, org) => {
                if (org.plan === 'starter') return acc + 99;
                if (org.plan === 'professional') return acc + 299;
                if (org.plan === 'enterprise') return acc + 999;
                return acc;
            }, 0);

            setOrgs(orgData);
            setStats({
                totalMRR: mrr,
                totalOrgs: orgData.length,
                activeUsers: orgData.length * 4, // Mock estimation
            });
        } catch (error) {
            console.error('Error fetching admin data:', error);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div>
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Painel SaaS Admin</h1>
                <p className="text-slate-500 font-medium">Controle global e métricas da Paralello.</p>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card hover={false} className="bg-gradient-to-br from-primary/10 to-blue-500/10 border-primary/20">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-primary text-white rounded-2xl shadow-lg shadow-primary/20">
                            <TrendingUp size={24} />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">MRR Atual</p>
                            <h2 className="text-2xl font-black text-slate-900">R$ {stats.totalMRR.toLocaleString('pt-BR')}</h2>
                        </div>
                    </div>
                </Card>

                <Card hover={false}>
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-slate-100 text-slate-600 rounded-2xl">
                            <Building2 size={24} />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Organizações</p>
                            <h2 className="text-2xl font-black text-slate-900">{stats.totalOrgs}</h2>
                        </div>
                    </div>
                </Card>

                <Card hover={false}>
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-slate-100 text-slate-600 rounded-2xl">
                            <Users size={24} />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Usuários Totais</p>
                            <h2 className="text-2xl font-black text-slate-900">{stats.activeUsers}</h2>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Organizations Table */}
            <Card hover={false} className="p-0 overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <div className="flex items-center gap-4 flex-1">
                        <div className="relative max-w-xs w-full">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                            <input
                                type="text"
                                placeholder="Filtrar organizações..."
                                className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary/20"
                            />
                        </div>
                    </div>
                    <Button size="sm" className="gap-2">
                        <Plus size={18} /> Nova Organização
                    </Button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50 text-slate-400 text-[10px] font-bold uppercase tracking-widest border-b border-slate-100">
                                <th className="px-6 py-4">Organização</th>
                                <th className="px-6 py-4">Plano</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Criado em</th>
                                <th className="px-6 py-4 text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {loading ? (
                                Array(3).fill(0).map((_, i) => (
                                    <tr key={i} className="animate-pulse">
                                        <td colSpan={5} className="px-6 py-8 h-20 bg-slate-50/20" />
                                    </tr>
                                ))
                            ) : orgs.map((org) => (
                                <tr key={org.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-slate-500">
                                                {org.name[0]}
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-slate-900">{org.name}</p>
                                                <p className="text-xs text-slate-400 font-medium">slug: {org.slug}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <Badge variant={org.plan === 'enterprise' ? 'primary' : 'neutral'} className="capitalize">
                                            {org.plan}
                                        </Badge>
                                    </td>
                                    <td className="px-6 py-4">
                                        <Badge variant="success">Ativo</Badge>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-500">
                                        {new Date(org.created_at!).toLocaleDateString('pt-BR')}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="p-2 hover:bg-white rounded-lg text-emerald-600 border border-transparent hover:border-emerald-100 transition-all">
                                                <ShieldCheck size={18} />
                                            </button>
                                            <button className="p-2 hover:bg-white rounded-lg text-red-600 border border-transparent hover:border-red-100 transition-all">
                                                <Ban size={18} />
                                            </button>
                                            <button className="p-2 hover:bg-white rounded-lg text-slate-400">
                                                <MoreVertical size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default SuperAdminPage;
