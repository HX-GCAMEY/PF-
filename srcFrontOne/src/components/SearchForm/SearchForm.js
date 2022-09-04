import React, { useEffect, useState } from 'react'
import { Text, View, ScrollView, SafeAreaView, FlatList, Pressable, Image } from "react-native";
import { connect, useDispatch, useSelector } from "react-redux"
import { getFlights } from "../../Redux/Actions/flights"
import { LinearGradient } from "expo-linear-gradient"
import styles from "./styles";
import { useNavigation } from '@react-navigation/native';
import { Select, Center, Box, CheckIcon, NativeBaseProvider, Button } from "native-base";
import { flightsData } from './flightsData'
import flymateLogo from '../../images/flymateLogo.png'
import logoImage from '../../images/logoImage.png'
const SearchForm = () => {
  const navigation = useNavigation()
  const flights = useSelector((state) => state.flightsReducers.flights);
  const dispatch = useDispatch()

  const [depart, setDepart] = useState('')
  const [arrival, setArrival] = useState('')
  const [information, setInformation] = useState([])

  const Item = () => {
    {
      return information[0]?._id ? information.map((el) => {
        return (
          <Pressable
            key={el._id}
            style={styles.rendInput}
            onPress={() => navigation.navigate('About')} >
            <Text>Date: {el.departure.date}</Text>
            <Text>Depart: {el.departure.airport}</Text>
            <Text>Arrival: {el.arrival.airport}</Text>
            <Text>Price: $ {el.defaultFare}</Text>
          </Pressable>
        )
      }
      )
        //NO ANDA EL VIEW SI NO ENCUENTRA DATOS
        : <View>
          <Text>aada</Text>
        </View>
    }
  };

  const renderItem = ({ item }) => (
    <Item title={item._id} />
  );


  useEffect(() => {
    // setInformation([])
    dispatch(getFlights())
  }, [])

  const filterData = (data) => {
    return data.flights.filter((a) => {
      return a.departure.airport === depart && a.arrival.airport === arrival
    })
  }

  const onSubmit = (data) => {
    setInformation([])
    Item()
    setInformation(filterData(flightsData))
    // console.log(depart, arrival)
    // navigation.navigate('About')
  }
  console.log(flights)

  return (
    <NativeBaseProvider>
      <SafeAreaView style={styles.inputContainer} >
        <LinearGradient style={{ minHeight: 700 }} colors={['#07C5C5', '#0184A0']}>
          <View style={styles.imageContainter} >
            <Image source={flymateLogo} style={styles.image} />
            {/* <Image source={logoImage} /> */}
          </View>
          <Text style={[styles.textInputs, { marginTop: 100 }]} >departure</Text>
          <Center>
            <Box maxW="500">
              <Select
                selectedValue={depart}
                onValueChange={(value) => setDepart(value)}
                minWidth="250"
                accessibilityLabel="Choose Airport"
                placeholder="Choose Airport"
                _selectedItem={{
                  bg: "teal.600",
                  endIcon: <CheckIcon size="3" />
                }} mt={1} >
                <Select.Item
                  label="Aeropuerto Los Cabos"
                  value="Aeropuerto Los Cabos" />
                <Select.Item
                  label="Aeropuerto Mar del Plata"
                  value="Aeropuerto Mar del Plata" />
                <Select.Item
                  label="Ministro Pistarini, Aeropuerto Internacional"
                  value="Aeropuerto Internacional Ministro Pistarini" />
                <Select.Item
                  label="Benito Juarez, Aeropuerto Internacional"
                  value="Aeropuerto Internacional Benito Juarez" />
                <Select.Item
                  label="Cancún, Aeropuerto Internacional"
                  value="Aeropuerto Internacional Cancún" />
                <Select.Item
                  label="Buenos Aires Jorge Newbery, Aeropuerto"
                  value="Aeropuerto Buenos Aires Jorge Newbery" />
                <Select.Item
                  label="Gen Mariano Escobedo, Aeropuerto"
                  value="Aeropuerto Gen Mariano Escobedo" />
              </Select>
            </Box>
          </Center>
          <Text style={[styles.textInputs, { marginTop: 10 }]} >arrival</Text>
          <Center>
            <Box maxW="500" >
              <Select
                selectedValue={arrival}
                onValueChange={(value) => setArrival(value)}
                minWidth="250"
                accessibilityLabel="Choose Airport"
                placeholder="Choose Airport"
                _selectedItem={{
                  bg: "teal.600",
                  endIcon: <CheckIcon size="3" />
                }} mt={1} >
                <Select.Item
                  label="Aeropuerto Los Cabos"
                  value="Aeropuerto Los Cabos" />
                <Select.Item
                  label="Aeropuerto Mar del Plata"
                  value="Aeropuerto Mar del Plata" />
                <Select.Item
                  label="Ministro Pistarini, Aeropuerto Internacional"
                  value="Aeropuerto Internacional Ministro Pistarini" />
                <Select.Item
                  label="Benito Juarez, Aeropuerto Internacional"
                  value="Aeropuerto Internacional Benito Juarez" />
                <Select.Item
                  label="Cancún, Aeropuerto Internacional"
                  value="Aeropuerto Internacional Cancún" />
                <Select.Item
                  label="Buenos Aires Jorge Newbery, Aeropuerto"
                  value="Aeropuerto Buenos Aires Jorge Newbery" />
                <Select.Item
                  label="Gen Mariano Escobedo, Aeropuerto"
                  value="Aeropuerto Gen Mariano Escobedo" />
              </Select>
            </Box>
          </Center>
          <View style={{ marginBottom: 500 }} >
            <Button style={{ width: 200, alignSelf: 'center', marginTop: 20 }} alignItems='center' title="Find it!" onPress={onSubmit}>Find it!</Button>
            <View style={{ marginTop: 20 }} >
              {/* <ScrollView> */}
              <FlatList
                data={information}
                renderItem={renderItem}
                keyExtractor={flight => flight._id}
              />
              {/* </ScrollView> */}
            </View>
          </View>
        </LinearGradient>
      </SafeAreaView>
    </NativeBaseProvider>
  )
}

const mapStateToProps = (state) => {
  return {
    flights: state.flights
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getFlights: () => {
      dispatch(getFlights())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm)
// export default SearchForm