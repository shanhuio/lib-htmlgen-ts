// Copyright (C) 2022  Shanhu Tech Inc.
//
// This program is free software: you can redistribute it and/or modify it
// under the terms of the GNU Affero General Public License as published by the
// Free Software Foundation, either version 3 of the License, or (at your
// option) any later version.
//
// This program is distributed in the hope that it will be useful, but WITHOUT
// ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
// FITNESS FOR A PARTICULAR PURPOSE.  See the GNU Affero General Public License
// for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

import * as React from 'react' // for tsx

export class Prop {
    title: string = ''
    css: string = '/style.css'
}

function cssLink(css: string) {
    return <link rel="styleSheet" type="text/css" href={css} key={css} />
}

export class Page {
    name: string
    title: string = 'Lonnie'
    scripts: string[] = []
    css: string = '/style.css'
    cssExtra: string[] = []
    body: JSX.Element | null = null
    bodyClass: string = ''
    bodyFunc?: (() => JSX.Element)

    viewport: JSX.Element = <meta name="viewport"
        content="width=device-width, initial-scale=1" />

    constructor(name: string, prop: Prop) {
        this.name = name
        this.title = prop.title
        this.css = prop.css
        this.title = prop.title
    }

    renderBody() {
        if (this.bodyFunc) { return this.bodyFunc() }
        return this.body
    }

    render() {
        let cssLinks = [cssLink(this.css)]
        for (let css of this.cssExtra) {
            cssLinks.push(cssLink(css))
        }

        let bodyProps = this.bodyClass ? { className: this.bodyClass } : {}

        return <html lang="en">
            <head>
                <meta charSet="UTF-8" />
                <title>{this.title}</title>
                {cssLinks}
                {this.viewport}
            </head>
            <body {...bodyProps}>
                {this.renderBody()}
                {this.scripts.map(f => <script src={f} key={f} />)}
            </body>
        </html>
    }
}
