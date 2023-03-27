import Navigation from "./Navigation";

interface Props {
    children: JSX.Element | JSX.Element[]
}

export const Layout = ({children}: Props) => {
    return (
        <div>
            <Navigation/>
            {children}
        </div>
    )
}