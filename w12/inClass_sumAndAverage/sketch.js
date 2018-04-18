var nums = [1, 2, 3, 4, 5, 34, 257, 456, 345, 235];

function setup() {
  var sum = 0;
  var count = 0;
  var avg = 0;
  for (var i = 0; i < nums.length; i++) {
    if (nums[i] > 5) {
      sum += nums[i];
      count++;
    }
  }
  if (count > 0) {
    avg = sum / count;
  }
  print(sum + "," + avg);
}

function draw() {

}