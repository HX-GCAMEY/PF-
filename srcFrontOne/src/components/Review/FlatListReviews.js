import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {ScrollView} from "react-native";
import ReviewCard from "../Review/ReviewCard";
import {getReviews} from "../../Redux/Actions/reviews";
import {LinearGradient} from "expo-linear-gradient";

const FlatListReviews = () => {
  const user = useSelector((state) => state.userReducer.session);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getReviews(user.email));
  }, []);

  const reviews = useSelector((state) => state.reviewReducer.review);

  return (
    <ScrollView>
      <LinearGradient colors={["#06C5C5", "#14366F"]} style={{height: "50%"}}>
        {reviews[0] &&
          reviews.map((e) => (
            <ReviewCard
              key={Math.random()}
              text={e.text}
              rate={e.rate}
              flight_id={e.flight_id}
            />
          ))}
      </LinearGradient>
    </ScrollView>
  );
};

export default FlatListReviews;
