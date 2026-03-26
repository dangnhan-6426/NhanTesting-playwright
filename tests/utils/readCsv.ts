
// username: Admin
// password: admin123
// Key - Value
import path from "node:path"
import fs from "node:fs"

export type CsvRow = Record<string, string>

export const readCsv = (relativeFilePath: string): CsvRow[] => {
    // relativeFilePath: /data/login_data.csv
    // B1
    // convert relativeFilePath -> absoluteFilePath
    // __dirname: là path folder hiện tại chứa file readCsv.ts
    // VD: Mac: /User/macc/Document/cybersoft/.../phuong-testing11-playwright/tests/utils/readCsv.ts
    const absoluteFilePath = path.resolve(__dirname, "..", relativeFilePath)
    // /User/macc/Document/cybersoft/.../phuong-testing11-playwright/tests/data/login_data.csv
    
    // B2: dựa vào path absolutePath -> đọc file
    const raw = fs.readFileSync(absoluteFilePath, "utf-8")

    // xử lý những ký tự đặc biệt
    const lines = raw
    .split(/\r?\n/)
    .map((l: any) => l.trim())
    .filter(Boolean); // loại bỏ các dòng rỗng

    // Bỏ header không đọc, đọc từ line 2 trở đi
    const dataLines = lines.slice(1)
    const rows: CsvRow[] = []

    for(const line of dataLines) {
        // tách thành cặp key-value
        // VD: Admin,admin123,success
        // => ["Admin", "admin123", "success"] -> split(",")
        // trim(): xóa ký tự khoảng trắng ở đầu và cuối của string
        const cell = line.split(",").map((c: string) => c.trim())

        // tạo data dạng CsvRow
        const row: CsvRow = {
            username: cell[0],
            password: cell[1],
            expectedResult: cell[2]
        }
        console.log(`Data: ${row}`)

        // add row vào mảng rows => push: add item mới vào cuối mảng
        rows.push(row)
    }
    return rows
}
