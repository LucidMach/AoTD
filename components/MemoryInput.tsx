import { colors } from "@/constants/colors";
import memory from "@/interfaces/memory";
import { useState } from "react";
import { TextInput, TouchableOpacity, View, Text } from "react-native";

interface Props {
  memories: memory[];
  setMemories: React.Dispatch<React.SetStateAction<memory[]>>;
}
interface InputProps {
  memory: memory;
  setMemories: React.Dispatch<React.SetStateAction<memory[]>>;
}

const Input: React.FC<InputProps> = ({ setMemories, memory }) => {
  return (
    <TextInput
      // placeholder={memory ? memory.memory : ""}
      // value={memory ? memory.memory : undefined}
      // placeholderTextColor={colors.dark.text}
      onSubmitEditing={(event) => {
        setMemories((memories) => {
          const timestamp = new Date();
          return [
            ...memories,
            {
              memory: event.nativeEvent.text,
              timestamp: timestamp.getTime(),
            },
          ];
        });
        // router.push("/");
      }}
      style={{
        fontFamily: "ComfertaaLight",
        color: colors.dark.text,
        borderBottomWidth: 1,
        borderColor: colors.dark.text,
        minWidth: 320,
        marginBottom: 8,
        textAlign: "center",
      }}
    />
  );
};

const MemoriesInput: React.FC<Props> = ({ setMemories, memories }) => {
  const [noOfMemories, setNoOfMemories] = useState<number>(memories.length);

  const renderMemoryInputs = () => {
    const children = [];
    for (let index = 0; index < noOfMemories; index++) {
      children.push(
        <Input setMemories={setMemories} memory={memories[index]} key={index} />
      );
    }

    return children;
  };

  return (
    <View>
      {renderMemoryInputs()}
      <TouchableOpacity
        style={{
          borderWidth: 2,
          borderColor: colors.dark.background,
          minWidth: 320,
          marginVertical: 2,
        }}
        onPress={() => setNoOfMemories((no) => no + 1)}
      >
        <Text
          style={{
            textAlign: "center",
            color: colors.dark.text,
            fontSize: 24,
          }}
        >
          +
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default MemoriesInput;
