import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { supabase } from '../lib/supabase';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const { error: authError } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (authError) throw authError;

            navigate('/dashboard');
        } catch (err: any) {
            setError(err.message || 'Erro ao realizar login. Verifique suas credenciais.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-background p-4">
            <div className="w-full max-w-[400px] animate-in fade-in zoom-in duration-500">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary text-white mb-4 shadow-xl shadow-primary/20">
                        <span className="text-2xl font-bold italic">P//</span>
                    </div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Paralello</h1>
                    <p className="text-slate-500 mt-2 font-medium">Sua agência em um só lugar</p>
                </div>

                <Card hover={false} className="shadow-2xl shadow-slate-200/50">
                    <h2 className="text-xl font-bold text-slate-800 mb-6">Acesse sua conta</h2>

                    <form onSubmit={handleLogin} className="space-y-5">
                        <Input
                            label="Email"
                            type="email"
                            placeholder="seu@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            leftIcon={<Mail size={20} />}
                        />

                        <div className="relative">
                            <Input
                                label="Senha"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                leftIcon={<Lock size={20} />}
                                rightIcon={
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="focus:outline-none hover:text-primary transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                }
                            />
                        </div>

                        {error && (
                            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-medium border border-red-100 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                                {error}
                            </div>
                        )}

                        <Button
                            type="submit"
                            className="w-full"
                            isLoading={isLoading}
                        >
                            Entrar
                        </Button>

                        <button
                            type="button"
                            className="w-full text-center text-sm font-medium text-slate-500 hover:text-primary transition-colors py-2"
                        >
                            Esqueci minha senha
                        </button>
                    </form>
                </Card>

                <p className="text-center mt-8 text-sm text-slate-400">
                    &copy; 2025 Paralello. Todos os direitos reservados.
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
