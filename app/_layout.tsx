// import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
// import { useFonts } from 'expo-font';
// import { useSegments, Stack, useRouter } from 'expo-router';
// import * as SplashScreen from 'expo-splash-screen';
// import { StatusBar } from 'expo-status-bar';
// import { useEffect, useState, useCallback } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import 'react-native-reanimated';
// import { ActivityIndicator, View, StyleSheet, Text } from 'react-native';
// import { Provider as PaperProvider } from 'react-native-paper';
// import { ApolloProvider, useQuery } from '@apollo/client';
// import client from '@/graphql/client';
// import { gql } from '@apollo/client';
// import { useColorScheme } from '@/hooks/useColorScheme';

// // Prevent auto-hiding the splash screen
// SplashScreen.preventAutoHideAsync();

// // GraphQL Query to fetch user data
// const GET_USER_ONE = gql`
//   query ($_id: MongoID) {
//     userOne(filter: { _id: $_id }) {
//       _id
//       bib
//       phone
//       idcard
//       name
//       role
//       email
//       gender
//       birthDate
//       emergenPhone
//       drug
//       image
//     }
//   }
// `;

// export default function RootLayout() {
//   const colorScheme = useColorScheme();
//   const segments = useSegments() as string[]
//   const router = useRouter();

//   const [isLoaded, setIsLoaded] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [userId, setUserId] = useState<string | null>(null);

//   // Load fonts
//   const [fontsLoaded] = useFonts({
//     'NotoSansThai-Regular': require('@/assets/fonts/NotoSansThai-Regular.ttf'),
//     'NotoSansThai-Bold': require('@/assets/fonts/NotoSansThai-Bold.ttf'),
//   });

//   // Check user authentication and fetch user ID from AsyncStorage
//   useEffect(() => {
//     const checkAuth = async () => {
//       const storedUserId = await AsyncStorage.getItem('userToken');
//       if (storedUserId) {
//         setUserId(storedUserId);
//         setIsLoggedIn(true);
//       } else {
//         setIsLoggedIn(false);
//       }
//       setIsLoaded(true);
//     };

//     checkAuth();
//   }, []);

//   // Fetch user data from GraphQL
//   const { data, loading, error } = useQuery(GET_USER_ONE, {
//     variables: { _id: userId },
//     skip: !userId,
//   });

//   useEffect(() => {
//     if (isLoaded && fontsLoaded) {
//       SplashScreen.hideAsync();
  
//       // แก้ไขวิธีการนำทาง
//       if (!isLoggedIn) {
//         // ถ้าไม่ได้ล็อกอิน ให้พยายามตรวจสอบว่ากำลังอยู่ที่หน้า login หรือไม่
//         const inLoginScreen = segments.some(segment => 
//           segment === 'login' || segment.includes('login')
//         );
        
//         if (!inLoginScreen) {
//           // ใช้ navigation ในรูปแบบที่ไม่ต้องระบุเส้นทางแบบตายตัว
//           router.navigate({
//             pathname: 'login',
//           } as never);
//         }
//       }
//     }
//   }, [isLoaded, isLoggedIn, fontsLoaded, segments]);

//   const onLayoutRootView = useCallback(async () => {
//     if (fontsLoaded && isLoaded) {
//       await SplashScreen.hideAsync();
//     }
//   }, [fontsLoaded, isLoaded]);

//   if (!isLoaded || !fontsLoaded || loading) {
//     return (
//       <View style={styles.loadingContainer} onLayout={onLayoutRootView}>
//         <ActivityIndicator size="large" />
//         <Text style={styles.text}>Loading...</Text>
//       </View>
//     );
//   }

//   const UserDataProvider = ({ userId, children }) => {
//     const { data, loading, error } = useQuery(GET_USER_ONE, {
//       variables: { _id: userId },
//       skip: !userId,
//     });
  
//     if (loading) return <ActivityIndicator size="large" />;
//     if (error) console.error("Apollo error:", error);
  
//     return children;
//   };

