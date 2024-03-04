Intro to Appium:
open source test automation framework for

- Native, Hybrid and mobile web apps
- iOS, Android and window apps
- Cross platform compatibility
  we need to vendor provided frameworks
- iOS: XCUITest
- ANdroid: UIAutomator
- Windows: WinAppDriver

pre-requsitte
node
java sdk
android setup
emulator
appium inspector
appium (from npmjs)(npm i -g appium)
appium-doctor --android: command to make sure everything is green so to install (npm i -g appium-doctor)

need to install drivers as well

> appium driver install xcuitest
> appium driver install uiautomator2

to check its installation, use:

> npx appium driver list

Remote Port: Update port to 4724 and run Appium on the same port as well by doing appium -p 4724

Remote Path: Set the path to / instead of /wd/hub/

webdriver setup:
walkthrough
Add testing app (in app/android folder)
update capability in wdio js

remove "type:module" from the package.json file

change export const config to exports.config in wdio.conf.js

to check installed driver list:

> appium driver list --installed

to check for all connected devices(emulator):

> adb devices

to kill process:(sometimes port is used)
https://stackoverflow.com/questions/39632667/how-do-i-remove-the-process-currently-using-a-port-on-localhost-in-windows

> to kill the process

port 4723 (given in wdio)

netstat -ano | findstr :<PORT>

netstat -ano | findstr :4723

taskkill /PID <PID> /F

# setup emulator and appium inspector

we will create another emulator(Nexus S api 29) for inspection and previous created emulator as actual where we test.

then we will add config in appium inspector of this new emulator(platformname, version, app name, device name)

{
"platformName": "Android",
"appium:platformVersion": "10",
"appium:deviceName": "Nexus S API 29",
"automationName": "UIAutomator2",
"appium:app": "D:\\FrondEnd\\Testing\\Udemy\\Appium\\webdriverio-appium\\app\\android\\ApiDemos-debug.apk"
}

to start the session from appium inspector, we need to manually start the appium we can type command

> appium -p 4724

also we can see the available driver list

PS D:\FrondEnd\Testing\Udemy\Appium\webdriverio-appium> appium driver list  
✔ Listing available drivers

- uiautomator2@2.34.1 [installed (npm)]
- xcuitest [not installed]
- mac2 [not installed]
- espresso [not installed]
- safari [not installed]
- gecko [not installed]
- chromium [not installed]

# finding element(Android)

locaotor techniques:

- accessbility Id : advantage being can be used for both android and Ios, thus cosnidered preferred option. also it doesnt change with localzation

we use tilda(~) for the accessibility id

```js
it('Find Element by accessibility id', async () => {
  //find element by accessibilty Id
  const appOption = await $('~App');

  //click on element
  await appOption.click();

  //assertion
  const actionBar = await $('~Action Bar');
  expect(actionBar).toBeExisting();
});
```

# review test logs

we can see in logs the command , api call , data and result

- spins the appium server on port(default is 4723 or the one mentioned in wdio.js)
- executes webDriverIO commands
- stop and closes port
- generate test report

# find by class name/Tag name

- it is not usually unique
- eg textview, button and layout

```js
it('Find Element by class name', async () => {
  //find element by class name
  const className = await $$('android.widget.TextView');
  console.log(await className.getText());

  //Assertion
  await expect(className).tohaveText('API Demos');
});
```

# find element by xpath

- go to selector after accessbility Id
- dynamic and flexible
- long and difficult to read

# find elements by Android UI Automator

Android UI Automator

- provides search capabilites

```js
it('Find elements by UIAutomator', async () => {
  //find by text contains
  await $('~App').click();
  await $('android=new UiSelector().textContains("Alert")').click();
});
```

-

Reference:
https://developer.android.com/reference/androidx/test/uiautomator/UiSelector

