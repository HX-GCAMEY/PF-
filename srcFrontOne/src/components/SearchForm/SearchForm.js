import React, { useEffect, useState } from 'react'
import { Text, View, TextInput, Button, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import CustomDatePicker from "../../utils/CustomDatePicker/CustomDatePicker"
import {useDispatch, useSelector} from "react-redux"
import {getFlights} from "../../Redux/Actions/flights"
import styles from "./styles";


const SearchForm = () => {
  // const [connDatePicker, setConnDatePicker] = useState('')
  const flights = useSelector((store) => store.flights);
  const dispatch = useDispatch()


  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      from: '',
      to: '',
      passengers: '',
      depart: ''
    }
  })

  useEffect(() => {
    dispatch(getFlights())
  }, [])
  // const onChangeDate = (e, type) => {
  //   setFormData({ ...formData, [type]: e.nativeEvent.text });
  // };

  const onSubmit = () => {
    // dispatch(getFlights())
    console.log(data)
  }

  // const onChange = arg => {
  //   return {
  //     value: arg.nativeEvent.text,
  //   }
  // }
  // console.log('fsfssfsfsfsfs', a)
  console.log('VUELOS', flights.flights)
  return (
    <View style={styles.inputContainer} >
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            multiline={false}
          />
        )}
        name='from'
      />
      {errors.from && <Text>from is required</Text>}
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            multiline={false}
          />
        )}
        name='to'
      />
      {errors.to && <Text>to is required.</Text>}
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            multiline={false}
          />
        )}
        name='passengers'
      />
      {errors.passengers && <Text>passengers is required.</Text>}
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            multiline={false}
          />
        )}
        name='depart'
      />
      {errors.depart && <Text>depart is required.</Text>}

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
      {/* <Text>{flights.flights}</Text> */}
    </View>
  )
}


export default SearchForm


{/* <Controller
        as={CustomDatePicker}
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onBlur, value } }) => (
          <CustomDatePicker
            toDatePicker={setConnDatePicker}
            onChange={onChangeDate}
            value={value}
            onBlur={onBlur}
            selected={value}
          />
        )}
        name='depart'
      /> */}


      // const SearchForm = () => {
      //   const [connDatePicker, setConnDatePicker] = useState('')
      
      //   const { control, handleSubmit, formState: { errors } } = useForm({
      //     defaultValues: {
      //       from: '',
      //       to: '',
      //       passengers: '',
      //       depart: ''
      //     }
      //   })
      
      //   // const onChangeDate = (e, type) => {
      //   //   setFormData({ ...formData, [type]: e.nativeEvent.text });
      //   // };
      
      //   const onSubmit = data => console.log(data)
      
      //   // const onChange = arg => {
      //   //   return {
      //   //     value: arg.nativeEvent.text,
      //   //   }
      //   // }
      //   // console.log('fsfssfsfsfsfs', a)
      //   return (
      //     <View style={styles.inputContainer} >
      //       <Controller
      //         control={control}
      //         rules={{
      //           required: true,
      //         }}
      //         render={({ field: { onChange, onBlur, value } }) => (
      //           <TextInput
      //             style={styles.input}
      //             onBlur={onBlur}
      //             onChangeText={onChange}
      //             value={value}
      //             multiline={false}
      //           />
      //         )}
      //         name='from'
      //       />
      //       {errors.from && <Text>from is required</Text>}
      //       <Controller
      //         control={control}
      //         rules={{
      //           required: true,
      //         }}
      //         render={({ field: { onChange, onBlur, value } }) => (
      //           <TextInput
      //             style={styles.input}
      //             onBlur={onBlur}
      //             onChangeText={onChange}
      //             value={value}
      //             multiline={false}
      //           />
      //         )}
      //         name='to'
      //       />
      //       {errors.to && <Text>to is required.</Text>}
      //       <Controller
      //         control={control}
      //         rules={{
      //           required: true,
      //         }}
      //         render={({ field: { onChange, onBlur, value } }) => (
      //           <TextInput
      //             style={styles.input}
      //             onBlur={onBlur}
      //             onChangeText={onChange}
      //             value={value}
      //             multiline={false}
      //           />
      //         )}
      //         name='passengers'
      //       />
      //       {errors.passengers && <Text>passengers is required.</Text>}
      //       <Controller
      //         control={control}
      //         rules={{
      //           required: true,
      //         }}
      //         render={({ field: { onChange, onBlur, value } }) => (
      //           <TextInput
      //             style={styles.input}
      //             onBlur={onBlur}
      //             onChangeText={onChange}
      //             value={value}
      //             multiline={false}
      //           />
      //         )}
      //         name='depart'
      //       />
      //       {errors.depart && <Text>depart is required.</Text>}
      
      //       <Button title="Submit" onPress={handleSubmit(onSubmit)} />
      //     </View>
      //   )
      // }
      