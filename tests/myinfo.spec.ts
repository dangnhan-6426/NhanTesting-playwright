import { HomePage } from './../pages/HomePage'
import {test, expect} from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'
import { MyInfoPage } from '../pages/MyInfoPage'
import { highLightStep } from './utils/highlightStep'



test.describe("My info test", () => {
    test.beforeEach(async ({page}) => {
        const loginPage = new LoginPage(page)

        await loginPage.login("Admin", "admin123")
        
        const homePage = new HomePage(page)
        // thêm step đợi localtor sidebar menu hiển thị để đảm bảo click
        // vào menu My Info ko bị lỗi
        // await homePage.sidebarMenuNames.first().waitFor({timeout: 30000})
        await page.waitForURL("**/dashboard**", {timeout: 30000})
        // click vào menu My Info -> code step click vào menu My Info
        // trong HomePage vì menu My Info nằm trong HomePage
        await homePage.clickMenuMyInfo()
        
    })

    test("TC1: Upload avatar", async ({page}) => {
        const myInfoPage = new MyInfoPage(page)

        await highLightStep(page, myInfoPage.avatarWrapper)
        await myInfoPage.uploadAvatar()

        // mặc định để là true
        await highLightStep(page, myInfoPage.fileInput)
        const uploadFileCount = await myInfoPage.fileInput.evaluate((el) => {
            // input ở đây chính là fileInput trong MyInfoPage
            // vì hàm evaluate sẽ trả về fileInput element từ DOM của page
            // nên mình có thể truy cập vào thuộc tính files của input để kiểm tra đã upload file thành công hay chưa
            const input = el as HTMLInputElement
            return input.files ? input.files.length : 0
        })
        expect(uploadFileCount).toBeGreaterThan(0)
        // expect(true).toBeTruthy()
    })


})