[https://webdriver.io/docs/selectors/#android-uiautomator](https://webdriver.io/docs/selectors/#android-uiautomator)

# finding multiple elements

-- use $$ to access multiple elements

# 6 Android- Native Features

## Package & Activity -Android

there are some keywords which we should aware of

> appPackage

it is full name of our application
eg for youtube it is 'com.google.android.youtube'

> appActivity

certain screen/functionality of the application
eg for our app it is MainActivity, Alert Dialog samples

advantages of using package and activitity is :

- we can access the screen directly
- save time by not going through multiple pages
- helps with test stabilization

Also we can get these va;ues from the appim inspector

for package:
I can select any element and then on right hand section under "select element" we get the package name

for activity:
after navigatting to screen

App> alert dialogs

then at top we have tabs source, commands, gesture, sesssion information

navigate to Commands tab

and click app managment > we have multiple tabs there

"getCurrent activity " and "get current packahe"

by clicking on these we get both the values

```js
//we
it('access an activity directly', async () => {
  //access an activity, pass 1st argument as package and second argument as combination of (package+ activity)
  await driver.startActivity('io.appium.android.apis', 'io.appium.android.apis.app.AlertDialogSamples');

  //pause
  driver.pause(3000);
  //assertion
  await expect($('//*[@text="App/Alert Dialogs"]')).toExist();
});
```

## handling dialog/alert box:

Agenda:

for alerts, we can

- accept alert
- dismiss alert
- click ok/cancel

get text from alert?

```js
it('Working with dialog boxes', async () => {
  //access an activity
  await driver.startActivity('io.appium.android.apis', 'io.appium.android.apis.app.AlertDialogSamples');

  // //click on first dialog box
  await $('//*[@resource-id="io.appium.android.apis:id/two_buttons"]').click();

  // //accept alert
  await driver.acceptAlert();

  // //dismisss alert
  await driver.dismissAlert();

  // //click on ok button
  await $("//*[@resource-id='android:id/button1']").click();

  //get text
  const text = await driver.getAlertText();

  // //assertion- alert box is no longer available
  // await expect($('//*[@resource-id="android:id/alertTitle"]')).not.toExist();
});
```

# vertical scrolling

-working with elements that are not visible within the viewport

- finding whether element is scrollable?
  - scroll to end
  - scroll text into view

for scroll we have "UiScrollable" class, within we have method
"ScrollToEnd" which takes two params:

maxSwipes- type int
steps: speed of swipe

to check whether it is scrollable==>scrollable(true)

> await $('android=new UIScrollable(new UiSelector().scrollable(true)).scrollToEnd(1,5)')

```js
it.only('Vertical scrolling', async () => {
  //access an activity
  await $('~App').click();
  await $('~Activity').click();

  //scroll to end
  await $('android=new UiScrollable(new UiSelector().scrollable(true)).scrollToEnd(1,5)');
  await $('~Secure Surfaces').click();

  //assertion
  await expect($('~Secure Dialog')).toExist();
});
```

or better way then this is to

```js
it.only('Vertical scrolling', async () => {
  //access an activity
  await $('~App').click();
  await $('~Activity').click();

  //scroll to end
  // await $('android=new UiScrollable(new UiSelector().scrollable(true)).scrollToEnd(1,5)');

  //here we are scrolling if text is not on the screen

  await $('android=new UiScrollable(new UiSelector().scrollable(true)).scrollTextIntoView("Secure Surfaces")').click();
  // await $('~Secure Surfaces').click();

  //assertion
  await expect($('~Secure Dialog')).toExist();
});
```

# horizontal scrolling

similar to vertical , we do it for horizaontal rthis time

```ts
it.only('horizontal scrolling', async () => {
  await driver.startActivity('io.appium.android.apis', 'io.appium.android.apis.view.Gallery1');

  //horizontal scrolling- we will add ".setAsHorizontalList()" in the prev command we used for vertical
  await $('android=new UiScrollable(new UiSelector().scrollable(true)).setAsHorizontalList().scrollForward()');

  //for backward scroll horizontally
  await $('android=new UiScrollable(new UiSelector().scrollable(true)).setAsHorizontalList().scrollBackward()');

  await driver.pause(3000);
});
```

# testing real app

add new app in the repo and update its path in wdio

```js

 {
      // new app
      platformName: 'Android',
      'appium:platformVersion': '13.0',
      'appium:deviceName': 'Pixel 2 API 33',
      'appium:automationName': 'UIAutomator2',
      'appium:app': path.join(process.cwd(), 'app/android/ColorNote+Notepad.apk'),
      'appium:autoGrantPermissions': true,
    },

```

# handle permission

when we open the app we get the pop up whether to allow app to access media, other . to handle it we can add below in wdio.conf.ts

> 'appium:autoGrantPermissions': true,

so now when we run the test, we wont see the pop up and the permission is given to it

# skip tutoraial :

when we open app, it shows the "tuturoal" on how to use the note app

# add notes

refer this for test
test\specs\android\add-note.spec.js

# page object Model(Android)

## setup screen objects

# Ios Set and configurations:

# framework design
