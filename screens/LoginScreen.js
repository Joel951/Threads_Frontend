import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Image,
    KeyboardAvoidingView,
    TextInput,
    TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigation = useNavigation();

    // useEffect(() => {
    //     const checkLoginStatus = async () => {
    //         try {
    //             const token =  AsyncStorage.getItem('authToken');
    //             if (token) {
    //                 setTimeout(() => {
    //                     navigation.replace("Main");
    //                 }, 400)

    //             }
    //         } catch (error) {
    //             console.log("LoginStatusError", error);
    //         }
    //     }
    //     checkLoginStatus();


    // }, [])


    const handleLoign = () => {
        const user = {
            email: email,
            password: password,
        };

        axios.post('http://192.168.1.3:3000/login', user).then((response) => {
            console.log(response);
            const token = response.data.token;
            AsyncStorage.setItem("authToken", token);
            navigation.navigate('Main');

        }).catch((error) => {
            Alert.alert("Login error");
            console.log("error ", error);
        });
    }

    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}>
            <View style={{ marginTop: 50 }}>
                <Image
                    style={{ width: 150, height: 100, resizeMode: "contain" }}
                    source={{
                        uri: "https://freelogopng.com/images/all_img/1688663386threads-logo-transparent.png",
                    }}
                />
            </View>

            <KeyboardAvoidingView>
                <View style={{ alignItems: "center", justifyContent: "center" }}>
                    <Text style={{ fontSize: 17, fontWeight: "bold", marginTop: 25 }}>
                        Login to Your Account
                    </Text>
                </View>

                <View style={{ marginTop: 40 }}>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 5,
                            borderColor: "#D0D0D0",
                            borderWidth: 1,
                            paddingVertical: 5,
                            borderRadius: 5,
                        }}>
                        <MaterialIcons
                            style={{ marginLeft: 8 }}
                            name="email"
                            size={24}
                            color="black"
                        />
                        <TextInput
                            style={{
                                color: "gray",
                                marginVertical: 10,
                                width: 250,
                                fontSize: email ? 16 : 16,
                            }}
                            placeholder="Enter your email"
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                        />
                    </View>

                    <View style={{ marginTop: 30 }}>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                gap: 5,
                                borderColor: "#D0D0D0",
                                borderWidth: 1,
                                paddingVertical: 5,
                                borderRadius: 5,
                            }}>
                            <Ionicons
                                style={{ marginLeft: 8 }}
                                name="lock-open"
                                size={24}
                                color="black"
                            />
                            <TextInput
                                style={{
                                    color: "gray",
                                    marginVertical: 10,
                                    width: 250,
                                    fontSize: password ? 16 : 16,
                                }}
                                placeholder="Enter your pasword"
                                value={password}
                                onChangeText={(text) => setPassword(text)}
                                secureTextEntry={true}
                            />
                        </View>
                    </View>

                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginTop: 15,
                        }}>
                        <Text>Keep me logged in</Text>
                        <Text style={{ fontWeight: "500", color: "#0077ff" }}>
                            Forgot Password?
                        </Text>
                    </View>
                </View>

                <View style={{ marginTop: 25 }} />

                <TouchableOpacity
                    onPress={handleLoign}
                    style={{
                        width: 200,
                        backgroundColor: "black",
                        marginLeft: "auto",
                        marginRight: "auto",
                        padding: 15,
                        marginTop: 40,
                        borderRadius: 6,
                    }}>
                    <Text style={{ color: "white", textAlign: 'center', fontSize: 16 }}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ marginTop: 30 }} onPress={() => navigation.navigate("Register")}>
                    <Text style={{ textAlign: 'center', fontSize: 12 }}>Don't have an account? SingUp</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({});
