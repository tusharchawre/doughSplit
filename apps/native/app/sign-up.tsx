import { useState } from "react";
import { View, Text, TextInput, Pressable, ScrollView } from "react-native";
import { useSession } from "@/context/ctx";
import { router } from "expo-router";
import api from "@/lib/axios";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { signIn } = useSession();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password : string) => {
    // Password should be at least 8 characters with at least one uppercase, one lowercase, and one special character
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(.{8,})$/;
    return passwordRegex.test(password);
  };

  const handleSignUp = async () => {
    setError("");

    // Input validation
    if (!username.trim()) {
      setError("Username is required");
      return;
    }

    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!password) {
      setError("Password is required");
      return;
    }

    if (!validatePassword(password)) {
      setError("Password must be at least 8 characters with uppercase, lowercase, and special characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    setLoading(true);
    try {
      const response = await api.post("/user/register", {
        username,
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
      } else {
        // If registration is successful but doesn't automatically log in
        setLoading(false);
        router.replace("/sign-in");
      }
    } catch (err) {
      setError("Failed to sign up");
      setLoading(false);
      console.error(err);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View className="flex-1 bg-black px-6 justify-center py-10">
        <Text className="text-white text-3xl mb-10 font-bold">Create Account</Text>

        {error ? <Text className="text-red-500 mb-4">{error}</Text> : null}

        <TextInput
          className="bg-white/10 p-4 rounded-lg mb-4 text-white"
          placeholder="Username"
          placeholderTextColor="#ffffff80"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />

        <TextInput
          className="bg-white/10 p-4 rounded-lg mb-4 text-white"
          placeholder="Email"
          placeholderTextColor="#ffffff80"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <TextInput
          className="bg-white/10 p-4 rounded-lg mb-4 text-white"
          placeholder="Password"
          placeholderTextColor="#ffffff80"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TextInput
          className="bg-white/10 p-4 rounded-lg mb-6 text-white"
          placeholder="Confirm Password"
          placeholderTextColor="#ffffff80"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        <Pressable 
          disabled={loading} 
          className="bg-white p-4 rounded-lg" 
          onPress={handleSignUp}
        >
          <Text disabled={loading} className="text-black text-center font-semibold">
            {loading ? "Creating account..." : "Sign Up"}
          </Text>
        </Pressable>

        <ThemedView className="w-full items-center justify-center my-4">
          <ThemedText onPress={() => router.push("/sign-in")} type="link">
            Already have an account? Sign In
          </ThemedText>
        </ThemedView>
      </View>
    </ScrollView>
  );
}