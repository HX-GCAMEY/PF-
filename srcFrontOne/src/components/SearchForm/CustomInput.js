import React from 'react'
import { Input, ScrollView } from 'native-base'
import styles from './styles'


const CustomInput = ({ toFilter, handleChangeToFilter }) => {
  return (
    <Input
      keyboardDismissMod='on-drag'
      width={100}
      borderWidth={0}
      // onSubmitEditing={() => { }}
      blurOnSubmit={false}
      keyboardShouldPersistTaps={true}
      style={styles.inputsFilter}
      keyboardType='number-pad'
      placeholder='max $'
      value={toFilter}
      onChangeText={handleChangeToFilter} />
  )
}

export default CustomInput