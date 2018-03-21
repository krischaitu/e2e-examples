describe('Calculator -History Items', function() {

    beforeEach(function() {
      browser.get('http://localhost:3456/');
    });

    var first, second, goButton;
    beforeEach(function() {
      first = element(by.model('first'));
      second = element(by.model('second'));
      goButton = element(by.id('gobutton'));
    });

    it('should start out with an empty result', function () {
      var memory =
          element.all(by.repeater('result in memory'));

      expect(memory.count()).toEqual(0);
    });

    it('should fill the memory with past results', function() {
      first.sendKeys(1);
      second.sendKeys(1);
      goButton.click();

      first.sendKeys(10);
      second.sendKeys(20);
      goButton.click();

      var memory = element.all(by.repeater('result in memory').
          column('result.value'));
      memory.then(function (arr) {
        expect(arr.length).toEqual(2);
        expect(arr[0].getText()).toEqual('30'); // 10 + 20 = 30
        expect(arr[1].getText()).toEqual('2'); // 1 + 1 = 2
      });
    });
  });

