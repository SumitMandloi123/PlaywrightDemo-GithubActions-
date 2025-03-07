import{Page, expect} from "@playwright/test"

export default class HomePage{

    private readonly dispenseButton= "//a[normalize-space()='Dispense']";

    constructor (private page: Page){}

    async isDispenseButtonVisible() {
        await this.page.waitForSelector(this.dispenseButton, { state: "attached", timeout: 10000 });
        await this.page.waitForSelector(this.dispenseButton, { state: "visible", timeout: 5000 });
        await expect(this.page.locator(this.dispenseButton)).toBeVisible();
    }

    async clickDispense(){
        await this.page.locator(this.dispenseButton).click();

    }


}