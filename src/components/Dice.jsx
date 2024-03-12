function Dice (props) {
    return <p onClick={props.hold} className={props.className} >{props.value}</p>
}

export default Dice