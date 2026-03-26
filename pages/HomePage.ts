import { Locator, Page } from "@playwright/test"

export class HomePage {
    readonly page: Page
    readonly myInfoMenu: Locator
    readonly adminMenu: Locator
    // locator
    readonly sidebarMenuNames: Locator

    constructor(page: Page) {
        this.page = page
        this.sidebarMenuNames = page.locator("//span[@class='oxd-text oxd-text--span oxd-main-menu-item--name']")
        this.myInfoMenu = page.locator("//span[text()='My Info']")
        this.adminMenu = page.locator("//span[text()='Admin']")
    }


    async clickMenuMyInfo() : Promise<void>{
        // thêm step đợi localtor sidebar menu hiển thị để đảm bảo click vào menu My Info ko bị lỗi
        await this.sidebarMenuNames.first().waitFor({timeout: 30000})
        await this.myInfoMenu.click()
    }

    async clickMenuAdmin() : Promise<void>{
        await this.sidebarMenuNames.first().waitFor({timeout: 30000})
        await this.adminMenu.click()
    }

    // get list sidebar menu name
    async getSidebarMenuNames(): Promise<string[]> {
        const count = await this.sidebarMenuNames.count()

        // Vì object Locator chứa nhiều attribute, hàm mà mình chỉ cần lấy text của locator
        // => tạo 1 mảng chỉ chứa string text của locator
        const menuNames: string[] = []
        for(let i = 0; i < count; i++) {
            const name = await this.sidebarMenuNames.nth(i).textContent()
            // LƯU Ý: vì textContent() có thể trả về null nếu ko lấy được text
            // typescript bắt mình xử lý trường hợp null
            if (name) {
                menuNames.push(name.trim())
            }
        }
        return menuNames
    }
}