import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
    await page.goto('http://localhost:3000');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Missing Persons/);
});


test('view missing persons link', async ({ page }) => {
    await page.goto('http://localhost:3000');

  // Click the missing persons link.
    await page.getByRole('button', { name: 'View Database' }).click();

    await expect(page).toHaveURL("http://localhost:3000/table");
});


test('persons are loaded from database', async ({page}) => {
    await page.goto('http://localhost:3000/table');

    // Wait for the table to load
    await page.waitForSelector("tbody");

    //Get the table rows

    const rows = page.locator("table tbody tr");
    

    


    
    for (let i = 0; i < await rows.count(); i++) {
	const row = rows.nth(i);

	const cells = await row.locator('td')

	for (let j = 0; i < await cells.count(); j++) {
	    console.log(await cells.nth(j).textContent());
	}
    }
    
    const expectedData = [
	["1", "John Doe", "25", "john@example.com", "male"],
	["2", "Jane Smith", "30", "jane@example.com", "female"]
    ]

    
})
