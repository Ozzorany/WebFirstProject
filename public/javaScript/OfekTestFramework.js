var currentGrouptHtml="";
var currentGroupResault;

function assert(value, testName){
    var resault = (value) ? "passed" : "failed";
    currentGroupResault = currentGroupResault && value;

    currentGrouptHtml += "<li class='assert " + resault + "'> " + testName + " </li>";
}

function test_group(name, test_group_function){
    currentGroupResault = true;
    currentGrouptHtml = "<div class='testGroup #groupClass'>" + name + "<ul>";
    test_group_function();
    currentGrouptHtml += "</ul></div>";
    currentGrouptHtml = currentGrouptHtml.replace("#groupClass", currentGroupResault ? "passed" : "failed");
    document.body.innerHTML += currentGrouptHtml;
}