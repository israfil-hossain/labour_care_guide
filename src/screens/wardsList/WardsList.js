import CardView from "../../components/CardView";
import React, { useEffect, useState, useMemo } from "react";
import {
  Text,
  View,
  Image,
  TextInput,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import config from "../../config";
import fontFamily from "../../config/fontFamily";
import WardCard from "../../components/WardCard";
import { useInfiniteWards, useSearchWards } from "../../hooks/useWards";
import Toast from "react-native-toast-message";

const WardsList = ({ navigation }) => {
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Infinite scroll query for main list
  const {
    data: infiniteData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isLoadingInfinite,
    error: infiniteError,
    refetch: refetchInfinite,
  } = useInfiniteWards({}, { enabled: !debouncedSearch });

  // Search query
  const {
    data: searchData,
    isLoading: isLoadingSearch,
    error: searchError,
  } = useSearchWards(debouncedSearch, { enabled: !!debouncedSearch });

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchValue);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchValue]);

  // Show errors
  useEffect(() => {
    const error = infiniteError || searchError;
    if (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.message || "Failed to load wards",
      });
    }
  }, [infiniteError, searchError]);

  // Prepare ward list data
  const wardList = useMemo(() => {
    if (debouncedSearch) {
      // Return search results
      return searchData?.data?.docs || [];
    } else {
      // Flatten infinite scroll pages
      const pages = infiniteData?.pages || [];
      return pages.flatMap((page) => page.data?.docs || []);
    }
  }, [infiniteData, searchData, debouncedSearch]);

  const isLoading = debouncedSearch ? isLoadingSearch : isLoadingInfinite;

  const onPressOption = () => {
    // Navigate to patients list
    navigation.navigate(config.routes.PATIENTS_LIST_STACK);
    navigation.goBack();
  };

  const handleEndReached = () => {
    if (!debouncedSearch && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const handleRefresh = () => {
    if (debouncedSearch) {
      // For search, we don't have a specific refresh, but the query will auto-update
      setDebouncedSearch("");
      setSearchValue("");
    } else {
      refetchInfinite();
    }
  };

  const renderFooter = () => {
    if (!isFetchingNextPage) return null;
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color={config.colors.primary} />
      </View>
    );
  };

  const renderEmpty = () => {
    if (isLoading) {
      return (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={config.colors.primary} />
        </View>
      );
    }

    return (
      <View style={styles.noFoundView}>
        <Image
          source={require("../../assets/images/no_patient_found.png")}
          style={styles.emptyImage}
          resizeMode="contain"
        />
        <Text style={styles.emptyText}>
          {debouncedSearch
            ? "No wards found for your search"
            : config.strings.OTHERS.NO_WARD || "No wards found"}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.cardConatiner}>
        {/* Search Input */}
        <View>
          <CardView
            cardElevation={1}
            cardMaxElevation={1}
            cornerRadius={6}
            style={styles.cardView}
          >
            <View style={styles.searchIconView}>
              <Image
                style={styles.searchImg}
                source={require("../../assets/images/dashboard/searchIcon.png")}
              />
              <TextInput
                style={styles.textInputStyle}
                placeholder="Search Wards"
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={(val) => setSearchValue(val)}
                value={searchValue}
              />
            </View>
          </CardView>
        </View>

        {/* Ward List */}
        <View style={styles.scrolSubContainer}>
          <FlatList
            data={wardList}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => item?.id?.toString() || index.toString()}
            onEndReached={handleEndReached}
            onEndReachedThreshold={0.3}
            onRefresh={handleRefresh}
            refreshing={isLoading && wardList.length === 0}
            ListFooterComponent={renderFooter}
            ListEmptyComponent={renderEmpty}
            renderItem={({ item }) => {
              return (
                <WardCard
                  title={item?.name}
                  count={item?.numOfPatients}
                  navigation={navigation}
                  idWard={item?.id}
                  onPressOption={() => onPressOption(item?.id)}
                />
              );
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: config.colors.screenBackground },
  cardConatiner: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  cardView: {
    backgroundColor: "#fff",
    marginVertical: 8,
  },
  searchIconView: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 5,
  },
  searchImg: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  textInputStyle: {
    marginLeft: 16,
    fontFamily: fontFamily.LATO_REGULAR_400,
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: "400",
    width: "100%",
  },
  scrolSubContainer: {
    flex: 1,
  },
  noFoundView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 30,
  },
  emptyImage: {
    width: 200,
    height: 200,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50,
  },
  footerLoader: {
    paddingVertical: 20,
    alignItems: "center",
  },
});

export default WardsList;
