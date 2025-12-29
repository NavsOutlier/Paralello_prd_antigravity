import React from 'react';
import {
    Plus,
    Search,
    Filter,
    MoreVertical,
    Download,
    Mail,
    MessageSquare
} from 'lucide-react';
import { Avatar } from '../components/ui/Avatar';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

const ClientsPage: React.FC = () => {
    const clients = [
        { id: 1, name: 'Nike Retail Brasil', company: 'Nike Inc.', channel: 'WhatsApp', status: 'Ativo', lastActivity: 'Há 5 min', projects: 3 },
        { id: 2, name: 'Nubank Tech', company: 'Nubank', channel: 'Email', status: 'Ativo', lastActivity: 'Há 2 horas', projects: 1 },
        { id: 3, name: 'Coca-Cola Latin', company: 'Coca-Cola', channel: 'WhatsApp', status: 'Onboarding', lastActivity: 'Ontem', projects: 2 },
        { id: 4, name: 'Banco Itaú', company: 'Itaú Unibanco', channel: 'WhatsApp', status: 'Em Risco', lastActivity: 'Há 3 dias', projects: 4 },
        { id: 5, name: 'Mercado Livre', company: 'MELI', channel: 'Email', status: 'Inativo', lastActivity: 'Há 1 semana', projects: 0 },
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Clientes</h1>
                    <p className="text-slate-500 font-medium">Gerencie sua carteira de clientes e projetos.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="gap-2">
                        <Download size={18} />
                        Exportar
                    </Button>
                    <Button className="gap-2">
                        <Plus size={18} />
                        Novo Cliente
                    </Button>
                </div>
            </div>

            <Card hover={false} className="p-0 overflow-hidden border-slate-200 shadow-xl shadow-slate-200/50">
                <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="relative w-full md:max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Pesquisar por nome, empresa ou e-mail..."
                            className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                        />
                    </div>
                    <div className="flex gap-2 w-full md:w-auto">
                        <Button variant="ghost" size="sm" className="flex-1 md:flex-none gap-2 font-bold text-slate-500">
                            <Filter size={16} />
                            Filtros
                        </Button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-100">
                                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Nome / Empresa</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Canal Principal</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Última Atividade</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Projetos</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {clients.map((client) => (
                                <tr key={client.id} className="hover:bg-slate-50/80 transition-colors group cursor-pointer">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <Avatar name={client.name} size="md" />
                                            <div>
                                                <p className="text-sm font-bold text-slate-900 group-hover:text-primary transition-colors">{client.name}</p>
                                                <p className="text-xs text-slate-400 font-medium">{client.company}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            {client.channel === 'WhatsApp' ? (
                                                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
                                                    <MessageSquare size={16} />
                                                </div>
                                            ) : (
                                                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
                                                    <Mail size={16} />
                                                </div>
                                            )}
                                            <span className="text-xs font-bold text-slate-600">{client.channel}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <Badge variant={
                                            client.status === 'Ativo' ? 'success' :
                                                client.status === 'Onboarding' ? 'info' :
                                                    client.status === 'Em Risco' ? 'warning' : 'neutral'
                                        }>
                                            {client.status}
                                        </Badge>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-xs font-bold text-slate-500">{client.lastActivity}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 rounded-md bg-slate-100 text-slate-600 flex items-center justify-center text-[10px] font-bold">
                                                {client.projects}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button className="p-2 hover:bg-white hover:shadow-md rounded-lg text-slate-400 transition-all">
                                            <MoreVertical size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="p-6 border-t border-slate-100 bg-slate-50/30 flex items-center justify-between">
                    <p className="text-xs font-bold text-slate-400">Mostrando 5 de 42 clientes</p>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" disabled>Anterior</Button>
                        <Button variant="outline" size="sm">Próximo</Button>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default ClientsPage;