//   return (
//     <ApolloProvider client={client}>
//       <PaperProvider>
//         <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
//           <StatusBar style="auto" />
//           <View style={styles.container}>
//             {isLoggedIn && userId ? (
//               <UserDataProvider userId={userId}>
//                 <Stack>
//                   <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
//                   <Stack.Screen name="login" options={{ headerShown: false }} />
//                 </Stack>
//               </UserDataProvider>
//             ) : (
//               <Stack>
//                 <Stack.Screen name="login" options={{ headerShown: false }} />
//                 <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
//               </Stack>
//             )}
//           </View>
//         </ThemeProvider>
//       </PaperProvider>
//     </ApolloProvider>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   text: {
//     fontFamily: 'NotoSansThai-Regular',
//     fontSize: 16,
//     color: '#333',
//   },
//   boldText: {
//     fontFamily: 'NotoSansThai-Bold',
//     fontSize: 18,
//     color: '#222',
//   },
// });



// *******************************************************************************************


// import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
// import { useFonts } from 'expo-font';
// import { Stack, Redirect } from 'expo-router';
// import * as SplashScreen from 'expo-splash-screen';
// import { StatusBar } from 'expo-status-bar';
// import { useEffect } from 'react';
// import 'react-native-reanimated';

// import { useColorScheme } from '@/hooks/useColorScheme';

// // Prevent the splash screen from auto-hiding before asset loading is complete.
// SplashScreen.preventAutoHideAsync();

// export default function RootLayout() {
//   const colorScheme = useColorScheme();
//   const [loaded] = useFonts({
//     NotoSans: require('../assets/fonts/NotoSansThai-Regular.ttf'),
//   });

//   useEffect(() => {
//     if (loaded) {
//       SplashScreen.hideAsync();
//     }
//   }, [loaded]);

//   if (!loaded) {
//     return null;
//   }

//   return (
//     <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
//       <Stack initialRouteName="login">
//         <Stack.Screen name="login" options={{ headerShown: false }} />
//         <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
//         <Stack.Screen name="+not-found" />
//       </Stack>
//       <StatusBar style="auto" />
//     </ThemeProvider>
//   );
// }


// *******************************************************************************************

// import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
// import { useFonts } from 'expo-font';
// import { useSegments, Stack, useRouter } from 'expo-router';
// import * as SplashScreen from 'expo-splash-screen';
// import { StatusBar } from 'expo-status-bar';
// import { useEffect, useState, useCallback } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import 'react-native-reanimated';
// import { ActivityIndicator, View, StyleSheet, Text } from 'react-native';
// import { Provider as PaperProvider } from 'react-native-paper';
// import { ApolloProvider } from "@apollo/client"; 
// import client from "@/graphql/client"; 

// import { useColorScheme } from '@/hooks/useColorScheme';

// SplashScreen.preventAutoHideAsync();

// export default function RootLayout() {
//   const colorScheme = useColorScheme();
//   const segments = useSegments();
//   const router = useRouter();

//   const [isLoaded, setIsLoaded] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   // โหลดฟอนต์
//   const [fontsLoaded] = useFonts({
//     'NotoSansThai-Regular': require('@/assets/fonts/NotoSansThai-Regular.ttf'),
//     'NotoSansThai-Bold': require('@/assets/fonts/NotoSansThai-Bold.ttf'),
//   });

//   useEffect(() => {
//     const checkToken = async () => {
//       const userToken = await AsyncStorage.getItem('userToken');
//       setIsLoggedIn(!!userToken);
//       setIsLoaded(true);
//     };
//     checkToken();
//   }, []);
  
//   useEffect(() => {
//     if (isLoaded && fontsLoaded) {
//       SplashScreen.hideAsync();
//       if (!isLoggedIn && segments[0] !== 'login') {
//         router.replace('/login'); // 🔴 ถ้ายังไม่ได้ล็อกอิน -> ไป login
//       } else if (isLoggedIn && segments[0] === 'login') {
//         router.replace('/'); // 🟢 ถ้าล็อกอินแล้ว และอยู่ที่ login -> ไป index.tsx
//       }
//     }
//   }, [isLoaded, isLoggedIn, fontsLoaded, segments]);
  
  

