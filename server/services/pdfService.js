import { exec } from "child_process"

export const optimizePdf = (input, output) => {
    return new Promise((resolve, reject) => {
        const cmd = `gswin32c -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/prepress -dNOPAUSE -dBATCH -sOutputFile="${output}" "${input}"`
    
        exec(cmd, (err) => {
            if (err) return reject(err)
                resolve(output)
        })
    })
}