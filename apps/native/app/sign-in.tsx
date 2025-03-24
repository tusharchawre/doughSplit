import { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { useSession } from "@/context/ctx";
import { router } from "expo-router";
import api from "@/lib/axios";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { signIn } = useSession();

  const handleSignIn = async () => {
    setLoading(true);
    try {
      const response = await api.post("/user/login", {
        email,
        password,
      });

      if (response.data.error) {
        setError(response.data.error);
        setLoading(false);
        return;
      }

      if (response.data.token) {
        signIn(response.data.token);
        router.replace("/(tabs)");
        setLoading(false);
      }
    } catch (err) {
      setError("Failed to sign in");
      setLoading(false);
      console.error(err);
    }
  };

  return (
    <View className="flex-1 bg-black px-6 justify-center">
      <Text className="text-white text-3xl mb-10 font-bold">Sign In</Text>

      {error ? <Text className="text-red-500 mb-4">{error}</Text> : null}

      <TextInput
        className="bg-white/10 p-4 rounded-lg mb-4 text-white"
        placeholder="Email"
        placeholderTextColor="#ffffff80"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <TextInput
        className="bg-white/10 p-4 rounded-lg mb-6 text-white"
        placeholder="Password"
        placeholderTextColor="#ffffff80"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Pressable
        disabled={loading}
        className="bg-white p-4 rounded-lg"
        onPress={handleSignIn}
      >
        <Text className="text-black text-center font-semibold">
          {loading ? `Signing in...` : "Sign In"}
        </Text>
      </Pressable>

      <ThemedView className="w-full items-center justify-center my-4">
        <ThemedText onPress={() => router.push("/sign-up")} type="link">
          Dont have an account? Sign Up
        </ThemedText>
      </ThemedView>
    </View>
  );
}
