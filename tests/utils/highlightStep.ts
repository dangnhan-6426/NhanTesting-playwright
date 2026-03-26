
import { Location, Locator, Page } from "@playwright/test";

export const highLightStep = async (page: Page, locator: Locator, deplayMs = 500): Promise<void> => {
    const target = locator.first();//lấy phần tử đầu tiên nếu có nhiều phần từ khớp

    //vì target có thể không tìm thấy
    //=> return nếu target không tồn tại để tránh lỗi

    try{
        await target.waitFor({state: "visible", timeout:5000});
    }catch(error){
        return
    }

    //Lưu lại style gốc của phần tử để có thể khôi phục sua khi hight
    let originalStyle = ""
    //evaluate là hàm sẽ truy cập trực tiếp vào thẻ đang xét
    originalStyle = await target.evaluate((el) => {
        const element = el as HTMLElement
        //<button>Click</button>
        const previousStyle = element.getAttribute("style") || ""
        //Thêm style highlight vào phần tử
        element.style.outline = "2px solid red" // Viền đỏ xung quanh phần từ
        element.style.background = "yellow" // Nền vàng cho phần tử
        return previousStyle
    })
    await page.waitForTimeout(deplayMs) // Đợi một khoảng thời gian để người dùng có thể thấy phần từ được highlight
    //Khôi phục style gốc của phần từ sau khi highlight
    await target.evaluate((el, previousStyle) =>{
        const element = el as HTMLElement
        if(previousStyle){
            element.setAttribute("style", previousStyle)//Khôi phục style gốc
        }else{
            element.removeAttribute("style")// Nếu không có style gốc, xóa thuộc tính style
        }
    },originalStyle)

}