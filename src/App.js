import { P, Box, Code, Div, H1, S } from './hierarch/display/lens'

import Scope from './hierarch/engine/scope'
import styled, { keyframes } from "styled-components"
import logo from './logo.svg'

function App() {
  return (
    <Column>
      <Header>
        <Logo src={logo} alt="hierarch logo" />

        <Div>
          <H3>Hierarch!</H3>

          <P>
            A programming engine breaking many rules –<br/>
            change code by clicking and clacking.
          </P>

          <Div>
            click. clack!
          </Div>

          <Link address="https://github.com/assembleapp/hierarch" target="_blank" rel="noopener noreferrer" >
            Read our engine's code.
          </Link>
        </Div>
      </Header>

      <Scope
        source="assemble-company.herokuapp.com/v1/graphql"
        passcode={process.env.REACT_APP_HASURA_PASSCODE}
        schema={{ companies: { '_': [ 'number', 'name', 'address' ], danger: "integer?"}}}
        order={{danger: 'desc', name: 'asc'}}
      >
        {(model) => (
          <Margin>
            {model.companies.length > 0 &&
              <>
                <H3>Keep building!</H3>
                ...using some similar programs:
              </>
            }
            <Board>
              {model.companies.map((c, i) => (
                <Link
                  key={i}
                  address={c.address}
                  style={{fontSize: (6 + (c.danger || 5) * 2) + 'px'}}
                  target="_blank"
                >
                  {c.name}
                </Link>
              ))}
            </Board>
          </Margin>
        )}
      </Scope>
    </Column>
  );
}

const Block = styled.div`
border: 2px solid purple;
border-radius: 6px;
padding: 2rem;
overflow: hidden;
background: #2a2a2a2a;
`

const Board = styled.ul`
display: grid;
grid-template-columns: repeat(4, auto);
grid-row-gap: 0.2rem;
grid-column-gap: 0.6rem;
text-align: center;
`

const Column = styled.div`
min-height: 100vh;

@media(max-width: 800px) {
  grid-template-columns: 1fr;
  grid-template-rows: 1fr auto;
  min-height: 100vh;
}

background: #f8f6bb;
color: #3d3b11;

display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
padding: 0 4rem;
`

const Logo = styled.img`
height: 6rem;
margin-right: 2rem;
`

const Header = styled(Block)`
display: flex;
flex-direction: row;
font-size: 1rem;
align-items: flex-end;
`

const Link = styled.a.attrs(p => ({
  href: p.address,
}))`
color: #3f0894;
`

const H3 = styled.h3`
margin: 0;
`

const Margin = styled.div`
margin-top: 2rem;
text-align: center;
`

export default App;
