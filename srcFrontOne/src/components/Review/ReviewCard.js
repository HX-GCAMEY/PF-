import React from "react";
import {View, Text, StyleSheet} from "react-native";

const styles = StyleSheet.create({
  card: {
    marginTop: 10,
    marginBottom: 10,
    position: "relative",
    backgroundColor: "#ffffff98",
    alignSelf: "center",
    width: "90%",
    paddingVertical: 20,
    borderRadius: 6,
    shadowOpacity: 80,
    marginTop: 20,
  },
  rating: {
    fontSize: 18,
    fontWeight: "bold",
    position: "absolute",
    right: 50,
    top: 30,
  },
  comment: {
    paddingTop: 38,
    marginTop: 10,
    fontSize: 12,
    fontWeight: "bold",
    left: 20,
  },
  text: {
    margin: 20,
    fontSize: 18,
  },
});

const ReviewCard = ({text, rate, flight_id}) => {
  let starx = [];
  const stars = () => {
    for (let i = 0; i < rate; i++) {
      starx.push("⭐");
    }
    return <Text>{starx}</Text>;
  };

  return (
    <View style={styles.card}>
      <Text style={styles.comment}>Flight: {flight_id} </Text>
      <Text style={styles.rating}>{stars()}</Text>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

export default ReviewCard;
