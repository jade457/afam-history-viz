// SCROLLAMA 

// using d3 for convenience
var main = d3.select("main");
var scrolly = main.select("#scrolly");
// TODO: RENAME 
var figure = scrolly.select("#timeline-figure");
var figure2 = scrolly.select("#milestone-figure");
var body_text = scrolly.select("#body-text");
var article = scrolly.select("article");
var figure = d3.select("#timeline-figure");
var step = article.selectAll(".step");
var info = ["text one", "text two", "text three", "text four"]
var seqNames = ["General Overview", "Presidential Reconstruction", "Radical Reconstruction", "the South POV"]

// initialize the scrollama
var scroller = scrollama();

// generic window resize listener event
function handleResize() {
// 1. update height of step elements
var stepH = Math.floor(window.innerHeight * 0.75);
step.style("height", stepH + "px");

var figureHeight = window.innerHeight / 2;
var figureMarginTop = (window.innerHeight - figureHeight) / 2;

figure
    .style("height", figureHeight + "px")
    .style("top", figureMarginTop + "px");

// 3. tell scrollama to update new element dimensions
scroller.resize();
}

// function to handle figure change views in segmented timeline
function handleSeqChange(seqName){
    
    d3.selectAll('rect.series-segment').classed('activate-sequence', function(d,i){
        // console.log(d);
        return d.labelVal == seqName;
    })
    // div.milestones__group__label__text-horizontal
    // span.milestones-label milestones-text-label.milestones__group__label__text__event'
    d3.selectAll('div.milestones__group__label__text-horizontal').classed('activate-sequence-milestones', function(d,i){
        return d.values[0]['category'] == seqName;
    })
}

// scrollama event handlers
function handleStepEnter(response) {
    console.log(response);
    // response = { element, direction, index }

    // add color to current step only
    step.classed("is-active", function(d, i) {
        return i === response.index;
    });

    // update graphic based on step
    body_text.select("p").text(info[response.index]);
    // console.log(seqNames[response.index]);
    handleSeqChange(seqNames[response.index]);
    // handleSeqChange2(seqNames[response.index]);

}

function setupStickyfill() {
d3.selectAll(".sticky").each(function() {
    Stickyfill.add(this);
});
}

function init() {
    
    setupStickyfill();
    // manually went into the DOM to set the initial state for milestone events, 
    // don't understand why d returns empty for the segment timeline? for now just went 
    // and changed the opacity value in timeline-chart.js
   d3.selectAll('div.milestones__group__label__text-horizontal').classed('initial-state', function(d,i){
       console.log(d);
        return d;
    }); 

    /* d3.selectAll('rect.series-segment').classed('hi', function(d,i){
        console.log(d);
    }) */


    // 1. force a resize on load to ensure proper dimensions are sent to scrollama
    handleResize();

    // 2. setup the scroller passing options
    // 		this will also initialize trigger observations
    // 3. bind scrollama event handlers (this can be chained like below)

    scroller
        .setup({
        step: "#scrolly article .step",
        offset: 0.2,
        debug: true
        })
        .onStepEnter(handleStepEnter);

    // setup resize event
    window.addEventListener("resize", handleResize);
}

// kick things off
init();