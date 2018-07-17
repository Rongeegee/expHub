const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

//in each variable of timeSlot, the first one or two characters represent hours, and the last two characters represent minute, in military time.
//For example, "800" represents 8:30 and "1030" represents 10:30
var timeSlot = ["800","830","900","930","1000","1030","1100","1130","1200","1230","1300","1330","1400","1430","1500", "1530",
                "1600","1630","1700","1730","1800","1830","1900","1930","2000","2030","2100","2130","2200","2230","2300",
                "2330","2400"];
function getDayFromToday(num){
    if(num==1){
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
    else if(num == 7){
        return "Sunday";
    }
}

function abbreviateDay(num){
    if(num == 1){
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
    else if(num == 7){
        return "Sun";
    }
}

function buildDayColumn(){
    var date = new Date();
    var day = date.getDay();
    document.getElementById("today_date").innerHTML = monthNames[date.getMonth()]+ "," + date.getDate();
    document.getElementById("today_day_long").innerHTML = 'today';
    document.getElementById("today_day_short").innerHTML = abbreviateDay(day);


    date.setDate(date.getDate() + 1);
    var day = date.getDay();
    document.getElementById("tmr_date").innerHTML = monthNames[date.getMonth()]+ "," + date.getDate();
    document.getElementById("tmr_date_long").innerHTML = getDayFromToday(day);
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
    for(i = 0; i < dateArray.length;i++){
        var dateInArray = dateArray[i].split(",");
        var date = new Date(dateInArray[0],dateInArray[1]-1,dateInArray[2]);
        var day = getDayFromToday(date.getDay()).slice(0,3).toLowerCase();;
        dayArray.push(day);
    }
    return dayArray;
}

function buildStartTimeArray(appointmentStartTimes){
    var startTimeString = appointmentStartTimes.slice(2,appointmentStartTimes.length-3);
    var startTimeArray = startTimeString.split(",), (");
    return startTimeArray;
}

function buildEndTimeArray(appointmentEndTimes){
    var endTimeString = appointmentEndTimes.slice(2, appointmentEndTimes.length-3);
    var endTimeArray = endTimeString.split(",), (");
    return endTimeArray;
}

function buildAvailSchedule(dayArray, startTimeArray,endTimeArray){
    for(i = 0; i < dayArray.length;i++){
        //index of start time and end time on timeSlot Array
        var startTimeIndex = timeSlot.indexOf(startTimeArray[i]);
        var endTimeIndex = timeSlot.indexOf(endTimeArray[i]);

        for(j = startTimeIndex; j < endTimeIndex; j++){
            var timeSlotID = dayArray[i]+ "_" + timeSlot[j];
            document.getElementById(timeSlotID).innerHTML = "unavailable";
            document.getElementById(timeSlotID).style.backgroundColor = "red";
        }

    }
}