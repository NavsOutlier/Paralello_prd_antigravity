import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    MessageSquare,
    Users,
    Settings,
    LogOut,
    Bell,
    Search,
    Plus
} from 'lucide-react';
import { Avatar } from '../components/ui/Avatar';
import { useAuth } from '../hooks/useAuth';
import { ShieldAlert } from 'lucide-react';

const MainLayout: React.FC = () => {
    const { profile, signOut, isSuperAdmin } = useAuth();
    const isSidebarOpen = true; // Fixed for now as per design
    const location = useLocation();
    const navigate = useNavigate();

    const navItems = [
        { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/dashboard' },
        { icon: <MessageSquare size={20} />, label: 'Workspace', path: '/workspace/1' },
        { icon: <Users size={20} />, label: 'Clientes', path: '/clients' },
        { icon: <Settings size={20} />, label: 'Configurações', path: '/settings' },
    ];

    // Add Super Admin item if applicable
    if (isSuperAdmin) {
        navItems.push({
            icon: <ShieldAlert size={20} className="text-amber-500" />,
            label: 'SaaS Admin',
            path: '/super-admin'
        });
    }

    const handleSignOut = async () => {
        await signOut();
        navigate('/login');
    };

    return (
        <div className="flex h-screen bg-background overflow-hidden">
            {/* Sidebar */}
            <aside
                className={`
          ${isSidebarOpen ? 'w-[280px]' : 'w-[80px]'} 
          bg-white border-r border-slate-200 flex flex-col 
          transition-all duration-300 ease-in-out z-20
        `}
            >
                <div className="p-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center font-bold italic flex-shrink-0 shadow-lg shadow-primary/20">
                        P//
                    </div>
                    {isSidebarOpen && (
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
                            Paralello
                        </span>
                    )}
                </div>

                <nav className="flex-1 px-4 py-6 space-y-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`
                flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                ${location.pathname.startsWith(item.path)
                                    ? 'bg-primary text-white shadow-lg shadow-primary/25'
                                    : 'text-slate-500 hover:bg-slate-50 hover:text-primary'}
              `}
                        >
                            <span className="flex-shrink-0">{item.icon}</span>
                            {isSidebarOpen && <span className="font-semibold">{item.label}</span>}
                        </Link>
                    ))}

                    {isSidebarOpen && (
                        <div className="pt-8">
                            <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">
                                Projetos Recentes
                            </p>
                            <div className="space-y-1">
                                {['Nike Onboarding', 'Nubank Redesign', 'Coca-Cola Campaign'].map((project) => (
                                    <button key={project} className="w-full flex items-center gap-3 px-4 py-2 text-sm font-medium text-slate-500 hover:text-primary hover:bg-slate-50 rounded-lg transition-colors group">
                                        <div className="w-2 h-2 rounded-full bg-slate-300 group-hover:bg-primary" />
                                        <span className="truncate">{project}</span>
                                    </button>
                                ))}
                                <button className="w-full flex items-center gap-3 px-4 py-2 text-sm font-bold text-primary hover:bg-primary/5 rounded-lg transition-colors">
                                    <Plus size={16} />
                                    <span>Novo Projeto</span>
                                </button>
                            </div>
                        </div>
                    )}
                </nav>

                <div className="p-4 border-t border-slate-100">
                    <button
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                    >
                        <LogOut size={20} />
                        {isSidebarOpen && <span className="font-semibold">Sair</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Topbar */}
                <header className="h-[72px] bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 flex items-center justify-between z-10 sticky top-0">
                    <div className="flex items-center gap-4 flex-1">
                        <div className="relative max-w-md w-full hidden md:block">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input
                                type="text"
                                placeholder="Buscar tarefas, projetos ou pessoas..."
                                className="w-full bg-slate-100 border-none rounded-xl pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-slate-400 font-medium"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <button className="relative text-slate-500 hover:text-primary transition-colors">
                            <Bell size={22} />
                            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 border-2 border-white rounded-full text-[10px] text-white flex items-center justify-center font-bold">
                                3
                            </span>
                        </button>
                        <div className="h-8 w-px bg-slate-200" />
                        <div className="flex items-center gap-3 pl-2 group cursor-pointer">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-bold text-slate-900 group-hover:text-primary transition-colors">
                                    {profile?.full_name || 'Usuário'}
                                </p>
                                <p className="text-[11px] font-medium text-slate-400 capitalize">
                                    {profile?.role === 'owner' ? 'Dono da Agência' : profile?.role === 'admin' ? 'Administrador' : 'Membro Team'}
                                </p>
                            </div>
                            <Avatar name={profile?.full_name || 'U'} isOnline size="md" />
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto overflow-x-hidden p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default MainLayout;
