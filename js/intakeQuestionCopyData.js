/** User-facing question text for numbered intake fields (questionnaire + confirmation). */

export const INTAKE_FIELD_QUESTIONS = Object.freeze({
  preferredName: 'What is your full name?',
  sex: 'What is your gender?',
  email: 'What is your email address?',
  emailConfirm: 'Confirm your email address',
  referrerName: 'Who do we thank?',
  workPhysical: 'How active are you during your school day?',
  workStress: 'Your life outside school and training',
  birthDate: 'What is your birthdate?',
  weightTrainingHours: 'How many hours a week do you spend lifting?',
  cardioHours: 'How many hours a week do you spend on hard conditioning?',
  fatBurningHours: 'How many hours a week do you spend on lighter conditioning or steady cardio?',
  height: 'What is your height?',
  totalWeight: 'What is your weight?',
  fatPercent: 'What is your body fat percentage?',
  fatSource: 'How do you know?',
});

/** User-facing name for weightTrainingHours (macro table + projections). */
export const INTAKE_WEIGHTS_RACQUET_SPORTS = 'weights/racquet sports';
export const INTAKE_WEIGHTS_RACQUET_SPORTS_TITLE = 'Weights/Racquet Sports';

/** Continuous question numbers across intake steps (email confirm = 4, omitted from PDF confirmation). */
export const INTAKE_FIELD_QUESTION_NUMBERS = Object.freeze({
  preferredName: 1,
  sex: 2,
  email: 3,
  emailConfirm: 4,
  referrerName: 5,
  workPhysical: 6,
  workStress: 7,
  birthDate: 8,
  weightTrainingHours: 9,
  cardioHours: 10,
  fatBurningHours: 11,
  height: 12,
  totalWeight: 13,
  fatPercent: 14,
  fatSource: 15,
});

export const INTAKE_WAIVER_SIGNED_QUESTION_NUMBER = 16;
export const INTAKE_WAIVER_SIGNED_LABEL = 'Approved';
