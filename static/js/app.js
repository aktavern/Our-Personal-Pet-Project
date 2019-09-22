d3.json("/characteristics").then(function(data) {
  var x = []
  for (var i = 0; i < length.data; i++) {
    var x = data.affection;
  }

  console.log(x)
  // var test = {}

  // for (var i = 0; i < data.length; i++) {
  //   test["name"] = data[0]
  // }

  // console.log(test)
});