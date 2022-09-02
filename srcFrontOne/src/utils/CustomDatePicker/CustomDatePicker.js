import React, { useState } from 'react'

import { Text, View, SafeAreaView, Button } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import styles from './styles'


const CustomDatePicker = ({ toDatePicker }) => {

  const [datePickerDepart, setDatePickerDepart] = useState(false)
  const [date, setDate] = useState(new Date())

  const showDatePickerDepart = () => {
    setDatePickerDepart(true)
  }
  const onDateSelectedDepart = (e, value) => {

    toDatePicker(date)
    setDate(value)
    setDatePickerDepart(false)
    console.log(date)
  }
  return (
    <View style={styles.MainContainer}>
      <Text style={styles.text}>{date.toDateString()}</Text>
      {datePickerDepart && (
        <DateTimePicker
          value={date}
          mode={'date'}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          is24Hour={true}
          onChange={onDateSelectedDepart}
          style={styles.datePicker}
        />
      )}
      {!datePickerDepart && (
        <View style={{ margin: 10, minHeight: 100 }}>
          <Button
            title='Select Depart Date'
            color='#376dac'
            onPress={showDatePickerDepart} />
        </View>
      )}
    </View>
  )
}

export default CustomDatePicker;






// const CustomDatePicker = ({ toDatePicker }) => {
//   const [datePickerDepart, setDatePickerDepart] = useState(false)
//   const [date, setDate] = useState(new Date())

//   const showDatePickerDepart = () => {
//     setDatePickerDepart(true)
//   }
//   const onDateSelectedDepart = (e, value) => {
//     toDatePicker(date)
//     setDate(value)
//     setDatePickerDepart(false)
//     console.log(date)
//   }
//   return (
//     <View style={styles.MainContainer}>
//       <Text style={styles.text}>{date.toDateString()}</Text>
//       {datePickerDepart && (
//         <DateTimePicker
//           value={date}
//           mode={'date'}
//           display={Platform.OS === 'ios' ? 'spinner' : 'default'}
//           is24Hour={true}
//           onChange={onDateSelectedDepart}
//           style={styles.datePicker}
//         />
//       )}
//       {!datePickerDepart && (
//         <View style={{ margin: 10, minHeight: 100 }}>
//           <Button
//             title='Select Depart Date'
//             color='#376dac'
//             onPress={showDatePickerDepart} />
//         </View>
//       )}
//     </View>
//   )
// }

