import { notificationMSG } from "@/constants/notificationMSG";
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
  morningTime: Date,
  eveningTime: Date
) {
  await Notifications.cancelAllScheduledNotificationsAsync();

  const morningTimeString =
    morningTime.getHours().toString() +
    ":" +
    morningTime.getMinutes().toString();

  const eveningTimeString =
    eveningTime.getHours().toString() +
    ":" +
    eveningTime.getMinutes().toString();

  await Notifications.scheduleNotificationAsync({
    content: {
      title: notificationMSG.morningTitle,
      body: "morning " + morningTimeString,
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour: morningTime.getHours(),
      minute: morningTime.getMinutes(),
    },
  });

  await Notifications.scheduleNotificationAsync({
    content: {
      title: notificationMSG.eveningTitle,
      body: "evening " + eveningTimeString,
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour: eveningTime.getHours(),
      minute: eveningTime.getMinutes(),
    },
  });
}
