import React, {useState, useRef} from "react";
import { View, Text, FlatList, Animated} from "react-native";
import styles from "./styles";
import slides from "./Slides";
import Onboarding from "./Onboarding";
// import Paginator from "./Paginator";

const About = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0))
    const slidesRef = useRef(null);


    const itemsChanged = useRef(({viewableItems}) => {
        setCurrentIndex(viewableItems[0].index)
    });

    const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50});

    return (
        <View style={styles.container}>
            <View style={{flex: 3}}>
            <FlatList data={slides} 
            renderItem={({item}) => <Onboarding item={item} /> }
            horizontal
            showsHorizontalScrollIndicator
            pagingEnabled
            bounces={false}
            keyExtractor={(item) => item.id}
            onScroll={Animated.event([{nativeEvent: { contentOffSet: { x: scrollX }}}], {
                useNativeDriver: false
            }).current}
            scrollEventThrottle={32}
            onViewableItemsChanged={itemsChanged.current}
            viewabilityConfig={viewConfig.current}
            ref={slidesRef}
            />
        </View>

        {/* <Paginator data={slides} scrollX={scrollX} /> */}
        </View>
    )
}

export default About;