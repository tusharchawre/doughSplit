import { getUser } from "@/hooks/getUser";
import { Text, View } from "react-native";

export default function Activity(){

    const user = getUser()

    const transactions = user?.involvedIn

    if(!transactions){
        return <View className="bg-black text-white flex-1">
            <Text className="text-white text-xl">There are no transactions here.</Text>
        </View>
    }
    
    return(
        <View className="bg-black flex-1">
            <Text className="text-white">
               {JSON.stringify(user?.involvedIn)}
            </Text>
        </View>
    )
}