import { useSession } from "@/context/ctx";
import { getUser } from "@/hooks/getUser";
import { Button, Text, View } from "react-native";

export default function Account(){

    const user = getUser()
    
    const {signOut} = useSession()

    return(
        <View className="bg-black flex-1">
            <Text className="text-white">{JSON.stringify(user)}</Text>
        <Button title="Sign Out" onPress={()=> signOut()} />                
                    
        </View>
    )
}