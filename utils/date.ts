export function calculateDaysRemaining(
  startDate: Date,
  daysToAdd: number = 30
): number {
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + daysToAdd);

  const currentDate = new Date();
  const timeDiff = endDate.getTime() - currentDate.getTime();
  const daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

  return daysRemaining;
}
