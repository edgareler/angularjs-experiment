var liActive = -1;
var isDown = false;
var colorOrange = {r: 235, g: 125, b: 59};
var colorOrangeDark = {r: 125, g: 55, b: 18};
var colorGreen = {r: 114, g: 172, b: 77};
var colorGreenDark = {r: 45, g: 74, b: 26};

function bootstraping() {
    $(".item-header").click(function() {
        toggleDetails($(this).parent().attr("index"));
    });

    $(".box-details").mousedown(function() {
        toggleClick(this, true);
    });

    $(".box-details").mouseup(function() {
        toggleClick(this, false);
    });

    $(".box-details").mouseleave(function() {
        toggleClick(this, false);
    });

    $(".box-details-test-value").each(function() {
        $(this).css("color", calculateColor(colorOrange, colorGreen, 
                parseFloat($(this).attr("data-value"))));
    });

    $(".box-details-test-code").each(function() {
        resizeByPercent($(this).find(".box-details-test-code-green"), 
                $(this).find(".box-details-test-code-orange"), 
                parseFloat($(this).find(".box-details-test-code-green")
                .attr("data-value")));

        $(this).find(".box-details-test-code-text div.value").css("color", 
                calculateColor(colorOrangeDark, colorGreenDark, 
                parseFloat($(this).find(".box-details-test-code-green")
                .attr("data-value"))));
    });

    setItemMetricsBlue();

    $(".box-details").hide();
    
    $(".popover").webuiPopover({title: $(this).attr("data-title"), 
            content: $(this).attr("data-content")});
}

function toggleDetails(liIndex) {
    var expand = true;

    if (liActive !== -1) {
        $("#item-details-" + liActive).slideUp(300);
        $("#li-" + liActive + " div.box-details").toggle(300);
        $("#li-" + liActive + " div.item-indicator").toggle(300);

        $("#li-" + liIndex + " div.item-code span.a").webuiPopover('destroy');
        
        $("#li-" + liActive + " div.item-code span").removeClass("a");

        $(".box-details-test-chart").each(function() {
            $(this).html("");
        });

        if (liActive === liIndex) {
            liActive = -1;
            expand = false;
        }
    }

    if (expand === true) {
        $("#item-details-" + liIndex).slideDown(300);
        $("#li-" + liIndex + " div.item-indicator").toggle(300);
        $("#li-" + liIndex + " div.box-details").toggle(300);

        $("#li-" + liIndex + " div.item-code span").addClass("a");
        
        $("#li-" + liIndex + " div.item-code span.a").webuiPopover({
                title: $(this).attr("data-title"), 
                content: $(this).attr("data-content")});
        
        $(".box-details-test-chart").each(function() {
            addChart(this, {
                passed: $(this).attr("data-passed"), 
                notpassed: $(this).attr("data-notpassed")
            });
        });

        liActive = liIndex;

    }
}

function toggleClick(obj, down) {
    if (down === true && $(obj).hasClass("box-details-down") === false) {
        $(obj).addClass("box-details-down");
    } else {
        $(obj).removeClass("box-details-down");
    }
}

function addChart(container, data) {
    $(container).highcharts({
        chart: {
            backgroundColor: null,
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            margin: 0,
            type: 'pie'
        },
        title: {
            text: ''
        },
        credits: {
            enabled: false
        },
        exporting: {
            enabled: false
        },
        tooltip: {
            enabled: false
        },
        plotOptions: {
            pie: {
                allowPointSelect: false,
                startAngle: 45,
                slicedOffset: 0,
                size: '82%',
                dataLabels: {
                    enabled: true,
                    distance: -25,
                    format: '{y}',
                    style: {
                        fontFamily: 'Tahoma, sans-serif',
                        color: 'black',
                        fontWeight: 'normal',
                        textShadow: false
                    }
                }
            }
        },
        series: [{
                name: "Tests",
                colorByPoint: true,
                states: {
                    hover: {
                        enabled: false
                    }
                },
                data: [{
                        name: "tests not passed",
                        y: parseInt(data.notpassed),
                        color: "#EB7D3B"
                    },
                    {
                        name: "tests passed",
                        y: parseInt(data.passed),
                        color: "#72AC4D"
                    }]
            }]
    });
}

function calculateColor(color_1, color_2, percent) {
    var rDiff = color_2.r - color_1.r;
    var gDiff = color_2.g - color_1.g;
    var bDiff = color_2.b - color_1.b;

    var r = color_1.r + parseInt(rDiff * percent);
    var g = color_1.g + parseInt(gDiff * percent);
    var b = color_1.b + parseInt(bDiff * percent);

    return "rgb(" + r + "," + g + "," + b + ")";
}

function resizeByPercent(obj1, obj2, percent) {    
    var obj1_width = percent * 100;
    var obj2_width = 100 - (percent * 100);

    $(obj1).width(obj1_width + "%");
    $(obj2).width(obj2_width + "%");
}

function setItemMetricsBlue(){
    $(".item-box-blue").each(function(){
        $(this).width((parseFloat($(this).attr("data-value")) * 100) + '%');
    });
}

function createResultButton(text, magn, deploy){    
    var btn = document.createElement("div");
    
    if(magn === true){
        btn.setAttribute("class","popover button-magn");
    } else {
        btn.setAttribute("class","popover button");
    }
    
    btn.setAttribute("data-title", "Run Action");
    btn.setAttribute("data-content", "Run specific action for this result.");

    var tx = document.createTextNode(text);

    btn.appendChild(tx);

    var container = document.createElement("div");
    container.appendChild(btn);
    
    if(deploy === true){
        var spn = document.createElement("span");
        var spnTx = document.createTextNode("to:");
        spn.appendChild(spnTx);
        
        var select = document.createElement("select");
        select.setAttribute("name","select_deploy");
    
        var option_prod = document.createElement("option");
        var prodTx = document.createTextNode("Production");
        option_prod.setAttribute("value","production");
        option_prod.appendChild(prodTx);
        select.appendChild(option_prod);
        
        var option_dev = document.createElement("option");
        var devTx = document.createTextNode("Development");
        option_dev.setAttribute("value","development");
        option_dev.appendChild(devTx);
        select.appendChild(option_dev);
        
        container.appendChild(spn);
        container.appendChild(select);
    }
    
    return container.innerHTML;
}

document.onselectstart = function() {
    return false;
};
