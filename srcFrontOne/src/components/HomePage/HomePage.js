import React, { useRef, useState } from "react";
import { View, Text, SafeAreaView, TouchableOpacity, FlatList, Animated, Dimensions} from "react-native";
import styles from "./styles";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import slides from "./slides";
import Cards from "./cards";
import SearchForm from "../SearchForm/SearchForm";

const HomePage = () => {


    const width = Dimensions.get("window").width;
    const height = Dimensions.get("window").height;


    const ANCHO_CONTENEDOR = width * 0.7;
    const ESPACIO = 10;

    const [/*currentIndex*/, setCurrentIndex] = useState(0);
    const scrollx = useRef(new Animated.Value(0))
    const slidesRef = useRef(null)

    const itemsChanged = useRef(({viewableItems}) => {
        setCurrentIndex(viewableItems[0].index)
    });

    const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50});


    const categories = ["Featured", "Your Selection", "News"];

    const [categoryIndex, setCategoryIndex] = useState(0);

    const CategoryList = () => {
        return (
            <View style={styles.categoryContainer}>
                {categories.map((item, index) => (
                    <TouchableOpacity key={index} onPress={() => setCategoryIndex(index)}>
                    <Text  
                    style={[styles.categoryText, categoryIndex === index && styles.categoryTextSelected ]}>{item}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        )
    } 


    return (
        <SafeAreaView style={{flex: 1, paddingHorizontal: 0, backgroundColor: '#C1DEE7'}}>
            <View style={styles.header}>
                <View>
                    <Text style={{fontSize: 25, fontWeight: 'bold', marginTop: 40, color: '#0183A0'}}>User</Text>
                    <View>
                        <SearchForm />
                    </View>
                    <Text style={{fontSize: 25, fontWeight: 'bold', marginTop: 290}}>Discover</Text>
                </View>
                <EvilIcons name="user" size={50} style={{marginTop: 40}}/>
            </View>
            <View style={{widht: 30}}>
            </View>
            <CategoryList />
            <View style={{paddingHorizontal: 3}}>
            <FlatList
                data={slides}
                renderItem={({item}) => <Cards style={{width: ANCHO_CONTENEDOR}} item={item} />}
                horizontal
                showsHorizontalScrollIndicator
                pagingEnabled
                decelerationRate={0}
                snapToInterval={ANCHO_CONTENEDOR}
                bounces={false}
                onScroll={Animated.event([{nativeEvent: { contentOffSet: { x: scrollx }}}], {
                    useNativeDriver: false
                }).current}
                scrollEventThrottle={45}
                onViewableItemsChanged={itemsChanged.current}
                viewabilityConfig={viewConfig.current}
                ref={slidesRef}
            />

            </View>

        </SafeAreaView>
    )
}

export default HomePage;