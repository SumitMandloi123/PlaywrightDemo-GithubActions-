import { test, expect } from "@playwright/test";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import SearchPatientPage from "../pages/SearchPatientPage";

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.loggedSuccessful();
});

test("Search patient by NHI", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.clickDispense();

    const searchPatientPage = new SearchPatientPage(page);
    await searchPatientPage.searchPatient()
    await page.waitForTimeout(5000);
});


test.afterEach(async ({ page }) => {
    await page.close();
});
