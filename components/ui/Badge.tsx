import React from 'react';
import { Leaf, Flame } from 'lucide-react';

interface BadgeProps {
  type: 'vegetarian' | 'halal' | 'spicy' | 'new';
  className?: string;
  showIcon?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({ type, className = '', showIcon = true }) => {
  const configs = {
    vegetarian: {
      bg: 'bg-green-100',
      text: 'text-green-700',
      icon: <Leaf size={10} className="mr-1" />,
      label: 'Végé'
    },
    halal: {
      bg: 'bg-amber-100',
      text: 'text-amber-700',
      icon: null,
      label: 'Halal'
    },
    spicy: {
      bg: 'bg-red-100',
      text: 'text-red-700',
      icon: <Flame size={10} className="mr-1" />,
      label: 'Épicé'
    },
    new: {
      bg: 'bg-blue-100',
      text: 'text-blue-700',
      icon: null,
      label: 'Nouveau'
    }
  };

  const config = configs[type];

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide ${config.bg} ${config.text} ${className}`}>
      {showIcon && config.icon}
      {config.label}
    </span>
  );
};