//   const onLayoutRootView = useCallback(async () => {
//     if (fontsLoaded && isLoaded) {
//       await SplashScreen.hideAsync();
//     }
//   }, [fontsLoaded, isLoaded]);

//   if (!isLoaded || !fontsLoaded) {
//     return (
//       <View style={styles.loadingContainer} onLayout={onLayoutRootView}>
//         <ActivityIndicator size="large" />
//         <Text style={styles.text}>Loading...</Text> 
//       </View>
//     );
//   }

//   return (
//     <ApolloProvider client={client}>
//       <PaperProvider>
//         <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
//           <StatusBar style="auto" />
//           <View style={styles.container}>
//             <Stack>
//               <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
//               <Stack.Screen name="login" options={{ headerShown: false }} />
//             </Stack>
//           </View>
//         </ThemeProvider>
//       </PaperProvider>
//     </ApolloProvider>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   text: {
//     fontFamily: 'NotoSansThai-Regular',
//     fontSize: 16,
//     color: '#333',
//   },
//   boldText: {
//     fontFamily: 'NotoSansThai-Bold', 
//     fontSize: 18,
//     color: '#222',
//   },
// });



// *******************************************************************************************

import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "react-native-reanimated";
import { ActivityIndicator, View, StyleSheet, Text } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { ApolloProvider } from "@apollo/client";
import client from "@/graphql/client";
import { useColorScheme } from "@/hooks/useColorScheme";
import { AuthProvider, useAuth } from "@/context/AuthContext";

SplashScreen.preventAutoHideAsync();

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




// *******************************************************************************************


// import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
// import { useFonts } from "expo-font";
// import { Stack, useRouter } from "expo-router";
// import * as SplashScreen from "expo-splash-screen";
// import { useEffect, useCallback } from "react";
// import "react-native-reanimated";
// import { ActivityIndicator, View, StyleSheet, Text } from "react-native";
// import { Provider as PaperProvider } from "react-native-paper";
// import { ApolloProvider } from "@apollo/client";
// import client from "@/graphql/client";
// import { useColorScheme } from "@/hooks/useColorScheme";
// import { AuthProvider, useAuth } from "@/context/AuthContext"; 
// import { useSegments } from "expo-router";

// SplashScreen.preventAutoHideAsync();

// function LayoutContent() {
//   const { user, loading } = useAuth();
//   const router = useRouter();

//   const [fontsLoaded] = useFonts({
//     "NotoSansThai-Regular": require("@/assets/fonts/NotoSansThai-Regular.ttf"),
//     "NotoSansThai-Bold": require("@/assets/fonts/NotoSansThai-Bold.ttf"),
//   });

//   const isAppReady = fontsLoaded && !loading;
//   const segments = useSegments();

//   useEffect(() => {
//     if (isAppReady) {
//       SplashScreen.hideAsync();
  
//       const inLogin = segments[0] === "login";
  
//       if (!user && !inLogin) {
//         router.replace("/login");
//       } else if (user && inLogin) {
//         router.replace("/");
//       }
//     }
//   }, [isAppReady, user, segments]);

//   const onLayoutRootView = useCallback(async () => {
//     if (isAppReady) {
//       await SplashScreen.hideAsync();
//     }
//   }, [isAppReady]);

//   if (!isAppReady) {
//     return (
//       <View style={styles.loadingContainer} onLayout={onLayoutRootView}>
//         <ActivityIndicator size="large" />
//         <Text style={styles.text}>Loading...</Text>
//       </View>
//     );
//   }

//   return (
//     <Stack>
//       <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
//       <Stack.Screen name="login" options={{ headerShown: false }} />
//     </Stack>
//   );
// }

// export default function RootLayout() {
//   const colorScheme = useColorScheme();

//   return (
//     <ApolloProvider client={client}>
//       <PaperProvider>
//         <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
//           <AuthProvider> {/* ✅ ครอบด้วย AuthProvider */}
//             <LayoutContent />
//           </AuthProvider>
//         </ThemeProvider>
//       </PaperProvider>
//     </ApolloProvider>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   text: {
//     fontFamily: "NotoSansThai-Regular",
//     fontSize: 16,
//     color: "#333",
//   },
// });
