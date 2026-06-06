import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { label: string; value: string }[];
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className = '', label, error, options, ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-2">
        {label && (
          <label className="text-[13px] font-medium text-neutral-700">
            {label}
          </label>
        )}
        <select
          ref={ref}
          className={`
            w-full bg-white border rounded-xl px-4 py-3 text-[15px] text-neutral-900 placeholder-neutral-400
            transition-all duration-200 outline-none appearance-none
            focus:ring-2 focus:ring-neutral-900/5 focus:border-neutral-400
            ${error ? 'border-red-300 focus:border-red-400 focus:ring-red-100' : 'border-neutral-200 hover:border-neutral-300'}
            ${className}
          `}
          {...props}
        >
          <option value="" disabled className="text-neutral-400">
            Select an option...
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <span className="text-[13px] text-red-500 font-medium">
            {error}
          </span>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
