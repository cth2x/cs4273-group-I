import { test, expect } from '@playwright/test';

const data = [
  ["MP137407", "01/17/2025", "Moneta", "Jeremiah", "22 Years", "Ponca City", "Kay", "OK", "Male", "Black / African American", "01/29/2025"],
  ["MP136447", "01/12/2025", "Chalepah", "Allen", "14 Years", "Anadarko", "McClain", "OK", "Male", "American Indian / Alaska Native", "01/22/2025"],
  ["MP136016", "01/05/2025", "Nicole", "Twitty", "17 Years", "Oklahoma City", "Oklahoma", "OK", "Female", "Black / African American", "01/22/2025"],
  ["MP135785", "12/31/2024", "Marmolejo", "Isabella", "19 Years", "Oklahoma City", "Oklahoma", "OK", "Female", "Hispanic / Latino, White / Caucasian", "01/06/2025"],
  ["MP136266", "12/19/2024", "Reyes - Luviano", "Juan", "40 Years", "Tulsa", "Tulsa", "OK", "Male", "Hispanic / Latino", "01/17/2025"],
  ["MP137360", "12/13/2024", "Orton", "Kenneth", "52 Years", "Oklahoma City", "Oklahoma", "OK", "Male", "White / Caucasian", "01/28/2025"],
  ["MP137356", "12/11/2024", "Stevenson Jr", "Edward", "33 Years", "Oklahoma City", "Oklahoma", "OK", "Male", "Black / African American", "01/28/2025"],
  ["MP134817", "12/08/2024", "Smith", "Zachary", "48 Years", "Sand Springs", "Osage", "OK", "Male", "White / Caucasian", "12/16/2024"],
  ["MP136437", "12/07/2024", "Rousch", "Ralph", "62 Years", "Tulsa", "Tulsa", "OK", "Male", "White / Caucasian", "01/13/2025"],
  ["MP135979", "12/07/2024", "Sherman", "William", "63 Years", "Tulsa", "Tulsa", "OK", "Male", "Black / African American", "01/06/2025"],
  ["MP137436", "11/28/2024", "Ontiveros", "Joshua", "47 Years", "Oklahoma City", "Oklahoma", "OK", "Male", "White / Caucasian", "01/29/2025"],
  ["MP133993", "11/26/2024", "Thomas", "Rochelle", "59 Years", "Thackerville", "Love", "OK", "Female", "White / Caucasian", "12/17/2024"],
  ["MP134854", "11/24/2024", "Little", "Matthew", "15 Years", "Lawton", "Comanche", "OK", "Male", "White / Caucasian", "12/16/2024"],
  ["MP135268", "11/20/2024", "Ray", "Joshua", "15 Years", "Norman", "Cleveland", "OK", "Male", "Uncertain", "12/23/2024"],
  ["MP134177", "11/20/2024", "Knox", "Josiah", "14 Years", "Lawton", "Comanche", "OK", "Male", "Black / African American", "12/13/2024"],
  ["MP137348", "11/18/2024", "Mapp", "Raylene", "23 Years", "Oklahoma City", "Oklahoma", "OK", "Female", "Black / African American", "01/28/2025"],
  ["MP134597", "11/16/2024", "Dupre", "David", "54 Years", "Duncan", "Stephens", "OK", "Male", "White / Caucasian", "01/30/2025"],
  ["MP135265", "11/15/2024", "Starks", "Isiah", "16 Years", "Norman", "Cleveland", "OK", "Male", "Black / African American", "12/23/2024"],
  ["MP135264", "11/13/2024", "Zepeta", "Mario", "16 Years", "Norman", "Cleveland", "OK", "Male", "Uncertain", "12/23/2024"],
  ["MP134345", "11/11/2024", "Redmond", "Christopher", "54 Years", "Muskogee", "Muskogee", "OK", "Male", "White / Caucasian", "12/13/2024"],
  ["MP133841", "11/08/2024", "Dickerson", "Donaven", "24 Years", "Broken Arrow", "Wagoner", "OK", "Male", "White / Caucasian, American Indian / Alaska Native", "12/02/2024"],
  ["MP135262", "11/07/2024", "Carlson", "Brandon", "19 Years", "Norman", "Cleveland", "OK", "Male", "White / Caucasian", "12/23/2024"],
    ["MP135063", "10/31/2024", "Torres", "Jazlyn", "17 Years", "Enid", "Garfield", "OK", "Female", "White / Caucasian", "12/18/2024"]
];




test('has title', async ({ page }) => {
    await page.goto('http://localhost:3000');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Missing Persons/);
});


test('navigation', async ({ page }) => {
    await page.goto('http://localhost:3000');

  // Click the missing persons link.
    await page.getByRole('button', { name: 'View Database' }).click();

    await expect(page).toHaveURL("http://localhost:3000/table");

    // Go back home
    await page.getByRole('button', {name: 'Back to Home'}).click();

    await expect(page).toHaveURL("http://localhost:3000");
});


test('persons are loaded from database', async ({page}) => {
    await page.goto('http://localhost:3000/table');

    // Wait for the table to load
    await page.waitForTimeout(4000);

    //Get the table rows

    const rows = page.locator("table tbody tr");


    console.log("Rows:", await rows.count())
    
    for (let i = 0; i < await rows.count(); i++) {
	const row = await rows.nth(i);

	const cells = await row.locator('td')

	console.log(await cells.count());

	for (let j = 1; j < await cells.count(); j++) {
	    expect(await cells.nth(j).textContent()).toBe(data[i][j - 1])
	}
    }
})

test('persons count', async ({page}) => {
    await page.goto('http://localhost:3000/table')

    await page.waitForTimeout(3000);


    const rows = await page.locator("table tbody tr")

    expect(await rows.count()).toBe(10)

})
