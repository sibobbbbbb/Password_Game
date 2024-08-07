function changeDesc(stringAsli, substringLama, substringBaru) {
    const regex = new RegExp(substringLama, "gi");
    return stringAsli.replace(regex, substringBaru);
  }

module.exports = changeDesc;