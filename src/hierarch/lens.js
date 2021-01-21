import styled from "styled-components"

import Box from "./box"
const Code = styled.code``
const Span = styled.span``
const Div = styled.div``
const H1 = styled.h1``
const H2 = styled.h2``
const P = styled.p.attrs(p => ({
    "data-code": p.code
}))``

export { Code, P, Box, Span, Div, H1, H2 }
