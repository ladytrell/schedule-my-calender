var containerEl = document.querySelector(".container")
var eventTasks = [];
var workday = 9;
var startHour = 9;

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

// To Do: time block is color-coded to indicate whether it is in the past, present, or future

// To Do: click into a time block to enter an event
// click the save button for that time block
// 

//Finds the clicked task space
$(".time-block").on("click", ".description", function() {
    console.log(this);
    var text = $(this).text().trim();
    var classList = this.className;
    var dataID = this.getAttribute("data-hour");
    console.log(dataID);

    //create text area to swap the span
    var textInput = $("<textarea>")
    .addClass(classList)
    .val(text);

    $(this).replaceWith(textInput);

    // Focus on the text area for editing
    textInput.trigger("focus");
});

// To Do the text for that event is saved in local storage
$(".time-block").on("click", ".saveBtn", function() {
    console.log(this);
    //Need to get find the textarea

    //If no text erae end
    //return;
});

loadWorkDay ();

// To Do:  need to run at app load then every 15 min?
var auditEventTasks = function () {
    //To get the current date and time, just call moment() with no parameters.
    var now = moment();
};