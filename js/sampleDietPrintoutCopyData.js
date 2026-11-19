import { CONTACT_EMAIL } from './contactEmailData.js';

/** B&B sample diet printout — locked 1982 Warner copy (user-authored; do not reauthor). */

/** Footer contact — pinned footer on every sample diet page. */
export const SAMPLE_DIET_HEADER = Object.freeze({
  website: 'www.thehardkordiet.com',
  email: CONTACT_EMAIL,
});

export const SAMPLE_DIET_WELCOME = Object.freeze({
  intro: [
    'Congratulations! You have in your hands the most advanced diet available anywhere, at any price. It is the most individualized program available for losing fat. This diet will not work effectively for anyone else because it has been created just for you, using your LBM, your job, your lifestyle and your daily plan for exercise & activities.',
    'How we did it. We determined your lean weight using sophisticated body composition testing. Then you told us about your job, lifestyle, exercise and activities. With this information, the computer generated this report. Included is your ultrasound body composition report that I call your Lean Body Analysis, daily servings, food list, and a sample menu plan.',
  ],
  leanBodyAnalysis: 'Page six is the results of your body composition test. Although very few people want to know how fat they are, all of them want to know how to lose fat. Our Lean Body Analysis page includes a breakdown of your current body composition with an emphasis on the good stuff. LBM (lean body mass) is used by the computer to calculate your metabolic rate (RMR). In addition, the Lean Body Analysis projects appropriate weight goals based on your current lean body mass.',
  /** Not rendered in the 6-page diet PDF; kept for copy continuity. */
  history: 'Page three is a record of your body composition history with me. Having a history of body compositions can give you valuable information about how your eating habits are affecting your weight loss. That\'s why I recommend having your body composition checked every 6-8 weeks. I call it a check-in.',
  foodPlan: 'Your food plan is your custom-designed diet. How much food you need each day depends on how much LBM you have, your job, lifestyle and the type and amount of exercise you participate in. Based on the information you provide, this diet gives you the amount of protein, carbohydrates and fat you need per day to lose fat. It also tells you how much fat you can lose in eight weeks. And it shows you what your body requires at rest (your resting metabolic rate), for your workday and for one hour of each type of exercise.',
  servings: 'Page two is the servings page. No need to count calories or macros in this diet. The table shows you the number of servings you need daily to have maximum strength & energy and to lose fat as fast as possible.',
  foodList: 'Pages three and four are your food list. Page three lists protein & dairy along with grains & starches. Page four lists the veggies and fruits. The gram weights on your list are scaled to your daily servings from page two.',
  menuPlan: 'Page five is a sample menu plan for one day, showing how to build meals from your servings and food list. You can download blank menu plans at thehardkordiet.com/menuplanworksheet and fill in each day or week yourself.',
});

export const SAMPLE_DIET_LBA = Object.freeze({
  aceLead: 'How much body fat is right for you is a personal choice. If you have more body fat than you personally want, your HARDKOR Diet plan gives you a path toward changing it.',
  lbaRecheckHeading: 'RECHECK YOUR PROGRESS',
  lbaRecheckBody: 'Recheck your body composition every 6–8 weeks. Review the changes with Kory alongside your strength, training energy and goals.',
  congratsSuffix: 'Even so, it\'s a good idea to exercise at least twice a week. If you want to gain lean or maybe just tone and shape your body, do so by participating in a weight-training program two to three times a week under the guidance of an experienced trainer. The table below tells us what you would weigh for the different health categories based on your current Lean Body Mass. Increasing or decreasing your LBM would increase or decrease the suggested body weight accordingly. For maximum success, feed your body properly. This diet will show you how much food you need daily for maximum results.',
  alertSuffix: 'Exercise at least twice a week and follow this diet to support lean gain while losing fat. The table below tells us what you would weigh for the different health categories based on your current Lean Body Mass.',
  /** LBA page — connects lean mass to the weight-range table. */
  lbmWhyHeading: 'Why Lean Body Mass Matters',
  lbmWhyLead: 'Lean body mass is everything in your body other than fat, including muscle, bones, organs and body water. Your muscle helps you produce strength and power for your sport.',
  lbmWhyPunchline: 'Your progress is more than a number on the scale.',
  lbmWhyClosing: 'Your food plan supports your training. Review changes in lean body mass with Kory in relation to your strength, energy and athletic goals.',
});

/** Lean Body Analysis page — section headings (user-authored). */
export const SAMPLE_DIET_LBA_SECTIONS = Object.freeze({
  todayHeading: 'TODAY',
  bodyFatRangeHeading: 'YOUR BODY FAT RANGE',
  weightRangesIntro: 'Here are the body weights corresponding to the different body-fat ranges.',
});

