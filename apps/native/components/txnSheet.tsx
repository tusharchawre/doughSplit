import { SheetProps } from "./groupSheet";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { Pressable, Text, TextInput, View, Switch } from "react-native";
import { ThemedText } from "./ThemedText";
import { SelectList } from "react-native-dropdown-select-list";
import { MultipleSelectList } from "react-native-dropdown-select-list";
import { useState } from "react";
import { useGroupById } from "@/hooks/getGroupById";
import api from "@/lib/axios";
import { useUser } from "@/hooks/getUser";

interface TxnSheetProps extends SheetProps {
  groupId: string;
}

export const TxnSheet = ({ bottomSheetRef, groupId }: TxnSheetProps) => {
  const [selected, setSelected] = useState("INR");
  const [txnName, setTxnName] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [splitEqually, setSplitEqually] = useState(true);
  const [selectedMemberIds, setSelectedMemberIds] = useState<string[]>([]);
  const { data: user } = useUser();
  const { data: group } = useGroupById(groupId);

  if (!group) {
    return <ThemedText>Group Doesn't Exist</ThemedText>;
  }

  const membersData = group?.members.map((member) => ({
    key: member.id,
    value: member.username,
  }));

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
    return currency ? currency.value : "₹";
  };

  const toggleSplitEqually = () => setSplitEqually(!splitEqually);

  const submitTxn = async () => {
    try {
      if (!txnName.trim()) {
        alert("Please enter a transaction name");
        return;
      }

      if (!amount || parseFloat(amount) <= 0) {
        alert("Please enter a valid amount");
        return;
      }

      setLoading(true);

      let participantsToSubmit = [];

      if (splitEqually) {
        participantsToSubmit = group.members.map((member) => member.id);
      } else {
        if (selectedMemberIds.length === 0) {
          alert("Please select at least one member to split with");
          setLoading(false);
          return;
        }
        participantsToSubmit = selectedMemberIds;
      }

      const numericAmount = parseFloat(amount);

      const response = await api.post("/group/transactions/add", {
        txnName,
        description: "Transaction added by " + user?.username,
        groupId,
        paidById: user?.id,
        participants: participantsToSubmit,
        amount: numericAmount,
        currency: selected,
      });

      if (response.data.txn) {
        setTxnName("");
        setAmount("");
        setSelectedMemberIds([]);
        bottomSheetRef.current?.close();
        alert("Transaction added successfully");
      }
    } catch (error) {
      console.error("Transaction error:", error);
      alert("Failed to add transaction. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      enableDismissOnClose={true}
      handleIndicatorStyle={{ display: "none" }}
      handleStyle={{ display: "none" }}
      keyboardBehavior="extend"
      android_keyboardInputMode="adjustResize"
    >
      <BottomSheetScrollView scrollEnabled={false}>
        <BottomSheetView className="bg-zinc-900 overflow-hidden rounded-xl w-full flex-1 h-[80vh] px-4 pt-6 pb-8 flex flex-col gap-6">
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
              defaultValue={txnName}
              onChangeText={(txnName) => setTxnName(txnName)}
            />
          </View>

          <View>
            <ThemedText type="defaultSemiBold" className="mb-4">
              Amount
            </ThemedText>
            <View className="relative flex flex-row items-center">
              <View className="w-24 mr-2" style={{ zIndex: 10 }}>
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
                    maxHeight: 200,
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
                defaultValue={amount}
                onChangeText={(amount) => setAmount(amount)}
              />
            </View>
          </View>
          <View>
            <View className="flex-row justify-between items-center mb-4">
              <ThemedText type="defaultSemiBold">Split Equally</ThemedText>
              <Switch
                value={splitEqually}
                onValueChange={toggleSplitEqually}
                trackColor={{ false: "#767577", true: "#4CAF50" }}
                thumbColor="#f4f3f4"
              />
            </View>
            {!splitEqually && (
              <View style={{ zIndex: 5 }}>
                <ThemedText type="defaultSemiBold" className="mb-4">
                  Split Among
                </ThemedText>
                <MultipleSelectList
                  setSelected={setSelectedMemberIds}
                  data={membersData}
                  save="key"
                  label="Group Members"
                  onSelect={() => console.log(selectedMemberIds)}
                  placeholder="Select members"
                  notFoundText="No members found"
                  dropdownTextStyles={{ color: "white" }}
                  labelStyles={{ color: "white" }}
                  checkBoxStyles={{
                    backgroundColor: "transparent",
                    borderColor: "white",
                  }}
                  boxStyles={{
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    borderWidth: 0,
                    borderRadius: 8,
                    padding: 12,
                  }}
                  inputStyles={{ color: "white" }}
                  badgeStyles={{ backgroundColor: "#ffffff30" }}
                  closeicon={
                    <Text style={{ fontSize: 20, color: "white" }}>✕</Text>
                  }
                  dropdownStyles={{
                    backgroundColor: "rgba(30, 30, 30, 0.95)",
                    borderWidth: 0,
                    position: "absolute",
                    width: "100%",
                    zIndex: 100,
                    maxHeight: 200,
                  }}
                />
              </View>
            )}
          </View>
          <View className="mt-auto mb-8">
            <Pressable
              onPress={submitTxn}
              className={`w-full bg-white h-16 rounded-xl flex items-center justify-center ${loading ? "opacity-50" : ""}`}
              disabled={loading}
            >
              <Text className="text-xl font-semibold">
                {loading ? "Adding..." : "Add Transaction"}
              </Text>
            </Pressable>
          </View>
        </BottomSheetView>
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
};