'use client';

import { TextareaHTMLAttributes, forwardRef } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  characterCount?: number;
  minCharacters?: number;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, characterCount, minCharacters, className = '', ...props }, ref) => {
    const showCount = characterCount !== undefined;
    const isMinMet = minCharacters ? (characterCount || 0) >= minCharacters : true;

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium mb-2 text-foreground">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={`
            w-full px-4 py-3 rounded-lg
            bg-card border border-border
            text-foreground placeholder:text-muted-foreground
            focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent
            transition-all duration-200
            resize-none
            ${error ? 'border-red-500 focus:ring-red-500' : ''}
            ${className}
          `}
          {...props}
        />
        <div className="mt-1 flex items-center justify-between">
          {error && <p className="text-sm text-red-500">{error}</p>}
          {showCount && (
            <p className={`text-sm ml-auto ${isMinMet ? 'text-muted-foreground' : 'text-amber-500'}`}>
              {characterCount} {minCharacters ? `/ ${minCharacters} characters` : 'characters'}
            </p>
          )}
        </div>
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export default Textarea;
