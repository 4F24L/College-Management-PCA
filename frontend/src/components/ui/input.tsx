import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  as?: 'input' | 'select';
  children?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({ label, as = 'input', children, className = '', ...rest }) => {
  const base = 'border border-slate-200 dark:border-slate-700 rounded-md px-3 py-2 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-400';

  return (
    <label className="flex flex-col">
      {label && <span className="text-sm font-medium mb-1">{label}</span>}
      {as === 'select' ? (
        <select className={`${base} ${className}`} {...(rest as any)}>
          {children}
        </select>
      ) : (
        <input className={`${base} ${className}`} {...(rest)} />
      )}
    </label>
  );
};

export default Input;

