import { Page } from "@playwright/test";

export default class SearchPatient {
    private readonly tabNHI = this.page.getByRole("tab", { name: "By NHI" });
    private readonly inputFieldNHI = this.page.getByRole("combobox", { name: "Search for patient" });
    private readonly searchButton = this.page.getByRole("button", { name: "Search" });
    private readonly patientOption = this.page.getByRole("option", { name: "(ZAU8023) John Lee 01/01/2001 (unknown)" });

    constructor(private page: Page) {}

    async clickNHITab() {
        await this.tabNHI.click();
    }

    async fillNHIID(NHI: string) {
        await this.inputFieldNHI.fill(NHI);
    }

    async clickSearchButton() {
        await this.searchButton.click();
    }

    async clickOnPatientName(){
    await this.patientOption.click();
    }

    async searchPatient(){
        await this.clickNHITab();
        await this.fillNHIID("ZAU8023");
        await this.clickSearchButton();
        await this.clickOnPatientName();
        await this.page.waitForSelector("//a[@data-cy='scripts-add-new-scid']", { timeout: 10000 });
    }
}
