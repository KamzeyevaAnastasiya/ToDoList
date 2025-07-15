type Props = {
    title: string
    onClickHandler?: () => void
    className?: string
}

export const Button = ({title, onClickHandler, className}: Props) => {
    return (
        <button className={className} onClick={onClickHandler}>{title}</button>
    )
}