export function sampleDietLbaWeightRangesHeading(leanLbs) {
  const raw = String(leanLbs ?? '').replace(/\s*lbs\.?$/i, '').trim();
  const n = Number(raw);
  const display = Number.isFinite(n) ? n.toFixed(1) : (raw || '—');
  return `AT YOUR CURRENT ${display} LBS OF LEAN MASS`;
}

export const SAMPLE_DIET_FOOD_PLAN = Object.freeze({
  lead: 'Your food plan is built around your goals, whether you want to build muscle, get stronger or have more energy for training. Reducing body fat may also be part of your goal if you want to improve speed or reach a competition weight class.\n\nNot every athlete needs or wants to lose fat, and you may already be where you want to be. We will review your body composition, training and goals together, using your lean body mass and activity to calculate how much food you need.',
  projectionSuffix: 'In addition, you could gain lean weight. Gaining lean weight will increase your strength and energy and offset your fat loss.',
  macroIntro: 'How much food you need each day depends on how much LBM you have. Also, it depends on your activity level and the type and amount of exercise you participate in. Based on the information you provided, the following table gives you the number of calories and the amount of protein, carbohydrates and fat you need per day to maintain your fat or to reduce body fat. Also listed is what your body requires at rest (your resting metabolic rate), for your workday and for one hour of each type of exercise.',
});

/** Food Plan page — summary above calories table (user-authored; do not reauthor). */
export function sampleDietCaloriesTableSummaryHeading() {
  return 'PUT YOUR PLAN TO WORK';
}

export const SAMPLE_DIET_CALORIES_TABLE_SUMMARY = Object.freeze({
  heading: sampleDietCaloriesTableSummaryHeading(),
  body: 'Follow the daily servings on page 2, choosing foods from your personalized lists. Eat all your recommended daily servings, spread across meals and fruit snacks. Eat every three hours or sooner. Your servings and food lists give you the amounts to use without counting calories or calculating macros. We will review your progress together and adjust your plan as needed.',
});

/** Food Plan page — calories table (user-authored; do not reauthor). */
export const SAMPLE_DIET_CALORIES_TABLE = Object.freeze({
  columns: Object.freeze([
    { key: 'protein', label: 'PROTEIN' },
    { key: 'carbohydrates', label: 'CARBOHYDRATES' },
    { key: 'fat', label: 'FAT' },
  ]),
  rows: Object.freeze([
    Object.freeze({
      label: 'TOO MUCH',
      fat: 'Gain Fat',
      carbohydrates: 'Converted to fat',
      protein: 'Converted to fat',
    }),
    Object.freeze({
      label: 'TOO LITTLE',
      fat: 'Lose Fat',
      carbohydrates: 'Lose Energy',
      protein: 'Lose Strength',
    }),
  ]),
});

export const SAMPLE_DIET_SERVINGS_NOTE =
  'NOTE: Always consult your physician before starting this plan or making any change in your eating habits.';

/** Servings page — user-authored; do not reauthor. */
export const SAMPLE_DIET_SERVINGS_TAGLINE = 'Your daily servings and how to use them.';

export const SAMPLE_DIET_GETTING_STARTED_HEADING = 'GETTING STARTED';

export const SAMPLE_DIET_GETTING_STARTED_RULES = Object.freeze([
  'Eat all the servings recommended.',
  'Alternate meals with fruit snacks.',
  'Eat every three hours or sooner.',
  'Follow your food list and portions. Ask Kory about extras or substitutions.',
]);

export const SAMPLE_DIET_HELPFUL_TIPS_HEADING = 'Helpful Tips';

export const SAMPLE_DIET_HELPFUL_TIPS_SALT = Object.freeze({
  title: 'Plan Ahead',
  body:
    'Plan meals and fruit snacks around school and practice. Pack what you need so you can eat every three hours or sooner.',
});

export const SAMPLE_DIET_HELPFUL_TIPS_BEVERAGES = Object.freeze({
  title: 'Beverages',
  body:
    'Keep water available during your school day and training. Ask Kory about drinks and how they fit your plan.',
});

export const SAMPLE_DIET_FOOD_LIST_INTRO =
  'The amount beside each food is your personalized serving size.';

export const SAMPLE_DAY_MENU_PAGE_TITLE = 'Menu Plan for day or week of:';

/** Modern Menu Plan page (sample diet page 2) — user-authored; do not reauthor. */
export const SAMPLE_DAY_MENU_INTRO = 'Adjust these times around school and training. Eat every three hours or sooner.';

export const SAMPLE_DAY_MENU_CALLOUT_TITLE = 'BUILD YOUR OWN DAY';

export const SAMPLE_DAY_MENU_CALLOUT_LEAD = 'Download a blank Menu Plan at';

export const SAMPLE_DAY_MENU_WORKSHEET_NOTE_LEAD = 'You can download blank Menu Plans at ';
