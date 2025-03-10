import { Page } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

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
        await this.page.goto("https://dev.scriptsense.co.nz/");
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

        const username = process.env.LOGIN_USERNAME;
        const password = process.env.LOGIN_PASSWORD;

        if (!username || !password) {
            throw new Error("Missing login credentials in .env file");
        }

        await this.fillUsername(username, popup);
        await this.fillPassword(password, popup);
        await this.clickSigninButton(popup);

        

        
        await this.page.locator("//*[@type='button' and normalize-space()='Book a Demo']").waitFor({ state: "visible", timeout: 10000 });
    }
}
