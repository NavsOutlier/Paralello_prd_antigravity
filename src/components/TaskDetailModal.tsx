import React, { useState } from 'react';
import {
    X,
    Clock,
    Tag,
    Paperclip,
    CheckSquare,
    MessageSquare,
    MoreHorizontal,
    ChevronDown,
    Plus
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Avatar } from '../components/ui/Avatar';
import { Badge } from '../components/ui/Badge';

interface TaskDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    task: {
        title: string;
        description: string;
        status: string;
        priority: string;
        tag: string;
        deadline: string;
    };
}

const TaskDetailModal: React.FC<TaskDetailModalProps> = ({ isOpen, onClose, task }) => {
    const [activeTab, setActiveTab] = useState<'desc' | 'checklist' | 'comments' | 'attachments'>('desc');

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
                onClick={onClose}
            />

            {/* Modal Container */}
            <div className="relative w-full max-w-[800px] bg-white rounded-[32px] shadow-2xl overflow-hidden animate-in zoom-in-95 fade-in slide-in-from-bottom-8 duration-300">
                {/* Header */}
                <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10">
                    <div className="flex-1 mr-4">
                        <div className="flex items-center gap-3 mb-2">
                            <Badge variant="info">{task.tag}</Badge>
                            <div className="flex items-center gap-2 text-rose-500 text-[10px] font-bold uppercase tracking-widest">
                                <Clock size={12} />
                                {task.deadline}
                            </div>
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 leading-tight">
                            {task.title}
                        </h2>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="p-2.5 hover:bg-slate-50 rounded-2xl text-slate-400 transition-all">
                            <MoreHorizontal size={20} />
                        </button>
                        <button
                            onClick={onClose}
                            className="p-2.5 bg-slate-50 hover:bg-slate-100 rounded-2xl text-slate-600 transition-all active:scale-95"
                        >
                            <X size={20} />
                        </button>
                    </div>
                </div>

                {/* Content Tabs */}
                <div className="flex border-b border-slate-100 bg-slate-50/30 px-8">
                    {[
                        { id: 'desc', label: 'Descrição', icon: Tag },
                        { id: 'checklist', label: 'Checklist', icon: CheckSquare },
                        { id: 'comments', label: 'Comentários', icon: MessageSquare },
                        { id: 'attachments', label: 'Anexos', icon: Paperclip },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`
                flex items-center gap-2 py-4 px-4 text-xs font-bold transition-all relative
                ${activeTab === tab.id ? 'text-primary' : 'text-slate-500 hover:text-slate-800'}
              `}
                        >
                            <tab.icon size={16} />
                            {tab.label}
                            {activeTab === tab.id && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                            )}
                        </button>
                    ))}
                </div>

                {/* Scrollable Body */}
                <div className="p-8 max-h-[60vh] overflow-y-auto bg-white">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Left Column: Main Content */}
                        <div className="md:col-span-2 space-y-8">
                            {activeTab === 'desc' && (
                                <div className="space-y-6">
                                    <div className="space-y-3">
                                        <h4 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Detalhes da Tarefa</h4>
                                        <p className="text-sm text-slate-600 leading-relaxed font-medium">
                                            {task.description || "Nenhuma descrição detalhada fornecida para esta tarefa."}
                                        </p>
                                    </div>

                                    <div className="p-5 bg-primary/5 rounded-2xl border border-primary/10">
                                        <h4 className="text-[10px] font-extrabold text-primary uppercase tracking-widest mb-3">Mensagem Original</h4>
                                        <p className="text-sm text-slate-700 italic border-l-4 border-primary/20 pl-4 font-medium">
                                            "Pode ver o novo protótipo até o final do dia?"
                                        </p>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'checklist' && (
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h4 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Itens de Verificação</h4>
                                        <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-1 rounded-full">3 / 5 concluídos</span>
                                    </div>
                                    <div className="space-y-3">
                                        {[
                                            { label: 'Ajuste de cor no logo', done: true },
                                            { label: 'Responsividade mobile', done: true },
                                            { label: 'Exportar assets em @2x', done: true },
                                            { label: 'Enviar link do Figma', done: false },
                                            { label: 'Revisão final com a Bia', done: false },
                                        ].map((item, i) => (
                                            <div key={i} className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-xl transition-colors group cursor-pointer">
                                                <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${item.done ? 'bg-primary border-primary text-white' : 'border-slate-200 group-hover:border-primary'
                                                    }`}>
                                                    {item.done && <CheckSquare size={12} />}
                                                </div>
                                                <span className={`text-sm font-medium ${item.done ? 'text-slate-400 line-through' : 'text-slate-700'}`}>
                                                    {item.label}
                                                </span>
                                            </div>
                                        ))}
                                        <button className="flex items-center gap-2 text-sm font-bold text-primary p-3 hover:bg-primary/5 w-full rounded-xl transition-all">
                                            <Plus size={16} />
                                            Adicionar item
                                        </button>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'comments' && (
                                <div className="space-y-6">
                                    <div className="space-y-6">
                                        {[
                                            { user: 'Bia Santos', msg: 'Já finalizei a primeira parte dos ícones.', time: 'Há 20 min' },
                                            { user: 'João Silva', msg: 'Boa! Vou conferir agora.', time: 'Há 2 min' },
                                        ].map((c, i) => (
                                            <div key={i} className="flex gap-4">
                                                <Avatar name={c.user} size="sm" />
                                                <div className="flex-1 bg-slate-50 p-4 rounded-2xl rounded-tl-none">
                                                    <div className="flex justify-between mb-1">
                                                        <span className="text-xs font-bold text-slate-900">{c.user}</span>
                                                        <span className="text-[10px] text-slate-400 font-bold">{c.time}</span>
                                                    </div>
                                                    <p className="text-sm text-slate-600 font-medium">{c.msg}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex gap-3 pt-6 border-t border-slate-100">
                                        <Avatar name="Pedro Rodrigues" size="sm" />
                                        <div className="flex-1 relative">
                                            <textarea
                                                placeholder="Escreva um comentário interno..."
                                                className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm font-medium focus:ring-2 focus:ring-primary/20 resize-none"
                                                rows={2}
                                            />
                                            <button className="absolute bottom-3 right-4 p-2 bg-primary text-white rounded-xl shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all">
                                                <MessageSquare size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Right Column: Meta Info */}
                        <div className="space-y-8">
                            <div className="space-y-6">
                                <div>
                                    <h4 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-3">Status</h4>
                                    <button className="w-full flex items-center justify-between px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-100 text-sm font-bold text-slate-700 hover:border-primary transition-all">
                                        {task.status}
                                        <ChevronDown size={14} />
                                    </button>
                                </div>

                                <div>
                                    <h4 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-3">Responsáveis</h4>
                                    <div className="flex flex-wrap gap-2">
                                        <div className="flex items-center gap-2 pr-4 bg-slate-50 rounded-full border border-slate-100 p-1">
                                            <Avatar name="Bia" size="sm" />
                                            <span className="text-xs font-bold text-slate-700">Bia Santos</span>
                                        </div>
                                        <button className="w-8 h-8 rounded-full border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary transition-all">
                                            <Plus size={16} />
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-3">Prioridade</h4>
                                    <div className="grid grid-cols-2 gap-2">
                                        {['Baixa', 'Média', 'Alta', 'Urgente'].map((p) => (
                                            <button
                                                key={p}
                                                className={`
                          py-2 px-3 rounded-xl text-[10px] font-bold border transition-all
                          ${task.priority === p
                                                        ? 'bg-primary text-white border-primary shadow-md'
                                                        : 'bg-white text-slate-500 border-slate-100 hover:bg-slate-50'}
                        `}
                                            >
                                                {p}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="p-8 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
                    <div className="flex gap-2">
                        <Button variant="ghost" size="sm" className="text-slate-500 font-bold hover:text-red-500">Arquivar Tarefa</Button>
                    </div>
                    <div className="flex gap-3">
                        <Button variant="outline" onClick={onClose}>Cancelar</Button>
                        <Button className="shadow-lg shadow-primary/25">Mover para Revisão</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskDetailModal;
