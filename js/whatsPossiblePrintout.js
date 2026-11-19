const numberText = new Intl.NumberFormat('en-US', { maximumFractionDigits: 1 });
const percentText = new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 });
const pounds = (n) => `${numberText.format(n)} lb`;
const percent = (n) => `${percentText.format(n)}%`;

function positiveNumber(value) {
  const n = Number(value);
  return Number.isFinite(n) && n > 0 ? n : null;
}

export function buildWhatsPossible(intake = {}) {
  const weight = positiveNumber(intake.totalWeight);
  const lean = positiveNumber(intake.leanBodyMass);
  const fatPct = positiveNumber(intake.fatPercent);
  const fat = weight != null && lean != null ? Math.max(0, weight - lean) : null;
  const desiredWeight = intake.desiredWeightUnknown ? null : positiveNumber(intake.desiredWeight);
  const enteredFatPct = positiveNumber(intake.desiredFatPercent);
  const desiredFatPct = !intake.desiredFatPercentUnknown && enteredFatPct != null && enteredFatPct < 100
    ? enteredFatPct
    : null;
  const desiredFat = desiredWeight != null && desiredFatPct != null
    ? desiredWeight * desiredFatPct / 100
    : null;
  const missingGoal = desiredWeight == null && desiredFatPct == null
    ? 'Needs both'
    : desiredWeight == null ? 'Needs weight' : 'Needs fat %';
  const sex = String(intake.sex || '').trim().toLowerCase();
  const minimumFatPct = sex === 'male' ? 7 : sex === 'female' ? 12 : null;
  const minimum = lean != null && minimumFatPct != null ? lean / (1 - minimumFatPct / 100) : null;
  const change = desiredWeight != null && weight != null
    ? Math.round((desiredWeight - weight) * 10) / 10
    : null;
  const possibleFatLoss = desiredWeight != null && fat != null && minimumFatPct != null
    ? Math.max(0, fat - desiredWeight * minimumFatPct / 100)
    : null;
  const goalDetails = [];
  if (change != null) {
    const amount = change === 0 ? 'No weight change' : `${change > 0 ? 'Gain' : 'Lose'} ${pounds(Math.abs(change))}`;
    goalDetails.push(`Change from current: ${amount}`);
  }
  if (possibleFatLoss != null) {
    goalDetails.push(`Possible fat to lose: ${pounds(possibleFatLoss)} at ${percent(minimumFatPct)}`);
  }

  return {
    current: [
      weight != null ? pounds(weight) : 'Unavailable',
      lean != null ? pounds(lean) : 'Unavailable',
      fat != null ? pounds(fat) : 'Unavailable',
      fatPct != null ? percent(fatPct) : 'Unavailable',
    ],
    desired: [
      desiredWeight != null ? pounds(desiredWeight) : intake.desiredWeightUnknown ? 'Don’t know' : 'Left blank',
      desiredFat != null ? pounds(desiredWeight - desiredFat) : missingGoal,
      desiredFat != null ? pounds(desiredFat) : missingGoal,
      desiredFatPct != null ? percent(desiredFatPct) : intake.desiredFatPercentUnknown ? 'Don’t know' : 'Left blank',
    ],
    minimum: [
      minimum != null ? pounds(minimum) : 'Unavailable',
      lean != null ? pounds(lean) : 'Unavailable',
      minimum != null ? pounds(minimum - lean) : 'Unavailable',
      minimumFatPct != null ? percent(minimumFatPct) : 'Unavailable',
    ],
    goalDetails: goalDetails.join('   |   '),
    rulesNote: 'This example uses the high school wrestling benchmarks of 7% body fat for boys and 12% for girls. Check your local, state, or conference rules.',
  };
}
