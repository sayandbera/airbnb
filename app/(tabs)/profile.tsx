import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { defaultStyles } from "@/constants/Styles";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { Link, useRouter } from "expo-router";
import { launchImageLibraryAsync } from "expo-image-picker";
import * as ImagePicker from "expo-image-picker";

const Profile = () => {
  const { signOut, isSignedIn } = useAuth();
  const { user } = useUser();
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [email, setEmail] = useState(user?.emailAddresses?.[0]?.emailAddress); //Improved null safety
  const [edit, setEdit] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.emailAddresses?.[0]?.emailAddress);
    }
  }, [user]);

  const onSaveUser = async () => {
    try {
      await user?.update({
        firstName: firstName!,
        lastName: lastName!,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onUpdateImagePress = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.75,
      base64: true,
    });

    if (!result.canceled) {
      const base64Image = `data:image/png;base64,${result.assets[0].base64}`;
      user?.setProfileImage({ file: base64Image });
    }
  };

  return (
    <SafeAreaView style={[defaultStyles.container, styles.container]}>
      {user && (
        <View style={styles.card}>
          <TouchableOpacity
            style={styles.avatarContainer}
            onPress={onUpdateImagePress}
          >
            <Image source={{ uri: user?.imageUrl }} style={styles.avatar} />
          </TouchableOpacity>

          <View style={styles.userInfo}>
            <View style={styles.nameEditContainer}>
              {edit ? (
                <>
                  <TextInput
                    placeholder="First name"
                    value={firstName || ""}
                    onChangeText={setFirstName}
                    style={[defaultStyles.inputField, styles.inputField]}
                  />
                  <TextInput
                    placeholder="Last name"
                    value={lastName || ""}
                    onChangeText={setLastName}
                    style={[defaultStyles.inputField, styles.inputField]}
                  />
                </>
              ) : (
                <Text style={styles.nameText}>
                  {firstName} {lastName}
                </Text>
              )}
              <TouchableOpacity
                onPress={() => {
                  if (edit) {
                    onSaveUser();
                  }
                  setEdit(!edit);
                }}
                style={styles.editIcon}
              >
                <Ionicons
                  name={edit ? "checkmark-outline" : "create-outline"}
                  size={24}
                  color={Colors.dark}
                />
              </TouchableOpacity>
            </View>
            <Text>{email}</Text>
            <Text style={styles.sinceText}>
              Since: {user?.createdAt?.toLocaleDateString()}
            </Text>
          </View>
        </View>
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (isSignedIn) {
              signOut();
            } else {
              router.push("/(modals)/login");
            }
          }}
        >
          <Text style={styles.buttonText}>
            {isSignedIn ? "Log Out" : "Log In"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    marginTop: 24,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 1, height: 2 },
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.lightGrey,
  },
  userInfo: {
    alignItems: "center",
    gap: 16,
  },
  nameEditContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  nameText: {
    fontSize: 22,
    fontWeight: "600",
  },
  sinceText: {
    color: Colors.lightGrey,
  },
  inputField: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 14,
    width: "100%",
  },
  editIcon: {
    padding: 10,
  },
  buttonContainer: {
    marginTop: 24,
  },
  button: {
    backgroundColor: Colors.dark,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default Profile;
