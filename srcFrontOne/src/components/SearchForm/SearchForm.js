import React, { useEffect, useState } from 'react'
import { Text, View, SafeAreaView, TouchableOpacity, Alert, Modal, Pressable } from 'react-native';
import { connect, useDispatch, useSelector } from 'react-redux'
import { getFlights, getAllFlights, getFlightsByRoute, clearGetFlightsByRoute, getCities, sortAction, filterPrice } from '../../Redux/Actions/flights'
import { LinearGradient } from 'expo-linear-gradient'
import { Center, Box, NativeBaseProvider, Button, Select, CheckIcon, Input } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Foundation from 'react-native-vector-icons/Foundation'
import DateTimePicker from '@react-native-community/datetimepicker'
import { Searchbar } from 'react-native-paper'
import styles from './styles';
import { Dimensions } from 'react-native';
import FlatListRender from './FlatListRender'
import CustomInput from './CustomInput'
import ModalLoading from './ModalLoading'

let { width } = Dimensions.get('window');

const SearchForm = ({ flights, getFlights, getFlightsByRoute, clearGetFlightsByRoute }) => {
  const dispatch = useDispatch()
  const cities = useSelector((state) => state.flightsReducers.getCities);
  const flightsByRoute1 = useSelector((state) => state.flightsReducers.flightsByRoute)
  let flightsByRoute = flightsByRoute1?.matchedFlights
  let flightSuggestions = flightsByRoute1?.sameDateFlights

  const [depart, setDepart] = useState('')
  const [arrival, setArrival] = useState('')

  const today = new Date()
  const [date, setDate] = useState(today)
  const [view, setView] = useState(false);
  const [viewFilter, setViewFilter] = useState(false)
  const [sortPrice, setSortPrice] = useState('')
  const [toFilter, setToFilter] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    dispatch(getCities());
    dispatch(getAllFlights());
    getFlights();
  }, [])

  const submitPrice = (value) => {
    setSortPrice(value)
    if (value !== '') {
      dispatch(sortAction(value));
    }
  }

  const handleChangeToFilter = (text) => {
    if (/[0-9(\s)]/g.test(text) || text === '') {
      setToFilter(text)
    }
  }
  const closeModalInvisible = () => {
    setViewFilter(false)
    setToFilter('')
  }

  const sendFilterData = (price) => {
    if (price < 185) {
      return Alert.alert('FlyMate', 'price must be at least $185.000')
    }
    const priceElevated = price * 1000
    dispatch(filterPrice(priceElevated));
    setViewFilter(false)
    setToFilter('')
    setLoading(true)
  }
  const resetFilter = () => {
    setLoading(true)
    const parsedDate = date.toISOString().slice(0, 10);
    getFlightsByRoute(depart, arrival, parsedDate)
  }

  const onSubmit = (e) => {
    if (!depart || !arrival) {
      return Alert.alert('FlyMate', 'please select Departure and Arrival Airports')
    }
    if (depart === arrival) {
      return Alert.alert('FlyMate', 'you have to choose different places')
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

  return (
    <NativeBaseProvider>
      <SafeAreaView style={styles.inputContainer} >
        <LinearGradient
          style={styles.gradientContainerSearch} colors={['#07C5C5', '#0184A0']}>
          <Text style={styles.textInputsNames} >Departure</Text>
          <Center>
            <View maxW='500' >
              <ModalLoading loading={loading} setLoading={setLoading} />
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
                  return searchTerm
                    && city.includes(searchTerm)
                    && city !== searchTerm
                })
                  .map(item =>
                    <View
                      style={styles.dropdownRow}
                      key={item.toString()} >
                      <Text
                        style={styles.textInputs}
                        key={item.toString()}
                        onPress={() => setDepart(item)}  >
                        ↗{item}
                      </Text>
                    </View>
                  )}
              </View>
            </View>
          </Center>
          <Text style={styles.textInputsNames} >Arrival</Text>
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
                  return searchTerm
                    && city.includes(searchTerm)
                    && city !== searchTerm
                })
                  .map(item =>
                    <View style={styles.dropdownRow}
                      key={item.toString()} >
                      <Text
                        style={styles.textInputs}
                        key={item.toString()}
                        onPress={() => setArrival(item)} >
                        ↘{item}
                      </Text>
                    </View>
                  )}
              </View>
            </Box>
          </Center>
          <View>
            <Foundation
              name='calendar' size={35} color={'#1b1b1f'} style={styles.iconDate} />
            <CustomDatePicker
            />
          </View>
          <View style={{ marginBottom: 500 }} >
            <Button
              style={styles.findButton}
              alignItems='center'
              onPress={onSubmit}>Find it!</Button>
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
                      style={styles.viewContModalSearch}>
                      <View style={styles.selectSortView}>
                        {/* <Image source={miniLogo} style={styles.miniLogoSearch} /> */}
                        <Select
                          style={[styles.selectSort, { width: width }]}  //styles.selectSort
                          selectedValue={sortPrice}
                          backgroundColor={'#25235a10'}
                          borderRadius='5'
                          minWidth='120'
                          maxWidth='120'
                          marginRight={2}
                          accessibilityLabel='Order'
                          placeholder='Order'
                          _selectedItem={{
                            bg: 'teal.600',
                            endIcon: <CheckIcon size='5' />
                          }} mt={1} onValueChange={itemValue => submitPrice(itemValue)}>
                          <Select.Item label='Order Flights' value='' />
                          <Select.Item label='💲 Lower Price' value='low' />
                          <Select.Item label='💲 Higher Price' value='high' />
                          <Select.Item label='🕑 Earlier' value='earlier' />
                          <Select.Item label='🕣 Later' value='later' />
                        </Select>
                        <View style={styles.buttonsFilterContainer}>
                          <TouchableOpacity
                            onPress={() => setViewFilter(true)}
                          >
                            <Text style={styles.filterButton} >Filter Price</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => resetFilter()}
                          >
                            <Text style={styles.filterButtonClear} >Clear Filter</Text>
                          </TouchableOpacity>
                        </View>
                        <Modal
                          animationType='none'
                          onDismiss={() => console.log('close')}
                          onShow={() => { }}
                          transparent
                          visible={viewFilter}
                        >
                          <View style={styles.modalFilter} >
                            <View keyboardShouldPersistTaps={true} style={styles.filterPriceView} >
                              <View style={styles.modalView}>
                                <View>
                                  <TouchableOpacity onPress={() => closeModalInvisible()} style={styles.closeModalFilter} >
                                    <FontAwesome name='close' color={'#e5ab17ed'} size={44} />
                                  </TouchableOpacity>
                                </View>
                                <Text style={styles.textFilterMaximum}>Select maximum price</Text>
                                <View style={styles.viewCustomInput}>
                                  <CustomInput
                                    handleChangeToFilter={handleChangeToFilter}
                                    toFilter={toFilter} />
                                  <View style={styles.textDecimals} >
                                    <Text style={styles.textDecimals2} > .000</Text>
                                  </View>
                                </View>
                                <View>
                                  <Pressable onPress={() => sendFilterData(Number(toFilter))}>
                                    <LinearGradient
                                      colors={['#06C5C5', '#06C5C5']}
                                      style={styles.gradientPressableFilter}>
                                      <Text style={styles.gradientPressableTextFilter}>Filter</Text>
                                    </LinearGradient>
                                  </Pressable>
                                </View>
                              </View>
                              <Box alignItems='center'>
                              </Box>
                            </View>
                          </View>
                        </Modal>
                      </View>
                      <View>
                        <TouchableOpacity onPress={() => onCloseModal()}>
                          <Ionicons
                            name='close-circle-outline'
                            color={'#c89513fb'}
                            size={47}
                            style={styles.closeModalIcon} />
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View style={styles.viewFlatListRender}>
                      <FlatListRender
                        flightsByRoute1={flightsByRoute1}
                        flightSuggestions={flightSuggestions}
                        flightsByRoute={flightsByRoute}
                        date={date}
                        onCloseModal={onCloseModal}
                      />
                    </View>
                  </View>
                </View>
              </LinearGradient>
            </Modal>
          </View>
        </LinearGradient >
      </SafeAreaView >
    </NativeBaseProvider >
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




