import { SheetProps } from "./groupSheet";
import  {
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { Text, TextInput, useColorScheme, View } from "react-native";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";

export const TxnSheet = ({ bottomSheetRef }: SheetProps) => {
  const colorScheme = useColorScheme();

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      enableDismissOnClose={true}
      handleIndicatorStyle={{ display: "none" }}
      handleStyle={{ display: "none" }}
    >
      <BottomSheetView className="bg-zinc-900 overflow-hidden rounded-xl w-full flex-1 h-[70vh] px-4 pt-6 pb-8 absolute flex flex-col gap-10">

          <Text className="text-white text-2xl font-semibold">Add a Transactions</Text>
          <View>
          <ThemedText type="defaultSemiBold" className="mb-4">
            Transactions Name
          </ThemedText>
          <TextInput
              className="bg-white/10 p-4 text-xl rounded-lg mb-4 text-white"
              placeholder="Transactions Name"
              placeholderTextColor="#ffffff80"
              autoCapitalize="none"
              />
            </View>

      </BottomSheetView>
    </BottomSheetModal>
  );
};
