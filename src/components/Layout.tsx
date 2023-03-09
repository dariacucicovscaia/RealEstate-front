import Navigation from "./Navigation";
import Footer from "./Footer";

interface Props {
    children: JSX.Element | JSX.Element[]
}

export const Layout = ({children}: Props) => {
    return (
        <div>
            <Navigation/>
            {children}
            {/*<Footer/>*/}
        </div>
    )
}