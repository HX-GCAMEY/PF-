import React, { useEffect, useState } from 'react'
import { Text, View, SafeAreaView, FlatList, Pressable, Modal, TouchableOpacity, Alert } from "react-native";
import { connect, useDispatch, useSelector } from "react-redux"
import { getFlights, getFlightsByRoute } from "../../Redux/Actions/flights"
import { LinearGradient } from "expo-linear-gradient"
import { useNavigation } from '@react-navigation/native';
import { Select, Center, Box, CheckIcon, NativeBaseProvider, Button } from "native-base";
import AntDesign from "react-native-vector-icons/AntDesign";
import DateTimePicker from '@react-native-community/datetimepicker'
import Checkbox from 'expo-checkbox';
import styles from "./styles";


const SearchForm = () => {
  const navigation = useNavigation()
  const flights = useSelector((state) => state.flightsReducers.flights);
  // const flightsByDate = useSelector((state) => state.flightsReducers.flightsByDate)
  const dispatch = useDispatch()
  const [depart, setDepart] = useState('')
  const [arrival, setArrival] = useState('')
  const [information, setInformation] = useState([])

  const today = new Date()
  const [date, setDate] = useState(today)
  const [view, setView] = useState(false);
  const [isSelected, setIsSelected] = useState(false)

  useEffect(() => {
    dispatch(getFlights())
  }, [])

  const filterData = (data) => {
    return data.flights?.filter((a) => {
      return a.departure.city === depart && a.arrival.city === arrival
    })
  }

  const onSubmit = (data) => {
    setInformation([])
    if (!depart || !arrival) return Alert.alert("FlyMate", "please select Departure and Arrival Airports")
    else if (isSelected) {
      setInformation(getFlightsByRoute(depart, arrival, "08/10/2022"))
    } else {
      setInformation(filterData(flights))
    }
    setView(true)
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
        <View style={{ margin: 10, minHeight: 100 }}>
          <Checkbox
            style={styles.checkbox}
            value={isSelected}
            onValueChange={setIsSelected}
            aria-label="a"
          />
          <Button
            style={isSelected ? styles.buttonDate : styles.buttonDisabled}
            title='Select Date'
            color='#376dac'
            onPress={showDatePickerDepart}
            alignItems='center'
            disabled={!isSelected}
          >{isSelected ? date.toDateString() : "< Check to Select Date"}</Button>
        </View>
      </View>
    )
  }

  const Item = () => {
    return information.map((el) => {
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
    })
  };

  const renderItem = ({ item }) => (
    <Item title={item._id} />
  );
  // console.log(information)
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
                  label="Select Departure"
                  value="" />
                <Select.Item
                  label="Aeropuerto Los Cabos"
                  value="San Jose Del Cabo, Baja California Sur, México" />
                <Select.Item
                  label="Aeropuerto Mar del Plata"
                  value="Mar del Plata, Buenos Aires, Argentina" />
                <Select.Item
                  label="Ministro Pistarini, Aeropuerto Internacional"
                  value="Buenos Aires, Ciudad de Buenos Aires, Argentina" />
                <Select.Item
                  label="Benito Juarez, Aeropuerto Internacional"
                  value="Ciudad de Mexico, Mexico D.F., Mexico" />
                <Select.Item
                  label="Cancún, Aeropuerto Internacional"
                  value="Cancún, Quintana Roo, México" />
                <Select.Item
                  label="Buenos Aires Jorge Newbery, Aeropuerto"
                  value="Buenos Aires, Ciudad de Buenos Aires, Argentina" />
                <Select.Item
                  label="Gen Mariano Escobedo, Aeropuerto"
                  value="Monterrey, Nuevo León, México" />
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
                  label="Select Arrival"
                  value="" />
                <Select.Item
                  label="Aeropuerto Los Cabos"
                  value="San Jose Del Cabo, Baja California Sur, México" />
                <Select.Item
                  label="Aeropuerto Mar del Plata"
                  value="Mar del Plata, Buenos Aires, Argentina" />
                <Select.Item
                  label="Ministro Pistarini, Aeropuerto Internacional"
                  value="Buenos Aires, Ciudad de Buenos Aires, Argentina" />
                <Select.Item
                  label="Benito Juarez, Aeropuerto Internacional"
                  value="Ciudad de Mexico, Mexico D.F., Mexico" />
                <Select.Item
                  label="Cancún, Aeropuerto Internacional"
                  value="Cancún, Quintana Roo, México" />
                <Select.Item
                  label="Buenos Aires Jorge Newbery, Aeropuerto"
                  value="Buenos Aires, Ciudad de Buenos Aires, Argentina" />
                <Select.Item
                  label="Gen Mariano Escobedo, Aeropuerto"
                  value="Monterrey, Nuevo León, México" />
              </Select>
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
                    <TouchableOpacity onPress={() => setView(false)}>
                      <AntDesign name='closecircle' size={28} />
                    </TouchableOpacity>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
                    {information[0] ?
                      <FlatList
                        data={information}
                        renderItem={renderItem}
                        keyExtractor={flight => flight._id}
                      />
                      : <View>
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
    getFlightsByRoute: state.getFlightsByRoute
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getFlights: () => {
      dispatch(getFlights())
    },
    getFlightsByRoute: () => {
      dispatch(getFlightsByRoute(depart, arrival, date))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm)
// export default SearchForm