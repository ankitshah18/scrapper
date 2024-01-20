// @ts-check
const { test, expect } = require("playwright/test");

test("ofbusiness login", async ({ browser }) => {
  const context = await browser.newContext({
    storageState: "./auth.json",
  });

  const page = await context.newPage();
  // const ctxt = page.context();
  // ctxt.storageState();

  await page.goto("https://www.ofbusiness.com/");
  await page.waitForTimeout(6000);

  // await page.getByText("Polymers & Packaging").first().click();
  // await page.getByText("ABS").click();

  await page
    .getByRole("link", { name: "Polymers & Packaging", exact: true })
    .click();
  await page.getByRole("link", { name: "abs ABS" }).click();

  await page.waitForTimeout(3000);

  const pages = await page.$eval(
    ".Pagination__ofbPagination--sKVuL li:nth-last-child(2)",
    (element) => {
      return element.textContent?.trim();
    }
  );

  while (pages > 0) {
    const data = [];
    const elements = await page.$$(".tableRow");

    for (const element of elements) {
      const h3Tags = await element.$$("h3");

      const rowData = {
        Product: await (await h3Tags[0].$("a"))?.textContent(),
        Location: await (await h3Tags[1].$("a"))?.textContent(),
        Price: await (await h3Tags[2].$("a"))?.textContent(),
      };

      data.push(rowData);
    }
    const nextButton = await page.$('.next a:has-text("Next")');
    nextButton?.click();
    console.log(data);
  }

  await browser.close();
});

//-------------------Test-2------------------//

// test("ofbusiness login", async ({ browser }) => {
//   const context = await browser.newContext({
//     storageState: "./auth.json",
//   });

//   const page = await context.newPage();

//   await page.goto("https://www.ofbusiness.com/");
//   await page.waitForTimeout(6000);

//   await page
//     .getByRole("link", { name: "Polymers & Packaging", exact: true })
//     .click();

//   // await page.getByRole("link", { name: "dce-block-board DCE:Block" }).click();

//   // await page.getByRole("link", { name: "GPPS GPPS" }).click();

//   await page
//     .locator("div")
//     .filter({ hasText: /^GPPS$/ })
//     .click();

//   let pageNumber = 1;

//   do {
//     // Extract data from the current page
//     const data = [];
//     const elements = await page.$$(".tableRow");

//     for (const element of elements) {
//       const h3Tags = await element.$$("h3");

//       const rowData = {
//         Product: await (await h3Tags[0].$("a"))?.textContent(),
//         Location: await (await h3Tags[1].$("a"))?.textContent(),
//         Price: await (await h3Tags[2].$("a"))?.textContent(),
//       };

//       data.push(rowData);
//     }

//     // Log data for the current page
//     console.log("Page:", pageNumber);
//     console.log(JSON.stringify(data, null, 2));

//     // Navigate to the next page if available
//     const nextButton = await page.$('.next a:has-text("next")');
//     const isLastPage = await page.$(".next disabled ");

//     if (isLastPage) {
//       // Exit the loop if it's the last page
//       console.log("All Pages done");
//       break;
//     }

//     if (nextButton) {
//       await Promise.all([nextButton.click(), page.waitForLoadState("load")]);

//       await page.waitForTimeout(3000);

//       pageNumber++;
//       data.length = 0;
//     } else {
//       // Exit the loop if there is no next button
//       console.log("All Pages done");
//       break;
//     }
//   } while (true);

//   await browser.close();
// });

//-------------------extracting category-----------//

// test("category", async ({ browser }) => {
//   const context = await browser.newContext({
//     storageState: "./auth.json",
//   });

//   const page = await context.newPage();

//   await page.goto("https://www.ofbusiness.com/");
//   await page.waitForTimeout(6000);

//   await page
//     .getByRole("link", { name: "Polymers & Packaging", exact: true })
//     .click();

//   await page.getByRole("link", { name: "abs ABS" }).click();

//   //logic for the above problem

//   // const productBtnText = await page.$(
//   //   ".SubCategoryFilter__productBtn--oTG8r span "
//   // );
//   // await productBtnText.click();

//   await page.getByRole("button", { name: "ABS ABS" }).click();
//   await page
//     .locator("div")
//     .filter({ hasText: /^CPVC$/ })
//     .click();

//   await page.waitForTimeout(3000);

//   const subCategoryElements = await page.$$(
//     ".SubCategoryFilter__filterLink--C9Hsd.filterLink"
//   );

//   for (const subCategoryElement of subCategoryElements) {
//     await (await subCategoryElement.$("a"))?.click();

//     await page.waitForTimeout(3000);

//     // await page.getByRole("button", { name: "ABS ABS" }).click();

//     await page.screenshot({ path: "category.png", fullPage: true });
//   }

//   // console.log(textArray);
// });

//const textArray = [];

// const elements = await page.$$(".SubCategoryFilter__productName--dt4cV");
// for (const element of elements) {
//   const textContent = await element.textContent();

//   await page.screenshot({ path: `{textContent}.png`, fullPage: true });
//    textArray.push(textContent);
// }
