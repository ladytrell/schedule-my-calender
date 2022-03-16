var containerEl = document.querySelector(".container")
var eventTasks = [];
var workday = 9;
var startHour = 9;

// To Do:  the current day is displayed at the top of the calendar
// with time blocks for standard business hours
var loadWorkDay = function () {
    console.log("loadWorkday");
    var current = moment();
    console.log(current);
    

    for (var i=startHour; i < (workday + startHour); i++){
        var hour = moment(i, "hh");
        console.log("i: " + i);
        console.log("Hour: " + hour);
        var rowEl = document.createElement("div");
        rowEl.classList = "row";

        var spanEl = document.createElement("span");
        spanEl.classList = "hour col-1";
        spanEl.setAttribute("data-hour", hour);
        spanEl.textContent = moment(hour).format("hA");
        rowEl.appendChild(spanEl);

        var textareaEl = document.createElement("textarea");
        textareaEl.classList = "description col-10";
        textareaEl.setAttribute("data-hour", hour);
        rowEl.appendChild(textareaEl);

        var buttonEl = document.createElement("button");
        buttonEl.classList = "saveBtn col-1";
        buttonEl.setAttribute("type", "button");        
        buttonEl.setAttribute("data-hour", hour);
        var iconEl = document.createElement("span");
        iconEl.classList = "oi oi-lock-locked";
        buttonEl.appendChild(iconEl);
        rowEl.appendChild(buttonEl);

        containerEl.appendChild(rowEl);
    }
};

// To Do: time block is color-coded to indicate whether it is in the past, present, or future
var auditEventTasks = function () {
    //To get the current date and time, just call moment() with no parameters.
    var now = moment();
};
// To Do: click into a time block to enter an event
// click the save button for that time block
// the text for that event is saved in local storage


loadWorkDay ();