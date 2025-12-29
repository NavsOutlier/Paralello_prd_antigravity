import React, { useState } from 'react';
import {
    Search,
    MoreVertical,
    Send,
    Paperclip,
    Plus,
    Filter,
    Info,
    CheckCircle2,
    Clock,
    ChevronRight
} from 'lucide-react';
import { Avatar } from '../components/ui/Avatar';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import TaskDetailModal from '../components/TaskDetailModal';

const WorkspacePage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'all' | 'unread' | 'mentions'>('all');
    const [rightPanel, setRightPanel] = useState<'tasks' | 'info'>('tasks');
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState<any>(null);

    const tasks = [
        { title: 'Redesign Banner Principal', status: 'Em progresso', priority: 'Alta', tag: 'Design', deadline: 'Hoje', description: 'Ajustar as cores e fontes de acordo com o novo guia de marca da Nike.' },
        { title: 'Revisar integração n8n', status: 'Revisão', priority: 'Média', tag: 'Dev', deadline: 'Amanhã', description: 'Garantir que os webhooks estão sendo disparados corretamente para o Supabase.' },
        { title: 'Briefing para post Instagram', status: 'Pendente', priority: 'Baixa', tag: 'Social', deadline: '30 Dez', description: 'Criar copia e sugestão de imagem para o post de Ano Novo.' },
    ];

    const handleTaskClick = (task: any) => {
        setSelectedTask(task);
        setIsTaskModalOpen(true);
    };

    return (
        <div className="h-[calc(100vh-136px)] -m-8 flex overflow-hidden bg-white">
            {/* Coluna 1: Sidebar de Conversas */}
            <div className="w-[320px] border-r border-slate-100 flex flex-col bg-slate-50/30">
                <div className="p-6 border-b border-slate-100 space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-slate-900 leading-tight">Mensagens</h2>
                        <div className="flex gap-1">
                            <button className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 transition-colors">
                                <Filter size={18} />
                            </button>
                        </div>
                    </div>
                    <div className="flex gap-2 p-1 bg-slate-100/50 rounded-xl">
                        {['all', 'unread', 'mentions'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab as any)}
                                className={`
                  flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all
                  ${activeTab === tab
                                        ? 'bg-white text-primary shadow-sm'
                                        : 'text-slate-500 hover:text-slate-700'}
                `}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </button>
                        ))}
                    </div>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input
                            type="text"
                            placeholder="Buscar conversas..."
                            className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary/10 transition-all"
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-1">
                    <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 mt-2">Clientes</p>
                    {[
                        { name: 'Nike Retail', msg: 'Pode ver o novo protótipo?', time: '14:20', unread: 3, status: 'active' },
                        { name: 'Nubank Tech', msg: 'A integração n8n está ok.', time: 'Ontem', unread: 0, status: 'active' },
                        { name: 'Coca-Cola Latin', msg: 'Obrigado pelo envio!', time: 'Ontem', unread: 0, status: 'warning' },
                    ].map((chat, i) => (
                        <button
                            key={i}
                            className={`
                w-full flex items-center gap-3 p-3 rounded-2xl transition-all group
                ${i === 0 ? 'bg-white shadow-lg shadow-slate-200/50 border border-slate-100' : 'hover:bg-white hover:shadow-md'}
              `}
                        >
                            <Avatar name={chat.name} size="md" src={`https://ui-avatars.com/api/?name=${chat.name}&background=random`} />
                            <div className="flex-1 text-left min-w-0">
                                <div className="flex justify-between items-center mb-0.5">
                                    <span className="text-sm font-bold text-slate-900 truncate">{chat.name}</span>
                                    <span className="text-[10px] font-medium text-slate-400">{chat.time}</span>
                                </div>
                                <p className="text-xs text-slate-500 truncate font-medium">
                                    {chat.msg}
                                </p>
                            </div>
                            {chat.unread > 0 && (
                                <span className="w-5 h-5 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-4 ring-primary/10">
                                    {chat.unread}
                                </span>
                            )}
                        </button>
                    ))}

                    <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 mt-6">Equipe Interna</p>
                    {[
                        { name: 'Bia Santos', msg: 'O card está pronto.', time: '10:05', online: true },
                        { name: 'João Silva', msg: 'Vou revisar agora.', time: '09:12', online: false },
                    ].map((chat, i) => (
                        <button key={i} className="w-full flex items-center gap-3 p-3 rounded-2xl hover:bg-white hover:shadow-md transition-all group">
                            <Avatar name={chat.name} size="md" isOnline={chat.online} />
                            <div className="flex-1 text-left min-w-0">
                                <div className="flex justify-between items-center mb-0.5">
                                    <span className="text-sm font-bold text-slate-900 truncate">{chat.name}</span>
                                    <span className="text-[10px] font-medium text-slate-400">{chat.time}</span>
                                </div>
                                <p className="text-xs text-slate-500 truncate font-medium">{chat.msg}</p>
                            </div>
                        </button>
                    ))}
                </div>

                <div className="p-4 border-t border-slate-100 bg-white">
                    <Button variant="outline" className="w-full gap-2 text-sm h-10 border-dashed border-2">
                        <Plus size={16} />
                        Novo Projeto
                    </Button>
                </div>
            </div>

            {/* Coluna 2: Área de Chat */}
            <div className="flex-1 flex flex-col bg-white">
                {/* Chat Header */}
                <div className="h-[72px] px-6 border-b border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Avatar name="Nike Retail" size="md" className="ring-2 ring-primary/10" />
                        <div>
                            <div className="flex items-center gap-2">
                                <h3 className="font-bold text-slate-900">Nike Retail</h3>
                                <Badge variant="success">Ativo</Badge>
                            </div>
                            <p className="text-[11px] text-emerald-500 font-bold flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                Dando resposta rápida
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setRightPanel(rightPanel === 'info' ? 'tasks' : 'info')}
                            className={`p-2 rounded-xl transition-all ${rightPanel === 'info' ? 'bg-primary/10 text-primary' : 'hover:bg-slate-100 text-slate-400'}`}
                        >
                            <Info size={20} />
                        </button>
                        <button className="p-2 hover:bg-slate-100 rounded-xl text-slate-400 transition-colors">
                            <MoreVertical size={20} />
                        </button>
                    </div>
                </div>

                {/* Messages History */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-fixed bg-slate-50/30">
                    <div className="flex flex-col items-center">
                        <span className="text-[10px] font-bold bg-slate-200 text-slate-600 px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">
                            Hoje
                        </span>
                    </div>

                    <div className="flex items-start gap-3">
                        <Avatar name="Nike Retail" size="sm" />
                        <div className="max-w-[70%] group">
                            <div className="bg-white border border-slate-200 p-4 rounded-2xl rounded-tl-none shadow-sm hover:shadow-md transition-all">
                                <p className="text-sm text-slate-800 leading-relaxed font-medium">
                                    Olá time! Precisamos atualizar o banner da campanha de Verão. Conseguem me enviar o novo protótipo até o final do dia?
                                </p>
                                <div className="flex justify-end mt-1">
                                    <span className="text-[10px] text-slate-400 font-bold">14:10</span>
                                </div>
                            </div>
                            <button
                                className="mt-2 opacity-0 group-hover:opacity-100 transition-all flex items-center gap-1.5 text-[10px] font-bold text-primary bg-primary/5 px-2.5 py-1 rounded-full border border-primary/10 hover:bg-primary/10"
                            >
                                <Plus size={12} />
                                Transformar em Tarefa
                            </button>
                        </div>
                    </div>

                    <div className="flex items-start gap-3 flex-row-reverse">
                        <Avatar name="Pedro Admin" size="sm" />
                        <div className="max-w-[70%]">
                            <div className="bg-primary p-4 rounded-2xl rounded-tr-none shadow-lg shadow-primary/20">
                                <p className="text-sm text-white leading-relaxed font-medium">
                                    Com certeza! A Bia já está finalizando os ajustes finos. Vamos postar aqui no Workspace em 1 hora.
                                </p>
                                <div className="flex justify-end mt-1 items-center gap-1">
                                    <span className="text-[10px] text-primary-dark/80 font-bold">14:15</span>
                                    <CheckCircle2 size={12} className="text-white" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="animate-pulse flex items-center gap-2 text-[11px] text-slate-400 font-bold pl-12">
                        <span className="italic">Nike Retail está digitando</span>
                        <span className="flex gap-0.5">
                            <span className="w-1 h-1 bg-slate-400 rounded-full" />
                            <span className="w-1 h-1 bg-slate-400 rounded-full" />
                            <span className="w-1 h-1 bg-slate-400 rounded-full" />
                        </span>
                    </div>
                </div>

                {/* Chat Input */}
                <div className="p-6 border-t border-slate-100 bg-white">
                    <div className="bg-slate-50 border-2 border-slate-100 p-2 rounded-2xl flex items-end gap-2 focus-within:border-primary/20 focus-within:bg-white transition-all shadow-inner">
                        <button className="p-2.5 hover:bg-white rounded-xl text-slate-400 transition-all hover:text-primary">
                            <Paperclip size={20} />
                        </button>
                        <textarea
                            rows={1}
                            placeholder="Digite sua mensagem para o cliente..."
                            className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-2.5 max-h-32 font-medium"
                        />
                        <button className="p-2.5 bg-primary text-white rounded-xl shadow-lg shadow-primary/25 hover:bg-primary-dark transition-all active:scale-95">
                            <Send size={20} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Coluna 3: Painel Lateral (Tarefas ou Info) */}
            <div className={`w-[360px] border-l border-slate-100 flex flex-col bg-slate-50/20 transition-all duration-300 ${rightPanel === 'info' ? 'bg-indigo-50/30' : ''}`}>
                {rightPanel === 'tasks' ? (
                    <>
                        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white">
                            <h3 className="font-bold text-slate-900">Tarefas</h3>
                            <div className="flex gap-2">
                                <button className="p-2 hover:bg-slate-100 rounded-xl text-slate-400 transition-colors">
                                    <Plus size={18} />
                                </button>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {tasks.map((task, i) => (
                                <Card
                                    key={i}
                                    className="p-4 space-y-3 group bg-white shadow-sm border border-slate-100"
                                    onClick={() => handleTaskClick(task)}
                                >
                                    <div className="flex justify-between items-start">
                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${task.tag === 'Design' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' :
                                            task.tag === 'Dev' ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'
                                            } border`}>
                                            {task.tag}
                                        </span>
                                        <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-slate-100 rounded-md transition-all">
                                            <MoreVertical size={14} />
                                        </button>
                                    </div>
                                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-primary transition-colors leading-snug">
                                        {task.title}
                                    </h4>
                                    <div className="flex items-center justify-between pt-2 border-t border-slate-50">
                                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400">
                                            <Clock size={12} />
                                            <span className={task.deadline === 'Hoje' ? 'text-rose-500' : ''}>{task.deadline}</span>
                                        </div>
                                        <div className="flex -space-x-1.5">
                                            <Avatar name="Bia" size="sm" className="w-6 h-6 ring-2 ring-white" />
                                            <Avatar name="João" size="sm" className="w-6 h-6 ring-2 ring-white" />
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="flex-1 overflow-y-auto p-6 space-y-8 animate-in slide-in-from-right-4 duration-300">
                        <div className="text-center">
                            <Avatar name="Nike Retail" size="xl" className="shadow-2xl mx-auto mb-4 border-4 border-white" />
                            <h3 className="text-lg font-bold text-slate-900">Nike Retail Brasil</h3>
                            <p className="text-xs font-medium text-slate-400 uppercase tracking-widest mt-1">Key Account Since 2023</p>
                        </div>

                        <div className="space-y-4">
                            <div className="p-4 bg-white rounded-2xl border border-indigo-100 shadow-sm">
                                <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-3">Status do Relacionamento</p>
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                    <span className="text-sm font-bold text-slate-800">Crescimento Saudável</span>
                                </div>
                            </div>

                            <div className="p-4 bg-white rounded-2xl border border-indigo-100 shadow-sm">
                                <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-3">Orçamento Mensal</p>
                                <div className="flex justify-between items-end mb-2">
                                    <span className="text-xl font-bold text-slate-900">R$ 15.000</span>
                                    <span className="text-xs font-bold text-indigo-600">80% utilizado</span>
                                </div>
                                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-indigo-500 w-[80%]" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <button className="flex flex-col items-center gap-2 p-4 bg-white rounded-2xl border border-slate-100 hover:border-primary hover:text-primary transition-all group">
                                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-all">
                                        <Plus size={20} />
                                    </div>
                                    <span className="text-[10px] font-bold uppercase tracking-tighter">Documento</span>
                                </button>
                                <button className="flex flex-col items-center gap-2 p-4 bg-white rounded-2xl border border-slate-100 hover:border-primary hover:text-primary transition-all group">
                                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-all">
                                        <Search size={20} />
                                    </div>
                                    <span className="text-[10px] font-bold uppercase tracking-tighter">Pesquisar</span>
                                </button>
                            </div>
                        </div>

                        <div className="pt-4">
                            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Links Rápidos</h4>
                            <div className="space-y-2">
                                {['Google Drive Folder', 'Contrato de Serviço', 'Portal de Branding'].map((link) => (
                                    <button key={link} className="w-full flex items-center justify-between p-3 bg-white hover:bg-slate-50 rounded-xl border border-slate-100 transition-all group">
                                        <span className="text-xs font-bold text-slate-700">{link}</span>
                                        <ChevronRight size={14} className="text-slate-300 group-hover:text-primary transition-all" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
            {selectedTask && (
                <TaskDetailModal
                    isOpen={isTaskModalOpen}
                    onClose={() => setIsTaskModalOpen(false)}
                    task={selectedTask}
                />
            )}
        </div>
    );
};

export default WorkspacePage;
