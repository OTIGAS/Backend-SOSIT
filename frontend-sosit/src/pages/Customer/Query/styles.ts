import styled from "styled-components";

export const DivMainContent = styled.div`
    margin: 0 auto;
    max-width: 37.5rem;

    width: 100%;

`

export const FormQueryContent = styled.form`
    display: flex;
    align-items: center;
    justify-content: center;

    margin-bottom: 1.25rem;
`

export const InputQueryContent = styled.input`
    width: 58.33%;
    height: 4.0625rem;

    border-radius: 8px 0 0 8px;
    background-color: transparent;
    border: 1px solid ${props => props.theme['blue-dark']};
    padding: 0.75rem;

    color: ${props => props.theme['white']};
    font-size: 1.5rem;

`

export const SelectQueryContent = styled.select`
    width: 20.83%;
    height: 4.0625rem;

    border-radius: 0;
    background-color: ${props => props.theme['blue']};
    border: 1px solid ${props => props.theme['blue-dark']};
    padding: 0.75rem 0.5rem;

    font-size: 1.5rem;
`

export const OptionsQueryContent = styled.option`
    font-size: 1rem;

    background-color: ${props => props.theme['white']};
`

export const ButtonQueryContent = styled.button`
    width: 20.83%;
    height: 4.0625rem;

    background-color: ${props => props.theme['blue']};
    border: 1px solid ${props => props.theme['blue-dark']};
    border-radius: 0 8px 8px 0;

    font-size: 1.5rem;

    display: flex;
    align-items: center;
    justify-content: space-around;
`

export const DivResultContent = styled.div`
    height: 44.6875rem;

    border-radius: 8px;
    background-color: ${props => props.theme['gray-700']};
`