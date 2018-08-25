const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

//in each variable of timeSlot, the first one or two characters represent hours, and the last two characters represent minute, in military time.
//For example, "800" represents 8:30 and "1030" represents 10:30
var timeSlot = ["800","830","900","930","1000","1030","1100","1130","1200","1230","1300","1330","1400","1430","1500", "1530",
                "1600","1630","1700","1730","1800","1830","1900","1930","2000","2030","2100","2130","2200","2230","2300",
                "2330","2400"];

var dayDiffFromToday = ["today","tmr","2_days_later","3_days_later","4_days_later","5_days_later","6_days_later"];

function getDayFromToday(num){
    if(num == 0){
        return "Sunday";
    }

    else if(num==1){
        return "Monday";
    }
    else if(num == 2){
        return "Tuesday";
    }
    else if(num== 3){
        return "Wednesday";
    }
    else if(num== 4){
        return "Thursday";
    }
    else if(num== 5){
        return "Friday"
    }
    else if(num == 6 ){
        return "Saturday";
    }
}

function abbreviateDay(num){
     if(num == 0){
        return "Sun";
    }

    else if(num == 1){
        return "Mon";
    }
    else if(num == 2 ){
        return "Tue";
    }
    else if(num == 3){
        return "We";
    }
    else if(num == 4){
        return "Thur";
    }
    else if(num == 5){
        return "Friday";
    }
    else if(num == 6){
        return "Sat";
    }
}

function buildDayColumn(){
    var date = new Date();

    date.setDate(date.getDate() + 1);
    var day = date.getDay();
    document.getElementById("tmr_date").innerHTML = monthNames[date.getMonth()]+ "," + date.getDate();
    document.getElementById("tmr_date_long").innerHTML = 'tommorrow';
    document.getElementById("tmr_date_short").innerHTML = abbreviateDay(day);

    date.setDate(date.getDate() + 1);
    var day = date.getDay();
    document.getElementById("two_days_later_date").innerHTML = monthNames[date.getMonth()]+ "," + date.getDate();
    document.getElementById("two_days_later_long").innerHTML = getDayFromToday(day);
    document.getElementById("two_days_later_short").innerHTML = abbreviateDay(day);

     date.setDate(date.getDate() + 1);
    var day = date.getDay();
    document.getElementById("three_days_later_date").innerHTML = monthNames[date.getMonth()]+ "," + date.getDate();
    document.getElementById("three_days_later_long").innerHTML = getDayFromToday(day);
    document.getElementById("three_days_later_short").innerHTML = abbreviateDay(day);

    date.setDate(date.getDate() + 1);
    var day = date.getDay();
    document.getElementById("four_days_later_date").innerHTML = monthNames[date.getMonth()]+ "," + date.getDate();
    document.getElementById("four_days_later_long").innerHTML = getDayFromToday(day);
    document.getElementById("four_days_later_short").innerHTML = abbreviateDay(day);

    date.setDate(date.getDate() + 1);
    var day = date.getDay();
    document.getElementById("five_days_later_date").innerHTML = monthNames[date.getMonth()]+ "," + date.getDate();
    document.getElementById("five_days_later_long").innerHTML = getDayFromToday(day);
    document.getElementById("five_days_later_short").innerHTML = abbreviateDay(day);

    date.setDate(date.getDate() + 1);
    var day = date.getDay();
    document.getElementById("six_days_later_date").innerHTML = monthNames[date.getMonth()]+ "," + date.getDate();
    document.getElementById("six_days_later_long").innerHTML = getDayFromToday(day);
    document.getElementById("six_days_later_short").innerHTML = abbreviateDay(day);
}

function buildDateArray(appointmentDates){
    var list_of_appointments = appointmentDates.slice(2,appointmentDates.length-3).split(",), (");
    for (i = 0; i < list_of_appointments.length; i++) {
        var leftParenIndex = list_of_appointments[i].indexOf("(");
        var rightParenIndex = list_of_appointments[i].indexOf(")");
        var date = list_of_appointments[i].slice(leftParenIndex + 1, rightParenIndex);
        list_of_appointments[i] = date;
    }
    return list_of_appointments;
}

function buildDayArray(dateArray){
    var dayArray = [];

    //year, month, and day variables are the current year, current month, and current day correspondingly
    var year = new Date().getFullYear();
    var month = new Date().getMonth();
    var day = new Date().getDate();

    for(i = 0; i < dateArray.length;i++){
        var dateInArray = dateArray[i].split(",");
        var date = new Date(dateInArray[0],dateInArray[1]-1,dateInArray[2]);
        var today = new Date(year,month,day);
        var diffDays = Math.round((date-today)/(1000*60*60*24));
        //var dayDifference = date.getDate() -  today.getDate();
        dayArray.push(dayDiffFromToday[diffDays]);
    }
    return dayArray;
}

