import React, { useEffect, useRef, useState } from "react";
import { View, Text, SafeAreaView, TouchableOpacity, FlatList, Animated, Dimensions, Image, ScrollView } from "react-native";
import styles from "./styles";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import Feather from "react-native-vector-icons/Feather"
import slides from "./slides";
import Cards from "./cards";
import CardNews from "./cardNews";
import SearchForm from "../SearchForm/SearchForm";
import { useSelector } from 'react-redux'
import logoMini from './img/logoMini.png'
import dataCardNews from "./dataCardNews";
import LoadingHome from './LoadingHome';



const HomePage = ({ navigation }) => {

    const flights = useSelector((state) => state.flightsReducers.flights.flights);
    const width = Dimensions.get("window").width;
    const height = Dimensions.get("window").height;

    const ANCHO_CONTENEDOR = width * 0.9;
    const ESPACIO = 10;

    const [/*currentIndex*/, setCurrentIndex] = useState(0);
    const scrollx = useRef(new Animated.Value(0))
    const slidesRef = useRef(null)

    const itemsChanged = useRef(({ viewableItems }) => {
        setCurrentIndex(viewableItems.index)
    });

    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 });
    const categories = ["Featured", "News"];
    const [categoryIndex, setCategoryIndex] = useState(0);


    const CategoryList = () => {
        return (
            <View style={styles.categoryContainer}>
                {categories.map((item, index) => (
                    <TouchableOpacity key={index} onPress={() => setCategoryIndex(index)}>
                        <Text style={[styles.categoryText, categoryIndex === index && styles.categoryTextSelected]}>{item}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        )
    }

    const FlatListFlights = () => {
        return (
            <FlatList
                data={flights}
                renderItem={({ item }) => <Cards style={{ width: ANCHO_CONTENEDOR }} item={item} />}
                horizontal
                showsHorizontalScrollIndicator
                pagingEnabled
                decelerationRate={0}
                snapToInterval={397} //330
                bounces={false}
                onScroll={Animated.event([{ nativeEvent: { contentOffSet: { x: scrollx } } }], {
                    useNativeDriver: false
                }).current}
                scrollEventThrottle={45}
                onViewableItemsChanged={itemsChanged.current}
                viewabilityConfig={viewConfig.current}
                ref={slidesRef}
            />
        )
    }

    const FlatListNews = () => {
        return (
            <FlatList
                data={dataCardNews}
                renderItem={({ item }) => <CardNews style={{ width: ANCHO_CONTENEDOR }} item={item} />}
                horizontal
                showsHorizontalScrollIndicator
                pagingEnabled
                decelerationRate={0}
                snapToInterval={397}
                bounces={false}
                onScroll={Animated.event([{ nativeEvent: { contentOffSet: { x: scrollx } } }], {
                    useNativeDriver: false
                }).current}
                scrollEventThrottle={45}
                onViewableItemsChanged={itemsChanged.current}
                viewabilityConfig={viewConfig.current}
                ref={slidesRef}
            />
        )
    }

    return (
        <ScrollView keyboardShouldPersistTaps='always'>
            <SafeAreaView style={{ flex: 1, paddingHorizontal: 0, backgroundColor: '#C1DEE7', minHeight: 840 }}>
                <View style={styles.header}>
                    <View>
                        <Image source={logoMini} style={styles.logoMini} />
                        <View>
                            <SearchForm />
                        </View>
                        <Text style={{ fontSize: 25, fontWeight: 'bold', marginTop: 310 }}> </Text>
                    </View>
                    <View>
                        <EvilIcons name="user" size={53} style={{ marginTop: 30, right: 100 }} onPress={() => navigation.navigate("Login")} />
                    </View>
                    <Feather name="shopping-cart" size={30} style={{ marginTop: 38, right: 90}} onPress={() => navigation.navigate("ShoppingCart", {
                        flyId: "",
                        departCity: "",
                        departAirport: "",
                        departDate: "",
                        departTime: "",
                        departAirportCode: "",
                        arrivalCity: "",
                        arrivalAirport: "",
                        arrivalDate: "",
                        arrivalTime: "",
                        arrivalAirportCode: "",
                        backgroundImage: "",
                        flyNumber: "",
                        totalSeats: "",
                        duration: "",
                        defaultFare: "",
                        passengers: ""
                    })} />
                </View>
                <View style={{ width: 30 }}>
                </View>
                <CategoryList />
                <View style={styles.viewContainerFlat}>
                    {
                        !flights
                            ? <LoadingHome />
                            : categoryIndex === 0
                                ? <FlatListFlights />
                                : categoryIndex === 1
                                    ? <FlatListNews /> : null
                    }
                </View>
            </SafeAreaView>
        </ScrollView>
    )
}

export default HomePage;