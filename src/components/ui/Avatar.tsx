import React from 'react';

interface AvatarProps {
    src?: string;
    name: string;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    className?: string;
    isOnline?: boolean;
}

export const Avatar: React.FC<AvatarProps> = ({ src, name, size = 'md', className = '', isOnline }) => {
    const sizes = {
        sm: 'w-8 h-8 text-xs',
        md: 'w-10 h-10 text-sm',
        lg: 'w-12 h-12 text-base',
        xl: 'w-16 h-16 text-xl',
    };

    const initials = name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

    return (
        <div className="relative inline-block">
            {src ? (
                <img
                    src={src}
                    alt={name}
                    className={`${sizes[size]} rounded-full object-cover border-2 border-white shadow-sm ${className}`}
                />
            ) : (
                <div className={`${sizes[size]} rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center border-2 border-white shadow-sm ${className}`}>
                    {initials}
                </div>
            )}
            {isOnline !== undefined && (
                <span className={`absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white ${isOnline ? 'bg-emerald-500' : 'bg-slate-300'}`} />
            )}
        </div>
    );
};
