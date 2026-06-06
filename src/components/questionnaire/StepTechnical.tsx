import React from 'react';
import { useQuestionnaire } from '@/context/QuestionnaireContext';
import { Textarea } from '@/components/ui/textarea';
import {
  Code,
  Globe,
  ShoppingBag,
  Laptop,
  Shield,
  CreditCard,
  PenTool,
  Database,
  Search,
  Activity,
  Languages,
  Zap,
} from 'lucide-react';

const platforms = [
  {
    id: 'nextjs',
    name: 'Next.js / React',
    desc: 'Modern web app with SSR & performance',
    icon: Code,
  },
  {
    id: 'wordpress',
    name: 'WordPress',
    desc: 'Traditional content & blogging',
    icon: Globe,
  },
  {
    id: 'shopify',
    name: 'Shopify',
    desc: 'Dedicated e-commerce store',
    icon: ShoppingBag,
  },
  {
    id: 'custom',
    name: 'Custom Platform',
    desc: 'Custom backend / API stack',
    icon: Laptop,
  },
];

const featuresList = [
  { id: 'auth', label: 'User Authentication', icon: Shield },
  { id: 'payments', label: 'Payments & Checkout', icon: CreditCard },
  { id: 'cms', label: 'Content Management', icon: PenTool },
  { id: 'integrations', label: 'Third-party APIs', icon: Database },
  { id: 'search', label: 'Advanced Search', icon: Search },
  { id: 'analytics', label: 'Analytics Dashboard', icon: Activity },
  { id: 'multilingual', label: 'Multi-language', icon: Languages },
  { id: 'realtime', label: 'Real-time Features', icon: Zap },
];

const trafficOptions = [
  { label: 'Under 10,000 / month', value: 'under-10k' },
  { label: '10k – 100k / month', value: '10k-100k' },
  { label: '100k – 1M / month', value: '100k-1m' },
  { label: 'Over 1M / month', value: 'over-1m' },
  { label: 'Not sure yet', value: 'unsure' },
];

