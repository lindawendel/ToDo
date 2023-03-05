// @ts-check
const { test, expect } = require('@playwright/test');

test('add one todo item and show it on the page', async ({ page }) => {
    await page.goto('http://127.0.0.1:5500/');

    // Adding a todo item
    await page.locator('#new_todo').fill('Buy milk');

    // Submitting the todo item by pressing Enter
    await page.keyboard.press('Enter');

    // Showing the text label of the list item that has been created
    let toDoText = await page.locator('label').textContent();
    await expect(toDoText).toEqual('Buy milk');
});

test('add one todo item and show items left', async ({ page }) => {
    await page.goto('http://127.0.0.1:5500/');

    // Adding and submitting the todo item
    await page.locator('#new_todo').fill('Buy milk');
    await page.keyboard.press('Enter');

    // Showing that there is one todo item
    let toDoTotalText = await page.locator('#toDoTotal').textContent();
    await expect(toDoTotalText).toEqual('1 item left');

    // Clicking the checkbox
    await page.locator('#taskList li input[type=checkbox]').click();
    //await checkbox.click();

    // Showing that there are no todo items
    let toDoTotalText2 = await page.locator('#toDoTotal').textContent();
    await expect(toDoTotalText2).toEqual('0 items left');
});

test('add three todo items and show items left', async ({ page }) => {
    await page.goto('http://127.0.0.1:5500/');

    // Adding and submitting the first todo item
    await page.locator('#new_todo').fill('Buy milk');
    await page.keyboard.press('Enter');

    // Adding and submitting the second todo item
    await page.locator('#new_todo').fill('Make dinner');
    await page.keyboard.press('Enter');

    // Adding and submitting the third todo item
    await page.locator('#new_todo').fill('Take a walk');
    await page.keyboard.press('Enter');

    // Clicking the checkbox for one of the todo items
    let listItem = page.getByRole('listitem').filter({hasText:'Buy milk'}); 
    await listItem.getByRole('checkbox').click();

    // Showing that there are two todo items left
    let toDoTotalText = await page.locator('#toDoTotal').textContent();
    await expect(toDoTotalText).toEqual('2 items left');
});