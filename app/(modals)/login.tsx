import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { useWarmUpBrowser } from "@/hooks/useWarmUpBrowser";
import { defaultStyles } from "@/constants/Styles";
import Colors from "@/constants/Colors";
import AuthButton from "@/components/AuthButton";
import { useOAuth, useSSO } from "@clerk/clerk-expo";
import { OAuthStrategy } from "@clerk/types";
import { useRoute } from "@react-navigation/native";
import { useRouter } from "expo-router";

const Login = () => {
  useWarmUpBrowser();

  const router = useRouter();
  const { startSSOFlow } = useSSO();
  const [isLoading, setIsLoading] = useState(false);

  const handleOAuthSignIn = async (strategy: OAuthStrategy) => {
    try {
      setIsLoading(true);
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy: strategy,
      });

      if (createdSessionId && setActive) {
        setActive({ session: createdSessionId });
        router.back();
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        autoCapitalize="none"
        placeholder="Email"
        style={styles.inputField}
      />
      <TouchableOpacity
        activeOpacity={0.8}
        style={defaultStyles.btn}
        disabled={isLoading}
        onPress={() => {}}
      >
        <Text style={defaultStyles.btnText}>Continue</Text>
      </TouchableOpacity>

      <View style={styles.separatorView}>
        <View style={styles.separatorLine} />
        <Text style={{ color: Colors.grey }}>or</Text>
        <View style={styles.separatorLine} />
        <View />
      </View>

      <View>
        <AuthButton
          text="Continue with Google"
          iconName="google"
          isLoading={isLoading}
          onPress={() => {
            handleOAuthSignIn("oauth_google");
          }}
        />
        <AuthButton
          text="Continue with Apple"
          iconName="apple"
          iconSize={22}
          isLoading={isLoading}
          onPress={() => {
            handleOAuthSignIn("oauth_apple");
          }}
        />
        <AuthButton
          text="Continue with Facebook"
          iconName="facebook"
          isLoading={isLoading}
          onPress={() => {
            handleOAuthSignIn("oauth_facebook");
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...defaultStyles.container,
    padding: 26,
  },
  inputField: {
    ...defaultStyles.inputField,
    marginBottom: 16,
  },
  separatorView: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginTop: 26,
    marginBottom: 26,
  },
  separatorLine: {
    flex: 1,
    borderBottomColor: Colors.lightGrey,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
export default Login;
