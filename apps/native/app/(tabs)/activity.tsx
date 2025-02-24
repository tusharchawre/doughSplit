import { getUser } from "@/hooks/getUser";
import { Text, View } from "react-native";

export default function Activity(){

    const user = getUser()


  

    return(
        <View>
            <Text className="text-white bg-black flex-1 ">
               {JSON.stringify(user)}
            </Text>
        </View>
    )
}