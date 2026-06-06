import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  showCounter?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', label, error, helperText, showCounter, type = 'text', ...props }, ref) => {
    const charCount = String(props.value || '').length;
    return (
      <div className="w-full flex flex-col gap-2">
        {label && (
          <label className="text-[13px] font-medium text-neutral-700">
            {label}
          </label>
        )}
        <input
          type={type}
          ref={ref}
          className={`
            w-full bg-white border rounded-xl px-4 py-3 text-[15px] text-neutral-900 placeholder-neutral-400
            transition-all duration-200 outline-none
            focus:ring-2 focus:ring-neutral-900/5 focus:border-neutral-400
            ${error ? 'border-red-300 focus:border-red-400 focus:ring-red-100' : 'border-neutral-200 hover:border-neutral-300'}
            ${className}
          `}
          {...props}
        />
        <div className="flex justify-between items-start gap-4">
          <div className="flex flex-col gap-1">
            {helperText && !error && (
              <span className="text-[12px] text-neutral-400">
                {helperText}
              </span>
            )}
            {error && (
              <span className="text-[13px] text-red-500 font-medium">
                {error}
              </span>
            )}
          </div>
          {showCounter && (
            <span className="text-[12px] text-neutral-400 font-mono shrink-0">
              {charCount} characters
            </span>
          )}
        </div>
      </div>
    );
  }
);

Input.displayName = 'Input';
