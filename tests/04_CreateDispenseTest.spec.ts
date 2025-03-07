import { test, expect, Page } from "@playwright/test";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import SearchPatientPage from "../pages/SearchPatientPage";
import CreateDispensePage from "../pages/CreateDispensePage";
import PrintDisable from "../pages/PrintDisable";


let pageInstance: Page;
let loginPage: LoginPage;
let homePage: HomePage
let searchPatientPage: SearchPatientPage
let createDispensePage: CreateDispensePage;
let printDisable: PrintDisable;


test.beforeAll(async ({ browser }) => {
    
    const context = await browser.newContext();
    pageInstance = await context.newPage();
    loginPage = new LoginPage(pageInstance);

    await loginPage.loggedSuccessful(); // Login before running tests

    // Disable the print utility toggle before proceeding
    printDisable = new PrintDisable(pageInstance);
    await printDisable.disableToggle(); // Toggle and return to home page

    homePage = new HomePage(pageInstance);

});



test("Create a new manual dispense", async () => {
    test.setTimeout(60000); 
    homePage = new HomePage(pageInstance);
    await homePage.clickDispense();

    searchPatientPage = new SearchPatientPage(pageInstance);
    await searchPatientPage.searchPatient();
    await pageInstance.waitForTimeout(8000);
    await pageInstance.waitForSelector("//div[text()='Load More']//parent::span", { timeout: 60000 });

    createDispensePage = new CreateDispensePage(pageInstance);
    await createDispensePage.createDispense();
    // await pageInstance.waitForTimeout(5000);
});



test.afterAll(async () => {
    await pageInstance.close();
});
