var containerEl = document.querySelector(".container")
var eventTasks = [];
var workday = 9;
var startHour = 9;
var eventTask = {
    'hour': "",
    'task': ""
};

// Reload events from local storage
var loadEventTasks = function () {
    console.log("loadEventTasks");
    //Gets scores from localStorage.
    eventTasks = localStorage.getItem("eventTasks");
  
    if (eventTasks === null) {
        eventTasks = [];
    } else {  
        //Converts eventTasks from the string format back into an array of objects.
        eventTasks = JSON.parse(eventTasks);
    }
};

var findEvent = function (hour) {
    console.log(hour);
    console.log("eventTasks.length ", eventTasks.length);
    if(eventTasks){
        for (var i = 0; i < eventTasks.length; i++) {
            console.log("eventTasks[i].hour: " + eventTasks[i].hour)
                if (eventTasks[i].hour == hour){
                    return eventTasks[i].task;
                }
            }
        }
    return "";
};

// Display the rows for the hours of the day
var loadWorkDay = function () {
    console.log("loadWorkday");
    var current = moment();
   // console.log(current);
    
    // Create rows according to startHour and # of hours in workday
    for (var i=startHour; i < (workday + startHour); i++){
        var hour = moment(i, "hh");
        var hourId = moment(hour).format("X");
        var rowEl = document.createElement("div");
        rowEl.classList = "row";

        var spanEl = document.createElement("span");
        spanEl.classList = "hour col-1";
        spanEl.setAttribute("data-hour", hourId);
        spanEl.textContent = moment(hour).format("hA");
        rowEl.appendChild(spanEl);

        var descriptionEL = document.createElement("span");
        descriptionEL.classList = "description col-10";
        descriptionEL.setAttribute("data-hour", hourId);
        descriptionEL.textContent = findEvent(hourId);
        rowEl.appendChild(descriptionEL);

        var buttonEl = document.createElement("button");
        buttonEl.classList = "saveBtn col-1";
        buttonEl.setAttribute("type", "button");        
        buttonEl.setAttribute("data-hour", hourId);
        var iconEl = document.createElement("span");
        iconEl.classList = "oi oi-lock-locked";
        buttonEl.appendChild(iconEl);
        rowEl.appendChild(buttonEl);

        containerEl.appendChild(rowEl);
    }

    //auditEventTasks()
};

var updateLocalStorage = function () {
    localStorage.setItem("eventTasks", JSON.stringify(eventTasks));
};

// To Do: time block is color-coded to indicate whether it is in the past, present, or future

// Detect click on a time block and edit
$(".time-block").on("click", ".description", function() {
    console.log(this);
    var text = $(this).text().trim();
    var classList = this.className;
    var dataID = this.getAttribute("data-hour");

    //create text area to swap the span
    var textInput = $("<textarea>")
    .addClass(classList)
    .val(text);
    textInput.attr("data-hour", dataID);
    $(this).replaceWith(textInput);

    // Focus on the text area for editing
    textInput.trigger("focus");
});

// save Edited time block and saved in local storage
$(".time-block").on("click", ".saveBtn", function() {
    console.log(this);
    var dataID = this.getAttribute("data-hour");
    // TO DO:  Need to get find the textarea
    // get the parent ul's id attribute
    var selector = ".description[data-hour=" + dataID + "]";
       
    var task =  $(selector).val().trim();
    console.log(task);
    
    eventTask = {
        'hour': dataID,
        'task': task
    }

    //create span to swap the textarea
    var spanEl = $("<span>")
    .addClass("description col-10")
    .text(task);
    spanEl.attr("data-hour", dataID);
    $(selector).replaceWith(spanEl);

    // Add to list
    eventTasks.push(eventTask);
    // TO DO: Save to local storage
    updateLocalStorage();
});

// To Do:  need to run at app load then every 15 min?
var auditEventTasks = function () {
    //To get the current date and time, just call moment() with no parameters.
    var now = moment();
};

loadEventTasks ();
loadWorkDay ();