import { Locator, Page } from "@playwright/test";
import { join } from "node:path";

export class MyInfoPage {
    readonly page: Page

    //locator
    readonly avatarWrapper: Locator
    readonly uploadBtn: Locator
    readonly fileInput: Locator

    constructor(page: Page) {
        this.page = page;
        //this.uploadBtn = page.Locator("//div[@class='orangehrm-edit-employee-image-wrapper']");
        //this.fileInput = page.Locator("//button[@class='oxd-icon-button oxd-icon-button--solid-main employee-image-action']");
        this.avatarWrapper = page.locator("//div[@class='orangehrm-edit-employee-image-wrapper']")
        this.uploadBtn = page.locator("button.employee-image-action")
        this.fileInput = page.locator("input[type='file']")
    }
        async uploadAvatar(): Promise<void>{
            //B1: Click vào avatar để mở menu
            await this.avatarWrapper.waitFor({state: 'visible', timeout:20000})
            await this.avatarWrapper.click()

            // B2: Click vào nút Upload
            await this.uploadBtn.waitFor({state: 'visible', timeout: 20000})
            await this.uploadBtn.click()

            //B3: upload file hình
            const filePath = join(__dirname, "..", "tests", "data", "dog.jpg")
            await this.fileInput.setInputFiles(filePath)
            await this.page.waitForTimeout(5000)// chờ hình được load lên 5s
        }

}