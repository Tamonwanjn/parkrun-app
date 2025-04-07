import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "react-native-reanimated";
import { ActivityIndicator, View, StyleSheet, Text } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { ApolloProvider } from "@apollo/client";
import client from "@/graphql/client";
import { useColorScheme } from "@/hooks/useColorScheme";
import { enableScreens, enableFreeze } from 'react-native-screens';

SplashScreen.preventAutoHideAsync();
enableScreens(true);
enableFreeze(true);

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    "NotoSansThai-Regular": require("@/assets/fonts/NotoSansThai-Regular.ttf"),
    "NotoSansThai-Bold": require("@/assets/fonts/NotoSansThai-Bold.ttf"),
  });

  const [isLoggedIn, setIsLoggedIn] = useState<boolean | undefined>(undefined);
  const isAppReady = fontsLoaded && isLoggedIn !== undefined;
  


  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem("userToken");
      console.log("🚀 ตรวจสอบ Token:", token);
      setIsLoggedIn(!!token);
    };

    checkAuth();
  }, []);

  useEffect(() => {
    if (isAppReady) {
      (async () => await SplashScreen.hideAsync())();

      console.log("🔥 สถานะล็อกอิน:", isLoggedIn);
      if (!isLoggedIn) {
        router.replace("/login");
      }
    }
  }, [isAppReady, isLoggedIn]);

  if (!isAppReady) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
        <Text style={styles.text}>Loading...</Text>
      </View>
    );
  }

  return (
    <ApolloProvider client={client}>
      <PaperProvider>
        <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
          <View style={styles.container}>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="login" options={{ headerShown: false }} />
            </Stack>
          </View>
        </ThemeProvider>
      </PaperProvider>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'NotoSansThai-Regular',
    fontSize: 16,
    color: '#333',
  },
});

