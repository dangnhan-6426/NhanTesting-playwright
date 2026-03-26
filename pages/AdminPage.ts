import { Locator, Page} from "@playwright/test"

export class AdminPage{
    readonly page: Page

    //locator
    readonly usernameInput: Locator
    readonly userRoleSelect: Locator
    readonly adminRoleOption: Locator
    readonly searchButton: Locator

    readonly tableRows: Locator
    readonly loadingSpinner: Locator

    constructor (page: Page){
        this.page = page

        this.usernameInput = page.locator("(//input[@class='oxd-input oxd-input--active'])[2]")
        this.userRoleSelect = page.locator("(//div[@class='oxd-select-text-input'])[1]")
        this.adminRoleOption = page.locator("//div[@role='listbox']//span[text()='Admin']")
        this.searchButton = page.locator("//button[@type='submit']")
        this.tableRows = page.locator("//div[@class='oxd-table-card']")
        this.loadingSpinner = page.locator("//div[@class='oxd-table-loader']")
    }

    async waitForLoadingSpinnerToDisappear(): Promise<void>{
        const isVisible = await this.loadingSpinner.isVisible()
        if(isVisible){
            await this.loadingSpinner.waitFor({state: 'hidden', timeout: 3000})
        }
    }


    // Hàm đếm số lượng row sau khi filter
    async countRows(): Promise<number>{
        return await this.tableRows.count()
    }


    async filterAdminUser(username: string): Promise<void>{
        await this.usernameInput.fill(username)
        await this.page.waitForTimeout(1000)
    }

    async selectAdminRole(): Promise<void> {
        await this.userRoleSelect.click()
        await this.adminRoleOption.click()
    }

    async clickSearchButton(): Promise <void>{
        await this.searchButton.click()
        await this.page.waitForTimeout(3000)
    }




}