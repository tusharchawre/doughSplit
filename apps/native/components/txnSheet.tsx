import { SheetProps } from "./groupSheet";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import {
  Pressable,
  Text,
  TextInput,
  useColorScheme,
  View,
} from "react-native";
import { ThemedText } from "./ThemedText";
import { SelectList } from "react-native-dropdown-select-list";
import { useState } from "react";

export const TxnSheet = ({ bottomSheetRef }: SheetProps) => {
  const colorScheme = useColorScheme();
  const [selected, setSelected] = useState("USD");
  const [amount, setAmount] = useState(0);

  // Currency options
  const currencyData = [
    { key: "USD", value: "$" },
    { key: "EUR", value: "€" },
    { key: "GBP", value: "£" },
    { key: "JPY", value: "¥" },
    { key: "INR", value: "₹" },
    { key: "CAD", value: "C$" },
    { key: "AUD", value: "A$" },
    { key: "CNY", value: "¥" },
  ];

  const getSymbol = () => {
    const currency = currencyData.find((item) => item.key === selected);
    return currency ? currency.value : "$";
  };

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      enableDismissOnClose={true}
      handleIndicatorStyle={{ display: "none" }}
      handleStyle={{ display: "none" }}
    >
      <BottomSheetView className="bg-zinc-900 overflow-hidden rounded-xl w-full flex-1 h-[70vh] px-4 pt-6 pb-8 absolute flex flex-col gap-10">
        <Text className="text-white text-2xl font-semibold">
          Add a Transaction
        </Text>
        <View>
          <ThemedText type="defaultSemiBold" className="mb-4">
            Transaction Name
          </ThemedText>
          <TextInput
            className="bg-white/10 p-4 text-xl rounded-lg mb-4 text-white"
            placeholder="Transaction Name"
            placeholderTextColor="#ffffff80"
            autoCapitalize="none"
          />
        </View>

        <View>
          <ThemedText type="defaultSemiBold" className="mb-4">
            Amount
          </ThemedText>
          <View className="relative flex flex-row items-center">
            <View className="w-24 mr-2 z-10">
              <SelectList
                setSelected={setSelected}
                data={currencyData}
                save="key"
                defaultOption={{ key: "INR", value: "₹" }}
                boxStyles={{
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  borderWidth: 0,
                  borderRadius: 8,
                  height: 56,
                  justifyContent: "center",
                }}
                inputStyles={{
                  color: "white",
                  fontSize: 20,
                  textAlign: "center",
                  fontWeight: "bold",
                }}
                dropdownStyles={{
                  backgroundColor: "rgba(30, 30, 30, 0.95)",
                  borderWidth: 0,
                  position: "absolute",
                  width: "100%",
                  zIndex: 100,
                  top: 54,
                }}
                dropdownTextStyles={{
                  color: "white",
                  fontSize: 20,
                }}
                search={false}
                placeholder={getSymbol()}
              />
            </View>

            <TextInput
              className="flex-1 bg-white/10 p-4 text-xl rounded-lg text-white"
              placeholder="0.00"
              placeholderTextColor="#ffffff80"
              keyboardType="numeric"
            />
          </View>
        </View>
        <Pressable className="w-full bg-white h-16 rounded-xl flex items-center justify-center">
          <Text className="text-xl font-semibold">Add Transactions</Text>
        </Pressable>
      </BottomSheetView>
    </BottomSheetModal>
  );
};
