import { connect } from "react-redux";
import Nav from "./Nav";

import { getAvatarURL } from "reduxState/selectors";

export default connect(
  (state) => ({
    avatarURL: getAvatarURL(state),
  }),
  null
)(Nav);
