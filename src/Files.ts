import fs from 'fs'
import path from 'path'

interface Files {
    file: string
}

class Files {

    constructor(file: string) {
        this.file = file
    }

    read(){

        try {
           return fs.readFileSync(path.join(__dirname, this.file), 'utf-8') + '\n'
        } catch (error) {
            console.log(error)
            return ''
        }
    }

    write(message: string): void {

        if (this.read()) {
            fs.writeFile(path.join(__dirname, this.file), this.read() + message, (error) => {
                if (error) {
                    console.log(error)
                } else {
                    console.log('Updated')
                }
            })
        } else {
            fs.writeFile(path.join(__dirname, this.file), message, (error) => {
                if (error) {
                    console.log(error)
                }
                console.log('Created')
            })
        }



    }
}

export default Files