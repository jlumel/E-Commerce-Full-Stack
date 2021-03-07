import fs from 'fs'

class Files {

    file:string

    constructor(file: string) {
        this.file = file
    }

    read() {

        try {
            return fs.readFileSync(this.file, 'utf-8')
        } catch (error) {
            console.log(error)
            return ''
        }
    }

    write(message: string): void {

        if (this.read()) {
            fs.writeFile(this.file, message, (error) => {
                if (error) {
                    console.log(error)
                } else {
                    console.log('File updated')
                }
            })
        } else {
            fs.writeFile(this.file, message, (error) => {
                if (error) {
                    console.log(error)
                }
                console.log('File created')
            })
        }
    }
}

export default Files