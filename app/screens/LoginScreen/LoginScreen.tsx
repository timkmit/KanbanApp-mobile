import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoginScreenProps } from '@/components/navigation/types/navigation';

const LoginScreen = ({ navigation }: LoginScreenProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://31.128.38.203/api/auth/login', { email, password });
      await AsyncStorage.setItem('token', response.data.token);
      navigation.replace('Main');
    } catch (error) {
      Alert.alert('Ошибка входа', 'Неверные данные или проблемы с сервером.');
    }
  };

  return (
    <View>
      <Text>Логин</Text>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Пароль" value={password} onChangeText={setPassword} secureTextEntry />
      <Button title="Войти" onPress={handleLogin} />
    </View>
  );
};

export default LoginScreen;