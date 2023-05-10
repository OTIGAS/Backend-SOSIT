import styled from "styled-components";

export const HeaderContent = styled.header`
    height: 5rem;
    padding: 1.25rem;
    background-color: ${props => props.theme['gray-900']};

    display: flex;
    align-items: center;
    justify-content: space-between;
    
    h1 {
        max-width: fit-content;
        border-radius: 8px;
        padding: 0 0.5rem;

        cursor: pointer;
        transition: 0.2s;

        color: ${props => props.theme['blue-light']};
        
        :hover {
            background-color: ${props => props.theme['gray-600']};
        }

    }
`