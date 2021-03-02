import _ from "lodash";

export const contains = ({ title, description }, query) => {
  if (title.includes(query) || description.includes(query)) {
    return true;
  }

  return false;
};
