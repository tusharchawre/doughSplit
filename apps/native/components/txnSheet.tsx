import { View } from "react-native";
import { SheetProps } from "./groupSheet";
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from "@gorhom/bottom-sheet";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useColorScheme } from "react-native";
import { useCallback } from "react";
import { Text } from "react-native";

export const TxnSheet = ({ bottomSheetRef }: SheetProps) => {
  const colorScheme = useColorScheme();
  
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.5}
      />
    ),
    []
  );

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={["90%"]}
      enablePanDownToClose={true}
      backdropComponent={renderBackdrop}
      handleIndicatorStyle={{ 
        backgroundColor: colorScheme === "dark" ? "#FFFFFF" : "#000000",
        width: 40,
      }}
      handleStyle={{ 
        backgroundColor: colorScheme === "dark" ? "#1A1A1A" : "#FFFFFF",
        borderTopLeftRadius: 16, 
        borderTopRightRadius: 16 
      }}
      backgroundStyle={{
        backgroundColor: colorScheme === "dark" ? "#1A1A1A" : "#FFFFFF",
      }}
    >
      <BottomSheetView className="flex-1 px-4 pt-2 pb-8 absolute z-[10000000000000000]">
        <Text>
            Txn Sheet
        </Text>
      </BottomSheetView>
    </BottomSheet>
  );
};