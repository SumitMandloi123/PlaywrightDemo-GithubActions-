import { Page } from "@playwright/test";

export default class LoginPage {
    private readonly loginIcon = "//button[contains(@class, 'mantine-UnstyledButton-root')]";
    private readonly emailInput = "input[name='signInName']"; 
    private readonly passwordInput = "input[name='password']";
    private readonly signInButton = "button:has-text('Sign in')";
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigateToWebsite() {
        await this.page.goto("https://dev.scriptsense.co.nz/contact");
    }

    async clickLoginIcon() {
        const popupPromise = this.page.waitForEvent("popup"); // Wait for the popup
        await this.page.locator(this.loginIcon).first().click(); // Click login icon
        const popup = await popupPromise; // Capture the popup
        await popup.waitForLoadState(); // Ensure it is fully loaded
        return popup; // Return popup to use in further steps
    }

    async fillUsername(username: string, page: Page) {
        await page.getByRole("textbox", { name: "Email Address" }).fill(username);
    }

    async fillPassword(password: string, page: Page) {
        await page.getByRole("textbox", { name: "Password" }).fill(password);
    }

    async clickSigninButton(page: Page) {
        await page.getByRole("button", { name: "Sign in" }).click();
    }

    async loggedSuccessful() {
        await this.navigateToWebsite();
        const popup = await this.clickLoginIcon(); // Get the popup page

        await this.fillUsername("test.monkey@neblar.com", popup);
        await this.fillPassword("uHdCn6qGtu3jaBQ~", popup);
        await this.clickSigninButton(popup);

        // Ensure the main page is navigated properly
        await this.page.waitForURL("https://dev.scriptsense.co.nz/contact", { timeout: 10000 });
    }
}
