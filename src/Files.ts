import fs from 'fs'

interface Files {
    file: string
}

class Files {

    constructor(file: string) {
        this.file = file
    }

    read() {

        try {
            return fs.readFileSync(this.file, 'utf-8') + '\n'
        } catch (error) {
            console.log(error)
            return ''
        }
    }

    write(message: string): void {

        if (this.read()) {
            fs.writeFile(this.file, this.read() + message, (error) => {
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