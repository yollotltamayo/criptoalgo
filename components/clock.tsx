import {useState ,useEffect,cloneElement} from 'react'
import style from '../styles/Clock.module.css'
//const Clock = (props:{cadena:string, setCadena:any, encripta:any, abc:any}) => {
const Clock = (props) => {
    let {cadena, setCadena, encripta, abc } = props
    const ABC='abcdefghijklmnopqrstuvwxyz'.split(''),
          STEP = 360/ABC.length
    let deg = -STEP
    const generateLetter = (style:string,numero:number) => {
        return ABC.map( (val:string, idx:number) => {
            deg += STEP
            return(
                <span key={`${numero}-${val}`}
                    style={{'transform': `rotate(${deg}deg)`}}
                    className={`${style} char${idx +1}`}>{val}</span>
            )
        })
    }
    const [reloj1 , setReloj1] = useState(generateLetter(style.reloj1,1))
    const [reloj2 , setReloj2] = useState(generateLetter(style.reloj2,2))
    const ruedaCirculo = (e) => {
        let arr :any= [], min = Number.MAX_SAFE_INTEGER, pos = 0, mv
        deg = 0 
        reloj2.forEach( (val,idx) => {
            arr.push(cloneElement(val,{
                style:{
                    transform: `rotate(${deg + e.pageY}deg`
                }
            }))
            if(Math.round(deg  + e.pageY)%360 < min ){
                min = Math.round(deg  + e.pageY)%360 
                pos = idx
                mv = `rotate(${deg + e.pageY}deg`
            }
           deg += STEP 
        })
        encripta(cadena, setCadena, abc.get(arr[pos].key.split('-')[1]) | 0)
        setReloj2([...arr.slice(0,pos),
            cloneElement(arr[pos], {
                style : {
                    'color':'red',
                    'transform':mv
                }
            }),
            ...arr.slice(pos + 1, arr.length )
        ])
    }
    return (
        <div id="letras">
            <div className={style.letras} onMouseOver={ruedaCirculo}>
                <div className={style.reloj_afuera}>
                    {  reloj1.map( val => val ) }
                </div>
                    {  reloj2.map( val => val ) }
            </div>
        </div>
    )
}
export default Clock
