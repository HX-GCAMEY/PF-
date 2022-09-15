import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  inputContainer: {
    right: 5,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    height: 100
  },
  findButton: {
    width: 100,
    height: 40,
    alignSelf: 'center',
    bottom: 64,
    color: '#ffff',
    backgroundColor: '#252440'
  },
  iconDate: {
    left: 40,
    top: 20
  },

  input: {
    height: 40,
    width: 200,
    backgroundColor: '#ffffff',
    paddingLeft: 20,
    paddingRight: 1,
    borderWidth: 0,
    alignSelf: 'center',
    borderRadius: 4,
    margin: 5,
    marginTop: 100
  },
  textInputsNames: {
    marginTop: 21,
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: 'bold',

  },
  buttonsFilterContainer: {
    flexDirection: 'row',
  },
  findFilterButton: {
    alignSelf: 'center',
    top: 0,
    borderWidth: 1.2,
    color: '#dccbcb',
    backgroundColor: '#31304e',
    borderRadius: 5,
    padding: 8,
  },
  filterButton: {
    backgroundColor: '#25235a10',
    marginRight: 10,
    top: 2,
    borderWidth: 1.2,
    borderColor: '#dccbcb',
    borderRadius: 5,
    padding: 8,

  },
  filterButtonClear: {
    backgroundColor: '#25235a10',
    marginRight: 10,
    top: 2,
    borderWidth: 1.2,
    borderColor: '#dccbcb',
    borderRadius: 5,
    padding: 8,

  },
  filterPriceComp: {
    padding: 100,
  },
  inputsFilter: {
    color: '#dccbcb'
  },
  containerModalFilter: {
    zIndex: 0,
    backgroundColor: 'transparent',
    height: 1000
  },
  filterPriceView: {
    top: 1,
    borderRadius: 20,
    // backgroundColor: '#31304e',
    zIndex: 20,
  },
  textFilterMaximum: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "bold",
    marginTop: 10
  },
  viewCustomInput: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    marginTop: 30
  },
  modalView: {
    right: 100,
    top: 200,
    width: 250,
    height: 300,
    margin: 20,
    backgroundColor: "#0399AB",
    borderRadius: 15,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalFilter: {
    backgroundColor: 'transparent',
    width: 160,
    height: 100,
    left: 160,
    top: 68,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  },
  closeModalIcon: {
    right: 25,
    top: 15
  },
  cardModal: {
    width: 360,
    height: 200,
    resizeMode: 'cover',
    borderRadius: 24,
    margin: 10,
    marginBottom: 60,
    marginTop: 2,
    opacity: 1
  },
  rendInput: {
    borderWidth: 0,
    marginTop: 15,
    marginBottom: -40,
    width: 360,
    alignSelf: 'center',
    borderRadius: 4
  },
  viewCard: {
    top: 0,
    left: 0,
    right: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
  },
  timeText: {
    fontWeight: 'bold',
    fontSize: 17,
    top: 5,
    left: 5
  },

  airCodeText: {
    top: 5,
    left: 130,
    position: 'absolute',
    alignSelf: 'center',
    fontWeight: "bold",
    fontSize: 22,
    color: '#31304ec2'
  },
  image: {
    maxHeight: 150,
    maxWidth: 150,
    marginTop: 100,
    marginBottom: -500
  },
  imageContainter: {
    alignItems: 'center'
  },
  container: {
    borderRadius: 15,
    marginHorizontal: 8,
    margin: 8,
    marginLeft: -15,
    height: 130,
    width: 390,
  },
  date: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: "bold",
    position: "absolute",
    top: 36,
    left: 134,

  },
  departureCard: {
    fontSize: 13,
    fontWeight: "bold",
    position: "absolute",
    alignSelf: 'center',
    top: 155,
    left: 20,
  },
  arrivalCard: {
    padding: 5,
    borderBottomColor: '#a67c2f56',
    borderBottomWidth: 4,
    borderRadius: 100,
    fontSize: 14.5,
    fontWeight: "bold",
    position: "absolute",
    top: 155,
    left: 20,
  },
  arrivalText: {
    width: 300,
    borderRadius: 5,
    padding: 5,
    backgroundColor: 'transparent',
    bottom: 10,
    left: 75,
    fontWeight: 'bold',
    fontSize: 17
  },
  departText: {
    borderTopColor: '#e5ab1796',
    borderTopWidth: 2,
    width: 300,
    borderRadius: 5,
    padding: 5,
    backgroundColor: 'transparent',
    top: 5,
    left: 10,
    fontWeight: 'bold',
    fontSize: 17,

  },

  price: {
    padding: 5,
    borderRadius: 7,
    backgroundColor: '#e5ab1761',
    position: "absolute",
    fontSize: 17,
    top: 155,
    left: 275,
    fontWeight: 'bold'
  },
  selectSortView: {
    display: 'flex',
    flexDirection: 'row',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    right: 189,
    top: 20,

  },
  miniLogoSearch: {
    right: 0,
    top: 5,
  },
  selectSort: {
    fontSize: 13,
    height: 35,

  },
  MainContainer: {
    borderRadius: 10,
    flex: 0,
    flexDirection: 'row',
    padding: 0,
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginTop: 10,
    maxHeight: 100,

  },

  text: {
    borderRadius: 10,
    fontSize: 18,
    fontStyle: 'bold',
    color: '#7f12e5',
    marginBottom: 45,
    textAlign: 'center',
    backgroundColor: '#fc766aa0'
  },
  gradientShadow: {
    borderRadius: 24,
    alignContent: 'center',
    justifyContent: 'center'
  },

  // Style for iOS ONLY...
  datePicker: {
    justifyContent: 'center',
    width: 320,
    height: 0,
    display: 'flex',
    flexDirection: 'row'
  },
  buttonDateLinGrad: {
    top: 10,
    borderRadius: 10,
    width: 170,
    height: 40,
    alignSelf: 'center',
    // bottom: 26,
    color: '#ffff',
    backgroundColor: '#ef8839de',
    // marginLeft: 69
  },

  buttonDate: {
    borderRadius: 6,
    width: 170,
    height: 40,
    left: 70,
    bottom: 26,
    color: '#ffff',
    backgroundColor: '#f28c25',

  },
  buttonDateText: {
    fontSize: 15,
    fontWeight: '700'
  },
  buttonDisabled: {
    fontSize: 6,
    width: 180,
    height: 40,
    alignSelf: 'center',
    marginTop: -30,
    color: '#ffff',
    backgroundColor: '#2524404a',
    marginLeft: 50
  },
  checkbox: {
    marginTop: 20,
    marginLeft: 15
  },
  searchBar: {
    height: 40,
    width: 275,
    marginTop: 5
  },
  dropdown: {
    marginTop: -.5,
    width: 275,
    top: 47,
    zIndex: 1,
    position: 'absolute',
    backgroundColor: '#d3e7e7',
    flexDirection: 'column',
    border: 10,
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
    borderTopRightRadius: 4,
    borderTopLeftRadius: 4
  },
  dropdownRow: {
    backgroundColor: 'transparent',
    display: 'flex',
    cursor: 'pointer',
    textAlign: 'start',
    margin: 2,
    zIndex: 100,
    alignSelf: 'flex-start',
    borderBottomColor: 'red'
  },
  textInputs: {
    marginLeft: 10,
    fontSize: 16,
    marginBottom: 1,
    borderBottomColor: '#07c5c575',
    borderBottomWidth: 1.9,
    borderBottomRightRadius: 16,
    padding: .1,

  },
  // loadingGif: {
  //   borderRadius: 100,
  //   overlayColor: 'white',
  //   top: 100,
  // }
  profilePicture: {
    width: 150,
    height: 200,
    borderRadius: 0,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '-30%',
    borderWidth: 4,
    borderColor: 'purple',
  },
  imgBorder: {
    width: 150,
    height: 150,
    borderRadius: 300,
    overflow: 'hidden',
    marginLeft: 'auto',
    marginRight: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '10%',
  },
  fadingContainer: {
    padding: 20,
    backgroundColor: 'transparent'
  },
  suggestionText: {
    color: '#ffff',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    borderTopWidth: 0,
    // backgroundColor: '#f0a00c74',
    borderTopColor: '#f0a10cde',
    alignSelf: 'center',
    fontSize: 14,
  },
  suggestionTextTwo: {
    top: 0,
    paddingLeft: 200,
    paddingRight: 200,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    backgroundColor: '#f0a10cde',
    alignSelf: 'center',
    fontSize: 17
  },
})

export default styles;