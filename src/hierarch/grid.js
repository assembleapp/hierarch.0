import React from "react"
import styled from "styled-components"
import RDGrid from "react-data-grid"

class Grid extends React.Component {
    render = () => (
        <Display>
            <RDGrid
            columns={[
                {key: 'name', name: 'Name'},
                {key: 'address', name: 'Address'},
            ]}
            rows={this.props.model}
            />
        </Display>
    )
}

const Display = styled.div`
.rdg-cell {
    contain: strict;
    contain: size layout style paint;
    position: absolute;
    height: inherit;
    padding: 0 8px;
    border-right: 1px solid var(--border-color);
    border-bottom: 1px solid var(--border-color);
    background-color: inherit;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis
}

.rdg-cell-frozen {
    position: sticky;
    z-index: 1
}

.rdg-cell-frozen-last {
    box-shadow: 2px 0 5px -2px rgba(136, 136, 136, .3)
}

.rdg-cell-selected {
    box-shadow: inset 0 0 0 2px var(--selection-color)
}

.rdg-cell-copied {
    background-color: #ccf
}

.rdg-cell-drag-handle {
    cursor: move;
    position: absolute;
    right: 0;
    bottom: 0;
    width: 8px;
    height: 8px;
    background-color: var(--selection-color)
}

.rdg-cell-drag-handle:hover {
    width: 16px;
    height: 16px;
    border: 2px solid var(--selection-color);
    background-color: var(--background-color)
}

.rdg-cell-dragged-over {
    background-color: #ccf
}

.rdg-cell-copied.rdg-cell-dragged-over {
    background-color: #99f
}

.rdg-cell-editing {
    padding: 0
}

.rdg-checkbox-label {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin-right: 1px
}

.rdg-checkbox-label-disabled {
    cursor: default
}

.rdg-checkbox-label-disabled .rdg-checkbox {
    border-color: var(--checkbox-disabled-border-color);
    background-color: var(--checkbox-disabled-background-color)
}

.rdg-checkbox-input {
    all: unset;
    width: 0;
    margin: 0
}

.rdg-checkbox {
    content: '';
    width: 20px;
    height: 20px;
    border: 2px solid var(--border-color);
    background-color: var(--background-color)
}

.rdg-checkbox-input:checked+.rdg-checkbox {
    background-color: var(--checkbox-color);
    box-shadow: inset 0 0 0 4px var(--background-color)
}

.rdg-checkbox-input:focus+.rdg-checkbox {
    border-color: var(--checkbox-focus-color)
}

.rdg {
    --color: #000;
    --border-color: #ddd;
    --summary-border-color: #aaa;
    --background-color: #fff;
    --header-background-color: #f9f9f9;
    --row-hover-background-color: #f5f5f5;
    --row-selected-background-color: #dbecfa;
    --row-selected-hover-background-color: #c9e3f8;
    --checkbox-color: #005295;
    --checkbox-focus-color: #62b8ff;
    --checkbox-disabled-border-color: #ccc;
    --checkbox-disabled-background-color: #ddd;
    --selection-color: #66afe9;
    --font-size: 14px;
    contain: strict;
    contain: size layout style paint;
    content-visibility: auto;
    height: 350px;
    border: 1px solid var(--border-color);
    box-sizing: border-box;
    overflow-x: auto;
    overflow-y: scroll;
    -webkit-user-select: none;
    user-select: none;
    background-color: var(--background-color);
    color: var(--color);
    font-size: var(--font-size)
}

.rdg *, .rdg ::after, .rdg ::before {
    box-sizing: inherit
}

.rdg.rdg-dark {
    --color: #ddd;
    --border-color: #444;
    --summary-border-color: #555;
    --background-color: #222;
    --header-background-color: #1c1c1c;
    --row-hover-background-color: #181818;
    --row-selected-background-color: #1a73bc;
    --row-selected-hover-background-color: #1868aa;
    --checkbox-color: #95cfff;
    --checkbox-focus-color: #c8e6ff;
    --checkbox-disabled-border-color: #000;
    --checkbox-disabled-background-color: #333
}

@media (prefers-color-scheme:dark) {
    .rdg:not(.rdg-light) {
        --color: #ddd;
        --border-color: #444;
        --summary-border-color: #555;
        --background-color: #222;
        --header-background-color: #1c1c1c;
        --row-hover-background-color: #181818;
        --row-selected-background-color: #1a73bc;
        --row-selected-hover-background-color: #1868aa;
        --checkbox-color: #95cfff;
        --checkbox-focus-color: #c8e6ff;
        --checkbox-disabled-border-color: #000;
        --checkbox-disabled-background-color: #333
    }
}

@supports not (contain:strict) {
    .rdg {
        position: relative;
        z-index: 0
    }
}

.rdg-focus-sink {
    position: sticky;
    top: 0;
    left: 0;
    height: 0;
    width: 0;
    outline: 0
}

.rdg-viewport-dragging .rdg-row {
    cursor: move
}

.rdg-editor-container {
    display: contents
}

.rdg-text-editor {
    -webkit-appearance: none;
    appearance: none;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: 0 6px;
    border: 2px solid #ccc;
    vertical-align: top;
    color: var(--color);
    background-color: var(--background-color);
    font-family: inherit;
    font-size: var(--font-size)
}

.rdg-text-editor:focus {
    border-color: var(--selection-color);
    outline: 0
}

.rdg-text-editor::placeholder {
    color: #999;
    opacity: 1
}

.rdg-filter-row, .rdg-header-row {
    contain: strict;
    contain: size layout style paint;
    display: flex;
    width: var(--row-width);
    position: sticky;
    background-color: var(--header-background-color);
    font-weight: 700;
    z-index: 3
}

.rdg-header-row {
    height: var(--header-row-height);
    line-height: var(--header-row-height);
    top: 0
}

.rdg-filter-row {
    height: var(--filter-row-height);
    line-height: var(--filter-row-height);
    top: var(--header-row-height)
}

.rdg-cell-resizable::after {
    content: "";
    cursor: col-resize;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 10px
}

.rdg-cell .Select {
    max-height: 30px;
    font-size: 12px;
    font-weight: 400
}

.rdg-header-sort-cell {
    cursor: pointer;
    display: flex
}

.rdg-header-sort-name {
    flex-grow: 1;
    overflow: hidden;
    text-overflow: ellipsis
}

.rdg-row {
    contain: strict;
    contain: size layout style paint;
    display: flex;
    position: absolute;
    left: 0;
    width: var(--row-width);
    height: var(--row-height);
    line-height: var(--row-height);
    background-color: var(--background-color)
}

.rdg-row:hover {
    background-color: var(--row-hover-background-color)
}

.rdg-row-selected {
    background-color: var(--row-selected-background-color)
}

.rdg-row-selected:hover {
    background-color: var(--row-selected-hover-background-color)
}

.rdg-summary-row {
    position: sticky;
    z-index: 3
}

.rdg-summary-row>.rdg-cell {
    border-top: 2px solid var(--summary-border-color)
}

.rdg-group-row:not(.rdg-row-selected) {
    background-color: var(--header-background-color)
}

.rdg-group-row>.rdg-cell:not(:last-child):not(.rdg-cell-frozen-last) {
    border-right: none
}

.rdg-group-row-selected::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    box-shadow: inset 0 0 0 2px var(--selection-color);
    pointer-events: none;
    z-index: 2
}

.rdg-group-row-selected>.rdg-cell:first-child {
    box-shadow: inset 2px 0 0 0 var(--selection-color)
}

.rdg-group-cell-content {
    outline: 0
}

.rdg-caret {
    margin-left: 4px;
    stroke: currentColor;
    stroke-width: 1.5px;
    fill: transparent;
    vertical-align: middle
}

.rdg-caret>path {
    transition: d .1s
}
`

export default Grid