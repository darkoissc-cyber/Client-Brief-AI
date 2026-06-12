import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  showCounter?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = '', label, error, helperText, showCounter, rows = 4, ...props }, ref) => {
    const charCount = String(props.value || '').length;

    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label className="text-[13px] font-semibold text-neutral-800 leading-none">
            {label}
          </label>
        )}

        <textarea
          ref={ref}
          rows={rows}
          className={[
            'w-full rounded-xl px-4 py-3 text-[14px] text-neutral-900 resize-none',
            'bg-neutral-50/80 border transition-[border-color,box-shadow,background-color] duration-200',
            'shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)]',
            'placeholder:text-neutral-400',
            'focus:bg-white',
            error
              ? 'border-red-400 focus:border-red-500 focus:ring-3 focus:ring-red-100 outline-none'
              : 'border-neutral-300 hover:border-neutral-400 focus:border-neutral-900 focus:ring-3 focus:ring-neutral-900/8 outline-none',
            className,
          ].join(' ')}
          {...props}
        />

        {/* Helper row — helper text left, counter right, no overlap */}
        <div className="flex items-start justify-between gap-4 min-h-[18px]">
          <div className="flex-1">
            {error ? (
              <span className="text-[12px] text-red-600 font-medium leading-snug">
                {error}
              </span>
            ) : helperText ? (
              <span className="text-[12px] text-neutral-500 leading-snug">
                {helperText}
              </span>
            ) : null}
          </div>

          {showCounter && (
            <span className="text-[11px] text-neutral-400 font-mono shrink-0 tabular-nums">
              {charCount} chars
            </span>
          )}
        </div>
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
