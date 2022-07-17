const Access = (props: any) => {
    const {accessible,children} = props
    return accessible&&children
}
export default Access