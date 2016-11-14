var equation = {
  val1: "",
  val2: "",
  operator: ""
};

var result;

$(document).ready(function(){

  $('span').on('click', 'div', addToProblem)

function addToProblem() {

  if(equation.operator == "") {
  switch ($(this).attr('class')) {
    case "number":
      if (checkDecimal(equation.val1) || $(this).attr('id') != "decimal"){
        equation.val1 += $(this).text();
        appendToDom(equation.val1);
      }
      break;
    case "operator":
      equation.operator = $(this).attr('id');
      appendToDom(equation.val1 + equation.operator);
      break;
    }
  } else if(equation.operator != "") {
      switch ($(this).attr('class')) {
        case "number":
          if (checkDecimal(equation.val2) || $(this).attr('id') != "decimal"){
            equation.val2 += $(this).text();
            appendToDom(equation.val1 + equation.operator + equation.val2);
          }
          break;
        case "equals":
          sendEquation();
          break;
      }
  }
}


function checkDecimal(number) {
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



});
