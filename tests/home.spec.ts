import test, { expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { HomePage } from "../pages/HomePage";

test.describe("Home page tests", () => {
    // LƯU Ý: vì test case này cần login thành công
    // nên mình sẽ viết code login trong hàm beforeEach để đảm bảo tất cả test case đều được login trước khi thực hiện
    test.beforeEach(async ({page}) => {
        // code login
        const loginPage = new LoginPage(page)

        await loginPage.login("Admin", "admin123")

        // đợi đến khi trang home load thành công => dựa vào URL có chứa dashboard
        await loginPage.isLoginSuccessfull()

        await page.waitForTimeout(3000)
    })

    test("Verify sidebar menu names", async ({page}) => {
        const homePage = new HomePage(page)

        const menuNames = await homePage.getSidebarMenuNames()

        // kiểm tra số lượng menu
        await test.step("Verify menu count", async () => {
            expect(menuNames.length).toBeGreaterThan(0)
        })

        // kiểm tra menu Admin có tồn tại trong sidebar menu hay không
        await test.step("Verify Admin menu exists", async () => {
            expect(menuNames).toContain("Admin")
        })
    })
})