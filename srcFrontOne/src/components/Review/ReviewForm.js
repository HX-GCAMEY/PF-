import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Text, View, StyleSheet, Button } from 'react-native'
import { Formik, useField } from 'formik'
import StyledReviewInput from './StyledReviewInput'
import { postReview } from '../../Redux/Actions/reviews'
import { useNavigate } from "react-router-native";
import { useRoute } from "@react-navigation/native";

const ReviewForm = () => {

    //console.log('is it UP??')

    const route = useRoute();
    const flight_id = route.params;
    console.log(flight_id);
    const styles = StyleSheet.create({
        form: {
            margin: 20
        },
        error: {
            color: 'red',
            fontSize: 15,
            marginBottom: 20,
            marginTop: -5
        }
    })

    const validate = values => {
        const errors = {}

        if(!values.email){
            errors.email = 'E-mail is required!'
        }
        else if(!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi.test(values.email)){
            errors.email = 'Invalid E-mail address.'
        }

        if(values.stars === null){
            errors.stars = 'This field is required.'
        }
        else if(values.stars < 1 || values.stars > 5){
            errors.stars = 'Rating should be between 1 and 5 stars.'
        }

        if(!values.comment){
            errors.comment = 'A comment is required.'
        }
        else if(values.comment.length > 200){
            errors.comment = '200 character limit exceeded!'
        }
    }

    const dispatch = useDispatch()

    const navigate = useNavigate();

    const user = useSelector((state) => state.userReducer.session);

    const initialValues = {
        user_id: `${user.email}`,
        comment: '',
        rate: 3,
        flight_id: `${flight_id}`
    }
    
    const InputValue = ({ name, ...props }) => {
        const [field, meta, helpers] = useField(name)

        return(
            <>
                <StyledReviewInput
                    error={meta.error}
                    value={field.value}
                    onChangeText={value => helpers.setValue(value)}
                    {...props}/>
                {meta.error && <Text style={styles.error} >{meta.error}</Text>}
            </>
        )
    }

    return (
        <Formik validate={validate} initialValues={initialValues}
        onSubmit={(values) => {
            dispatch(postReview(values));
            //navigate('/HomePage');
        }}>
            {({ handleSubmit }) => {
                return(
                    <View style={styles.form} >
                        <View style={{alignItems: 'center'}}>
                            <Text style={{color: 'black', fontSize:20, fontWeight: 'bold'}}>Post a review:</Text>
                        </View>
                        <InputValue
                            name='rate'
                            placeholder='Rating'/>
                        <InputValue
                            name='comment'
                            placeholder='Comment'/>
                        <Button onPress={handleSubmit}
                        title='Submit Review'
                        style={{backgroundColor: '#004173', width: 100, marginTop: 20, alignSelf: 'center', borderRadius: 15, height: 60}}/>
                    </View>
                )
            }}
        </Formik>
    )
}

export default ReviewForm