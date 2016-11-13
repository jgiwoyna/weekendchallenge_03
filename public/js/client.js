var equation = {
  num1: "",
  num2: "",
  operator: ""
};

var result;

$(document).ready(function(){
  console.log('this works');

  $('span').on('click', 'div', addToEquation)

function addToEquation() {

  if(equation.operator == "") {
  switch ($(this).attr('class')) {
    case "number":
      if (validateDecimal(equation.num1) || $(this).attr('id') != "decimal"){
        equation.num1 += $(this).text();
        appendToDom(equation.num1);
      }
      break;
    case "operator":
      equation.operator = $(this).attr('id');
      appendToDom(equation.num1 + equation.operator);
      break;
    }
    console.log(equation);
  } else if(equation.operator != "") {
      switch ($(this).attr('class')) {
        case "number":
          if (validateDecimal(equation.num2) || $(this).attr('id') != "decimal"){
            equation.num2 += $(this).text();
            appendToDom(equation.num1 + equation.operator + equation.num2);
              console.log(equation);
          }
          break;
        case "equals":
          sendEquation();
          break;
      }
  }
}


function validateDecimal(number) {
  if(number.includes(".") == false){
    return true;
  }
}

function appendToDom(x) {
  $("#output").val(x);
  console.log("ball");
}

function sendEquation() {
  $.ajax({
    type: 'POST',
    url: '/math',
    data: equation,
    success: function() {
      console.log("data!!!!!");
      router();
    }
  });
}

function router() {
  switch (equation.operator) {
    case "+":
      getAddAnswer();
      break;
    case "-":
      getSubtractAnswer();
      break;
    case "x":
      getMultiplyAnswer();
      break;
    case "÷":
      getDivideAnswer();
      break;
  }
}

function getAddAnswer() {
  $.ajax({
    type: 'GET',
    url: '/math/add',
    success: function(results) {
      result = results;
      console.log(result);
      appendToDom(result.answer);
    }
  });
}

function getSubtractAnswer() {
  $.ajax({
    type: 'GET',
    url: '/math/subtract',
    success: function(result) {
      result = results;
      console.log(result);
      appendToDom(result.answer);
    }
  });
}

function getMultiplyAnswer () {
  $.ajax({
    type: 'GET',
    url: '/math/multiply',
    success: function (results) {
      result = results;
      console.log(result);
      appendToDom(result.answer);
    }
  });
}

function getDivideAnswer () {
  $.ajax({
    type: 'GET',
    url: '/math/divide',
    success: function (results) {
      result = results;
      console.log(result);
      appendToDom(result.answer);
    }
  });
}

});
