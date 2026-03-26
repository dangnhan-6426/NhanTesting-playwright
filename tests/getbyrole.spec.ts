import fs  from 'node:fs';
import { expect, test } from '@playwright/test';
import path from 'node:path';



test.describe("Get by role test", () => {
    test("Demo get by role", async ({page}) => {
        //B1: Đọc cái file HTML  có chứa element cần lấy 

        //B2: lấy đường dẫn đến HTML
        const htmlPath = path.join(__dirname, "fixtures", "getbyrole-demo.html" )
        //Đọc file HTMl và load và page cảu playwright
        const htmlContent = fs.readFileSync(htmlPath, "utf-8")
        await page.setContent(htmlContent)

        // getbyrole có 2 rows
        //-param 1: role cuar element cần lấy : button, heading, link, textbox,...
        //-param 2: thêm các option để xác định chính xác element
        // name: text hiển thị trên element ( text hiện thị , aria-label, title, placeholder, alt)
        //level (chỉ ấp dụng cho heading): thẻ h1, h2, h3, ... tương ứng với level 1, 2, 3,...
        //exact: true/false, mặc định là false, nếu true thì text phải khớp hoàn toàn, nếu false, nếu true thfi text phải khớp hoàn toàn, nếu false thì tesxt chỉ cần chwuas là được
        
        //heading: h1, h2, h3...
        //<h1>Test getByrole - Playwright Demo</h1>
        const heading1 = page.getByRole("heading",{
            name:"Test getByRole - Playwright Demo",
            level: 1,
            exact: true,
        })
        await expect(heading1).toBeVisible()


        const heading2 = page.getByRole("heading", {
            name:"Heading Level 2",
            level: 2,
            exact: true
        })
        await expect(heading2).toBeVisible()

        // <a href="#home" aria-label="Trang chủ">Home</a>
        const homeLink =page.getByRole("link", {name: "Trang chủ"})
        await expect(homeLink).toBeVisible()

        const form = page.getByRole("form")
        await expect(form).toBeVisible()

        //<input type="text" id="username" name="username" aria-label="Username input field">
        const usernameInput = page.getByRole("textbox", {name:"Username input field"})
        await expect(usernameInput).toBeVisible()

        //<textarea id="message" name="message" rows="4" aria-label="Message textarea"></textarea>
        const messageTextarea = page.getByRole("textbox", {name:"Message textarea"})
        await expect(messageTextarea).toBeVisible()

        //<label><input type="checkbox" id="agree" name="agree" aria-label="Agree to terms checkbox">Tôi đồng ý với điều khoản</label>
        const agreeCheckbox =page.getByRole("checkbox", {name:"Agree to terms checkbox"})
        await agreeCheckbox.check()
        await page.waitForTimeout(3000)
        await expect(agreeCheckbox).toBeChecked()
        
        //<label><input type="radio" id="male" name="gender" value="male" aria-label="Male gender option">Nam</label>
        // const maleRadio = page.getByRole("radio", {name:"Male gender option"})
        // await maleRadio.check()
        // await expect(maleRadio).toBeChecked()

        //<label><input type="radio" id="female" name="gender" value="female" aria-label="Female gender option">Nữ</label>
        // const femaleRadio = page.getByRole("radio", {name:"Female gender option"})
        // await expect(femaleRadio).not.toBeChecked()

        const countrySelect = page.getByRole("combobox", {name: "Country selection"})
        await countrySelect.selectOption("vn")
        await expect(countrySelect).toHaveValue("vn")

        // <button type="submit" aria-label="Submit form button">Submit</button>
        // <button type="button" aria-label="Cancel button">Cancel</button>
        // <button type="button" aria-label="Delete button">Delete</button>
        const submitBtn = page.getByRole("button", {name:"Submit form button"})
        await expect(submitBtn).toBeVisible()

        //Table
        const table = page.getByRole("table")
        const rows = page.getByRole("row")
        await expect(rows).toHaveCount(4) //1 row header + 3 row data



    })
})