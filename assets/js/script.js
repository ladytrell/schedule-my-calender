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
    //Gets scores from localStorage.
    eventTasks = localStorage.getItem("eventTasks");
  
    if (eventTasks === null) {
        eventTasks = [];
    } else {  
        //Converts eventTasks from the string format back into an array of objects.
        eventTasks = JSON.parse(eventTasks);
    }
};

var updateLocalStorage = function () {
    localStorage.setItem("eventTasks", JSON.stringify(eventTasks));
};

//Update eventTasks arrary
var updateTasks = function (task) {
    var editedTask = false;
    for (var i = 0; i < eventTasks.length; i++) {
        if (eventTasks[i].hour == task.hour){
            eventTasks[i] = task;
            editedTask = true;
            break;
        }
    }
    
    if(!editedTask){
        eventTasks.push(eventTask);
    }
    //Save to local storage
    updateLocalStorage();
}
// Check an event with matching the element hour-id
var findEvent = function (hour) {
    if(eventTasks){
        for (var i = 0; i < eventTasks.length; i++) {
            if (eventTasks[i].hour === hour.toString()){
                return eventTasks[i].task;
            }
        }
    }
    return "";
};

// Ccolor-code time block to indicate whether it is in the past, present, or future
var auditEventTasks = function () {
    //To get the current date and time, just call moment() with no parameters.
    var now = moment().hours();

    $(".description").each(function(i, object) {
       var elementHour = this.getAttribute("data-hour");

       if(elementHour < now){
            $(this).removeClass( "future present" ).addClass( "past" );
        } else if (elementHour > now){
            $(this).removeClass( "past present" ).addClass( "future" );
        } else {
            $(this).removeClass( "past future" ).addClass( "present" );
        }
    });
 
};

// Display the rows for the hours of the day
var loadWorkDay = function () {
    
    // Create rows according to startHour and # of hours in workday
    for (var i=startHour; i < (workday + startHour); i++){
        var hour = moment(i, "hh");  //integer to moment object
        var hourId = i; 
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
};


// Detect click on a time block and edit
$(".time-block").on("click", "span.description", function() {
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
    var dataID = this.getAttribute("data-hour");
    var selector = "textarea.description[data-hour=" + dataID + "]";
 
    if(!$(selector).length) {
      // No change was made exit function without doing anything
      return;
    };

    var task =  $(selector).val().trim()
              
    eventTask = {
        'hour': dataID,
        'task': task
    } 

    updateTasks(eventTask);

    //create span to swap the textarea
    var spanEl = $("<span>")
    .addClass("description col-10")
    .text(task);
    spanEl.attr("data-hour", dataID);
    $(selector).replaceWith(spanEl);
    auditEventTasks();
});

loadEventTasks();
loadWorkDay();
auditEventTasks();

// Update color coding regularly
const interval = setInterval(auditEventTasks, (1000 * 60)*30);