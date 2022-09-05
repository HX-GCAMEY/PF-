import React, { useEffect, useState } from 'react'
import { Text, View, ScrollView, SafeAreaView, FlatList, Pressable, Image, Modal, TouchableOpacity } from "react-native";
import { connect, useDispatch, useSelector } from "react-redux"
import { getFlights } from "../../Redux/Actions/flights"
import { LinearGradient } from "expo-linear-gradient"
import styles from "./styles";
import { useNavigation } from '@react-navigation/native';
import { Select, Center, Box, CheckIcon, NativeBaseProvider, Button, Row } from "native-base";
import { flightsData } from './flightsData'
import AntDesign from "react-native-vector-icons/AntDesign";


const SearchForm = () => {
  const navigation = useNavigation()
  const flights = useSelector((state) => state.flightsReducers.flights);
  const dispatch = useDispatch()

  const [depart, setDepart] = useState('')
  const [arrival, setArrival] = useState('')
  const [information, setInformation] = useState([])
  const [view, setView] = useState(false);


  const Item = () => {
    {
      return information[0]?._id ? information.map((el) => {
        return (
          <Pressable
            key={el._id}
            style={styles.rendInput}
            onPress={() => navigation.navigate('About')} >
             <LinearGradient colors={['#07C5C5', '#0184A0']} style={styles.container}>
              <View style={{ top: 0, left: 0, right: 0, position: 'absolute', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={styles.date}>Date: {el.departure.date}</Text>
            <Text style={styles.departureCard}>Depart: {el.departure.airport}</Text>
            <Text style={styles.arrivalCard}>Arrival: {el.arrival.airport}</Text>
            <Text style={styles.price}>Price: $ {el.defaultFare}</Text>
              </View>
              </LinearGradient>
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
    setView(true)
  }
  
  return (
    <NativeBaseProvider>
      <SafeAreaView style={styles.inputContainer} >
        <LinearGradient style={{ height: 250, marginTop: 30, marginLeft: 34, width: 300, borderRadius: 10, }} colors={['#07C5C5', '#0184A0']}>
          <Text style={[styles.textInputs, { marginTop: 30 }]} >→ Departure:</Text>
          <Center>
            <Box maxW="500">
              <Select
                selectedValue={depart}
                onValueChange={(value) => setDepart(value)}
                minWidth="250"
                borderColor={'black'}
                placeholderTextColor={'black'}
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
          <Text style={[styles.textInputs, { marginTop: 10 }]} >← Arrival:</Text>
          <Center>
            <Box maxW="500" >
              <Select
                selectedValue={arrival}
                onValueChange={(value) => setArrival(value)}
                minWidth="250"
                placeholderTextColor={'black'}
                borderColor={'black'}
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
            <Button style={{ width: 100, height:40, alignSelf: 'center', marginTop: 10, color: '#ffff', backgroundColor:'#252440' }} alignItems='center' title="Find it!" onPress={onSubmit}>Find it!</Button>
            <Modal
                animationType='slide'
                onDismiss={() => console.log('close')}
                onShow={() => {}}
                transparent
                visible={view}
            >
              <View style={{flex: 1, backgroundColor: '#E4E4E6', }}>
              <View  style={{height: '100%', width:'100%', backgroundColor:'#E4E4E6'}}>
              <View  style={{height: 45, width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', paddingHorizontal: 5}}>
                <TouchableOpacity onPress={() => setView(false)}>
                <AntDesign name='closecircle' size={28} />
                </TouchableOpacity>
              </View>
              <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 20}}>
                    <FlatList
                    data={information}
                    renderItem={renderItem}
                    keyExtractor={flight => flight._id}
                  />
                  
                </View>
              </View>
              </View>
            </Modal>
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