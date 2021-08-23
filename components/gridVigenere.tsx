import style from '../styles/Vigenere.module.css'
const GridVigenere:any = (props:any) => {
    console.log(props.encriptar)
    let arr :any= []
    let abcd = "abcdefghijklmnopqrstuvwxyz"
    for(let i = 1 ; i <= 26;i++)
        arr.push(<div className={style.t2t} style={{
            gridArea:`2 / ${i + 2} / 3 /${ i + 3}`,
                background:(+props.celda.split(' ')[1] === i ? 
                (props.encriptar ? 'red':'green'):'transparent')
            }} key={`f${i} 0`}>{abcd[i - 1]}</div>)
    for(let i = 1 ; i <= 26;i++)
        arr.push(<div className={style.t1t} style={{
            gridArea:`${i + 2} / 2 /${ i + 3} / 3`,
                background:(+props.celda.split(' ')[0] === i ? 'red':'transparent')
            }} key={`f${i} 1`}>{abcd[i - 1]}</div>)
    for(let i = 1 ; i <= 26 ;i++){
        for(let j = 1 ; j <= 26 ;j++){
            arr.push(
                <div key={`${i} ${j}`} className={style.celda} style={{
                    background:(props.celda === `${i} ${j}`?
                        (props.encriptar ? 'green':'red'):'transparent'),
                        gridArea:`${i + 2} / ${j + 2} / ${i + 3} / ${j + 3}`
                    }} >
                        {abcd[((i - 1) + (j - 1))%26]}
                </div>
            );
        }
    }
    return arr; 
}
export default GridVigenere
