describe('Add notes', () => {
  it('Skip tutorial', async () => {
    await driver.pause(3000);
    await $('//*[@resource-id="com.socialnmobile.dictapps.notepad.color.note:id/btn_start_skip"]').click();

    await expect($('//*[@text="Add note"]')).toBeDisplayed();
  });

  it('add a note, save changes & verify notes', async () => {
    await driver.pause(3000);
    await $('//*[@text="Add note"]').click();
    await $('//*[@text="Text"]').click();
    await expect($('//*[@text="Editing"]')).toBeDisplayed();

    //add note title
    await $('//*[@resource-id="com.socialnmobile.dictapps.notepad.color.note:id/edit_title"]').addValue(
      'Fav Anime List'
    );

    //add note body
    await $('//*[@resource-id="com.socialnmobile.dictapps.notepad.color.note:id/edit_note"]').addValue(
      'Naruto\nOnePiece\nAOT'
    );

    //save the changes
    await driver.back();
    await driver.back();

    //assertion
    await expect($('//*[@resource-id="com.socialnmobile.dictapps.notepad.color.note:id/edit_btn"]')).toBeDisplayed();

    await expect($('//*[@resource-id="com.socialnmobile.dictapps.notepad.color.note:id/view_note"]')).toHaveText(
      'Naruto\nOnePiece\nAOT'
    );
  });

  it('delete notes', async () => {
    await driver.pause(3000);

    await $('//*[@resource-id="com.socialnmobile.dictapps.notepad.color.note:id/menu_btn"]').click();
    await $('//*[@text="Delete"]').click();
    await $('//*[@text="OK"]').click();
    await driver.pause(3000);

    await expect($('//*[@text="Add note"]')).toBeDisplayed();
  });
});
