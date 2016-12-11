var createDivElement = function () {
    return document.createElement("div")
};

var createImageElement = function () {
    return document.createElement("img")
};

var createBoldElement = function () {
    return document.createElement("b")
};

var createInputlement = function () {
    return document.createElement("input")
};

// Testing
describe("Tweeting", function () {
    describe("checks Creating an tweeting html element", function () {
        describe("checks Creating div element", function () {
            it("createDivElement", function () {
                let divElement = document.createElement("div");
                expect(createDivElement()).toEqual(divElement);
            });
        });

        describe("checks Creating image element", function () {
            it("createImageElement", function () {
                let imgElement = document.createElement("img");
                expect(createImageElement()).toEqual(imgElement);
            });
        });

        describe("checks Creating b element", function () {
            it("createBoldElement", function () {
                let boldElement = document.createElement("b");
                expect(createBoldElement()).toEqual(boldElement);
            });
        });


        describe("checks Creating div element", function () {
            it("createInputlement", function () {
                let inputElement = document.createElement("input");
                expect(createInputlement()).toEqual(inputElement);
            });
        });
    });
});