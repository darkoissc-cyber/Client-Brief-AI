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
          <label className="text-[13px] font-medium text-[var(--form-label)]">
            {label}
          </label>
        )}
        <select
          ref={ref}
          className={`
            form-field glow-on-focus w-full rounded-xl px-4 py-3 text-[15px] appearance-none
            ${error ? 'form-field--error' : ''}
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
