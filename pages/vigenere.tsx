import  MuiContainer  from '@material-ui/core/Container'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography'
import MuiPaper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles'
import style from '../styles/Vigenere.module.css'
import {useState, useEffect} from 'react'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import dynamic from 'next/dynamic'
import hljs from '../components/high'
import Head from 'next/head'
import GridVigenere from '../components/gridVigenere'
import Llave from '../components/Llave'
import Switch from '@material-ui/core/Switch';
const Latex = dynamic( () => import('react-latex-next'))
const Clock = dynamic( () => import('../components/clock'))
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
//const chr = (car : string) =>  c
const reduce = (cadena : string) =>  new Map<string, number> (cadena.split('').map((val, idx) => [val, idx ])) 
const abc = reduce("abcdefghijklmnopqrstuvwxyz") , ABC = reduce("ABCDEFGHIJKLMNOPQRSTUVWXYZ")
const Vigenere = () => {
    const [cadena, setCadena ] = useState<Cadena | undefined > ({
        encriptada:'',
        normal:''
    })
    const [value, setValue] = useState< string > ('python')
    const [tab, setTab] = useState<number>(0);
    const [llave ,setLlave] = useState<string>('')

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setTab(newValue);
    };

    useEffect(() => {
        (hljs as any).highlightAll();
    }, []);

    const [base , setBase] = useState<number | 0 > (0)
    const [celda , setCelda] = useState<string  | ''>('0 0')
    const [encriptar, setEncriptar] = useState<boolean  | false>(false)
    const vigenere = (input:string, llav:string, encritpar:boolean) => {
        if(llav.length === 0)
            return
        let C:number  = -1, L:number = -1, ans:string= ''
        if(encritpar){
            C = (input ? input[input.length - 1].charCodeAt(0) - 'a'.charCodeAt(0) : -1),
                L = (llav ? (input.length)%llav.length : -1)
            if( L >= 0){
                L = (llave[ (L  === 0  ? llave.length - 1 : L - 1)].charCodeAt(0)  - 'a'.charCodeAt(0))

            }
                for(let i = 0 ; i < input.length ;i++){
                    if(/[a-z]/.test(input[i]))
                        ans += String.fromCharCode ((input[i].charCodeAt(0)   + llave[i % llave.length].charCodeAt(0) - 2*'a'.charCodeAt(0))%abc.size + 'a'.charCodeAt(0))
                    else
                        ans += input[i]
                }
        }else{
            let a = (llav ? llav[input.length%llav.length] : '_'), b = (input ? input[input.length - 1]: '_')
            if(/[a-z]/.test(a) && /[a-z]/.test(b)){
                C = (input ? b.charCodeAt(0) - 'a'.charCodeAt(0) : -1)
                L = (llav ? (input.length)%llav.length : -1)
                if( L >= 0){
                    L = (llave[ (L  === 0  ? llave.length - 1 : L - 1)].charCodeAt(0)  - 'a'.charCodeAt(0))
                    C = (C !== -1 ? (( C - L)%abc.size  + abc.size)%abc.size :-1)
                }
            }
                for(let i = 0 ; i < input.length ;i++){
                    if(/[a-z]/.test(input[i]))
                        ans += String.fromCharCode (((
                            input[i].charCodeAt(0)  - llave[i % llave.length].charCodeAt(0) 
                        )%abc.size  + abc.size)%abc.size + 'a'.charCodeAt(0))
                    else
                        ans += input[i]

                }
        }
        if(C >= 0 && L  >= 0){
            setCelda(`${L + 1} ${C + 1}`) 
            setCadena({
                encriptada: ans,
                normal : input
            })
        }else{
            setCadena({
                encriptada: ans,
                normal : input
            })
        }
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
                }}>Vigenère 🏛️ </h1>
            <Paper elevation={3}>
                <Typography>
                    El cifrado Vigenère (no confundir con el cifrado de Vernam) es un cifrado basado en diferentes series de caracteres o letras del cifrado César formando estos caracteres una tabla, llamada tabla de Vigenère, que se usa como clave. El cifrado de Vigenère es un cifrado por sustitución simple polialfabético.
                    <br></br>
El cifrado Vigenère se ha reinventado muchas veces. El método original fue descrito por Giovan Battista Belasso en su libro de 1553 La cifra del Sig. Giovan Battista Belasso. Sin embargo, fue incorrectamente atribuido más tarde a Blaise de Vigenère, concretamente en el siglo XIX, y por ello aún se le conoce como el "cifrado Vigenère".
                    <br></br>

                    Este cifrado es conocido porque es fácil de entender e implementar, además parece irresoluble; esto le hizo valedor del apodo el código indescifrable (le chiffre indéchiffrable, en francés).
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
                        <li>Ingresa la llave (por ahora solo funciona con minúsculas)</li>
                        <li>Ingresa el texto a {encriptar ? 'encriptar':'desencriptar'} (por ahora solo funciona con minúsculas)</li>
                        <li> Cambia el switch para encriptar o desencriptar</li>
                    </ul>
                </OutlinedPaper>
                <h2>Ingresa tu llave</h2>
                <FormControlLabel
                    control={<Switch   
                        checked={encriptar}
                        onChange={() => {
                        setEncriptar(!encriptar)
                        }}
                        name="checkedA" />}
                    label={encriptar ? "Encriptar" : "Desencriptar"}
                />
                <div className={style.llaves}>
                    <div>
                        <TextField onChange={(e) => { setLlave(e.target.value) }} label="Llave"/>
                    </div>
                    <div>
                        <Llave cadena={cadena?.normal ?? ''} llave={llave}/>
                    </div>
                </div>

                <div className={"inputs"}>
                    <TextField onChange={(e) => {
                        /*let encrip = cadena?.encriptada ?? ''
                        setCadena({
                            normal: e.target.value,
                            encriptada: encrip
                        } )*/
                        vigenere(e.target.value,llave,encriptar)
                        }}
                        multiline rows= {3}
                        label ={encriptar ? "texto plano":"texto encriptado"}/>
                    <TextField  value={cadena?.encriptada}
                        label={encriptar ?"texto encriptado" :"texto desencriptado "}multiline rows={3}/>
                </div>
                <div className={style.grid}>
                    <div className={style.t1} ><Typography>ENTRADA CLAVE</Typography></div>
                    <div className={style.t2} ><Typography>ENTRADA TEXTO PLANO</Typography></div>
                {
                    <GridVigenere encriptar={encriptar} celda={celda}/>
                }
                </div>
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
                    onChange={handleChange}
                >
                    <Tab label="Python"  />
                </Tabs>
                    <pre>
                        <code style={{borderRadius :'4px'}} className="python">
                        { `class Vigenere:
    def __init__(self, abc="abcdefghijklmnopqrstuvwxyz"):
        self.MOD = len(abc)
        self.abc = { letra : idx for idx, letra in enumerate(abc)}
    def Encripta(self, cadena :str , llave :str) -> str:
        ans = ''
        print(self.abc)
        for idx, c in enumerate(cadena):
            if c in self.abc:
                ans += chr((self.abc[c] + self.abc[llave[idx%len(llave)]])%len(self.abc) + ord('a'))
            else:
                ans += c
        return ans
    def Desencripta(self, cadena :str , llave :str) -> str:
        ans = ''
        print(self.abc)
        for idx, c in enumerate(cadena):
            if c in self.abc:
                ans += chr((self.abc[c] - self.abc[llave[idx%len(llave)]])%len(self.abc) + ord('a'))
            else:
                ans += c
        return ans`
}

                    </code></pre>
            </Paper>
        </Container>
        </>
    )
}

export default Vigenere
