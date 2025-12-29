import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    hover?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', onClick, hover = true }) => {
    return (
        <div
            onClick={onClick}
            className={`
        bg-white rounded-2xl border border-slate-200 p-6
        transition-all duration-300
        ${hover ? 'hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 cursor-pointer' : ''}
        ${className}
      `}
        >
            {children}
        </div>
    );
};
