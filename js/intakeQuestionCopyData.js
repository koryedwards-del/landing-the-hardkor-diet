/** User-facing question text for numbered intake fields (questionnaire + confirmation). */

export const INTAKE_FIELD_QUESTIONS = Object.freeze({
  preferredName: 'What is your full name?',
  sex: 'What is your gender?',
  email: 'What is your email address?',
  emailConfirm: 'Confirm your email address',
  referrerName: 'Who do we thank?',
  workPhysical: 'What is a typical day like for you?',
  workStress: 'How busy or stressful is your daily routine?',
  birthDate: 'What is your birthdate?',
  weightTrainingHours: 'How many hours a week do you spend lifting?',
  cardioHours: 'Outside of lifting, how many hours a week are you pushing hard?',
  fatBurningHours: 'How many hours a week are you just cruising?',
  height: 'What is your height?',
  totalWeight: 'What is your weight?',
  fatPercent: 'What is your body fat percentage?',
  fatSource: 'How do you know?',
  desiredWeight: 'Desired body weight',
  desiredFatPercent: 'Desired body fat',
});

/** User-facing name for weightTrainingHours (macro table + projections). */
export const INTAKE_WEIGHTS_RACQUET_SPORTS = 'weights/racquet sports';
export const INTAKE_WEIGHTS_RACQUET_SPORTS_TITLE = 'Weights/Racquet Sports';

/** Question numbers shared by the intake and PDF confirmation. */
export const INTAKE_FIELD_QUESTION_NUMBERS = Object.freeze({
  preferredName: 1,
  sex: 2,
  email: 3,
  referrerName: 4,
  workPhysical: 5,
  workStress: 6,
  birthDate: 7,
  weightTrainingHours: 8,
  cardioHours: 9,
  fatBurningHours: 10,
  height: 11,
  totalWeight: 12,
  fatPercent: 13,
  fatSource: 14,
  desiredWeight: 15,
  desiredFatPercent: 16,
});

export const INTAKE_WAIVER_SIGNED_QUESTION_NUMBER = 17;
export const INTAKE_WAIVER_SIGNED_LABEL = 'Approved';
