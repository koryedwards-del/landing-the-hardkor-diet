/** Burn & Build Diet PDF payload — questionnaire data + burn-engine calcs (sample + purchased). */

import { computeTodayBodyComposition } from './bodyCompositionData.js';
import { analyzeLeanBodyMass } from './bodyCompositionData.js';
import { eightWeekProjectionFromPackage, exerciseHoursSummary } from './foodPlanPrintout.js';
import { INTAKE_WEIGHTS_RACQUET_SPORTS, INTAKE_WEIGHTS_RACQUET_SPORTS_TITLE } from './intakeQuestionCopyData.js';
import { servingsGridRows } from './servingsPrintout.js';
import { buildWhatsPossible } from './whatsPossiblePrintout.js';
import { lbaTodayTableRows } from './leanBodyAnalysisPrintout.js';
import {
  ANSWERS_CONFIRMATION_INTRO,
  buildAnswersConfirmationRows,
} from './answersConfirmationPrintout.js';
import {
  formatProgramDateLong,
  programClientName,
  programClientNameUpper,
  programPreparedDate,
} from './programClientDataHelpers.js';
import {
  aceBodyFatCategories,
  aceBodyFatWeightRanges,
  aceActiveBodyFatCategory,
} from './sampleDietAceData.js';
import {
  SAMPLE_DIET_CALORIES_TABLE,
  SAMPLE_DIET_CALORIES_TABLE_SUMMARY,
  sampleDietCaloriesTableSummaryHeading,
  SAMPLE_DIET_FOOD_LIST_INTRO,
  SAMPLE_DIET_FOOD_PLAN,
  SAMPLE_DIET_HEADER,
  SAMPLE_DIET_LBA,
  SAMPLE_DIET_LBA_SECTIONS,
  sampleDietLbaWeightRangesHeading,
  SAMPLE_DIET_GETTING_STARTED_HEADING,
  SAMPLE_DIET_GETTING_STARTED_RULES,
  SAMPLE_DIET_HELPFUL_TIPS_BEVERAGES,
  SAMPLE_DIET_HELPFUL_TIPS_HEADING,
  SAMPLE_DIET_HELPFUL_TIPS_SALT,
  SAMPLE_DIET_SERVINGS_NOTE,
  SAMPLE_DIET_SERVINGS_TAGLINE,
  SAMPLE_DIET_WELCOME,
} from './sampleDietPrintoutCopyData.js';
import { buildSampleDayMenu } from './sampleDayMenuPrintoutData.js';
import { buildSampleDietPreviewPackage } from './sampleDietPreviewFixtures.js';

function buildLbmCallout({ gender, heightInches, leanBodyMass, today }) {
  const analysis = analyzeLeanBodyMass({ gender, heightInches, leanBodyMass });
  const leanLbs = today?.leanLbs ?? String(leanBodyMass ?? '—');
  const leanDisplay = String(leanLbs).replace(/\s*lbs\.?$/i, '').trim();
  if (!analysis.desirableLbm) {
    return null;
  }
  const statusLine = analysis.atOrAbove
    ? 'Your LBM is at or above this height-based reference. Review it with Kory against your athletic goals.'
    : 'Your LBM is below this height-based reference. Review it with Kory against your athletic goals.';
  return { leanLbs: leanDisplay, statusLine };
}

function formatLbaBodyFatPercent(value) {
  const raw = String(value ?? '').trim().replace(/%$/, '');
  if (!raw) return '—';
  const n = Number(raw);
  return Number.isFinite(n) ? `${n.toFixed(2)}%` : `${raw}%`;
}

function lbmStatusCopy1982({ heightInches, leanBodyMass, gender }) {
  const analysis = analyzeLeanBodyMass({ gender, heightInches, leanBodyMass });
  if (!analysis.desirableLbm) {
    return { lead: '', congrats: '', alert: '' };
  }
  const lead = `The height-based lean body mass reference is ${Math.round(analysis.desirableLbm)} pounds or more. This is a reference, not your individual goal.`;
  if (analysis.atOrAbove) {
    return {
      lead,
      congrats: `CONGRATULATIONS! Your LBM is at or above the desirable amount. ${SAMPLE_DIET_LBA.congratsSuffix}`,
      alert: '',
    };
  }
  return {
    lead,
    congrats: '',
    alert: `ALERT! Your LBM is below this height-based reference. Review it with Kory against your athletic goals. ${SAMPLE_DIET_LBA.alertSuffix}`,
  };
}

function buildGoalTable(today, projection) {
  if (!today || !projection) return null;
  return {
    rows: [
      {
        label: 'LEAN',
        todayPct: `${today.leanPct}%`,
        todayLbs: `${today.leanLbs} lbs.`,
        goalA: '',
        goalB: `${projection.endLeanPct.toFixed(2)}%`,
        goalC: `${projection.leanLbs.toFixed(1)} lbs.`,
      },
      {
        label: 'FAT',
        todayPct: `${today.fatPct}%`,
        todayLbs: `${today.fatLbs} lbs.`,
        goalA: `-${projection.fatLostLbs.toFixed(1)} lbs. of fat`,
        goalB: `${projection.endBf.toFixed(2)}%`,
        goalC: `${projection.endFatLbs.toFixed(1)} lbs.`,
      },
      {
        label: 'TOTAL',
        todayPct: `${today.totalPct}%`,
        todayLbs: `${today.totalLbs} lbs.`,
        goalA: '',
        goalB: '100.00%',
        goalC: `${projection.endWeight.toFixed(1)} lbs.`,
      },
    ],
  };
}

