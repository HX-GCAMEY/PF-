import React, { useEffect, useState } from 'react'
import { Text, View, SafeAreaView, FlatList, Pressable, Modal, TouchableOpacity, Alert, ScrollView, Image } from 'react-native';
import { connect, useDispatch, useSelector } from 'react-redux'
import { getFlights, getFlightsByRoute, clearGetFlightsByRoute, getCities, sortAction } from '../../Redux/Actions/flights'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/native';
import { Center, Box, NativeBaseProvider, Button, Select, CheckIcon } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Foundation from 'react-native-vector-icons/Foundation'
import DateTimePicker from '@react-native-community/datetimepicker'
import { Searchbar } from 'react-native-paper'
import styles from './styles';
import ListItem from './ListItem';
// import logo from './img/logos.png'
import miniLogo from '../HomePage/img/logoMini.png'
// import flyWithUsLogo from './img/flyWithUs.png'
import Loading from './Loading'
import { Dimensions } from 'react-native';

let { width } = Dimensions.get('window');

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
  const [fav, setFav] = useState([]);
  const [sortPrice, setSortPrice] = useState('')

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
      return Alert.alert('FlyMate', 'please select Departure and Arrival Airports')
    }
    const parsedDate = date.toISOString().slice(0, 10);
    getFlightsByRoute(depart, arrival, parsedDate)
    setView(true)
  }

  const onCloseModal = () => {
    setSortPrice('')
    setView(false);
    clearGetFlightsByRoute()
  }

  const submitPrice = (value) => {
    setSortPrice(value)
    if (value !== '') {
      dispatch(sortAction(value));
    }
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
          ><Text style={styles.buttonDateText}>{'> ' + date.toDateString()}</Text></Button>
        </View>
      </View>
    )
  }
  // console.log('flightsByRoute', flightsByRoute)

  return (
    <NativeBaseProvider>
      <SafeAreaView style={styles.inputContainer} >
        <LinearGradient
          style={{
            height: 300,
            marginTop: 10,
            marginLeft: 24,
            width: 330,
            borderRadius: 10,
          }} colors={['#07C5C5', '#0184A0']}>
          <Text style={styles.textInputsNames} >Departure</Text>
          <Center>
            <View maxW='500' >
              <Searchbar

                placeholderTextColor={'#d3e7e7'}
                inputStyle={{ fontSize: 16.1 }}
                style={styles.searchBar}
                value={depart}
                onChangeText={(text) => { setDepart(text) }}
                placeholder='Departure'
              />
              <View style={styles.dropdown}  >
                {cities.filter(item => {
                  const searchTerm = depart.toLowerCase();
                  const city = item.toLowerCase();
                  return searchTerm && city.includes(searchTerm) && city !== searchTerm
                })
                  .map(item =>
                    <View style={styles.dropdownRow} key={item.toString()} >
                      <Text style={styles.textInputs} key={item.toString()} onPress={() => setDepart(item)}  >
                        ↗{item}
                      </Text>
                    </View>
                  )}
              </View>
            </View>
          </Center>
          <Text style={[styles.textInputsNames, { marginTop: 10 }]} >Arrival</Text>
          <Center>
            <Box maxW='500'>
              <Searchbar
                placeholderTextColor={'#d3e7e7'}
                inputStyle={{ fontSize: 16.1 }}
                style={styles.searchBar}
                value={arrival}
                onChangeText={(text) => { setArrival(text) }}
                placeholder='Arrival'
              />
              <View style={styles.dropdown}  >
                {cities.filter(item => {
                  const searchTerm = arrival.toLowerCase();
                  const city = item.toLowerCase();
                  return searchTerm && city.includes(searchTerm) && city !== searchTerm
                })
                  .map(item =>
                    <View style={styles.dropdownRow} key={item.toString()} >
                      <Text style={styles.textInputs} key={item.toString()} onPress={() => setArrival(item)} >
                        ↘{item}
                      </Text>
                    </View>
                  )}
              </View>
            </Box>
          </Center>
          <View>
            <Foundation name='calendar' size={35} color={'#1b1b1f'} style={styles.iconDate} />
            <CustomDatePicker
            />
          </View>
          <View style={{ marginBottom: 500 }} >
            <Button
              style={styles.findButton} alignItems='center' title='Find it!' onPress={onSubmit}>Find it!</Button>
            <Modal
              animationType='slide'
              onDismiss={() => console.log('close')}
              onShow={() => { }}
              transparent
              visible={view}
            >
              <LinearGradient colors={['#07C5C5', '#0184A0']} style={{ flex: 1 }} >
                <View style={{ flex: 1 }}>
                  <View style={{ height: '90%', width: '100%' }}>
                    <View
                      style={{
                        height: 45,
                        width: '100%',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        paddingHorizontal: 5
                      }}>
                      <View style={styles.selectSortView}>
                        <Image source={miniLogo} style={styles.miniLogoSearch} />
                        <Select
                          style={[styles.selectSort, { width: width }]}  //styles.selectSort
                          selectedValue={sortPrice}
                          minWidth='200'
                          accessibilityLabel='Order'
                          placeholder='Order'
                          _selectedItem={{
                            bg: 'teal.600',
                            endIcon: <CheckIcon size='5' />
                          }} mt={1} onValueChange={itemValue => submitPrice(itemValue)}>
                          <Select.Item label='Order Flights' value='' />
                          <Select.Item label='💲⬇  Lower Price' value='low' />
                          <Select.Item label='💲⬆ Higher Price' value='high' />
                          <Select.Item label='🕑  Earlier' value='earlier' />
                          <Select.Item label='🕣  Later' value='later' />
                        </Select>
                      </View>
                      <View>
                        <TouchableOpacity onPress={() => onCloseModal()}>
                          <Ionicons name='close-circle-outline' color={'#c89513fb'} size={47} style={styles.closeModalIcon} />
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
                      {flightsByRoute[0] ?
                        <View style={{ right: 10, width: 700, top: 16 }} >
                          <FlatList
                            data={flightsByRoute}
                            renderItem={({ item }) => <ListItem item={item} onCloseModal={onCloseModal} setFav={setFav} fav={fav} flightsByRoute={flightsByRoute} />}
                            keyExtractor={(item) => item._id}
                          />
                          {/* <Image source={flyWithUsLogo} style={{ position: 'absolute', alignSelf: 'center', top: -14 }} /> */}
                        </View>
                        :
                        <Loading />
                      }
                    </View>
                  </View>
                </View>
              </LinearGradient>
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




