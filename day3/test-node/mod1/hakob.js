const hakob = function() {
  console.log("Log from Module 1 - HAKOB");
}

module.exports = {
  fn1: function() {
    console.log("Log from Module 1");
  },
  hakob: hakob,
}