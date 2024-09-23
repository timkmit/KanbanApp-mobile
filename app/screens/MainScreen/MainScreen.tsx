import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Board } from '@/app/types/board';  

const MainScreen = () => {
  const [boards, setBoards] = useState<Board[]>([]); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBoards = async () => {
      const token = await AsyncStorage.getItem('token');
      try {
        const response = await axios.get<Board[]>('http://31.128.38.203/api/boards', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBoards(response.data);  
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchBoards();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View>
      <Text>Ваши доски:</Text>
      <FlatList
        data={boards}
        keyExtractor={(item) => item.id}  
        renderItem={({ item }) => <Text>{item.name}</Text>}
      />
    </View>
  );
};

export default MainScreen;