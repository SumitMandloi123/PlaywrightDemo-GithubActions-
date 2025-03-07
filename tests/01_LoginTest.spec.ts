import { test, expect } from "@playwright/test";
import LoginPage from "../pages/LoginPage";


test("Login", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.loggedSuccessful();
    await page.waitForTimeout(5000);
});
