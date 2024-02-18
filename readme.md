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

> appium driver list

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
-

Reference:
https://developer.android.com/reference/androidx/test/uiautomator/UiSelector

[https://webdriver.io/docs/selectors/#android-uiautomator](https://webdriver.io/docs/selectors/#android-uiautomator)

# finding multiple elements

-- use $$ to access multiple elements
