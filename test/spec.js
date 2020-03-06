const report = require("../src/main");
report.logger.level = 'all';

describe('angularjs homepage todo list', function() {
    report.testData.startTest('protractor test','verify protractor test');
    it('should add a todo', function() {
        browser.get('https://angularjs.org');
        console.log(browser.constructor.name)
        console.log(browser.driver.constructor.name)

        report.testData.addTestStep('launch browser', null,browser);
        report.testData.endTest();

        element(by.model('todoList.todoText')).sendKeys('write first protractor test');
        element(by.css('[value="add"]')).click();

        var todoList = element.all(by.repeater('todo in todoList.todos'));
        expect(todoList.count()).toEqual(3);
        expect(todoList.get(2).getText()).toEqual('write first protractor test');

        // You wrote your first test, cross it off the list
        todoList.get(2).element(by.css('input')).click();
        var completedAmount = element.all(by.css('.done-true'));
        expect(completedAmount.count()).toEqual(2);
    });
});
