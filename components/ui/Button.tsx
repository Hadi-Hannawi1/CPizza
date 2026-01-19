import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'white' | 'gold';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  isLoading, 
  className = '', 
  disabled,
  fullWidth = false,
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center font-heading uppercase tracking-wider font-bold transition-all duration-300 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-[0.98] shadow-lg";
  
  const variants = {
    primary: "bg-[#E31837] text-white hover:bg-[#C51530] shadow-red-500/20",
    gold: "bg-gold text-black hover:bg-gold-hover shadow-orange-400/30",
    secondary: "bg-[#121212] text-white hover:bg-black shadow-gray-900/30",
    outline: "border-2 border-[#E31837] text-[#E31837] hover:bg-[#E31837] hover:text-white bg-transparent",
    ghost: "bg-transparent text-gray-700 hover:bg-gray-100 shadow-none",
    white: "bg-white text-gray-900 hover:bg-gray-100 shadow-gray-200/50"
  };

  const sizes = {
    sm: "px-5 py-2 text-xs",
    md: "px-7 py-3 text-sm",
    lg: "px-9 py-4 text-base",
    xl: "px-12 py-5 text-lg"
  };

  return (
    <button 
      className={`
        ${baseStyles} 
        ${variants[variant]} 
        ${sizes[size]} 
        ${fullWidth ? 'w-full' : ''} 
        ${className}
      `}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : null}
      {children}
    </button>
  );
};