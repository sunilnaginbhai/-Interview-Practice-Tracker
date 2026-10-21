const pad = (value) => String(value).padStart(2, "0");

const dayKey = (value = Date.now()) => {
  const date = new Date(value);
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
};

const todayKey = () => dayKey();

const yesterdayKey = () => dayKey(Date.now() - 86400000);

const lastNDays = (count) =>
  Array.from({ length: count }, (_, index) =>
    dayKey(Date.now() - (count - index - 1) * 86400000)
  );

const formatDay = (key) =>
  new Date(`${key}T12:00:00`).toLocaleDateString(undefined, {
    weekday: "short",
  });

export { dayKey, todayKey, yesterdayKey, lastNDays, formatDay };
