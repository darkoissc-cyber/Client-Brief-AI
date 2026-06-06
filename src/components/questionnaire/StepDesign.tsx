import React from 'react';
import { useQuestionnaire } from '@/context/QuestionnaireContext';
import { Textarea } from '@/components/ui/textarea';
import { Layers, Palette, ShieldCheck, Sparkles } from 'lucide-react';

const visualStyles = [
  {
    id: 'minimalist',
    name: 'Clean & Minimalist',
    desc: 'Typography-focused, breathing space, subtle contrasts.',
    icon: Layers,
  },
  {
    id: 'colorful',
    name: 'Vibrant & Playful',
    desc: 'Bold palettes, gradients, interactive animations.',
    icon: Palette,
  },
  {
    id: 'corporate',
    name: 'Sleek & Professional',
    desc: 'Clean layout, trusted structure, business aesthetics.',
    icon: ShieldCheck,
  },
  {
    id: 'bold',
    name: 'Modern & Bold',
    desc: 'High contrast, dark tones, contemporary feel.',
    icon: Sparkles,
  },
];

export const StepDesign: React.FC = () => {
  const { formData, errors, updateField } = useQuestionnaire();
  const data = formData.design;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-neutral-900">
          Design & Branding
        </h2>
        <p className="text-[15px] text-neutral-500 mt-1">
          Visual direction, brand guidelines, and websites inspiration.
        </p>
      </div>

      {/* Visual Style */}
      <div className="space-y-3">
        <div>
          <label className="text-[13px] font-medium text-neutral-700 block">
            Visual Style Preference *
          </label>
          <span className="text-[12px] text-neutral-400 block -mt-0.5">
            Select the aesthetic direction that fits your company&apos;s identity.
          </span>
        </div>
        {errors.style && (
          <span className="text-[13px] text-red-500 block -mt-1 font-medium">
            {errors.style}
          </span>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {visualStyles.map((style) => {
            const Icon = style.icon;
            const selected = data.style === style.id;
            return (
              <button
                key={style.id}
                type="button"
                onClick={() => updateField('design', 'style', style.id)}
                className={`flex items-start gap-3.5 p-4 rounded-xl border text-left transition-all duration-200 outline-none ${
                  selected
                    ? 'border-neutral-900 bg-neutral-50'
                    : 'border-neutral-200 bg-white hover:border-neutral-300'
                }`}
              >
                <div
                  className={`p-2 rounded-lg ${
                    selected
                      ? 'bg-neutral-900 text-white'
                      : 'bg-neutral-100 text-neutral-500'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <div className="font-medium text-[13px] text-neutral-900">
                    {style.name}
                  </div>
                  <div className="text-[12px] text-neutral-400 mt-0.5">
                    {style.desc}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Brand Guidelines */}
      <div className="space-y-3">
        <div>
          <label className="text-[13px] font-medium text-neutral-700 block">
            Do you have existing brand guidelines? *
          </label>
          <span className="text-[12px] text-neutral-400 block -mt-0.5">
            Indicate if you have existing brand books, colors, typography, or logo files.
          </span>
        </div>
        {errors.hasGuidelines && (
          <span className="text-[13px] text-red-500 block -mt-1 font-medium">
            {errors.hasGuidelines}
          </span>
        )}
        <div className="flex flex-col md:flex-row gap-3">
          {[
            { label: 'Yes, we have guidelines', value: true },
            { label: 'No, we need to create them', value: false },
          ].map((opt) => {
            const selected = data.hasGuidelines === opt.value;
            return (
              <button
                key={opt.value.toString()}
                type="button"
                onClick={() =>
                  updateField('design', 'hasGuidelines', opt.value)
                }
                className={`flex-1 px-4 py-3 rounded-xl border text-center transition-all duration-200 outline-none text-[13px] font-medium ${
                  selected
                    ? 'border-neutral-900 bg-neutral-50 text-neutral-900'
                    : 'border-neutral-200 bg-white hover:border-neutral-300 text-neutral-500'
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Competitors */}
      <Textarea
        label="Competitor Websites or Inspiration *"
        placeholder="List 2-3 website links or competitor names..."
        value={data.competitors}
        onChange={(e) =>
          updateField('design', 'competitors', e.target.value)
        }
        error={errors.competitors}
        rows={4}
        required
        helperText="Enter competitor websites or direct industry inspirations to check out."
        showCounter={true}
      />

      {/* Liked Websites */}
      <Textarea
        label="Share 2-3 websites you like * (with links and why)"
        placeholder="e.g., https://apple.com (love the clean layout and smooth typography)&#10;https://stripe.com (amazing visual gradients and clean docs style)"
        value={data.likedWebsites}
        onChange={(e) =>
          updateField('design', 'likedWebsites', e.target.value)
        }
        error={errors.likedWebsites}
        rows={4}
        required
        helperText="Share links to any website you admire design-wise and explain what specific elements you want to emulate."
        showCounter={true}
      />
    </div>
  );
};

export default StepDesign;
