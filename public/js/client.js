var equation = {
  num1: "",
  num2: "",
  operator: ""
};

var result;

$(document).ready(function(){

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
  } else if(equation.operator != "") {
      switch ($(this).attr('class')) {
        case "number":
          if (validateDecimal(equation.num2) || $(this).attr('id') != "decimal"){
            equation.num2 += $(this).text();
            appendToDom(equation.num1 + equation.operator + equation.num2);
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
}

function sendEquation() {
  $.ajax({
    type: 'POST',
    url: '/math',
    data: equation,
    success: function() {
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
    case "*":
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
      appendToDom(result.answer);
    }
  });
}

$('#clear').on('click', function (x){
  $('#output').empty(x);
});

});
