import {test, expect} from '@playwright/test'
import { first } from 'rxjs-compat/operator/first'


test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:4200/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})

test('Locator syntax rules', async ({page}) => {
    //How to find a locator:

    //by Tag name
    await page.locator('input').first().click() // page.locator('input') will find all inputs on the page and return them

    //by ID
    page.locator('#inputEmail1')

    //by Class value
    page.locator('.shape-rectangle')

    //by attribute
    page.locator('[placeholder="Email"]')

    //by Class value (full)
    page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')

    //combine different selectors
    page.locator('input[placeholder="Email"]') // IMPORTANT: don't put space between values, you can add multiple valles

    //by XPath (NOT RECOMMENDED)
    page.locator('//*[@id="inputEmail1"]')

    //by partial text match
    page.locator(':text("Using")')

    //by exact text match
    page.locator(':text-is("Using the Grid")')
})

test('User facing locators', async ({page}) => {
    await page.getByRole('textbox', {name: 'Email'}).first().click()
    await page.getByRole('button', {name: 'Sign in'}).first().click()

    await page.getByLabel('Email').first().click()

    await page.getByPlaceholder('Jane Doe').click()

    await page.getByText('Using the Grid').click()

    await page.getByTestId('SingIn').click()

    // await page.getByTitle('IoT Dashboard').click()
})

test('Locating child elements', async ({page}) => {
    await page.locator('nb-card nb-radio :text-is("Option 1")').click()
    await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click()

    await page.locator('nb-card').getByRole('button', {name: 'Sign in'}).first().click()

    //The least preferable approach
    page.locator('nb-card').nth(3).getByRole('button').click()
})

test('Locating parent elements', async ({page}) => {
    await page.locator('nb-card', {hasText: "Using the Grid"})
        .getByRole('textbox', {name: "Email"})
        .click()
    await page.locator('nb-card', {has: page.locator('#inputEmail1')})
        .getByRole('textbox', {name: "Password"})
        .click()
    

    await page.locator('nb-card').filter({hasText: "Basic form"})
        .getByRole('textbox', {name: "Email"})
        .click()
    await page.locator('nb-card').filter({has: page.locator('.status-danger')})
        .getByRole('textbox', {name: "Password"})
        .click()
    
    // await page.mouse.move(0, 200)
    await page.locator('nb-card').filter({has: page.locator('nb-checkbox')})
        .filter({hasText: "Sign in"})
        .getByRole('textbox', {name: "Email"})
        .click()
    
    await page.locator(':text-is("Using the Grid")').locator('..')
        .getByRole('textbox', {name: "Email"})
        .click()
})

test('Reusing the locators', async ({page}) => {

    const basicForm = page.locator('nb-card').filter({hasText: 'Basic form'})
    const emailField = basicForm.getByRole('textbox', {name: "Email"})

    await emailField
        .fill('test1231@mail.com')
    
    await basicForm
        .getByRole('textbox', {name: "Password"})
        .fill('123456')
    
    await basicForm.locator('nb-checkbox').click()
    
    await basicForm
        .getByRole('button')
        .click()
    
    await expect(emailField).toHaveValue('test1231@mail.com')
})


test('Extracting values', async ({page}) => {
    // Get single text value
    const basicForm = page.locator('nb-card').filter({hasText: 'Basic form'})
    const buttonName = await basicForm.getByRole('button').textContent()
    console.log(buttonName)
    expect(buttonName).toEqual('Submit')

    // Get all text values
    const radioButtons = await page.locator('nb-radio').allTextContents()
    console.log(radioButtons)
    expect(radioButtons).toContain('Option 2')

    // Get value from input field
    const emailField = basicForm.getByRole('textbox', {name: "Email"})
    await emailField.fill('test@test.com')
    const emailFieldValue = await emailField.inputValue()
    expect(emailFieldValue).toEqual('test@test.com')

    const passwordField = basicForm.getByRole('textbox', {name: "Password"})
    await passwordField.fill('123456')
    const passwordFieldValue = await passwordField.inputValue()
    expect(passwordFieldValue).toEqual('123456')

    // Get attribute value
    const placeholderValue = await emailField.getAttribute('placeholder')
    expect(placeholderValue).toEqual("Email") 

})


test('Assertions', async ({page}) => {
    const basicFormButton = page.locator('nb-card').filter({hasText: 'Basic form'}).locator('button')

    //General assertions
    const value = 5
    expect(value).toEqual(5) // General assertion logic: We compare the value on the left to the value on the right

    const text = await basicFormButton.textContent()
    expect(text).toEqual('Submit')

    //Locator assertion
    await expect(basicFormButton).toHaveText('Submit') //Locator assertions have their own timeouts, the assertion will wait up to 5 seconds. The general assertion will not wait

    //Soft assertion
    await expect.soft(basicFormButton).toHaveText('Submit1')
    await basicFormButton.click()
})