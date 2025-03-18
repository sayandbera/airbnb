import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { StatusBar, TouchableOpacity } from "react-native";
import "react-native-reanimated";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ClerkProvider, ClerkLoaded, useAuth } from "@clerk/clerk-expo";
import { tokenCache } from "@/cache";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Colors from "@/constants/Colors";
import ModalHeaderText from "@/components/ModalHeaderText";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// For clerk authentication
const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
  throw new Error("Add EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env");
}

export default function RootLayout() {
  const [loaded, error] = useFonts({
    mon: require("../assets/fonts/Montserrat-Regular.ttf"),
    monBold: require("../assets/fonts/Montserrat-Bold.ttf"),
    monSb: require("../assets/fonts/Montserrat-SemiBold.ttf"),
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <ClerkLoaded>
        <SafeAreaProvider>
          <StatusBar backgroundColor="transparent" barStyle="dark-content" />
          <RootLayoutNav />
        </SafeAreaProvider>
      </ClerkLoaded>
    </ClerkProvider>
  );
}

const RootLayoutNav = () => {
  const router = useRouter();
  const { isLoaded, isSignedIn } = useAuth();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/(modals)/login");
    }
  }, [isLoaded]);

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="(modals)/login"
        options={{
          title: "Log in or Sign up",
          headerTitleStyle: {
            fontFamily: "monSb",
            fontSize: 16,
          },
          presentation: "modal",
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons
                name="close-outline"
                size={24}
                style={{ marginRight: 10 }}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="(modals)/booking"
        options={{
          presentation: "transparentModal",
          animation: "fade",
          title: "Booking",
          headerTransparent: true,
          headerTitle: () => <ModalHeaderText />,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={{
                borderColor: Colors.grey,
                borderRadius: 20,
                borderWidth: 1,
                padding: 4,
              }}
            >
              <Ionicons name="close-outline" size={24} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
};
