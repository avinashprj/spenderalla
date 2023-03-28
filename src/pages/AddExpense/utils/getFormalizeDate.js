export function getFormalizeDate(activity) {
  const year = String(activity.year);

  const month =
    activity.month + 1 < 10
      ? "0" + String(activity.month + 1)
      : String(activity.month + 1);

  const dayMin =
    "0" + String(new Date(activity.year, activity.month).getDate());

  const dayMax =
    activity.month + 1 === new Date().getMonth() + 1
      ? new Date().getDate() + 1 < 10
        ? "0" + String(new Date().getDate())
        : String(new Date().getDate())
      : String(new Date(activity.year, activity.month + 1, 0).getDate());

  return [year, month, dayMin, dayMax];
}