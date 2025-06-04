type Props = {
    title: string
    onClickHandler?: () => void
}

export const Button = ({title, onClickHandler}: Props) => {
    return (
        <button onClick={onClickHandler}>{title}</button>
    )
}