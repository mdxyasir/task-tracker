import Button from "./Button.jsx"

const Header = ({ onAdd, showAdd }) => {
    return (
        <header className="header">
            <h1>Task Tracker</h1>
            <Button color={showAdd ? "#CF3E3E" : "#45D878"} text={showAdd ? "X" : "+"} onClick={onAdd} />
        </header>
    )
}

export default Header
