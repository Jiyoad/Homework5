console.log(moment());
let m = moment();
console.log(m.toString());

const test = false;

// Today's Date pulled from 'moment'
var present = m.format('MMMM Do YYYY');
console.log(present);

var now = m.format('h:mm:ss a');
console.log("var now = " + now);

// H is military, h is standard
let nowHour24 = moment().format('H');
let nowHour12 = moment().format('h');


// creates a live clock: top right. and a live date: middle. pulls from moment.min.js
function updateClock() {
  rNow = new Date(), // current date
    months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  if (rNow.getHours() < 12) {
    time = rNow.getHours() + ':' + rNow.getMinutes() + "am" 
  } else {
    time = rNow.getHours() - 12 + ':' + rNow.getMinutes() + "pm"
  }

  // date sequence. month day year
  date = [months[rNow.getMonth()], rNow.getDate(), rNow.getFullYear()].join(' ');


  // set the content of the elements with the ID time & date to the formatted strings
  $('#currentMin').text(time);
  $('#currentDay').text(date);

  // call this function again in 30 seconds
  setInterval(updateClock, 30000);
}
updateClock(); // call function


let saveIco = "Assets/save-icon.png";

// pulling from local storage and parsing to object
let savedPlans = JSON.parse(localStorage.getItem("savedPlans"));


// If plans are saved, pull them to the array
if (savedPlans !== null) {
  planArray = savedPlans;
} else {
  // If no plans were saved, makes a new array
  planArray = new Array(24);
  planArray[6] = "Wake up";
}

console.log("Array --> ", planArray);

//sets a variable to the main container and clears it out
let timeContainer = $(".container");
timeContainer.empty();


// builds elements to create the schedule.
for (var hour = 0; hour <= 23; hour++) {
  // creates row divs with classes and attributes
  let rowDiv = $("<div>");
  rowDiv.addClass("row");
  rowDiv.addClass("rowPlan");
  rowDiv.attr("hour-index", hour);

  // time column of row 1/6th width
  var timeDiv = $("<div>");
  timeDiv.addClass("col-md-2");

  // creating time containing element
  const timeBoxSpan = $("<span>");
  // holds the value
  timeBoxSpan.attr("class", "timeBox");

  // hour conversion for standard and display
  let displayHour = 0;
  let ampm = "";
  if (hour < 12 && hour !== 0) {
    displayHour = hour;
    ampm = " am";
  } else if (hour > 12) {
    displayHour = hour - 12;
    ampm = "pm";
  } else if (hour = 12){
    displayHour = hour;
    ampm = " pm";
  } else {
    displayHour = 12;
    ampm = " am";
  };

  // fill the span with text
  timeBoxSpan.text(displayHour + " " + ampm);

  // setting col
  rowDiv.append(timeDiv);
  timeDiv.append(timeBoxSpan);

  // input section
  let inputSpan = $('<input>');

  inputSpan.attr('id', `input-${hour}`);
  inputSpan.attr('hour-index', hour);
  inputSpan.attr('type', 'text');
  inputSpan.attr('class', 'dailyPlan');

  // access data from hour array
  inputSpan.val(planArray[hour]);

  // create col to control width
  let wideDiv = $('<div>');
  wideDiv.addClass('col-md-9');

  rowDiv.append(wideDiv);
  wideDiv.append(inputSpan);

  // save buttons
  let saveDiv = $('<div>');
  saveDiv.addClass('col-md-1');

  let saveBtn = $('<button>');
  saveBtn.addClass(".save-btn");
  saveBtn.attr('id', `saveid-${hour}`);
  saveBtn.attr('save-id', hour);
  saveBtn.attr('class', 'saveIco')
  saveBtn.attr({icons: {primary: null}, text: false});
  

  // add col width and row component to row
  rowDiv.append(saveDiv);
  saveDiv.append(saveBtn);

  // run color function
  currentRowColor(rowDiv, hour);

  // add row to container
  timeContainer.append(rowDiv);
};



function currentRowColor(hourRow, hour) {
//setting colors to the corresponding hours via moment.
  if (hour < nowHour24) {
    hourRow.addClass("past")
  } else if (hour > nowHour24) {
    hourRow.addClass("future")
  } else {
    hourRow.addClass("present")
  }
};

$('button').on('click', function (event) {
  // save button
  event.preventDefault();

  var save = $(this).attr('save-id');

  var inputId = '#input-' + save;
  var value = $(inputId).val();

  planArray[save] = value;

  // logging 
  console.log('value ', value); 
  console.log('index ', save); 
  console.log('Saved Plan ' + planArray); 

  // change color
  $(`#saveid-${save}`).css('background-color','rgb(101, 179, 0)');
  //saving to local storage
  localStorage.setItem("savedPlans", JSON.stringify(planArray));
});

// function to color save button on change of input
$(document).on('change', 'input', function (event) {
  event.preventDefault();

  // need to check for save button

  let i = $(this).attr('hour-index');

  $(`#saveid-${i}`).css('background-color','red');
});
