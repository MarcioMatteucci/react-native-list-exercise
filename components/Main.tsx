import { useEffect, useState, useCallback } from "react";
import { FlatList, View, ActivityIndicator } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import UserCard from "./UserCard";

type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
};

type ApiResponse = {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
  support: {
    url: string;
    text: string;
  };
};

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

const Main = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const insets = useSafeAreaInsets();

  const getUsers = useCallback(async () => {
    if (loading || (totalPages && page > totalPages)) return;
    setLoading(true);
    try {
      const response = await fetch(`https://reqres.in/api/users?page=${page}`);
      await delay(4000); // delay para probar ActivityIndicator
      const data: ApiResponse = await response.json();
      setUsers((prevUsers) => [...prevUsers, ...data.data]);
      setPage((prevPage) => ++prevPage);
      setTotalPages(data.total_pages);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  }, [page, loading, totalPages]);

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <View style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
      {users.length === 0 ? (
        <ActivityIndicator color={"#fff"} size={"large"} />
      ) : (
        <FlatList
          data={users}
          renderItem={({ item }) => <UserCard user={item} />}
          keyExtractor={(item) => item.id.toString()}
          onEndReached={getUsers}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            loading ? <ActivityIndicator size="large" /> : null
          }
        />
      )}
    </View>
  );
}

export default Main;
