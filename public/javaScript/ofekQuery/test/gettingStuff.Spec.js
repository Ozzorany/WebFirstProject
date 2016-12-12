describe('Query selector', function () {
    beforeEach(function () {
        document.body.innerHTML = __html__['index.html'];
    });

    it('Should get all of the elements of the same tag', function () {
        var liAmount = $('li').count();

        expect(liAmount).toBe(10);
    });

    it('Should get all of the elements of the same id', function () {
        var liAmount = $('#davids-div').count();

        expect(liAmount).toBe(1);
    });

    it('Should get all of the elements of the same class', function () {
        var liAmount = $('.sup').count();

        expect(liAmount).toBe(1);
    });

    it('should be able find nested elements', function () {
        var eleAmount = $('div li p').count();

        expect(eleAmount).toBe(1);
    });

    it('should return empty array when empty string is given', function () {
        var eleAmount = $('').count();

        expect(eleAmount).toBe(0);
    });

    it('should return empty array when no parameters given', function () {
        var eleAmount = $().count();

        expect(eleAmount).toBe(0);
    });

    it('should change the color to blue', function () {
        var cssChange = $("#davids-div");
        var isCssGood = false;
        cssChange.css("color", "blue");
        var attributes = cssChange.getAttribute("style");
        for (attribute of attributes) {
            if (attribute.split(": ")[1].includes("blue")) {
                isCssGood = true;
            }
        }
        cssChange.css("color", "black");

        expect(isCssGood).toBeTruthy();
    });

    it('should add class Papa', function () {
        var isClassGood = false;
        var checkClassDiv = $("#davids-div");
        checkClassDiv.addClass("Papa");
        if (checkClassDiv.getAttribute("class")[0].includes("Papa")) {
            isClassGood = true;
        }
        checkClassDiv.removeClass("Papa");

        expect(isClassGood).toBeTruthy();
    });

    it('should remove class toRemove', function () {
        var isRemoveClassGood = false;
        var chekcRemoveDiv = $("#davids-div");
        chekcRemoveDiv.addClass("toRemove");
        chekcRemoveDiv.removeClass("toRemove");
        if (!chekcRemoveDiv.getAttribute("class")[0].includes("toRemove")) {
            isRemoveClassGood = true;
        }
        expect(isRemoveClassGood).toBeTruthy();
    });

    it('all function check', function () {
        var isAllFunc = false;

        var userNames = $(".userName");
        if (userNames.all(onlyChild)) {
            isAllFunc = true;
        }

        expect(isAllFunc).toBeTruthy();
    });

    it('any function check', function () {
        var isAnyFunc = false;

        var userNames = $(".username");
        isAnyFunc = userNames.any(noChild);

        expect(isAnyFunc).toBeTruthy();
    });

    it('setAttribute function check', function () {
        var isSetAttribute = false;

        var userNames = $(".username");
        userNames.elements[0].setAttribute("style", "color:red");
        if (userNames.elements[0].getAttribute("style").includes("color:red")) {
            isSetAttribute = true;
        }

        expect(isSetAttribute).toBeTruthy();
    });

    it('getAttribute function check', function () {
        var isGetAttribute = false;

        var userNames = $(".username");
        if (userNames.elements[0].getAttribute("class").includes("username")) {
            isGetAttribute = true;
        }

        expect(isGetAttribute).toBeTruthy();
    });

    it('each check', function () {
        var isEach = true;
        var elements = $(".username")
        elements.each(setCssColorGreen);

        for (element of elements.elements) {
            if (!element.getAttribute("style").includes("color:green")) {
                isEach = false;
            }
        }

        expect(isEach).toBeTruthy();

    });

    it('appendChild check', function () {
        var isAppended = false;
        var elements = $(".username");
        var newDivElement = document.createElement("div");
        newDivElement.className = "appended!";
        elements.appendChild(newDivElement);
        if (elements.elements[0].getElementsByClassName("appended!").length === 1) {
            isAppended = true;
        }


        expect(isAppended).toBeTruthy();

    });

    it('map check', function () {
        var isMap = true;

        var newArray = $(".username").map(function (element) {
             element.setAttribute("style","color:red");
            return element;
        });

        for(element of newArray){
            if(!element.getAttribute("style").includes("color:red")){
                isMap = false;
            }
        }

        expect(isMap).toBeTruthy();
    });

    it('filter check', function () {
        var isMap = true;

        var newArray = $(".username").filter(defaultFunction);


            if(newArray.elements.length !== 1){
                isMap = false;
            }


        expect(isMap).toBeTruthy();

    });

    it('get check', function () {
        var isMap = true;

        var newArray = $(".username").get(0);


        if(newArray.getAttribute("class") !== "username"){
            isMap = false;
        }


        expect(isMap).toBeTruthy();
    });
});

function onlyChild(element) {
    if (element.children.length == 1) {
        return true;
    }
    return false;
}

function noChild(element) {
    if (element.children.length != 0) {
        return true;
    }
    return false;
}

function setCssColorGreen(element) {
    element.setAttribute("style", "color:green");
}

function defaultFunction(){
    return true;
}