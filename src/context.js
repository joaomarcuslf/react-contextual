import React from 'react'

export const context = (targets, mapContextToProps) => Wrapped => props => {
    const isArray = Array.isArray(targets)
    const array = isArray ? targets : [targets]
    const values = []
    return [...array, Wrapped].reduceRight((accumulator, Context) => (
        <Context.Consumer>
            {value => {
                isArray && values.push(value)
                return accumulator !== Wrapped ? (
                    accumulator
                ) : (
                    <Wrapped {...props} {...mapContextToProps(isArray ? values : value, props)} />
                )
            }}
        </Context.Consumer>
    ))
}