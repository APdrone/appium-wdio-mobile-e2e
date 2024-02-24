describe('Android native feature test', () => {
  it('access an activity directly', async () => {
    //access an activity
    await driver.startActivity('io.appium.android.apis', 'io.appium.android.apis.app.AlertDialogSamples');

    //pause
    driver.pause(3000);
    //assertion
    await expect($('//*[@text="App/Alert Dialogs"]')).toExist();
  });

  it('Working with dialog boxes', async () => {
    //access an activity
    await driver.startActivity('io.appium.android.apis', 'io.appium.android.apis.app.AlertDialogSamples');

    // //click on first dialog box
    await $('//*[@resource-id="io.appium.android.apis:id/two_buttons"]').click();

    // //accept alert
    // await driver.acceptAlert();

    // //dismisss alert
    // await driver.dismissAlert();

    // //click on ok button
    // await $("//*[@resource-id='android:id/button1']").click();

    //get text
    const text = await driver.getAlertText();

    // //assertion- alert box is no longer available
    // await expect($('//*[@resource-id="android:id/alertTitle"]')).not.toExist();
  });

  it('Vertical scrolling', async () => {
    //access an activity
    await $('~App').click();
    await $('~Activity').click();

    //scroll to end
    // await $('android=new UiScrollable(new UiSelector().scrollable(true)).scrollToEnd(1,5)');

    //here we are scrolling if text is not on the screen

    await $(
      'android=new UiScrollable(new UiSelector().scrollable(true)).scrollTextIntoView("Secure Surfaces")'
    ).click();
    // await $('~Secure Surfaces').click();

    //assertion
    await expect($('~Secure Dialog')).toExist();
  });
  it.only('horizontal scrolling', async () => {
    await driver.startActivity('io.appium.android.apis', 'io.appium.android.apis.view.Gallery1');

    //horizontal scrolling- we will add ".setAsHorizontalList()" in the prev command we used for vertical
    await $('android=new UiScrollable(new UiSelector().scrollable(true)).setAsHorizontalList().scrollForward()');

    //for backward scroll horizontally
    await $('android=new UiScrollable(new UiSelector().scrollable(true)).setAsHorizontalList().scrollBackward()');
    await driver.pause(3000);
  });
});
