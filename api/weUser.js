const axios = require("axios");
const { EVENT_WE_USER_URL } = require("../config");

module.exports.processUser = async (address, shareAmount, ipfs, enterprise) => {
  let userInfo = {};
  let _enterpriseObj = {};
  _enterpriseObj[enterprise] = {
    amount: parseFloat(shareAmount),
    ipfs: ipfs,
  };

  try {
    const res = await axios
      .get(`${EVENT_WE_USER_URL}/user/${address}`)
      .then((response) => {
        if (response.data?.error) throw response.data?.msg;
        return response;
      });

    if (res.data?.exists) {
      userInfo = { ...res.data };
      userInfo["enterprises"] = JSON.stringify({
        ...res.data?.enterprises,
        ..._enterpriseObj,
      });
    } else {
      userInfo["enterprises"] = _enterpriseObj;
    }
  } catch (e) {
    console.error("====we user error====", e);
    userInfo["enterprises"] = _enterpriseObj;
  }

  return userInfo;
};

module.exports.saveUser = (address, userInfo) => {
  return axios
    .post(`${EVENT_WE_USER_URL}/user/${address}`, userInfo)
    .then((response) => {
      if (response.data?.error) throw response.data?.msg;
      return response;
    });
};