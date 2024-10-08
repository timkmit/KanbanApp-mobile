import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Button, FlatList, Text, TextInput, View } from 'react-native';
import { Board } from '../types/board';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { LoginScreenProps } from '@/components/navigation/types/navigation';
import { SafeAreaView } from 'react-native-safe-area-context';



const HomeScreen = ({ navigation }: LoginScreenProps) => {
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
    <SafeAreaView style={{ flex: 1, padding: 16 }}>
      <Text>Логин</Text>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Пароль" value={password} onChangeText={setPassword} secureTextEntry />
      <Button title="Войти" onPress={handleLogin} />
    </SafeAreaView>
  );
}
export default HomeScreen