// spec.js
describe('angularjs homepage', function() {
  var firstCarbon = element(by.id('carbon0'));
  var firstNitrogen = element(by.id('nitrogen0'));
  var secondCarbon = element(by.id('carbon1'));
  var secondNitrogen = element(by.id('nitrogen1'));
  var goButton = element(by.id('gobutton'));
  var latestResult = element(by.binding('latest'));
  var ptor = protractor.getInstance();
  // var request = require('request');
  // var request = require('jquery')(window);


  beforeEach(function() {
    browser.get('http://127.0.0.1:8000/calculator/');
  });

  // it('Should Have a Title', function() {
  //   expect(browser.getTitle()).toEqual('Compost Calculator');
  // });

  // it('Should Add Compostables to Heap', function() {
  //   firstCarbon.click();
  //   firstNitrogen.click();

  //   expect(element(by.id('1Vol')).isPresent());
  // });

  // it('Should Remove Compostables', function() {
  //   firstCarbon.click();
  //   firstNitrogen.click();

  //   element(by.id('calcClear')).click();
  //   expect(element.all(by.id('0Vol')).count()).toBe(0);
  //   expect(element.all(by.id('1Vol')).count()).toBe(0);
  //   // expect($$('#Vol1').count()).toBe(0)
  // });



// Login and Registration Tests

  // it('Should go to Login Page', function() {
  //   $$('.loginBTN').click()
  //   expect(browser.driver.getCurrentUrl()).toMatch("/login");
  // });

  // it('Should be able to login', function() {
  //   $$('.loginBTN').click()
  //   element(by.id('id_username')).sendKeys('test');
  //   element(by.id('id_password')).sendKeys(11111);
  //   $$('#submit').click();
  //   expect(browser.driver.getCurrentUrl()).toMatch("http://127.0.0.1:8000/calculator/");
  //   $$('.logoutBTN').click()
  // });


  // it('Should be able to register', function() {

  //   // require('jquery', function( $ ) {
  //   //     $.ajax({
  //   //         type: "DELETE",
  //   //         url: "http://127.0.0.1:8000/calculator/users/destroy/testUser",
  //   //         // data: "name=someValue",
  //   //         success: function(msg){
  //   //             alert("Data Deleted: " + msg);
  //   //         },
  //   //         error: function(msg){
  //   //             alert("Something went wrong: " + msg);
  //   //         }
  //   //     });
  //   // });


  //   var request = require("request");

  //   console.log("making request............");
  //   request({
  //     uri: "http://127.0.0.1:8000/calculator/users/destroy/testUser",
  //     method: "DELETE"
  //   }, function(error, response, body) {
  //     console.log(body);
  //   });
  //   console.log("request.... made?");

  //   browser.debugger();

  //   $$('.loginBTN').click();
  //   $$('#register').click();
  //   // ptor.sleep(5000);
  //   expect(browser.driver.getCurrentUrl()).toMatch("http://127.0.0.1:8000/accounts/register");
  //   element(by.id('id_username')).sendKeys('testUser');
  //   element(by.id('id_email')).sendKeys('test@test.com');
  //   element(by.id('id_password1')).sendKeys(11111);
  //   element(by.id('id_password2')).sendKeys(11111);
  //   $$('#submit').click();
  //   expect(browser.driver.getCurrentUrl()).toMatch("http://127.0.0.1:8000/calculator");
  //   $$('.logoutBTN').click();
  //   // ptor.get('http://127.0.0.1:8000/calculator/users/destroy/testUser');
  // });




 // it('Should switch to add Compostable', function() {
 //  $$('#add_test_hook').click();
 //  expect($$('#Add_compostable_page').count()).toBe(1);
 // });

  // it('Should add Compostable', function() {
  //   $$('.loginBTN').click()
  //   element(by.id('id_username')).sendKeys('test');
  //   element(by.id('id_password')).sendKeys(11111);
  //   $$('#submit').click();

  //   $$('#add_test_hook').click();
  //   var history = element.all(by.repeater('post in posts'));
  //   var initialCount;

  //   initialCount = history.count().then(function(originalCount) {
  //     return originalCount + 1;
  //   });

  //   $$('#inputTitle').sendKeys('Test Compostable');
  //   $$('#inputCarbon').sendKeys(78);
  //   $$('#inputNitro').sendKeys(1);
  //   $$('#inputDesc').sendKeys("This is a test.");
  //   $$('#compSaveBtn').click();
  //   browser.debugger();
  //   var f_history = element.all(by.repeater('post in posts'));
  //   var finalCount = f_history.count();
  //   console.log(typeof(finalCount));
  //   expect(finalCount).toEqual(initialCount);
  //   $$('.logoutBTN').click()
  // });


  it('Should Remove Volume Corresponding to Compostable', function() {
    firstCarbon.click();
    firstNitrogen.click();
    secondCarbon.click();
    secondNitrogen.click();

    element(by.id('0Vol')).sendKeys(5);
    element(by.id('1Vol')).sendKeys(6);
    element(by.id('2Vol')).sendKeys(7);
    element(by.id('3Vol')).sendKeys(8);

    $$('#deleteBtn1').click();

    expect(element(by.id('0Vol')).getAttribute('value')).toEqual('5');
    expect(element(by.id('1Vol')).getAttribute('value')).toEqual('7');
    expect(element(by.id('2Vol')).getAttribute('value')).toEqual('8');
  });

  it('Should notify you if you try to add the same Compostable twice', function() {
    firstCarbon.click();
    firstCarbon.click();

    var alertDialog = browser.switchTo().alert();

    console.log(alertDialog)
    expect(alertDialog.getText()).toEqual("You've already added that item.");

    browser.switchTo().alert().dismiss();
  });

  it('Should properly handle suggestion additions when one of the list items has zero volume', function() {
    firstCarbon.click();
    secondNitrogen.click();
    secondCarbon.click();


    element(by.id('0Vol')).sendKeys(5);
    element(by.id('2Vol')).sendKeys(7);

    element(by.id('nitroSuggest0')).click();
    browser.debugger();
    expect(element(by.id('ratio')).getAttribute('value')).toEqual('30');
  });


});