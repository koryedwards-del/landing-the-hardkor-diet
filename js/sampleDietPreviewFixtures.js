/** Public athlete sample; kept separate from the calculation regression fixtures. */

import { buildProgramPackage } from './programPackageData.js';

export const SAMPLE_DIET_PREVIEW_FORM = Object.freeze({
  preferredName: 'Sample Athlete',
  email: 'athlete@example.com',
  sex: 'male',
  heightFeet: '6',
  heightInchesPart: '2',
  age: 17,
  weightText: '190',
  fatPercentText: '16',
  fatSource: 'calipers',
  workPhysical: 'sitting',
  workStress: 'comfortable',
  weightTrainingHours: 4,
  cardioHours: 4,
  fatBurningHours: 0,
  wakeTime: '06:00',
  waiverSignature: 'Sample Athlete',
  waiverSignedDate: '2026-11-16',
});

export function buildSampleDietPreviewPackage() {
  const pkg = buildProgramPackage(SAMPLE_DIET_PREVIEW_FORM, {
    label: 'The HARDKOR Diet — Athlete Sample',
    meta: { source: 'sample-diet-preview' },
  });
  pkg.program.foodPlanCreatedDate = '2026-11-16';
  pkg.program.issuedAt = '2026-11-16T12:00:00.000Z';
  return pkg;
}
