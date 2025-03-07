import { Page, expect } from "@playwright/test";
import { time } from "console";

export default class CreateDispense {
    private readonly manualDispenseButton = "//a[@data-cy='scripts-add-new-scid']";
    private readonly internalTab = "//body/div[@id='root']/div[contains(@class, 'mantine-Skeleton-root')]";
    private readonly searchPrescriberPlaceholder = "//*[text()='Search for prescriber']//parent::div//input";
    private readonly doctorName = "//div[contains(text(), '(94ZAHG) Jayne Valerie John')]";
    private readonly medicinePlaceholder = "//div[contains(@class,'mantine-Grid-col mantine-cpt84w')]//input";
    private readonly medicineSelect = "//div[contains(text(),'Teriparatide-Teva (teriparatide 20 microgram/dose)')]";
    private readonly endDispense = "//div[contains(@style,'max-height: 80vh; overflow-y: auto; scrollbar-width: none;')]/button[3]";
    private readonly loadMore="//div[text()='Load More']//parent::span"; 
    private readonly notesButton="//span[normalize-space()='Notes']";

    constructor(private page: Page) {}

    async clickManualDispense() {
        await this.page.locator(this.manualDispenseButton).click();
    }

    async clickInternalTab() {
        await this.page.locator(this.internalTab).click();
    }

    async typePrescriberName() {
        const input = this.page.locator(this.searchPrescriberPlaceholder);
        await input.fill("Jayne");
        await input.click();
        await this.page.waitForTimeout(1000);
        await input.press("Backspace");
        // await this.page.waitForTimeout(5000); // Adjust the time if needed

        await input.press("ArrowDown");
        await input.press("Enter");

        await this.page.waitForTimeout(5000);

        // await this.page.waitForLoadState("networkidle"); 


        
    }


    async typeMedicine() {
        await this.page.waitForTimeout(3000);

        const input = this.page.locator(this.medicinePlaceholder);
        await input.fill("paracetamol");

        await this.page.waitForTimeout(1000);

        await input.press("ArrowDown");
        await input.press("Enter");

    }

    async clickEndDispense() {
        // await this.page.evaluate(() => {
        //     window.print = () => {}; // Disable print dialog
        // });
        await this.page.waitForTimeout(8000);
        // await this.page.locator(this.endDispense).click();
        const element = this.page.locator(this.endDispense);
        await element.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(2000);
        await element.click();
    

        await this.page.waitForTimeout(20000);

        // await this.page.reload();
        // await this.page.waitForTimeout(5000);


        // await this.page.evaluate('(() => {window.waitForPrintDialog = new Promise(f => window.print = f);})()');
        // await this.page.getByText('Cancel').click();
        // await this.page.waitForFunction('window.waitForPrintDialog');

        // await this.page.evaluate(() => {
        //     window.stop(); // Stops any ongoing loading, including the print dialog
        // });
        // await this.page.keyboard.press("Escape");

        // await this.page.waitForTimeout(10000);
     // await this.page.waitForTimeout(10000);
    }

    async clickNotesButton() {
        const notesLocator = this.page.locator(this.notesButton);
        await notesLocator.waitFor({ state: "visible", timeout: 15000 }); // Ensure it's visible before clicking
        await notesLocator.click();
        await this.page.waitForTimeout(5000);
    }

  


    
    async createDispense(){
        await this.clickManualDispense();
        await this.clickInternalTab();
        await this.typePrescriberName();
        await this.typeMedicine();
        await this.clickEndDispense();
        // await this.getPageURL();
        await this.clickNotesButton()
    }
}
