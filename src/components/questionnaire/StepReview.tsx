import React from 'react';
import { useQuestionnaire } from '@/context/QuestionnaireContext';
import { Edit2, User, Globe, Paintbrush, DollarSign } from 'lucide-react';

// ─── Helper sub-components ───

const SectionHeader = ({
  icon: Icon,
  label,
  onEdit,
}: {
  icon: React.FC<{ className?: string }>;
  label: string;
  onEdit: () => void;
}) => (
  <div className="flex items-center justify-between mb-4">
    <div className="flex items-center gap-2 text-[12px] font-semibold text-neutral-400 uppercase tracking-wider">
      <Icon className="h-3.5 w-3.5" />
      <span>{label}</span>
    </div>
    <button
      type="button"
      onClick={onEdit}
      className="p-1.5 rounded-lg hover:bg-neutral-100 text-neutral-400 hover:text-neutral-700 transition-all outline-none"
    >
      <Edit2 className="h-3.5 w-3.5" />
    </button>
  </div>
);

const Field = ({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) => (
  <div>
    <div className="text-[11px] text-neutral-400 mb-0.5">{label}</div>
    <div className="text-[14px] text-neutral-800 font-medium">{value}</div>
  </div>
);

// ─── Label helpers ───

const getPlatformLabel = (p: string) =>
  ({ nextjs: 'Next.js / React App', wordpress: 'WordPress', shopify: 'Shopify', custom: 'Custom Platform' }[p] || p || '—');

const getTrafficLabel = (t: string) =>
  ({ 'under-10k': 'Under 10,000 / month', '10k-100k': '10,000 – 100,000 / month', '100k-1m': '100,000 – 1,000,000 / month', 'over-1m': 'Over 1,000,000 / month', unsure: 'Not sure yet' }[t] || t || '—');

const getStyleLabel = (s: string) =>
  ({ minimalist: 'Clean & Minimalist', colorful: 'Vibrant & Playful', corporate: 'Sleek & Professional', bold: 'Modern & Bold' }[s] || s || '—');

const getBudgetLabel = (b: string) =>
  ({ 'under-5k': 'Under $5k', '5k-15k': '$5k–$15k', '15k-30k': '$15k–$30k', 'over-30k': '$30k+' }[b] || b || '—');

const getTimelineLabel = (t: string) =>
  ({ '1-month': 'Within 1 month', '1-3-months': '1–3 months', '3-6-months': '3–6 months', flexible: 'Flexible' }[t] || t || '—');

const getContentLabel = (c: string) =>
  ({ client: 'Client Provided', developer: 'Developer Authored', collab: 'Collaborative' }[c] || c || '—');

const getFeatureLabel = (f: string) =>
  ({ auth: 'Authentication', payments: 'Payments & Checkout', cms: 'CMS / Content Management', integrations: 'Third-party APIs', search: 'Advanced Search', analytics: 'Analytics Dashboard', multilingual: 'Multi-language', realtime: 'Real-time Features' }[f] || f);

// ─── Component ───

export const StepReview: React.FC = () => {
  const { formData, goToStep } = useQuestionnaire();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-neutral-900">
          Review Your Brief
        </h2>
        <p className="text-[15px] text-neutral-500 mt-1">
          Double-check your responses before generating the project brief.
        </p>
      </div>

      {/* Overview */}
      <div className="border border-neutral-100 bg-neutral-50/50 rounded-xl p-5">
        <SectionHeader icon={User} label="1. Project Overview & Business" onEdit={() => goToStep(1)} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Project Name" value={formData.overview.projectName} />
          <Field
            label="Client Contact"
            value={`${formData.overview.clientName} (${formData.overview.clientEmail})`}
          />
          <div className="md:col-span-2">
            <Field
              label="Business Description"
              value={
                <p className="text-[13px] text-neutral-600 leading-relaxed whitespace-pre-line font-normal">
                  {formData.overview.businessDescription}
                </p>
              }
            />
          </div>
          <div className="md:col-span-2">
            <Field
              label="What problem does this project solve?"
              value={
                <p className="text-[13px] text-neutral-600 leading-relaxed whitespace-pre-line font-normal">
                  {formData.overview.projectProblem}
                </p>
              }
            />
          </div>
          <div className="md:col-span-2">
            <Field
              label="Who is the target audience?"
              value={
                <p className="text-[13px] text-neutral-600 leading-relaxed whitespace-pre-line font-normal">
                  {formData.overview.targetAudience}
                </p>
              }
            />
          </div>
          <div className="md:col-span-2">
            <Field
              label="Project Description"
              value={
                <p className="text-[13px] text-neutral-600 leading-relaxed whitespace-pre-line font-normal">
                  {formData.overview.projectDescription}
                </p>
              }
            />
          </div>
        </div>
      </div>

      {/* Technical */}
      <div className="border border-neutral-100 bg-neutral-50/50 rounded-xl p-5">
        <SectionHeader icon={Globe} label="2. Goals, Pages & Features" onEdit={() => goToStep(2)} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <Field
              label="Primary Goal"
              value={
                <p className="text-[13px] text-neutral-600 leading-relaxed whitespace-pre-line font-normal">
                  {formData.technical.primaryGoal}
                </p>
              }
            />
          </div>
          <div className="md:col-span-2">
            <Field
              label="Primary Action visitors should take"
              value={
                <p className="text-[13px] text-neutral-600 leading-relaxed whitespace-pre-line font-normal">
                  {formData.technical.visitorAction}
                </p>
              }
            />
          </div>
          <div className="md:col-span-2">
            <Field
              label="Requested Pages"
              value={
                <p className="text-[13px] text-neutral-600 leading-relaxed whitespace-pre-line font-normal">
                  {formData.technical.neededPages}
                </p>
              }
            />
          </div>
          <div className="md:col-span-2">
            <Field
              label="Custom Features List"
              value={
                <p className="text-[13px] text-neutral-600 leading-relaxed whitespace-pre-line font-normal">
                  {formData.technical.importantFeatures}
                </p>
              }
            />
          </div>
          <Field label="Platform Preference" value={getPlatformLabel(formData.technical.platform)} />
          <Field label="Expected Traffic" value={getTrafficLabel(formData.technical.traffic)} />
          <div className="md:col-span-2">
            <div className="text-[11px] text-neutral-400 mb-1.5">Core Checklist Features</div>
            <div className="flex flex-wrap gap-1.5">
              {formData.technical.features.length > 0 ? (
                formData.technical.features.map((f) => (
                  <span
                    key={f}
                    className="text-[11px] font-medium px-2.5 py-1 bg-white text-neutral-600 border border-neutral-200 rounded-md"
                  >
                    {getFeatureLabel(f)}
                  </span>
                ))
              ) : (
                <span className="text-[11px] text-neutral-400 italic">None selected</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Design */}
      <div className="border border-neutral-100 bg-neutral-50/50 rounded-xl p-5">
        <SectionHeader icon={Paintbrush} label="3. Design & Inspiration" onEdit={() => goToStep(3)} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Style" value={getStyleLabel(formData.design.style)} />
          <Field
            label="Brand Guidelines"
            value={formData.design.hasGuidelines ? 'Yes – guidelines exist' : 'No – guidelines need to be created'}
          />
          <div className="md:col-span-2">
            <Field
              label="Competitors or Inspiration"
              value={
                <p className="text-[13px] text-neutral-600 leading-relaxed font-normal">
                  {formData.design.competitors}
                </p>
              }
            />
          </div>
          <div className="md:col-span-2">
            <Field
              label="Liked Websites & Design Elements"
              value={
                <p className="text-[13px] text-neutral-600 leading-relaxed font-normal">
                  {formData.design.likedWebsites}
                </p>
              }
            />
          </div>
        </div>
      </div>

      {/* Scope */}
      <div className="border border-neutral-100 bg-neutral-50/50 rounded-xl p-5">
        <SectionHeader icon={DollarSign} label="4. Budget & Scope" onEdit={() => goToStep(4)} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Field label="Budget" value={getBudgetLabel(formData.scope.budget)} />
          <Field label="Timeline" value={getTimelineLabel(formData.scope.timeline)} />
          <Field label="Content Provider" value={getContentLabel(formData.scope.contentProvider)} />
          {formData.scope.notes && (
            <div className="md:col-span-3">
              <Field
                label="Additional Notes"
                value={
                  <p className="text-[13px] text-neutral-600 leading-relaxed font-normal">
                    {formData.scope.notes}
                  </p>
                }
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StepReview;
