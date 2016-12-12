/**
 * Created by Jbt on 12/12/2016.
 */
describe("SignUp", function() {
    describe("checks validation of password", function() {
        it("checkConfirmPassword", function() {
            expect(checkConfirmPassword("123","123")).toBeTruthy();
        });
        it("checkConfirmPassword", function() {
            expect(checkConfirmPassword("123","124")).toBeFalsy();
        });
        it("checkConfirmPassword", function() {
            spyOn(window, "checkConfirmPassword");
            checkConfirmPassword("123","123");
            expect(window.checkConfirmPassword).toHaveBeenCalled();
        });
    });
});

