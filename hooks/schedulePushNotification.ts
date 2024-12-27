import * as Notifications from "expo-notifications";

const secondsToNotification = (now: Date, target: Date) => {
  const noOfSecondsToTargetFromStartOfTheDay =
    target.getHours() * 3600 + target.getMinutes() * 60;

  const noOfSecondsToEndOfDay =
    24 * 60 * 60 -
    now.getHours() * 60 * 60 -
    now.getMinutes() * 60 -
    target.getSeconds();

  if (now.getHours() > target.getHours()) {
    return noOfSecondsToTargetFromStartOfTheDay + noOfSecondsToEndOfDay;
  } else {
    return (target.getTime() - now.getTime()) / 1000;
  }
};

export default async function schedulePushNotification(
  title: string,
  body: string,
  time: Date
) {
  const timeString =
    time.getHours().toString() + ":" + time.getMinutes().toString();

  await Notifications.cancelAllScheduledNotificationsAsync;
  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body: timeString,
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour: time.getHours(),
      minute: time.getMinutes(),
    },
    // trigger: {
    //   type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
    //   seconds: secondsToNotification(new Date(), time),
    //   repeat: true
    // },
  });
}
