import _ from "lodash";
import data from "../data.json";

export const contains = ({ title, description }, query) => {
  if (title.includes(query) || description.includes(query)) {
    return true;
  }

  return false;
};

export const getData = () => {
  //     return new Promise((resolve, reject) => {
  //     if (query.length === 0) {
  //       resolve(_.take(users, limit));
  //     } else {
  //       const formattedQuery = query.toLowerCase();
  //       const results = _.filter(users, (user) => {
  //         return contains(user, formattedQuery);
  //       });
  //       resolve(_.take(results, limit));
  //     }
  //   });

  // const data = fetch('') ;
  return data;
};
