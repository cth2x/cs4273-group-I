import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
    await page.goto('http://localhost:3000');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Missing Persons/);
});


test('view missing persons link', async ({ page }) => {
    await page.goto('http://localhost:3000');

  // Click the missing persons link.
    await page.getByRole('button', { name: 'View Missing Persons' }).click();

    await expect(page).toHaveURL("http://localhost:3000/table");
});


test('persons are loaded from database', async ({page}) => {
    await page.goto('http://localhost:3000/table');
    await page.waitForSelector("#missing-persons-selector tbody");

    const rows = await page.$$eval('#missing-persons-table tbody tr', rows =>
	rows.map(row => {
	    return Array.from(row.cells).map(cell => cell.textContent.trim());

	}));

    const expectedData = [
	["1", "John Doe", "25", "john@example.com", "male"],
	["2", "Jane Smith", "30", "jane@example.com", "female"]
    ]

    expect(rows).toEqual(expectedData)
    
})
