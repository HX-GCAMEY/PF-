import React, { useEffect, useState } from 'react'
import { Text, View, SafeAreaView, FlatList, Pressable, Modal, TouchableOpacity, Alert } from "react-native";
import { connect, useDispatch, useSelector } from "react-redux"
import { getFlights, getFlightsByRoute, clearGetFlightsByRoute, getCities } from "../../Redux/Actions/flights"
import { LinearGradient } from "expo-linear-gradient"
import { useNavigation } from '@react-navigation/native';
import { Center, Box, NativeBaseProvider, Button } from "native-base";
import AntDesign from "react-native-vector-icons/AntDesign";
import DateTimePicker from '@react-native-community/datetimepicker'
import Checkbox from 'expo-checkbox';
import { Searchbar } from 'react-native-paper'
import styles from "./styles";
import ListItem from './ListItem';

const SearchForm = ({ flights, getFlights, getFlightsByRoute, clearGetFlightsByRoute }) => {
  const navigation = useNavigation()
  const dispatch = useDispatch()

  // const flights = useSelector((state) => state.flightsReducers.flights.flights);
  const cities = useSelector((state) => state.flightsReducers.getCities);
  const flightsByRoute = useSelector((state) => state.flightsReducers.flightsByRoute)

  const [depart, setDepart] = useState('')
  const [arrival, setArrival] = useState('')

  const today = new Date()
  const [date, setDate] = useState(today)
  const [view, setView] = useState(false);


  useEffect(() => {
    function oneTime() {
      if (!cities || !flights) {
        dispatch(getCities())
        getFlights()
      }
    }
    oneTime()
  }, [])

  const onSubmit = (e) => {
    if (!depart || !arrival) {
      return Alert.alert("FlyMate", "please select Departure and Arrival Airports")
    }
    const parsedDate = date.toISOString().slice(0, 10);
    getFlightsByRoute(depart, arrival, parsedDate)
    setView(true)
  }

  const onCloseModal = () => {
    setView(false);
    clearGetFlightsByRoute()
  }

  const CustomDatePicker = () => {
    const [datePickerDepart, setDatePickerDepart] = useState(false)

    const showDatePickerDepart = () => {
      setDatePickerDepart(true)
    }
    const onDateSelectedDepart = (e, value) => {
      setDate(value)
      setDatePickerDepart(false)
    }
    return (
      <View style={styles.MainContainer}>
        {datePickerDepart && (
          <DateTimePicker
            minimumDate={Date.parse(new Date())}
            value={date}
            mode={'date'}
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            is24Hour={true}
            onChange={onDateSelectedDepart}
            style={styles.datePicker}
          />
        )}
        <View style={{ margin: 10, minHeight: 100 }} >
          <Button
            style={styles.buttonDate}
            title='Select Date'
            color='#376dac'
            onPress={showDatePickerDepart}
            alignItems='center'
            disabled={false}
          >{date.toDateString()}</Button>
        </View>
      </View>
    )
  }
  // console.log("flightsByRoute", flightsByRoute)

  return (
    <NativeBaseProvider>
      <SafeAreaView style={styles.inputContainer} >
        <LinearGradient
          style={{
            height: 300,
            marginTop: 10,
            marginLeft: 34,
            width: 300,
            borderRadius: 10,
          }} colors={['#07C5C5', '#0184A0']}>
          <Text style={[styles.textInputs, { marginTop: 30 }]} >→ Departure:</Text>
          <Center>
            <View maxW="500" >
              <Searchbar
                style={styles.searchBar}
                value={depart}
                onChangeText={(text) => { setDepart(text) }}
                placeholder="Departure"
              />
              <View style={styles.dropdown}  >
                {cities.filter(item => {
                  const searchTerm = depart.toLowerCase();
                  const city = item.toLowerCase();
                  return searchTerm && city.includes(searchTerm) && city !== searchTerm
                })
                  .map(item =>
                    <View style={styles.dropdownRow} key={item.toString()} >
                      <Text key={item.toString()} onPress={() => setDepart(item)}  >
                        {item}
                      </Text>
                    </View>
                  )}
              </View>
            </View>
          </Center>
          <Text style={[styles.textInputs, { marginTop: 10 }]} >← Arrival:</Text>
          <Center>
            <Box maxW="500">
              <Searchbar
                style={styles.searchBar}
                value={arrival}
                onChangeText={(text) => { setArrival(text) }}
                placeholder="Arrival"
              />
              <View style={styles.dropdown}  >
                {cities.filter(item => {
                  const searchTerm = arrival.toLowerCase();
                  const city = item.toLowerCase();
                  return searchTerm && city.includes(searchTerm) && city !== searchTerm
                })
                  .map(item =>
                    <View style={styles.dropdownRow} key={item.toString()} >
                      <Text key={item.toString()} onPress={() => setArrival(item)} >
                        {item}
                      </Text>
                    </View>
                  )}
              </View>
            </Box>
          </Center>
          <CustomDatePicker
          />
          <View style={{ marginBottom: 500 }} >
            <Button
              style={{
                width: 100,
                height: 40,
                alignSelf: 'center',
                marginTop: -40,
                color: '#ffff',
                backgroundColor: '#252440'
              }} alignItems='center' title="Find it!" onPress={onSubmit}>Find it!</Button>
            <Modal
              animationType='slide'
              onDismiss={() => console.log('close')}
              onShow={() => { }}
              transparent
              visible={view}
            >
              <View style={{ flex: 1, backgroundColor: '#E4E4E6', }}>
                <View style={{ height: '100%', width: '100%', backgroundColor: '#E4E4E6' }}>
                  <View
                    style={{
                      height: 45,
                      width: '100%',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                      paddingHorizontal: 5
                    }}>
                    <TouchableOpacity onPress={() => onCloseModal()}>
                      <AntDesign name='closecircle' size={28} />
                    </TouchableOpacity>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
                    {flightsByRoute[0] ?
                      <FlatList
                        data={flightsByRoute}
                        renderItem={({ item }) => <ListItem item={item} />}
                        keyExtractor={(item) => item._id}
                      />
                      :
                      <View>
                        <Text>There are no matching flights</Text>
                      </View>
                    }
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
    flights: state.flights,
    flightsByRoute: state.flightsByRoute
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getFlights: () => {
      dispatch(getFlights());
    },
    getFlightsByRoute: (departureCity, arrivalCity, departureDate) => {
      dispatch(getFlightsByRoute(departureCity, arrivalCity, departureDate));
    },
    clearGetFlightsByRoute: () => {
      dispatch(clearGetFlightsByRoute())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm)