export function buildSampleDietPrintoutPayload(pkg, options = {}) {
  const intake = pkg?.intake || {};
  const gender = String(intake.sex || '').toLowerCase().startsWith('f') ? 'female' : 'male';
  const today = computeTodayBodyComposition(intake);
  const projection = eightWeekProjectionFromPackage(pkg);
  const hours = exerciseHoursSummary(intake);
  const lbmCopy = lbmStatusCopy1982({
    gender,
    heightInches: intake.heightInches,
    leanBodyMass: intake.leanBodyMass,
  });
  const fatLost = projection ? projection.fatLostLbs.toFixed(1) : '—';
  const exerciseParagraph = `You indicated you intend to do ${hours.wt} hours lifting, ${hours.cardio} hours pushing hard outside of lifting, and ${hours.fatBurn} hours just cruising each week.`;

  const weeklyLine = 'The chart shows a fat-loss projection based on your information. It does not mean you need to reach that weight or body-fat percentage. We will discuss how these numbers relate to your goals.\n\nMuscle gain depends on the balance of training, food and recovery, so it is less predictable than fat loss. We will track your progress through changes in strength, training energy and body composition.';

  const activeBfCategory = aceActiveBodyFatCategory(gender, intake.fatPercent);

  return {
    view: 'samplediet',
    title: `B&B Sample Diet - ${programClientName(pkg)}`,
    clientName: programClientNameUpper(pkg),
    preparedAt: programPreparedDate(pkg),
    preparedDate: programPreparedDate(pkg),
    preparedDateLong: formatProgramDateLong(programPreparedDate(pkg)),
    header: { ...SAMPLE_DIET_HEADER },
    welcome: { ...SAMPLE_DIET_WELCOME },
    whatsPossible: buildWhatsPossible(intake),
    leanBodyAnalysis: {
      sections: { ...SAMPLE_DIET_LBA_SECTIONS },
      todayRows: lbaTodayTableRows(today),
      bodyFatPercent: formatLbaBodyFatPercent(today?.fatPct ?? intake.fatPercent),
      activeBfCategoryKey: activeBfCategory.key,
      activeBfCategoryLabel: activeBfCategory.label,
      bfRangeCategories: aceBodyFatCategories(gender),
      bfRangeWeightRanges: aceBodyFatWeightRanges(gender, intake.leanBodyMass),
      weightRangesHeading: sampleDietLbaWeightRangesHeading(today?.leanLbs ?? intake.leanBodyMass),
      aceLead: SAMPLE_DIET_LBA.aceLead,
      lbmLead: lbmCopy.lead,
      lbmCallout: buildLbmCallout({
        gender,
        heightInches: intake.heightInches,
        leanBodyMass: intake.leanBodyMass,
        today,
      }),
      lbmWhy: {
        heading: SAMPLE_DIET_LBA.lbmWhyHeading,
        lead: SAMPLE_DIET_LBA.lbmWhyLead,
        punchline: SAMPLE_DIET_LBA.lbmWhyPunchline,
        closing: SAMPLE_DIET_LBA.lbmWhyClosing,
      },
      recheckProgress: {
        heading: SAMPLE_DIET_LBA.lbaRecheckHeading,
        body: SAMPLE_DIET_LBA.lbaRecheckBody,
      },
    },
    foodPlan: {
      lead: SAMPLE_DIET_FOOD_PLAN.lead,
      exerciseParagraph,
      weeklyLine,
      goalTable: buildGoalTable(today, projection),
      caloriesTableSummary: {
        heading: projection
          ? sampleDietCaloriesTableSummaryHeading(projection.fatLostLbs)
          : SAMPLE_DIET_CALORIES_TABLE_SUMMARY.heading,
        body: SAMPLE_DIET_CALORIES_TABLE_SUMMARY.body,
      },
      caloriesTable: {
        columns: SAMPLE_DIET_CALORIES_TABLE.columns.map((col) => ({ ...col })),
        rows: SAMPLE_DIET_CALORIES_TABLE.rows.map((row) => ({ ...row })),
      },
    },
    servings: {
      tagline: SAMPLE_DIET_SERVINGS_TAGLINE,
      note: SAMPLE_DIET_SERVINGS_NOTE,
      gridRows: servingsGridRows(pkg),
      planServings: pkg?.plan?.servings ? { ...pkg.plan.servings } : null,
      gettingStarted: {
        heading: SAMPLE_DIET_GETTING_STARTED_HEADING,
        rules: [...SAMPLE_DIET_GETTING_STARTED_RULES],
      },
      helpfulTips: {
        heading: SAMPLE_DIET_HELPFUL_TIPS_HEADING,
        items: [SAMPLE_DIET_HELPFUL_TIPS_SALT, SAMPLE_DIET_HELPFUL_TIPS_BEVERAGES],
      },
    },
    foodList: {
      intro: SAMPLE_DIET_FOOD_LIST_INTRO,
    },
    sampleDayMenu: buildSampleDayMenu(pkg, { filled: true }),
    answersConfirmation: {
      intro: ANSWERS_CONFIRMATION_INTRO,
      rows: buildAnswersConfirmationRows(pkg),
    },
  };
}

export function buildSampleDietPreviewPayload() {
  const pkg = buildSampleDietPreviewPackage();
  return buildSampleDietPrintoutPayload(pkg);
}
