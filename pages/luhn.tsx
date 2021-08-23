import  MuiContainer  from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import MuiPaper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles'
import styles from '../styles/Luhn.module.css'
import {useState, useEffect} from 'react'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import dynamic from 'next/dynamic'
import hljs from '../components/high'
import Head from 'next/head'
import GridVigenere from '../components/gridVigenere'
import Llave from '../components/Llave'
const Latex = dynamic( () => import('react-latex-next'))
const MuiTextField = dynamic( () => import('@material-ui/core/TextField'))
const Container = MuiContainer
const Paper = withStyles({
    root:{
        padding: '15px',
        margin: '5px 0',
        borderTop:'1px solid rgba(255,255,255,0.1)'

    }
})(MuiPaper)
const OutlinedPaper = withStyles({
    root:{
        background:'rgba(255,255,255,0.4)',
        margin: '5px 0',
        borderTop:'1px solid rgba(255,255,255,0.1)'
    }
})(MuiPaper)
const TextField = withStyles({
    root:{
        width:'100%'
    }
})(MuiTextField)

interface Cadena {
    encriptada :string
    normal     :string
}
const reduce = (cadena : string) =>  new Map<string, number> (cadena.split('').map((val, idx) => [val, idx ])) 
const abc = reduce("abcdefghijklmnopqrstuvwxyz") , ABC = reduce("ABCDEFGHIJKLMNOPQRSTUVWXYZ")
const Luhn = () => {
    const[valida, setValida] = useState<boolean>(true)
    const [tab, setTab] = useState<number>(0);
    const [numero , setNumero] = useState<string>('123456789')

    useEffect(() => {
        (hljs as any).highlightAll();
    }, []);

    const [base , setBase] = useState<number | 0 > (0)
    const [celda , setCelda] = useState<string  | ''>('0 0')
    const [encriptar, setEncriptar] = useState<boolean  | false>(false)
    const luhn = (input:string) => {
        if(input.length > 20  || input.length <  4){
            return <div className={styles.banner}>El número debe tener entre 9 y 15 digitos</div>
        }
        if(!/^\d+$/.test(input))return
        let styleGrid = {
            display: 'grid',
            gridTemplateColumns : `repeat(${input.length}, 1fr)`,
            gridTemplateRows : `repeat(${3}, 1fr)`
        }
        let color1 = 'gray', color2 ='rgba(255,255,255,0.2)', offset = 0,cta = 0, correcto = false;
        for(let i = 0 ; i < input.length;i++){
            let num = +input[input.length - i - 1]
           if(i & 1) {
               cta += (num<<1 >= 10? Math.floor((num<<1)/10) + (num<<1)%10 :num<<1)
           }else{
                cta += num
           }
        }
        correcto = (cta % 10) === 0
        return (
            <>
            <div className={styles.grid } style={styleGrid}> 
                {
                    input.split('').reverse().map( (valStr , idx , arr ) => {
                        let val = +valStr
                        let pos = input.length - idx
                        let row1 = (((idx & 1) === 0) ? { style : { background:color1,gridArea:``}, value : val }:{ style : { background:color2,gridArea:``}, value : val })
                let row2 = ((idx & 1) === 0 ?   { style : { background : 'transparent' , gridArea:''}, value :'' } : {style: {background: color2,gridArea:''}, value : `${val} x 2 = ${val<<1}` })
                let row3 = ((idx & 1) === 0 ?   { style : { background : color1,gridArea:'' }, value :`${val }`} : {
                    style: {background: color2, gridArea:''}, 
                        value : `${Math.floor((val<<1)/10) === 0 ? '' :
                                `${Math.floor((val<<1)/10)} + `} ${(val<<1)%10}${Math.floor((val<<1)/10) === 0 ? '' :` = ${Math.floor((val<<1)/10) + (val<<1)%10}`}`}
                        )
                row1.style.gridArea = `${1 + offset} / ${pos} / ${2 + offset } / ${pos}`
                row2.style.gridArea = `${2 + offset} / ${pos} / ${3 + offset } / ${pos}`
                row3.style.gridArea = `${3 + offset} / ${pos} / ${4 + offset } / ${pos}`
                        return (
                <>
                    <div className={styles.celda} style={row1.style}>{row1.value}</div>
                    <div className={(idx & 1 ? styles.celda:'')} style={row2.style}>{row2.value}</div>
                    <div className={styles.celda +  ' ' + styles.suma} style={row3.style}>{row3.value}</div>
                </>
                        )
                    })
                }
            </div>
            <div style={{
                border: `10px solid ${correcto ? `rgba(0,255,0,0.2)`:`rgba(255,0,0,0.2)` }`
                }}
                className={styles.banner}>
                {correcto ? 'Número valido':'Número no valido'}
            </div>
            </>
        )
    }
    return (
        <>
        <Head>
          <link rel="stylesheet" href="//cdn.jsdelivr.net/gh/highlightjs/cdn-release@10.3.2/build/styles/monokai.min.css"></link>
        </Head>
        <Container maxWidth="md" >
            <h1 style={{
                fontSize:'calc(1em + 4vw)',
                padding:'0',
                WebkitTextFillColor:'transparent',
                WebkitTextStrokeWidth:'1px',
                margin:'0'
                }}>Luhn 🏛️ </h1>
            <Paper elevation={3}>
                <Typography>
                    El algoritmo de Luhn o fórmula de Luhn, también conocida como "algoritmo de módulo 10", es una fórmula de suma de verificación, utilizada para validar una diversidad de números de identificación; como números de tarjetas de crédito, números IMEI, etc. Su idea se convirtió en la base de uno de los algoritmos más importantes de nuestra era, la función resumen/hash como la conocemos hoy.
                </Typography>
            </Paper>
            <h1 style={{
                fontSize:'calc(1em + 2vw)',
                    padding:'0',
                    WebkitTextFillColor:'transparent',
                    WebkitTextStrokeWidth:'1px',
                    margin:'0'
                }}>
                Demostración </h1>
            <Paper >
                <OutlinedPaper variant="outlined">
                    <ul  >
                        <li>Puedes ingresar una número o generarlo aleatoriamente.</li>
                        <li> Da click en validar para verificar si es un número valido de tarjeta de credito</li>
                    </ul>
                </OutlinedPaper>
                <h2>Número</h2>

                <div className={"inputs"}>
                    <TextField onChange={(e) => { setNumero(e.target.value)}} label ={encriptar ? "texto plano":"texto encriptado"}/>
                </div>
                {
                    luhn(numero)
                }
            </Paper>
            <h1 style={{
                fontSize:'calc(1em + 2vw)',
                padding:'0',
                WebkitTextFillColor:'transparent',
                WebkitTextStrokeWidth:'1px',
                margin:'0'
                }}>
            Implementación </h1>
            <Paper>
                <Tabs 
                    aria-label="simple tabs example"
                    value={tab}
                    indicatorColor="primary"
                    textColor="primary"
                >
                    <Tab label="Python"  />
                </Tabs>
                    <pre>
                        <code style={{borderRadius :'4px'}} className="python">
                        { 
                            `class Luhn:
    def esValido(self, numero:str):
        ar = lambda ar : map(int, ar)
        return (sum((i<<1)//10 + (i<<1)%10 for i in ar(numero[1::2]))  + sum(ar(numero[0::2]))) % 10 == 0`

}

                    </code></pre>
            </Paper>
        </Container>
        </>
    )
}

export default Luhn
 
