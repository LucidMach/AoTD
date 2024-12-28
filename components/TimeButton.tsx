import { useState } from "react";
import { TouchableOpacity, Text, View } from "react-native";
import * as Notifications from "expo-notifications";

import { colors } from "@/constants/Colors";
import DateTimePicker from "@react-native-community/datetimepicker";
import useNotifications from "@/hooks/useNotifications";

interface Props {
  title: string;
  scheduler: (selectedDate: Date) => Promise<void>;
  time: Date | undefined;
  setTime: React.Dispatch<React.SetStateAction<Date | undefined>>;
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const TimeButton: React.FC<Props> = ({ title, scheduler, time, setTime }) => {
  useNotifications();
  const [clicked, setClicked] = useState(false);

  return (
    <View>
      <TouchableOpacity
        onPress={() => setClicked(true)}
        style={{
          borderRadius: 100,
          boxShadow:
            "2px 2px 2px rgba(0, 0, 0, 1), inset 2px 2px 2px rgba(255, 255, 255, .25)",
          paddingHorizontal: 16,
          paddingVertical: 8,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 8,
        }}
      >
        <Text
          style={{
            fontFamily: "ComfortaaRegular",
            color: colors.dark.text,
            fontSize: 16,
          }}
        >
          {title}
        </Text>
        <Text
          style={{
            color: colors.dark.textTint,
            fontFamily: "ComfortaaRegular",
            fontSize: 16,
          }}
        >
          {time ? time.getHours() : "__"}:
          {time
            ? time.getMinutes().toString().length == 1
              ? "0" + time.getMinutes().toString()
              : time.getMinutes()
            : "__"}
        </Text>
      </TouchableOpacity>
      {clicked ? (
        <DateTimePicker
          mode="time"
          display="spinner"
          value={time || new Date()}
          onChange={async (event, selectedDate) => {
            setTime(selectedDate);
            setClicked(false);
            selectedDate && scheduler(selectedDate);
          }}
        />
      ) : null}
    </View>
  );
};

export default TimeButton;
