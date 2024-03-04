import addNoteScreen from '../../screenobjects/android/add-note.screen.js';

describe('Add notes', () => {
  it('Skip tutorial', async () => {
    await driver.pause(3000);
    await addNoteScreen.skipBtn.click();

    await expect(addNoteScreen.AddNote).toBeDisplayed();
  });

  it('add a note, save changes & verify notes', async () => {
    // await driver.pause(3000);
    await addNoteScreen.AddNote.click();
    await addNoteScreen.textOption.click();
    await expect(addNoteScreen.textEditing).toBeDisplayed();

    //add note title
    await addNoteScreen.noteHeading.addValue('Fav Anime List');

    //add note body
    await addNoteScreen.noteBody.addValue('Naruto\nOnePiece\nAOT');

    //save the changes
    await addNoteScreen.saveNote();

    //assertion
    await expect(addNoteScreen.editBtn).toBeDisplayed();

    await expect(addNoteScreen.viewNote).toHaveText('Naruto\nOnePiece\nAOT');
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
