import React from 'react';
import { useQuestionnaire } from '@/context/QuestionnaireContext';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export const StepOverview: React.FC = () => {
  const { formData, errors, updateField } = useQuestionnaire();
  const data = formData.overview;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-neutral-900">
          Project Overview
        </h2>
        <p className="text-[15px] text-neutral-500 mt-1">
          Provide basic details and describe your business and project scope.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Input
          label="Project Name"
          placeholder="e.g., Acme E-commerce Website"
          value={data.projectName}
          onChange={(e) =>
            updateField('overview', 'projectName', e.target.value)
          }
          error={errors.projectName}
          required
          helperText="The public-facing name or working title of your project."
        />

        <Input
          label="Your Name / Company"
          placeholder="e.g., John Doe / Acme Corp"
          value={data.clientName}
          onChange={(e) =>
            updateField('overview', 'clientName', e.target.value)
          }
          error={errors.clientName}
          required
          helperText="How you or your organization should be identified in the project files."
        />
      </div>

      <Input
        label="Email Address"
        type="email"
        placeholder="e.g., john@acme.com"
        value={data.clientEmail}
        onChange={(e) =>
          updateField('overview', 'clientEmail', e.target.value)
        }
        error={errors.clientEmail}
        required
        helperText="The primary contact email for project queries and updates."
      />

      <Textarea
        label="Describe your business in detail *"
        placeholder="Tell us about your company, industry, products/services, and what makes you unique..."
        value={data.businessDescription}
        onChange={(e) =>
          updateField('overview', 'businessDescription', e.target.value)
        }
        error={errors.businessDescription}
        rows={4}
        required
        helperText="Detail what your company does, your products/services, and target market (minimum 150 characters)."
        showCounter={true}
      />

      <Textarea
        label="What problem does this project solve? *"
        placeholder="Explain the pain point or challenge this project is addressing..."
        value={data.projectProblem}
        onChange={(e) =>
          updateField('overview', 'projectProblem', e.target.value)
        }
        error={errors.projectProblem}
        rows={3}
        required
        helperText="Describe the specific operational issues or client pain points this project resolves."
        showCounter={true}
      />

      <Textarea
        label="Who is the target audience? *"
        placeholder="e.g., Tech-savvy professionals aged 25-40, small business owners..."
        value={data.targetAudience}
        onChange={(e) =>
          updateField('overview', 'targetAudience', e.target.value)
        }
        error={errors.targetAudience}
        rows={3}
        required
        helperText="Define the demographics, roles, and behaviors of your ideal visitors or users."
        showCounter={true}
      />

      <Textarea
        label="Project Goals & Description *"
        placeholder="Provide a general description of the project itself..."
        value={data.projectDescription}
        onChange={(e) =>
          updateField('overview', 'projectDescription', e.target.value)
        }
        error={errors.projectDescription}
        rows={4}
        required
        helperText="A comprehensive summary of the project scope, context, and desired outcomes (minimum 100 characters)."
        showCounter={true}
      />
    </div>
  );
};

export default StepOverview;
