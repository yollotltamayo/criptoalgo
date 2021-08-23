import style from '../styles/Llave.module.css'
const Llave = (props:any) => {
    let val = (props.cadena.length !== 0 ?props.cadena.length % props.llave.length  : -1)
    if(val >= 0){
        val = (val === 0 ? props.llave.length - 1 : val - 1)
    }
    return (
        props.llave.split('').map((value:string, idx:number) => (
            <span key={String(idx) + 'span'+ value} style={{
                background: (val === idx ? 'red' : 'transparent')
            }}
           className={style.letra}> {value}</span>
        ))
    )
}
export default Llave
