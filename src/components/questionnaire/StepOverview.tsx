import React from 'react';
import { useQuestionnaire } from '@/context/QuestionnaireContext';
import { useLanguage } from '@/context/LanguageContext';
import { translations, translateValidationError } from '@/lib/translations';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export const StepOverview: React.FC = () => {
  const { formData, errors, updateField } = useQuestionnaire();
  const { language } = useLanguage();
  const t = translations[language];
  const o = t.questionnaire.overview;
  const data = formData.overview;

  return (
    <div className="space-y-6 text-start">
      <div>
        <h2 className="text-xl font-semibold text-[var(--form-text)]">
          {o.title}
        </h2>
        <p className="text-[15px] text-[var(--form-text-muted)] mt-1">
          {o.desc}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Input
          label={o.fields.projName}
          placeholder={o.fields.projNamePlaceholder}
          value={data.projectName}
          onChange={(e) =>
            updateField('overview', 'projectName', e.target.value)
          }
          error={errors.projectName && translateValidationError(errors.projectName, language)}
          required
          helperText={o.fields.projNameHelper}
        />

        <Input
          label={o.fields.clientName}
          placeholder={o.fields.clientNamePlaceholder}
          value={data.clientName}
          onChange={(e) =>
            updateField('overview', 'clientName', e.target.value)
          }
          error={errors.clientName && translateValidationError(errors.clientName, language)}
          required
          helperText={o.fields.clientNameHelper}
        />
      </div>

      <Input
        label={o.fields.email}
        type="email"
        placeholder={o.fields.emailPlaceholder}
        value={data.clientEmail}
        onChange={(e) =>
          updateField('overview', 'clientEmail', e.target.value)
        }
        error={errors.clientEmail && translateValidationError(errors.clientEmail, language)}
        required
        helperText={o.fields.emailHelper}
      />

      <Textarea
        label={o.fields.bizDesc}
        placeholder={o.fields.bizDescPlaceholder}
        value={data.businessDescription}
        onChange={(e) =>
          updateField('overview', 'businessDescription', e.target.value)
        }
        error={errors.businessDescription && translateValidationError(errors.businessDescription, language)}
        rows={4}
        required
        helperText={o.fields.bizDescHelper}
        showCounter={true}
      />

      <Textarea
        label={o.fields.problem}
        placeholder={o.fields.problemPlaceholder}
        value={data.projectProblem}
        onChange={(e) =>
          updateField('overview', 'projectProblem', e.target.value)
        }
        error={errors.projectProblem && translateValidationError(errors.projectProblem, language)}
        rows={3}
        required
        helperText={o.fields.problemHelper}
        showCounter={true}
      />

      <Textarea
        label={o.fields.audience}
        placeholder={o.fields.audiencePlaceholder}
        value={data.targetAudience}
        onChange={(e) =>
          updateField('overview', 'targetAudience', e.target.value)
        }
        error={errors.targetAudience && translateValidationError(errors.targetAudience, language)}
        rows={3}
        required
        helperText={o.fields.audienceHelper}
        showCounter={true}
      />

      <Textarea
        label={o.fields.goals}
        placeholder={o.fields.goalsPlaceholder}
        value={data.projectDescription}
        onChange={(e) =>
          updateField('overview', 'projectDescription', e.target.value)
        }
        error={errors.projectDescription && translateValidationError(errors.projectDescription, language)}
        rows={4}
        required
        helperText={o.fields.goalsHelper}
        showCounter={true}
      />
    </div>
  );
};

export default StepOverview;

