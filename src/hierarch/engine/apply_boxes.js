import push_upgrades from "./push_upgrades"

const apply_boxes = (program, address) => {
  var upgrades = []

  // Plan A: drop boxes.
  var query = program.query(`
  (jsx_element
    open_tag: (
      jsx_opening_element
      name: (_) @opening-name
      attribute: (jsx_attribute (property_identifier) @_original "=" (jsx_expression (_) @original))
      attribute: (jsx_attribute (property_identifier) @_code "=" (string) @code)
    )
    close_tag: (
      jsx_closing_element
      name: (_) @closing-name
      (#eq? @closing-name "Box")
    )

    (#eq? @opening-name "Box")
    (#eq? @_original "original")
    (#eq? @_code "code")
  ) @element
  `)

  query.forEach(m => {
    var close = m.captures.filter(c => c.name === "closing-name")[0].node
    var open = m.captures.filter(c => c.name === "opening-name")[0].node
    var original = program.display(m.captures.filter(c => c.name === "original")[0].node)

    var code_attr = m.captures.filter(c => c.name === "_code")[0].node.parent
    // var original_attr = m.captures.filter(c => c.name === "_original")[0].node.parent

    upgrades = upgrades.concat([
      {
        begin: open.startIndex,
        end: code_attr.endIndex,
        grade: original,
      },
      {
        begin: close.startIndex,
        end: close.endIndex,
        grade: original
      },
    ])
  })

  // run second query
  query = program.query(`
  (jsx_self_closing_element
    name: (_) @name
    attribute: (jsx_attribute (property_identifier) @_original "=" (jsx_expression (_) @original))
    attribute: (jsx_attribute (property_identifier) @_code "=" (string) @code)

    (#eq? @name "Box")
    (#eq? @_original "original")
    (#eq? @_code "code")
  ) @element
  `)

  program.debug_query(query)
  query.forEach(m => {
    var name = m.captures.filter(c => c.name === "name")[0].node
    var original = program.display(m.captures.filter(c => c.name === "original")[0].node)

    var code_attr = m.captures.filter(c => c.name === "_code")[0].node.parent
    // var original_attr = m.captures.filter(c => c.name === "_original")[0].node.parent

    upgrades = upgrades.concat([
      {
        begin: name.startIndex,
        end: code_attr.endIndex,
        grade: original,
      },
    ])
  })

  if(upgrades.length > 0)
    return push_upgrades(address, upgrades)

  // Plan B: add boxes.
  console.log("Plan B")
  // run query
  query = program.query(`
  (jsx_element
    open_tag: (
      jsx_opening_element
      name: (_) @opening-name
    )
    close_tag: (
      jsx_closing_element
      name: (_) @closing-name
    )
    (#eq? @opening-name @closing-name)
  ) @element
  `)
  query = query.filter(m => !(m.captures.some(c => c.name === 'opening-name' && program.display(c.node) === 'Box')))
  query = query.filter(m => !(m.captures.some(c => c.name === 'opening-name' && program.display(c.node) === 'Scope')))
  query = query.filter(m => !(m.captures.some(c => c.name === 'opening-name' && program.display(c.node) === 'Block')))
  query = query.filter(m => !(m.captures.some(c => c.name === 'opening-name' && program.display(c.node) === '')))
  query = query.filter(m => !(m.captures.some(c => c.name === 'opening-name' && program.display(c.node) === 'Observer')))

  query.forEach(m => {
    program.debug_query([m])

    const opening_name= m.captures.filter(c => c.name === "opening-name")[0].node
    const closing_name = m.captures.filter(c => c.name === "closing-name")[0].node
    const original = program.display(opening_name)

    upgrades = upgrades.concat([
      {
        begin: opening_name.startIndex,
        end: opening_name.endIndex,
        grade: `Box original={${original}} code="${Math.random().toString().slice(2)}"`,
      },
      {
        begin: closing_name.startIndex,
        end: closing_name.endIndex,
        grade: "Box"
      },
    ])
  })

  // run second query
  query = program.query(`
  (jsx_self_closing_element
      name: (_) @name
  ) @element
  `)
  query = query.filter(m => !(m.captures.some(c => c.name === 'name' && program.display(c.node) === 'Box')))
  query = query.filter(m => !(m.captures.some(c => c.name === 'name' && program.display(c.node) === 'br')))
  query = query.filter(m => !(m.captures.some(c => c.name === 'name' && program.display(c.node) === 'ChromePicker')))

  query.forEach(m => {
    program.debug_query([m])

    const name = m.captures.filter(c => c.name === "name")[0].node
    const original = program.display(name)

    upgrades = upgrades.concat([
      {
        begin: name.startIndex,
        end: name.endIndex,
        grade: `Box original={${original}} code="${Math.random().toString().slice(2)}"`,
      },
    ])
  })

  if(upgrades.length > 0)
    return push_upgrades(address, upgrades)
}

export default apply_boxes
