//var bits = '1100110011001100000011000000111111001100111111001111110000000000000011001111110011111100111111000000110011001111110000001111110011001100000011'
var bits = '0001110001110111';
//var bits = '011111';
function decodeBinary(bits) {
  var bitsArr = bits.split('');
  var bitLen = bitsArr.length

  //gets ride of extra zeros at beginning and end

  if(bitsArr[0] === '0') {
    do {
      bitsArr.shift()
    }
    while (bitsArr[0] === '0')
  }
  if (bitsArr[bitsArr.length - 1] === '0') {
    do {
      bitsArr.pop()
    }
    while (bitsArr[bitsArr.length - 1] === '0')
  }

  //counts the high and low amount of 1's and 0's in a row

  var oneArr = [];
  var count1 = 0;

  //counts each set of 1 and stores the length 
  //push/pop 0 exists to make sure the array counts the last 1

  bitsArr.push('0')
  for (var i = 0; i < bitLen; i++) {
    
    if (i === bitLen-1 && bitsArr[i] === '1') {
      oneArr.push(count1 + 1);
    } else if(bitsArr[i] === '1') {
      count1++;   
    } else if (bitsArr[i] === '0' && count1 > 0) {
      oneArr.push(count1);
      count1 = 0;
    } 
  }
  bitsArr.pop('0')

  //finds and stores the max and min

  var max1 = oneArr[0];
  var min1 = oneArr[0];

  for(var i = 0; i < oneArr.length; i++) {
      var temp1MinMax = oneArr[i];
      if(max1 < temp1MinMax) {
        max1 = temp1MinMax;
      }
      if(min1 > temp1MinMax) {
        min1 = temp1MinMax;
      }
  }

  var count0 = 0;
  var zeroArr = []

  //checks for lack of zeros

  function zeroCheck(arg) {
    zeroBool = false;
    for(i = 0; i < arg.length; i++) {
      if(arg[i] === '0') {
        zeroBool = true
        break;     
      }
    }
    return zeroBool;
  }

  //Checks for 0's then counts

  if(zeroCheck(bitsArr)) {

   //counts each set of 0 and stores the length

    for (var i = 0; i < bitLen; i++) {
      if(bitsArr[i] === '0') {
        count0++;
        
      } else if (bitsArr[i] === '1') {
        zeroArr.push(count0);
        count0 = 0;
      }
    }
    
    //eliminates 0's from the array before counting
    
    for (var i = 0; i < zeroArr.length; i++) {
      for (var i = 0; i < zeroArr.length; i++) {
        do{
          if(zeroArr[(i)] === 0) {
            zeroArr.splice((i), 1)
          }  
        } while(zeroArr[i] === 0)
      }
    }
    
     //finds and stores the max and min
     
    var min0 = zeroArr[0];
    var max0 = zeroArr[0];

    for(var i = 0; i < zeroArr.length; i++) {
        var temp0MinMax = zeroArr[i];
        if(max0 < temp0MinMax) {
          max0 = temp0MinMax;
        }
        if(min0 > temp0MinMax) {
          min0 = temp0MinMax;
        }
      }
  } else {
    min0 = 0;
    max0 = 0;
  }
     
  var bitsResult = bitsArr.join('');

  //does the math based off of the high and low totals
  //then creates RegEx for the var

  var dot = min1;
  var dash = max1;
  var spaceSm = min0;
  var spaceMd = min0 * 3;
  var spaceLg =  min0 * 7;

  var dotArr = Array(dot + 1).join('1');
  var dotRegX = new RegExp('dotArr', 'g');

  var dashArr = Array(dash + 1).join('1');
  var dashRegX = new RegExp(dashArr, 'g');

  var spaceSmArr = Array(spaceSm + 1).join('0');
  var spaceSmRegX = new RegExp(spaceSmArr, 'g');

  var spaceMdArr = Array(spaceMd + 1).join('0');
  var spaceMdRegX = new RegExp(spaceMdArr, 'g');

  var spaceLgArr = Array(spaceLg + 1).join('0');
  var spaceLgRegX = new RegExp(spaceLgArr, 'g');

  //execute replace method with dynamic RegExp


  if (zeroCheck(bitsArr) && dot === dash && dot ===  min0) {
    //zero: yes   1 set of 1's  1's and 0's are equal in min
    console.log("Test 1")
    var result = bitsResult.replace(dotRegX, '.')
      .replace(spaceLgRegX, '   ')
      .replace(spaceMdRegX, ' ')
      .replace(spaceSmRegX, '')
  } else if(zeroCheck(bitsArr) && dot === dash && dot < min0) {
    //zero: yes   1 set of 1's   min0 is bigger than dot
    console.log("Test 2")
     var result = bitsResult.replace(dotRegX, '.')
      .replace(spaceLgRegX, '   ')
      .replace(spaceMdRegX, ' ')
      .replace(spaceSmRegX, ' ')
  } else if(zeroCheck(bitsArr) && dot === dash && dash > min0) {
    //zero: yes   1 set of 1's   min0 is smaller than dot, 
    //so dots are now dash
    console.log("Test 3")
     var result = bitsResult.replace(dotRegX, '-')
      .replace(spaceLgRegX, '   ')
      .replace(spaceMdRegX, ' ')
      .replace(spaceSmRegX, '')
  } else if(zeroCheck(bitsArr) === false) {
    // zero: no    1's are dot
      var result = bitsResult.replace(dashRegX, '.')
      console.log("Test 4")
  } else {
  //all sizes of 0's and 1's present
      console.log("Test 5")
      var result = bitsResult.replace(dashRegX, '-')
      .replace(dotRegX, '.')
      .replace(spaceLgRegX, '   ')
      .replace(spaceMdRegX, ' ')
      .replace(spaceSmRegX, '')
  }

  console.log(result)
}

decodeBinary('0001110001110111');
decodeBinary('1100110011001100000011000000111111001100111111001111110000000000000011001111110011111100111111000000110011001111110000001111110011001100000011');
decodeBinary('011111');