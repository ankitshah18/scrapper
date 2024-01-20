const { test, expect } = require("playwright/test");

test("ofbusiness login", async ({ browser }) => {
  const context = await browser.newContext({
    storageState: "./auth.json",
  });

  const page = await context.newPage();
  // const ctxt = page.context();
  // ctxt.storageState();

  await page.goto(
    "https://www.ofbusiness.com/prices/polymers-packaging/abs?pageNumber=0&pageSize=10&type="
  );
  await page.waitForTimeout(2000);

  const categories = await page.$$eval(
    ".PriceTableData__productFilters--wQDLC a",
    (elements) => {
      return elements.map((element) => element.textContent.trim());
    }
  );

  for (const category of categories) {
    await page.goto(
      `https://www.ofbusiness.com/prices/polymers-packaging/abs?pageNumber=0&pageSize=1000&type=${category}`
    );
    await page.waitForTimeout(6000);

    const elements = await page.$$(".tableRow");
    const data = [];

    for (const element of elements) {
      const h3Tags = await element.$$("h3");

      const rowData = {
        Product: await (await h3Tags[0].$("a"))?.textContent(),
        Location: await (await h3Tags[1].$("a"))?.textContent(),
        Price: await (await h3Tags[2].$("a"))?.textContent(),
      };

      h3Tags[0].click();
      const productId = (
        await page.$$(".itemTextSmall m-b-5")
      ).toLocaleString();
      console.log(productId);

      await page.screenshot({ path: "page.png", fullPage: true });

      data.push(rowData);
    }

    // console.log("Category: ", category);

    // console.log(data);
  }

  // await page.goto("https://www.ofbusiness.com/prices/polymers-packaging/abs?pageNumber=1&pageSize=10&type=");
  // await page.waitForTimeout(6000);
  // }

  await browser.close();
});
