import styled from "styled-components";

export const LayoutContainer = styled.div`
    display: flex;
    flex-direction: column;
    
    main {
        margin: 0;
        padding: 1.25rem;

        display: grid;
        grid-template-columns: 1fr 1fr;
    }
`

export const NavContent = styled.nav`
    display: flex;
    align-items: center;
    justify-content: space-around;
    
    height: 3.125rem;

    a {
        font-size: 1.5rem;
        text-decoration: none;
        color: ${props => props.theme['gray-100']};

        padding: 0 1rem;
        border-radius: 5px;

        transition: 0.2s;
        border-bottom: 2px solid transparent;

        &:hover {
            color: ${props => props.theme['blue-light']};
            border-bottom: 2px solid ${props => props.theme['blue-light']};
        }

        &.active {
            color: ${props => props.theme['blue-light']};
        }
    }

`