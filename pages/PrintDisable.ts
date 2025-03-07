import { Page, expect } from "@playwright/test";

export default class PrintDisable {
    private readonly toggleButton = "//label[text()='Use Print Utility']";

    constructor(private page: Page) {}

    async disableToggle() {

        await this.page.waitForTimeout(20000);
        await this.page.goto("https://dev.scriptsense.co.nz/settings/printers", { waitUntil: "domcontentloaded" });

        // Wait for the toggle button to be visible and enabled before clicking
        const toggleLocator = this.page.locator(this.toggleButton);
        await toggleLocator.waitFor({ state: "visible", timeout: 15000 });
        await toggleLocator.waitFor({ state: "attached" });

        // Click the toggle
        await toggleLocator.click();

        // Ensure the action is completed
        await this.page.waitForTimeout(3000);

        // Navigate back to home page
        await this.page.goto("https://dev.scriptsense.co.nz/contact", { waitUntil: "domcontentloaded" });
        await this.page.waitForTimeout(3000);

    }
}
