import React from "react"
import styled from "styled-components"
import Logo from "./logo"
import Scope from "./scope"
import Sidebar from "./sidebar"
import Grid from "./grid"

const MODES = ["hierarchy", "blocks"]

const HierarchScope = React.createContext({
    chosen: { code: null, signal: null },
    signal: (s, code) => {},
})

class Hierarch extends React.Component {
    state = {
        open: false,
        mode: 0,
        scope: {
            code: null,
            signal: null,
        },
        mouse: {
            x: 0,
            y: 0,
            hold: false,
        },
    }

    componentDidMount() {
        document.onkeydown = e => {
            if(e.code === "Space")
              this.setState({ mouse: Object.assign(
                  this.state.mouse,
                  { hold: !this.state.mouse.hold },
              )})
        }
    }

    componentDidUpdate() {
        document.oncontextmenu = this.state.open
            ? this.secondaryClick
            : null
    }

    secondaryClick = (e) => {
        e.preventDefault()
        this.setState({
            mode: ((this.state.mode || 0) + 1) % MODES.length
        })
    }

    mode = () => (
        MODES[this.state.mode]
    )

    render = () => (
        <HierarchScope.Provider
            value={{
                open: this.state.open,
                chosen: this.state.scope,
                signal: (s, code) => {
                    console.log("Signal", s, code)
                    this.setState({scope: { code, signal: s}})
                },
            }}
        >
            <Display
                onMouseMove={(e) => {
                    if(this.state.open && !this.state.mouse.hold)
                        this.setState({ mouse: { x: e.clientX, y: e.clientY }})
                }}
            >
                {this.props.children}

                {this.state.open
                ?
                    <Sidebar
                        close={() => this.setState({ open: false })}
                        display={(code) => this.setState({ scope: { chosen: code, signal: "display" } })}
                        place={this.state.mouse}
                    >
                        {this.state.scope.signal === 'grid' && (
                            <Scope
                            {...JSON.parse(this.state.scope.code)}
                            callback={(model, _) => console.log(model.toJSON())}
                            >
                                {(model, upgrade) => (
                                    <Grid
                                    schema={JSON.parse(this.state.scope.code).schema}
                                    model={model}
                                    upgradeRecord={this.upgradeRecord(model, upgrade)}
                                    />
                                )}
                            </Scope>
                        )}
                    </Sidebar>
                :
                    <Corner>
                        <Logo
                            size={20}
                            repeat={100000}
                            onClick={() => this.setState({ open: true })}
                        />
                    </Corner>
                }
            </Display>
        </HierarchScope.Provider>
    )

    upgradeRecord = (model, upgrade) => (rowIndex, columnId, value) => {
        var company = model.companies.toJSON()[rowIndex]
        console.log(company)
        var grade = Object.assign(
            {},
            {
                name: company.name,
                address: company.address,
                number: company.number,
            },
            { [columnId]: value },
        )

        upgrade(grade)
    }
}

const Display = styled.div`
margin: 0;
`

const Modal = styled.div`
text-align: left;
position: absolute;
height: 90vh;
width: 90vw;
background: #08080a;
background: #a0a080;
top: 5vh;
left: 5vw;
overflow: scroll;
`

const Page = styled.div`
`

const Corner = styled.div`
position: absolute;
bottom: 40px;
right: 80px;
height: 40px;
width: 40px;
`

export { HierarchScope }
export default Hierarch