import { useState } from "react";
import { Text, View } from "react-native";


export default  function Groups(){

    const [string, setString] = useState("")


    const handleClick = async () => {
        const todo = await fetch('https://jsonplaceholder.typicode.com/todos/1')
        .then(response => response.json())
        .then(json => setString(JSON.stringify(json)))
    }



    return(
        <View className="flex items-center justify-center h-screen">
            <Text className="" onPress={handleClick}>Tushar{string}</Text>
        </View>
    )
}