export const StepTechnical: React.FC = () => {
  const { formData, errors, updateField } = useQuestionnaire();
  const data = formData.technical;

  const handleFeatureToggle = (featureId: string) => {
    const isSelected = data.features.includes(featureId);
    const nextFeatures = isSelected
      ? data.features.filter((id) => id !== featureId)
      : [...data.features, featureId];
    updateField('technical', 'features', nextFeatures);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-neutral-900">
          Project Goals & Capabilities
        </h2>
        <p className="text-[15px] text-neutral-500 mt-1">
          Define your application goals, features list, and technical setup.
        </p>
      </div>

      {/* Goal & Action */}
      <Textarea
        label="What is the primary goal of the website/app? *"
        placeholder="e.g., To allow online users to purchase handmade goods directly from our store..."
        value={data.primaryGoal}
        onChange={(e) =>
          updateField('technical', 'primaryGoal', e.target.value)
        }
        error={errors.primaryGoal}
        rows={3}
        required
        helperText="State what success looks like for the website (e.g., generate sales, get leads, build trust)."
        showCounter={true}
      />

      <Textarea
        label="What action should visitors take? *"
        placeholder="e.g., Click the 'Buy Now' button, sign up for a newsletter, or fill out a quote request..."
        value={data.visitorAction}
        onChange={(e) =>
          updateField('technical', 'visitorAction', e.target.value)
        }
        error={errors.visitorAction}
        rows={3}
        required
        helperText="Specify the primary action or CTA you want visitors to perform."
        showCounter={true}
      />

      {/* Pages & Features */}
      <Textarea
        label="List the pages you need * (one per line)"
        placeholder="Home&#10;About Us&#10;Services&#10;Contact"
        value={data.neededPages}
        onChange={(e) =>
          updateField('technical', 'neededPages', e.target.value)
        }
        error={errors.neededPages}
        rows={4}
        required
        helperText="List all the main pages and any secondary pages you want on the website."
        showCounter={true}
      />

      <Textarea
        label="List the most important features * (one per line)"
        placeholder="User signup and email validation&#10;Product search filtering by price&#10;Credit card payments with receipt email"
        value={data.importantFeatures}
        onChange={(e) =>
          updateField('technical', 'importantFeatures', e.target.value)
        }
        error={errors.importantFeatures}
        rows={4}
        required
        helperText="Explain the specific user features and integrations needed for this project."
        showCounter={true}
      />

      {/* Platform */}
      <div className="space-y-3">
        <div>
          <label className="text-[13px] font-medium text-neutral-700 block">
            Preferred Platform *
          </label>
          <span className="text-[12px] text-neutral-400 block -mt-0.5">
            Select the web architecture or platform best suited for your system.
          </span>
        </div>
        {errors.platform && (
          <span className="text-[13px] text-red-500 block -mt-1 font-medium">
            {errors.platform}
          </span>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {platforms.map((p) => {
            const Icon = p.icon;
            const selected = data.platform === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => updateField('technical', 'platform', p.id)}
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
                    {p.name}
                  </div>
                  <div className="text-[12px] text-neutral-400 mt-0.5">
                    {p.desc}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Features Checklist */}
      <div className="space-y-3">
        <div>
          <label className="text-[13px] font-medium text-neutral-700 block">
            Core Features Checklist *
          </label>
          <span className="text-[12px] text-neutral-400 block -mt-0.5">
            Select all standard checklist features that your project must include.
          </span>
          {errors.features && (
            <span className="text-[13px] text-red-500 block mt-1 font-medium">
              {errors.features}
            </span>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {featuresList.map((feat) => {
            const Icon = feat.icon;
            const selected = data.features.includes(feat.id);
            return (
              <button
                key={feat.id}
                type="button"
                onClick={() => handleFeatureToggle(feat.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition-all duration-200 outline-none ${
                  selected
                    ? 'border-neutral-900 bg-neutral-50'
                    : 'border-neutral-200 bg-white hover:border-neutral-300'
                }`}
              >
                <Icon
                  className={`h-4 w-4 shrink-0 ${
                    selected ? 'text-neutral-900' : 'text-neutral-400'
                  }`}
                />
                <span
                  className={`text-[13px] font-medium flex-1 ${
                    selected ? 'text-neutral-900' : 'text-neutral-600'
                  }`}
                >
                  {feat.label}
                </span>
                <div
                  className={`h-4 w-4 rounded border flex items-center justify-center transition-all ${
                    selected
                      ? 'bg-neutral-900 border-neutral-900 text-white'
                      : 'border-neutral-300 bg-white'
                  }`}
                >
                  {selected && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-2.5 w-2.5"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Traffic */}
      <div className="space-y-3">
        <div>
          <label className="text-[13px] font-medium text-neutral-700 block">
            Expected Monthly Traffic *
          </label>
          <span className="text-[12px] text-neutral-400 block -mt-0.5">
            Help us estimate scaling and backend infrastructure capacity.
          </span>
        </div>
        {errors.traffic && (
          <span className="text-[13px] text-red-500 block -mt-1 font-medium">
            {errors.traffic}
          </span>
        )}
        <div className="space-y-2">
          {trafficOptions.map((opt) => {
            const selected = data.traffic === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() =>
                  updateField('technical', 'traffic', opt.value)
                }
                className={`w-full px-4 py-3 rounded-xl border text-left transition-all duration-200 outline-none text-[13px] font-medium ${
                  selected
                    ? 'border-neutral-900 bg-neutral-50 text-neutral-900'
                    : 'border-neutral-200 bg-white hover:border-neutral-300 text-neutral-600'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{opt.label}</span>
                  <div
                    className={`h-4 w-4 rounded-full border-2 flex items-center justify-center transition-all ${
                      selected
                        ? 'border-neutral-900'
                        : 'border-neutral-300'
                    }`}
                  >
                    {selected && (
                      <div className="h-2 w-2 rounded-full bg-neutral-900" />
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StepTechnical;