function buildStartTimeArray(appointmentStartTimes){
    var startTimeString = appointmentStartTimes.slice(2,appointmentStartTimes.length-3);
    var startTimeArray = startTimeString.split(",), (");
    if(startTimeArray.length == 1){
        startTimeArray[0] = startTimeArray[0].slice(0,startTimeArray[0].length-1);
    }
    return startTimeArray;
}

function buildEndTimeArray(appointmentEndTimes){
    var endTimeString = appointmentEndTimes.slice(2, appointmentEndTimes.length-3);
    var endTimeArray = endTimeString.split(",), (");
    if(endTimeArray.length == 1){
        endTimeArray[0] = endTimeArray[0].slice(0, endTimeArray[0].length - 1);
    }
    return endTimeArray;
}

function buildAvailSchedule(dayArray, startTimeArray,endTimeArray){
    for(i = 0; i < dayArray.length;i++){
        //index of start time and end time on timeSlot Array
        var startTimeIndex = timeSlot.indexOf(startTimeArray[i]);
        var endTimeIndex = timeSlot.indexOf(endTimeArray[i]);

        for(j = startTimeIndex; j <= endTimeIndex; j++){
            var timeSlotID = dayArray[i]+ "_" + timeSlot[j];
            document.getElementById(timeSlotID).innerHTML = "unavailable";
            document.getElementById(timeSlotID).style.backgroundColor = "red";
        }

    }
}


//following elements are for the modal box upon asking for start time of appointment
function displayModal(myModal){
    // Get the modal
    var modal = document.getElementById(myModal);
    // Get the button that opens the modal
    var btn = document.getElementById("myBtn");
    // Get the <span> element that closes the modal
    if(myModal == 'startTimeModal'){
        var span = document.getElementsByClassName("close")[0];
    }
    else if(myModal == 'endTimeModal'){
        var span = document.getElementsByClassName("close")[1];
    }

    // When the user clicks on the button, open the modal
    modal.style.display = "block";
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}
//end of elements are for the modal box upon asking for start time of appointment


//the following code is for the clicking event, such as picking an start-time of appointment
var table = document.getElementById("schedule");
var appointStartDate;
var appointEndDate;
var appointStartTime;
var appointEndTime;
var currStartCell;
var currEndCell;
var skillID;

function setSkill(skillName){
    skillID = skillName;
}

function setAppointStart() {
    if (table != null) {
        for (var i = 0; i < table.rows.length; i++) {
            for (var j = 0; j < table.rows[i].cells.length; j++)
                table.rows[i].cells[j].onclick = function () {
                   if(this.style.backgroundColor == 'red' || this.id == 'appointButtCell'){
                       return;
                   }
                   else if(currStartCell == null){
                       this.style.backgroundColor = 'blue';
                       this.innerHTML = 'Start Time';
                       currStartCell = this;
                       appointStartDate = getAppointDate(this.id);
                       appointStartTime = getAppointTime(this.id);
                   }
                   else if(currStartCell == this){
                       this.style.backgroundColor = null;
                       this.innerHTML = null;
                       currStartCell = null;
                       appointStartDate = null;
                       appointStartTime = null;
                   }
                   else{
                       currStartCell.style.backgroundColor = null;
                       currStartCell.innerHTML = null;
                       this.style.backgroundColor = 'blue';
                       this.innerHTML = 'start time';
                       currStartCell = this;
                       appointStartDate = getAppointDate(this.id);
                       appointStartTime = getAppointTime(this.id);
                   }
                };
        }
    }
}

function setAppointEnd() {
    if (table != null) {
        for (var i = 0; i < table.rows.length; i++) {
            for (var j = 0; j < table.rows[i].cells.length; j++)
                table.rows[i].cells[j].onclick = function () {
                   if(this.style.backgroundColor == 'red' || this.id == 'appointButtCell'){
                       return;
                   }
                   else if(this == currStartCell){
                       return;
                   }
                   else if(currEndCell == null){
                       if(getAppointDate(this.id) != appointStartDate){
                            alert('Appointment start time and end time must be at the same day.');
                            return;
                       }
                       else if(timeSlot.indexOf(getAppointTime(this.id)) < timeSlot.indexOf(appointStartTime)){
                           alert('End time must be after start time.');
                           return;
                       }
                       this.style.backgroundColor = 'blue';
                       this.innerHTML = 'end Time';
                       currEndCell = this;
                       appointEndDate = getAppointDate(this.id);
                       appointEndTime = getAppointTime(this.id);
                       var button = document.getElementById('final_confirm_butt');
                       button.value = appointStartDate + "," + appointStartTime + "," + appointEndTime + "," + skillID;
                   }
                   else if(currEndCell == this){
                       this.style.backgroundColor = null;
                       this.innerHTML = null;
                       currEndCell = null;
                       appointEndDate = null;
                       appointEndTime = null;
                   }
                   else{
                       if(getAppointDate(this.id) != appointStartDate){
                            alert('Appointment start time and end time must be at the same day.');
                            return;
                       }
                       else if(timeSlot.indexOf(getAppointTime(this.id)) < timeSlot.indexOf(appointStartTime)){
                           alert('End time must be after start time.');
                           return;
                       }
                       currEndCell.style.backgroundColor = null;
                       currEndCell.innerHTML = null;
                       this.style.backgroundColor = 'blue';
                       this.innerHTML = 'end time';
                       currEndCell = this;
                       appointEndDate = getAppointDate(this.id);
                       appointEndTime = getAppointTime(this.id);
                       var button = document.getElementById('final_confirm_butt');
                       button.value = appointStartDate + "," + appointStartTime + "," + appointEndTime + "," + skillID;
                   }
                };
        }
    }
}

