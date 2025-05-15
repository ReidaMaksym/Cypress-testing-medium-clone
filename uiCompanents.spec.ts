import {test, expect} from '@playwright/test'
import { delay } from 'rxjs-compat/operator/delay'

test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:4200/')
})

test.describe('Form layots page', () => {
    test.beforeEach(async ({page}) => {
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
    })

    test('Input fields', async ({page}) => {
        const usingTheGridEmailInput = page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: 'Email'})

        await usingTheGridEmailInput.fill('test@test.com')
        await usingTheGridEmailInput.clear()

        // how to simulate keystrokes of the keyboard
        await usingTheGridEmailInput.pressSequentially('test@test2.com', {delay: 500})

        // Generic assertion
        // you need first to get the text from the input field

        const inputValue = await usingTheGridEmailInput.inputValue()
        expect(inputValue).toEqual('test@test2.com')

        // Locator assertion
        await expect(usingTheGridEmailInput).toHaveValue('test@test2.com')

    })

    test('Radio buttons', async ({page}) => {
        const usingTheGridForm = page.locator('nb-card', {hasText: "Using the Grid"})

        // await usingTheGridForm.getByLabel('Option 1').check({force: true})
        await usingTheGridForm.getByRole('radio', {name: 'Option 1'}).check({force: true})

        //How to check that the radio button was selected

        //Generick assertion
        // for the generick assertion, we need the status (isChecked) of the radio button
        const radioStatus = await usingTheGridForm.getByRole('radio', {name: 'Option 1'}).isChecked() // the recommended approach
        expect(radioStatus).toBeTruthy()

        //Locator assertion
        await expect(usingTheGridForm.getByRole('radio', {name: 'Option 1'})).toBeChecked()

        // other validations
        await usingTheGridForm.getByRole('radio', {name: 'Option 2'}).check({force: true})
        expect(await usingTheGridForm.getByRole('radio', {name: 'Option 1'}).isChecked()).toBeFalsy()
        expect(await usingTheGridForm.getByRole('radio', {name: 'Option 2'}).isChecked()).toBeTruthy()
    })
})

test('Checkboxes', async ({page}) => {
    await page.getByText('Modal & Overlays').click()
    await page.getByText('Toastr').click()

    // await page.getByRole('checkbox', {name: 'Hide on click'}).click({force: true})
    await page.getByRole('checkbox', {name: 'Hide on click'}).check({force: true}) // It's better to use the check method(). The check() method will check the status of the checkbox and if the chechbox is already checked it will not unselect this checkbox, it will remain selected
    await page.getByRole('checkbox', {name: 'Hide on click'}).uncheck({force: true})
    await page.getByRole('checkbox', {name: 'Prevent arising of duplicate toast'}).check({force: true})

    // how to select all checkboxes
    const allBoxes = page.getByRole('checkbox')
    for(const box of await allBoxes.all()){
        await box.check({force: true})
        expect(await box.isChecked()).toBeTruthy()
    }
})