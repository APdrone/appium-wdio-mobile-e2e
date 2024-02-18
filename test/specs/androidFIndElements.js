describe('Android Element tests', () => {
  it('Find Element by accessibility id', async () => {
    //find element by accessibilty Id
    const appOption = await $('~App');

    //click on element
    await appOption.click();

    //assertion
    const actionBar = await $('~Action Bar');
    expect(actionBar).toBeExisting();
  });

  it('Find Element by class name', async () => {
    //find element by class name
    const className = await $$('android.widget.TextView');
    console.log(await className.getText());

    //Assertion
    await expect(className).tohaveText('API Demos');
  });

  it('Find element by xpath', async () => {
    //by xpath //tagname[@attribute=value]
    await $('~App').click();
    //find by content desc
    await $('//android.widget.TextView[@content-desc="Alert Dialogs"]').click();

    //find by resource-id
    await $('//android.widget.Button[@resource-id="io.appium.android.apis:id/select_button"]').click();

    //find by text
    await $('//android.widget.TextView[@text="Command two"]').click();

    //find by class -assertion
    const textAssertion = await $('//android.widget.TextView');

    await expect(textAssertion).toHaveText('You selected: 1 , Command two');
  });

  it('Find elements by UIAutomator', async () => {
    //find by text contains
    await $('~App').click();
    await $('android=new UiSelector().textContains("Alert")').click();
  });

  it('Find multiple Elements', async () => {
    const expectedList = [
      'API Demos',
      "Access'ibility",
      'Accessibility',
      'Animation',
      'App',
      'Content',
      'Graphics',
      'Media',
      'NFC',
      'OS',
      'Preference',
      'Text',
      'Views',
    ];
    const actualList = [];
    //finding multiple elements
    const textList = await $$('android.widget.TextView');

    //loop through them
    for (const element of textList) {
      actualList.push(await element.getText());
    }
    //assert the list
    await expect(actualList).toEqual(expectedList);
  });

  it.only('Enter input in text field', async () => {
    await $('~Views').click();

    await $('//android.widget.TextView[@text="Auto Complete"]').click();

    await $('//android.widget.TextView[@resource-id="android:id/text1"]').click();

    // const textField = await $('//android.widget.EditText[@resource-id="io.appium.android.apis:id/edit"]');
    const textField = await $('//android.widget.EditText[@resource-id="io.appium.android.apis:id/edit"]');

    await textField.addValue('India');

    await expect(textField).toHaveText('India');
  });
});
