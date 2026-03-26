import { Locator, Page } from "@playwright/test";


export class LoginPage {
    // define các locator: userInput, passwordInput, loginBtn
    readonly page: Page // page object giúp tương tác với trang web
    readonly userNameInput: Locator
    readonly passwordInput: Locator
    readonly loginButton: Locator

    constructor(page: Page) {
        this.page = page

        this.userNameInput = page.locator("input[name='username']")
        this.passwordInput = page.locator("input[name='password']")
        this.loginButton = page.locator("button[type='submit']")
    }

    // define các step test
    async login(username: string, password: string): Promise<void> {
        // đợi load trang web thành công
        await this.page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login", {
            waitUntil: 'domcontentloaded', //đợi đến khi hoàn thành xong việc load trang web
            timeout: 30000
        })

        await this.userNameInput.fill(username)

        await this.passwordInput.fill(password)

        await this.loginButton.click()
    }

    // thêm hàm kiểm tra test case
    // nếu login thành công, tức là endpoint trên website có chứa dashboard => pass
    // ngược lại => fail
    async isLoginSuccessfull(): Promise<boolean> {
        try {
            await this.page.waitForURL(/.*dashboard/, {timeout: 4000})
            return true
        } catch (error) {
            return false
        }
    }
}