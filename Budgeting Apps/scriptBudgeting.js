var allBudgets = {
    January: { 
        spending: 32, 
        saving: 44 
    },
    February: {
        spending: 42, 
        saving: 67
    },
    March: {
        spending: 53, 
        saving: 40
    },
    April: {
        spending: 36, 
        saving: 62
    },
    May: {
        spending: 52, 
        saving: 38
    },
    June: {
        spending: 84, 
        saving: 48
    },
    July: {
        spending: 35, 
        saving: 24
    },
    August: {
        spending: 53, 
        saving: 46
    },
    September: {
        spending: 42, 
        saving: 49
    },
    October: {
        spending: 32, 
        saving: 34
    },
    November: {
        spending: 52, 
        saving: 42
    },
    December: {
        spending: 68, 
        saving: 44
    }
};

var maxWidth = 75;
var maxHeight = 75;
var outerRadius = 37.5;
var innerRadius = 0;

var budgetRow = document.querySelector(".row");
var totalSpending = document.getElementById("totalSpending");
var totalSaving = document.getElementById("totalSaving");
var avgSpending = document.getElementById("avgSpending");
var avgSaving = document.getElementById("avgSaving");

var tooltip = d3.select("#tooltip");
var monthName = document.getElementById("monthName");
var spendingAmount = document.getElementById("spendingAmount");
var savingAmount = document.getElementById("savingAmount");

var allSelectedMonths = [];


// This function helps you figure out when all
// the elements have finished transitioning
// Reference: https://groups.google.com/d/msg/d3-js/WC_7Xi6VV50/j1HK0vIWI-EJ
function checkEndAll(transition, callback) {
    var n = 0;
    transition
        .each(function () {
            ++n;
        })
        .each("end", function () {
            if (!--n) callback.apply(this, arguments);
        });
}

function drawAnimatedRingChart(config) {
    var pie = d3.layout.pie().value(function (d) {
        return d.value;
    });

    var color = d3.scale.category10();
    var arc = d3.svg.arc();

    // This function helps transition between
    // a starting point and an ending point
    // Also see: http://jsfiddle.net/Nw62g/3/
    function tweenPie(finish) {
        var start = {
            startAngle: 0,
            endAngle: 0
        };
        var i = d3.interpolate(start, finish);
        return function (d) {
            return arc(i(d));
        };
    }
    arc.outerRadius(outerRadius).innerRadius(innerRadius);

    // Remove the previous ring
    d3.select(config.el).selectAll('g').remove();

    var svg = d3.select(config.el).append('svg')
        .attr({
            width: maxWidth,
            height: maxHeight
        });

    // Add the groups that will hold the arcs
    var groups = svg.selectAll('g.arc')
        .data(pie(config.data))
        .enter()
        .append('g')
        .attr({
            'class': 'arc',
            'transform': 'translate(' + outerRadius + ', ' + outerRadius + ')'
        });

    
    // Create the actual slices of the pie
    groups.append('path')
        .attr({
            'fill': function (d, i) {
                return color(i);
            }
        })
        .transition()
        .duration(config.duration || 1000)
        .attrTween('d', tweenPie)
        .call(checkEndAll, function () {

            // Finally append the title of the text to the node
            groups.append('text')
                .attr({
                    'text-anchor': 'middle',
                    'font-size': '9px',
                    'pointer-events': "none",
                    'transform': function (d) {
                        return 'translate(' + arc.centroid(d) + ')';
                    }
                })
                .text(function (d) {
                    // Notice the usage of d.data to access the raw data item
                    return d.data.name;
                });
        });
        
    var path = svg.selectAll('path');

    path.on('mouseover', function(d) {
        monthName.innerHTML = d.data.month;
        spendingAmount.innerHTML = allBudgets[d.data.month].spending;
        savingAmount.innerHTML = allBudgets[d.data.month].saving;

        tooltip.style('display', 'block');
        tooltip.style('opacity', 1);

        tooltip.style('top', (event.clientY + 10) + 'px')
            .style('left', (event.clientX - 60) + 'px');
    });
    
    path.on('mouseout', function() {
        tooltip.style('display', 'none');
        tooltip.style('opacity',0);
    });
}


Object.keys(allBudgets).forEach((month) => {
    var dataArray = [
        { name: "saving", value: allBudgets[month].saving, month: month },
        { name: "spending", value: allBudgets[month].spending, month: month }
    ];

    var monthDiv = document.createElement("div");
    monthDiv.id = month;
    monthDiv.className = "month";
    budgetRow.appendChild(monthDiv);

    var monthTitle = document.createElement("h5");
    monthTitle.innerHTML = month;
    monthDiv.appendChild(monthTitle);

    drawAnimatedRingChart({
        el: "#" + month,
        data: dataArray
    });
});

document.querySelectorAll(".month").forEach(month => month.addEventListener("click", onMonthClick));

function onMonthClick() {
    var selectedMonth = event.currentTarget;
    selectedMonth.classList.toggle('selected');

    if (selectedMonth.classList.contains('selected')) {
        allSelectedMonths.push(selectedMonth);
    }
    else {
        // remove selected month from the array
        for (var i = 0; i < allSelectedMonths.length; i++) {
            if (allSelectedMonths[i] == selectedMonth) {
                allSelectedMonths.splice(i, 1);
                break;
            }
        }
    }

    calculateSpending();
    calculateSaving();
}

function calculateSaving() {
    // find total spending
    var savingSum = 0;
    
    for (var i = 0; i < allSelectedMonths.length; i++) {
        var monthlySaving = allBudgets[allSelectedMonths[i].id].saving;

        savingSum = savingSum + monthlySaving;
    }
    
    totalSaving.innerHTML = savingSum.toFixed(2);
    
    // find average spending
    if (allSelectedMonths.length > 0) {
        var average = savingSum / allSelectedMonths.length;

        avgSaving.innerHTML = average.toFixed(2);
    }
    else {
        avgSaving.innerHTML = "0.00";
    }
}

function calculateSpending() {
    // find total spending
    var spendingSum = 0;
    
    for (var i = 0; i < allSelectedMonths.length; i++) {
        var monthlySpending = allBudgets[allSelectedMonths[i].id].spending;

        spendingSum += monthlySpending;
    }
    
    totalSpending.innerHTML = spendingSum.toFixed(2);
    
    // find average spending
    if (allSelectedMonths.length > 0) {
        var average = spendingSum / allSelectedMonths.length;

        avgSpending.innerHTML = average.toFixed(2);
    }
    else {
        avgSpending.innerHTML = "0.00";
    }
}