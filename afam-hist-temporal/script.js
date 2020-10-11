// D3 TIMELINE 

var events = [{group: "", data: []}]

// function to add an event 
function addEvent(start, end, seq, eventTitle, seqDesc){
    var eventsArr = events[0]["data"]; // array 
    var checkAdded = false;
    var sdate = new Date(start, 0);
    var edate = new Date(end, 0);
    // what to do with eventTitle?
    // val maps to seqDesc

    // PREVENT OVERLAP OF EVENT SEGMENTS 

    // if there are no labels yet 
    if (eventsArr.length == 0){
        eventsArr.push({label: "newlabel", data: []});
    }

    // iterating through each data dictionary to check where the event fits 
    // labelGroup is a dictionary {label: "", data: []}
    eventsArr.forEach(function(labelGroup){

        // iterating through each event in the label group
        if (labelGroup["data"].length == 0){
            labelGroup["data"].push(
                {
                    timeRange: [sdate, edate],
                    val: seqDesc,
                    desc: eventTitle
                }
            )
            checkAdded = true;
        }
        for (i = 0; i < labelGroup["data"].length; i++){
            prevEnd = labelGroup["data"][i]["timeRange"][1];
            // if start is validated and no following event, add event 
            if (checkAdded == false && sdate >= prevEnd && i + 1 == labelGroup["data"].length){
                // add event 
                labelGroup["data"].push(
                    {
                        timeRange: [sdate, edate],
                        val: seqDesc,
                        desc: eventTitle
                    }
                )
                checkAdded = true;
                break;
            } else if (i + 1 == labelGroup["data"].length){
                break;
            }
            nextStart = labelGroup["data"][i+1]["timeRange"][0];
            if (checkAdded == false && sdate >= prevEnd && edate <= nextStart){
                // add event 
                labelGroup["data"].push(
                    {
                        timeRange: [sdate, edate],
                        val: seqDesc,
                        desc: eventTitle
                    }
                )
                checkAdded = true;
            }
        }
    });

    // if event was not able to be added to any previous label groups 
    if (checkAdded == false){
        // random label generator -- > change later maybe 
        var num = Math.random()*100;
        var rand = num.toString();
        // add event 
        eventsArr.push(
            {label: rand, data: 
                [
                    {
                        timeRange: [sdate, edate],
                        val: seqDesc,
                        desc: eventTitle 
                    }
                ]
            }
        );
        checkAdded = true;
    }

/*     events[0]["data"][0]["data"].push(
        {
            timeRange: [sdate, edate],
            val: groupName
        }
    ) */
}

// console.log(events);

// MILESTONE TIMELINE
var milestoneEvents = []

function addMilEvent(date, eventTitle, seqDesc){
    milestoneEvents.push({year: date, title: eventTitle, category: seqDesc})
}

// console.log(milestoneEvents)

// reconstruction 
addEvent("1861", "1864", 1, "Civil War", "General Overview");
addMilEvent("1861", "Emancipation Proclamation", "General Overview");
addMilEvent("1864", "Lincoln Re-elected", "General Overview");
addEvent("1863", "1865", 1, "Ten Percent Plan", "General Overview"); 
addMilEvent("1865", "Lincoln assassination/Johnson takes over", "General Overview"); 
addMilEvent("1865", "13th amendment", "General Overview"); 

addEvent("1865", "1867", 1, "Presidential Reconstruction", "Presidential Reconstruction"); 
addMilEvent("1866", "Civil Rights Act", "Presidential Reconstruction"); 
addEvent("1865", "1866", 1, "Black Codes", "Presidential Reconstruction"); 
addEvent("1867", "1877", 1, "Rise of Sharecropping", "Presidential Reconstruction"); 

addEvent("1867", "1877", 1, "Radical Reconstruction", "Radical Reconstruction"); 
addMilEvent("1865", "Field Order 15", "Radical Reconstruction"); 
addEvent("1865", "1872", 1, "Freedman's Bureau", "Radical Reconstruction"); 
addMilEvent("1868", "14th amendment", "Radical Reconstruction"); 

addEvent("1866", "1868", 1, "KKK", "the South POV"); 
addMilEvent("1877", "Rutheford elected", "the South POV"); 
addMilEvent("1877", "Northern troops leave the South", "the South POV"); 

color_legend = ["#3F84E5", "#B20D30", "#C17817", "#3F784C"]

// DRAW SEGMENT TIMELINE 

TimelinesChart()(document.getElementById("timeline-figure"))
      .data(events)
      .zQualitative(true)
      .zColorScale(d3.scaleOrdinal(color_legend));

// DRAW MILESTONE TIMELINE
milestones('#milestone-figure')
    .mapping({
      'timestamp': 'year',
      'text': 'title'
    })
    .parseTime('%Y')
    .aggregateBy('year')
    .useLabels(true)
    .render(milestoneEvents)
    
    ;