function setAppointment(){
    var button = document.getElementById('appointButt');
    if(button.innerHTML == 'next'){
        setAppointStart();
    }
    else{
        setAppointEnd();
    }
}


function processAppointment(){
    var button = document.getElementById('appointButt');
    if(button.innerHTML == 'next'){
        if(appointStartTime == null || appointStartDate == null){
            alert('Please, pick the start time of the appointment.');
        }
        else{
             displayModal('endTimeModal');
             button.innerHTML = 'cancel';
             document.getElementById('confirmButt').style.display = "block";
        }
    }
    else if(button.innerHTML == 'cancel'){
        appointStartDate = null;
        appointEndDate = null;
        appointStartTime = null;
        appointEndTime = null;
        currStartCell.style.backgroundColor = null;
        currStartCell.innerHTML = null;
        currEndCell.style.backgroundColor = null;
        currEndCell.innerHTML = null;
    }
}

function getAppointDate(cell) {
    var today = new Date();
    if (cell.slice(0,5) == 'today'){
        return null;
    }
    else if(cell.slice(0,3) == 'tmr'){
        var date = new Date();
        date.setDate(today.getDate()+1);
        var year = date.getFullYear();
        var month = date.getMonth() + 1 ;
        var day = date.getDate();
        return year + '-' + month+ '-' + day;
    }

    else if(cell.slice(0,6) == '2_days'){
        var date = new Date();
        date.setDate(date.getDate() + 2);
        var year = date.getFullYear();
        var month = date.getMonth() + 1 ;
        var day = date.getDate();
        return year + '-' + month+ '-' + day;
    }

    else if(cell.slice(0,6) == '3_days'){
        var date = new Date();
        date.setDate(date.getDate() + 3);
        var year = date.getFullYear();
        var month = date.getMonth() + 1 ;
        var day = date.getDate();
        return year + '-' + month+ '-' + day;
    }

    else if(cell.slice(0,6) == '4_days'){
        var date = new Date();
        date.setDate(date.getDate() + 4);
        var year = date.getFullYear();
        var month = date.getMonth() + 1 ;
        var day = date.getDate();
        return year + '-' + month+ '-' + day;
    }

    else if(cell.slice(0,6) == '5_days'){
        var date = new Date();
        date.setDate(date.getDate() + 5);
        var year = date.getFullYear();
        var month = date.getMonth() + 1 ;
        var day = date.getDate();
        return year + '-' + month+ '-' + day;
    }

    else if(cell.slice(0,6) == '6_days'){
        var date = new Date();
        date.setDate(date.getDate() + 6);
        var year = date.getFullYear();
        var month = date.getMonth() + 1 ;
        var day = date.getDate();
        return year + '-' + month+ '-' + day;
    }
}

function getAppointTime(cell){
    var index_of_last_dash = cell.lastIndexOf('_');
    var cell_length = cell.length;
    var time = cell.slice(index_of_last_dash + 1, cell_length);
    return time;
}

//the following code is for the modal box of filling the address.
var states = ["Alaska", "Alabama", "Arkansas", "Arizona", "California", "Colorado", "Connecticut", "District of Columbia", "Delaware", "Florida", "Georgia",
    "Hawaii", "Iowa", "Idaho", "Illinois", "Indiana", "Kansas", "Kentucky", "Louisiana", "Massachusetts", "Maryland", "Maine", "Michigan","Minnesota", "Missouri", "Mississippi", "Montana",
    "North Carolina", " North Dakota", "Nebraska", "New Hampshire", "New Jersey", "New Mexico", "Nevada", "New York", "Ohio", "Oklahoma",
    "Oregon", "Pennsylvania","Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Virginia", "Vermont", "Washington", "Wisconsin", "West Virginia", "Wyoming"];

for(i = 0; i < states.length;i++){
    var box = document.getElementById('stateBox');
    var option = document.createElement("option");
    option.text = states[i];
    box.add(option);
}