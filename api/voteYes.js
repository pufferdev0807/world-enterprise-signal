const axios = require("axios");
const queryString = require("querystring");
const { EVENT_SIGNAL_URL } = require("../config");

module.exports = async (address, account, proposalIndex) => {
  try {
    proposalIndex = Number(proposalIndex);

    const data = {
      address,
      account,
      proposalIndex,
    };
    console.log(
      "VoteYes",
      address,
      account,
      proposalIndex,
    );
    const queryStr = queryString.stringify(data);

    await axios({
      method: "POST",
      url: `${EVENT_SIGNAL_URL}/vote-yes?${queryStr}`,
      headers: { "Content-Type": "application/json; charset=utf-8" },
    });

    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};
