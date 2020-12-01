var fs = require('fs')
var Program = require("./program")
var dependency = require("./changes/lens_dependency")

var sourceAddress = __dirname + '/../src/App.js'
var source_name = sourceAddress.split("../").slice(-1)[0]

const run_change = (program, plan, change) => {
    //prepare
    var matches = program.query(plan.prepare.query)
    if(plan.prepare.clause(matches)) {
        program.replace_in_program_by_indices(0, 0, "import Lens from './hierarch/lens'\n")
    }

    // apply
    if(change &&
        change.code &&
        change.source === source_name &&
        change.upgrade
    ) {
        matches = program.query(plan.apply.query)
        matches.forEach(m => {
            var keys = Object.keys(plan.apply.change_nodes)
            keys.forEach((k) => {
                var captures = m.captures.filter(c => c.name === k)
                captures.forEach(c => {
                    program.replace_in_program_by_node(
                        c.node,
                        plan.apply.change_nodes[k][0], // upgrade
                        plan.apply.change_nodes[k][1], // options
                    )
                })
            })
        })
    }
}

const go = (change = null) => {

    fs.readFile(sourceAddress, 'utf8', (error, response) => {
        if(error) return console.log(error)
        var source = response

        var program = new Program(source)

        run_change(program, dependency, change)

        // single out an element to change
        matches = program.query(`
        (jsx_element
            open_tag: (jsx_opening_element name: (identifier) @opening-name)
            close_tag: (jsx_closing_element name: (identifier) @closing-name)
        )
        `).filter(x =>
            x.captures.every(c => program.parsed.getText(c.node) === "code")
        )
        matches.forEach(match => {
            program.replace_in_program_by_node(
                match.captures.filter(c => c.name === "closing-name")[0].node,
                "Lens.change"
            )
            program.replace_in_program_by_node(
                match.captures.filter(c => c.name === "opening-name")[0].node,
                `Lens.change source="${source_name}" code="abcd"`
            )
         })

        // restore changed element
        if(change &&
            change.code &&
            change.source === source_name &&
            change.upgrade
        ) {
            matches = program.query(`(jsx_element
                open_tag: (
                    jsx_opening_element
                    name: (_) @opening-name
                    attribute: (jsx_attribute (property_identifier) @source_ "=" (_)) @source
                    attribute: (jsx_attribute (property_identifier) @code_ "=" (_)) @code
                    )
                (jsx_text) @children
                close_tag: (jsx_closing_element name: (_) @closing-name)

                (#eq? @source_ "source")
                (#eq? @code_ "code")
                (#eq? @opening-name "Lens.change")
                (#eq? @closing-name "Lens.change")
            ) @element`)

            // `source` and `code` should be unique;
            // add predicates in the query
            // raise an error if there is more than one match.
            // check using `change.code` and `source_name`

            matches.forEach(m => {
                program.replace_in_program_by_node(m.captures.filter(c => c.name === "opening-name")[0].node, "code")
                program.replace_in_program_by_node(m.captures.filter(c => c.name === "closing-name")[0].node, "code")
            })

            matches.forEach(m => {
                // replace children of the element
                program.replace_in_program_by_node(m.captures.filter(c => c.name === "children")[0].node, change.upgrade)
                // drop opening element attributes
                program.replace_in_program_by_node(m.captures.filter(c => c.name === "source")[0].node, "", { beginningOffset: -1 })
                program.replace_in_program_by_node(m.captures.filter(c => c.name === "code")[0].node, "", { beginningOffset: -1 })
            })
        }

        var remade = program.source

        fs.writeFile(sourceAddress, remade, err => console.log(err))
    })
}

module.exports = go