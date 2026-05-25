import * as ReactDOMServer from 'react-dom/server'

import * as fs from 'fs'
import * as path from 'path'
import * as mkdirp from 'mkdirp'
import * as page from './page'

export class TemplateWriter {
    dir: string
    dirMade: boolean

    constructor(dir: string) {
        this.dir = dir
        this.dirMade = false
    }

    mkdir() {
        if (this.dirMade) {
            return
        }
        mkdirp.sync(this.dir)
        this.dirMade = true
    }

    write(f: string, dom: JSX.Element) {
        this.mkdir()
        let p = path.join(this.dir, f)
        console.log(p)
        let s = '<!doctype html>\n' + ReactDOMServer.renderToStaticMarkup(dom)
        fs.writeFileSync(p, s)
    }

    writePage(p: page.Page) {
        this.write(p.name + '.html', p.render())
    }

    writePageFunc(f: (() => page.Page)) {
        this.writePage(f())
    }

    writePageFuncs(funcs: (() => page.Page)[]) {
        for (let f of funcs) {
            this.writePageFunc(f)
        }
    }
}

export function writePageFuncs(dir: string, funcs: (() => page.Page)[]) {
    let w = new TemplateWriter(dir)
    w.writePageFuncs(funcs)
}

export function writePages(dir: string, pages: page.Page[]) {
    let w = new TemplateWriter(dir)
    for (let p of pages) {
        w.writePage(p)
    }
}
