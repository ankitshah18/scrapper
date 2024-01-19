const { chromium } = require("playwright");

async function scrapeWebsite(url) {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    storageState: "./auth.json",
  });
  const page = await context.newPage();

  // Navigate to the desired webpage

  await page.goto(url);

  await page.waitForTimeout(6000);

  await page
    .getByRole("link", { name: "Polymers & Packaging", exact: true })
    .click();

  await page.getByRole("link", { name: "abs ABS" }).click();

  // const productBtnText = await page.$(
  //   ".SubCategoryFilter__productBtn--oTG8r span "
  // );
  // await productBtnText.click();

  const textArray = [];

  const elements = await page.$$(".SubCategoryFilter__productName--dt4cV");
  for (const element of elements) {
    const textContent = await element.textContent();

    await page.screenshot({ path: `{textContent}.png`, fullPage: true });
    textArray.push(textContent);
  }

  // await page.getByRole("button", { name: "ABS ABS" }).click();

  // const subCategoryElements = await page.waitForSelector(
  //   ".SubCategoryFilter__filterLink--C9Hsd.filterLink"
  // );

  // console.log(subCategoryElements);

  // console.log("done");

  // await page.screenshot({ path: "page.png", fullPage: true });

  // Close the browser
  console.log(textArray);
  await browser.close();
}

const websiteUrl = "https://www.ofbusiness.com/";
scrapeWebsite(websiteUrl);

// await page.setCookies();

// Perform scraping operations
// For example, let's extract the text of all the elements with a specific class
// const elements = await page.$$(".productName");
// for (const element of elements) {
//   console.log(await element.textContent());
// }

// const timeout = 60000;

// try {
//   await page.waitForSelector('text="Polymers & Packaging"',{timeout})
//   await page.click('text="Polymers & Packaging"')

// } catch (error) {
//   console.error("Error waiting for or clicking the element: ", error)
// }

// await page.getByText("Polymers & Packaging").first().click();
// await page.getByText("ABS").click();
