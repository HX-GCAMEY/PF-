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

const SearchForm = ({ flights, getFlights, getFlightsByRoute, clearGetFlightsByRoute }) => {
  const navigation = useNavigation()
  const dispatch = useDispatch()

  // const flights = useSelector((state) => state.flightsReducers.flights.flights);
  const cities = useSelector((state) => state.flightsReducers.getCities);
  const flightsByRoute = useSelector((state) => state.flightsReducers.flightsByRoute)
  // const flightsByRoute = [flightsByRoute1]
  const [depart, setDepart] = useState('')
  const [arrival, setArrival] = useState('')
  const [information, setInformation] = useState([])

  const today = new Date()
  const [date, setDate] = useState(today)
  const [view, setView] = useState(false);
  const [isSelected, setIsSelected] = useState(false)


  useEffect(() => {
    dispatch(getCities())
    // clearGetFlightsByRoute()
  }, [])


  const filterData = (data) => {
    return data?.filter((a) => {
      return a.departure.city === depart && a.arrival.city === arrival
    })
  }

  const onSubmit = (e) => {
    // setInformation([])
    if (!depart || !arrival) return Alert.alert("FlyMate", "please select Departure and Arrival Airports")
    // else if (isSelected) {
    const parsedDate = date.toISOString().slice(0, 10);
    getFlightsByRoute(depart, arrival, parsedDate)
    // setInformation([flightsByRoute])
    // } else {
    //   getFlights()
    //   let pushFunc = filterData(flights)
    //   setInformation(pushFunc)
    // }
    setView(true)
  }

  const onCloseModal = () => {
    setView(false);
    clearGetFlightsByRoute()
    // setInformation([]);
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
          {/* <Checkbox
            style={styles.checkbox}
            value={isSelected}
            onValueChange={setIsSelected}
            aria-label="a"
          /> */}
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

  const Item = () => {
    flightsByRoute && Object.values(flightsByRoute).map((el, index) => {
      return (
        <Pressable
          key={index}
          style={styles.rendInput}
          onPress={() => navigation.navigate('Detail')} >
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
    })
  };

  const renderItem = ({ el }) => (
    <Item title={el._id} key={el._id} />
  );

  // console.log("flights", flights)
  console.log("flightsByRoute", flightsByRoute)
  // console.log("information", information)
  // console.log("AAAAA", date.toISOString().slice(0, 10))
  // console.log("depart", encodeURI(depart))
  // console.log(arrival, depart)
  // console.log(flights)
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
                    {typeof flightsByRoute === 'object' && flightsByRoute._id ?
                      <Pressable
                        key={flightsByRoute._id}
                        style={styles.rendInput}
                        onPress={() => navigation.navigate('Detail')} >
                        <LinearGradient colors={['#07C5C5', '#0184A0']} style={styles.container}>
                          <View style={{ top: 0, left: 0, right: 0, position: 'absolute', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={styles.date}>Date: {flightsByRoute.departure.date}</Text>
                            <Text style={styles.departureCard}>Depart: {flightsByRoute.departure.airportCode}</Text>
                            <Text style={styles.arrivalCard}>Arrival: {flightsByRoute.arrival.airportCode}</Text>
                            <Text style={styles.price}>Price: $ {flightsByRoute.defaultFare}</Text>
                          </View>
                        </LinearGradient>
                      </Pressable>
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
// export default SearchForm



{/* flightsByRoute ?
                        <FlatList
                          data={flightsByRoute}
                          renderItem={renderItem}
                          keyExtractor={flight => flight?._id}
                        /> */}