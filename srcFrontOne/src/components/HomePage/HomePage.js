import React, { useEffect, useRef, useState } from "react";
import { View, Text, SafeAreaView, TouchableOpacity, FlatList, Animated, Dimensions, Image } from "react-native";
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
const HomePage = ({ navigation }) => {

    const flights = useSelector((state) => state.flightsReducers.flights.flights);
    const width = Dimensions.get("window").width;
    const height = Dimensions.get("window").height;

    const ANCHO_CONTENEDOR = width * 0.7;
    const ESPACIO = 10;

    const [/*currentIndex*/, setCurrentIndex] = useState(0);
    const scrollx = useRef(new Animated.Value(0))
    const slidesRef = useRef(null)

    const itemsChanged = useRef(({ viewableItems }) => {
        setCurrentIndex(viewableItems[0].index)
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

    return (
        <SafeAreaView style={{ flex: 1, paddingHorizontal: 0, backgroundColor: '#C1DEE7' }}>
            <View style={styles.header}>
                <View>
                    <Image source={logoMini} style={styles.logoMini} />
                    <View>
                        <SearchForm />
                    </View>
                    <Text style={{ fontSize: 25, fontWeight: 'bold', marginTop: 310 }}> </Text>
                </View>
                <View>
                    <EvilIcons name="user" size={53} style={{ marginTop: 30, right: 30 }} onPress={() => navigation.navigate("Login")} />
                </View>
                {/* <Feather name="shopping-cart" size={30} style={{ marginTop: 47 }} /> */}
            </View>
            <View style={{ widht: 30 }}>
            </View>
            <CategoryList />
            <View style={{ paddingHorizontal: 0, paddingVertical: -10 }}>
                {
                    categoryIndex === 0
                        ?
                        <FlatList
                            data={flights}
                            renderItem={({ item }) => <Cards style={{ width: ANCHO_CONTENEDOR }} item={item} />}
                            horizontal
                            showsHorizontalScrollIndicator
                            pagingEnabled
                            decelerationRate={0}
                            snapToInterval={ANCHO_CONTENEDOR}
                            bounces={false}
                            onScroll={Animated.event([{ nativeEvent: { contentOffSet: { x: scrollx } } }], {
                                useNativeDriver: false
                            }).current}
                            scrollEventThrottle={45}
                            onViewableItemsChanged={itemsChanged.current}
                            viewabilityConfig={viewConfig.current}
                            ref={slidesRef}
                        />
                        :
                        <FlatList
                            data={dataCardNews}
                            renderItem={({ item }) => <CardNews style={{ width: ANCHO_CONTENEDOR }} item={item} />}
                            horizontal
                            showsHorizontalScrollIndicator
                            pagingEnabled
                            decelerationRate={0}
                            snapToInterval={ANCHO_CONTENEDOR}
                            bounces={false}
                            onScroll={Animated.event([{ nativeEvent: { contentOffSet: { x: scrollx } } }], {
                                useNativeDriver: false
                            }).current}
                            scrollEventThrottle={45}
                            onViewableItemsChanged={itemsChanged.current}
                            viewabilityConfig={viewConfig.current}
                            ref={slidesRef}
                        />
                }

            </View>

        </SafeAreaView>
    )
}

export default HomePage;