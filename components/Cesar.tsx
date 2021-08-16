import  MuiContainer  from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import MuiPaper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles'
import style from '../styles/Cesar.module.css'
import {useState, useEffect} from 'react'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
//import ljs from 'highlight.js';
//import python from 'highlight.js/lib/languages/python';
import dynamic from 'next/dynamic'
//import 'katex/dist/katex.min.css'

//hljs.registerLanguage('python', python);
import hljs from './high'

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
const encripta = (cadena:string, callback:any, base:number) => {
    let normal:string  = cadena
    base = +base | 0
    let mod = abc.size
    let encriptada:(string |undefined) = normal.split('').map( (val:string ) => {
        let upper :number | undefined = ABC.get(val) ?? 0
        let lower :number | undefined = abc.get(val) ?? 0
        if( (/[a-z]/).test(val)) {
            if(base < 0)
                return String.fromCharCode(((lower + base)%mod +mod)%mod+  'a'.charCodeAt(0))
            return String.fromCharCode((lower + base)%mod + 'a'.charCodeAt(0))
        }
        if( (/[A-Z]/).test(val)) {
            if(base < 0)
                return String.fromCharCode(((((upper)+ base)%mod) +mod)%mod+  'A'.charCodeAt(0))
            return String.fromCharCode(( (upper)+ base)%ABC.size + 'A'.charCodeAt(0))
        }
        return val
    }).join('')
    callback({
        encriptada,
        normal,
    })
}
const Cesar = () => {
    const [cadena, setCadena ] = useState<Cadena | undefined > ({
        encriptada:'',
        normal:''
    })
    const [value, setValue] = useState< string > ('python')
    const [tab, setTab] = useState<number>(1);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setTab(newValue);
    };

    const detBase = (base : string ,callback: any) => {
        if(abc.get(base)) {
            callback(abc.get(base))
            return abc.get(base)
        }
        if(ABC.get(base)) {
            callback(ABC.get(base))
            return ABC.get(base)
        }
        let newBase :number=  +base | 0
        callback(newBase)
        return newBase
    }
    useEffect(() => {
        (hljs as any).highlightAll();
    }, []);

    const [base , setBase] = useState<number | 0 > (0)
    return (
        <Container maxWidth="md" >
            <h1 style={{
                fontSize:'calc(1em + 4vw)',
                padding:'0',
                WebkitTextFillColor:'transparent',
                WebkitTextStrokeWidth:'1px',
                margin:'0'
                }}>Cifrado Cesar 🏛️ </h1>
            <Paper elevation={3}>
                <Typography>
                    En criptografía, el cifrado César, también conocido como cifrado por desplazamiento, código de César o desplazamiento de César, es una de las técnicas de cifrado más simples y más usadas. Es un tipo de cifrado por sustitución en el que una letra en el texto original es reemplazada por otra letra que se encuentra un número fijo de posiciones más adelante en el alfabeto. Por ejemplo, con un desplazamiento de 3, la A sería sustituida por la D (situada 3 lugares a la derecha de la A), la B sería reemplazada por la E, etc. Este método debe su nombre a Julio César, que lo usaba para comunicarse con sus generales.
                    <br></br>
    El cifrado César muchas veces puede formar parte de sistemas más complejos de codificación, como el cifrado Vigenère, e incluso tiene aplicación en el sistema ROT13. Como todos los cifrados de sustitución alfabética simple, el cifrado César se descifra con facilidad y en la práctica no ofrece mucha seguridad en la comunicación.
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
                    <ul  className={style.listas}>
                        <li>Puedes ingresar una base(números , letras )  o prueba moviendo la perilla.</li>
                        <li>Ingresa la cadena para encriptar .</li>
                    </ul>
                </OutlinedPaper>
                       <Clock abc={abc} cadena={cadena?.normal} setCadena={setCadena} encripta={encripta}/>

                <TextField id="base" onChange={(e) => {
                    let newCadena :string = cadena?.normal ?? ''
                    let newBase :number  = detBase(e.target.value, setBase) ?? 0
                    encripta(newCadena,setCadena, newBase)
                    } } label="Base" type="text" variant="filled" />
                <div className={style.inputs}>
                    <TextField id="cadena" onChange={(e) => encripta(e.target.value,setCadena,base)} rows={4} label="Cadena"  variant="filled" multiline/>
                    <TextField id="cadena-encriptada" value={cadena?.encriptada} rows={4} label="Cadena encriptada"  InputProps={{
                        readOnly: true,
                        }} variant="filled" multiline/>
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
                        { `class Cesar:
    def __init__(self, abc="abcdefghijklmnopqrstuvwxyz"):
        self.MOD = len(abc)
        self.abc = { letra : idx for idx, letra in enumerate(abc)}
    def Encripta(self,cadena:str, base:int)->str:
        encript = ''
        for c in cadena:
            if c.islower() :
                encript += chr((self.abc[c] + base)%26 + ord('a'))
            elif c.isupper() :
                encript += chr((self.abc[c] + base)%26 + ord('A'))
            else:
                encript += c
        return encript
    def Desencripta(self,cadena:str, base:int)->str:
        encript = ''
        for c in cadena:
            if c.islower() :
                encript += chr((self.abc[c] - base)%self.MOD + ord('a'))
            elif c.isupper() :
                encript += chr((self.abc[c] - base)%self.MOD + ord('A'))
            else:
                encript += c
        return encript`}

                    </code></pre>
            </Paper> <h1 style={{
                fontSize:'calc(1em + 2vw)',
                padding:'0',
                WebkitTextFillColor:'transparent',
                WebkitTextStrokeWidth:'1px',
                margin:'0'
                }}>
            Preguntas </h1>
            <Paper>
                <OutlinedPaper variant="outlined">
                    <ul  className={style.listas}>
                        <Typography>
                            <li>¿Qué mensaje se obtiene si <Latex> $k = -1$</Latex> y porqué?</li>
                        </Typography>
                    </ul>
                </OutlinedPaper>
                Si aplicamos la formula de modulo para la resta:
                <Latex >$((a - b) \% MOD + MOD) \% MOD$</Latex>
                Entonces resulta que  retrocedemos  las letras una posición atrás sin salir del abecedario.
                <OutlinedPaper variant="outlined">
                    <ul  className={style.listas}>
                        <Typography>
                            <li>Encripta manualmente "YA LLEGARON LAS PIZZAS" utilizando una llave k = 10.</li>
                        </Typography>
                    </ul>
                </OutlinedPaper>
                <Latex >$A \implies K , B \implies  L, C \implies M \dots Z \implies J$</Latex>
                Entonces :
                
                <Latex >$ YA \ LLEGARON  \ LAS \ PIZZAS \implies IK  \ VVOQKBYX \ VKC  \ ZSJJKC$</Latex>
                <OutlinedPaper variant="outlined">
                    <ul  className={style.listas}>
                        <Typography>
                            <li>¿Qué característica tiene esta técnica cuando k = 13.</li>
                        </Typography>
                    </ul>
                </OutlinedPaper>
                Como la base es la mitad del abecedario de 26 letras, entonces el algoritmo de cifrar se puede usar también para descifrar.
                <OutlinedPaper variant="outlined">
                    <ul  className={style.listas}>
                        <Typography>
                            <li>Muestra qué fórmula(s) representa(n) al algoritmo.</li>
                        </Typography>
                    </ul>
                </OutlinedPaper>
                <Latex >$ENCRIPTA(x) = (x + BASE)\%n$</Latex>
                <Latex >$DESENCRIPTA(x) = (x - BASE)\%n$</Latex>
                <OutlinedPaper variant="outlined">
                    <ul  className={style.listas}>
                        <Typography>
                            <li>Modificar el programa anterior para que pueda desencriptar mensajes aún cuando se
                                desconozca la llave k, y probarlo con el texto que se muestra a continuación.</li>
                        </Typography>
                    </ul>
                </OutlinedPaper>
                Encriptado
                <Paper>
                    G HRAK PGE CGY VRKGYGTZRE LREOTM GRUTM ZNK XUGJ CNKT YAJJKTRE G NGXRKE JGBOJYUT GVVKGXY. ZNK ZOTE HOXJ SGTKABKXY JKYVKXGZKRE HAZ YZORR IURROJKY GMGOTYZ ZNK XGOJKX'Y NKRSKZ. ZNK MAE YZUVY, RUUQY ZNK OTPAXKJ PGE ZNGZ RGEY JUCT UT ZNK LRUUX GTJ, LKKROTM MAORZE, JKIOJKY ZU ZGQK OZ NUSK. UTIK ZNKXK, ZNK XOJKX VAZY ZNK ATIUTYIOUAY HOXJ OT G IGMK COZN YUSK HXKGJ GTJ YUSK CGZKX; ZNKT RKGBKY ZNK NUAYK. G SOTAZK RGZKX, ZNK HRAK PGE YZGXZY XKIUBKXOTM GTJ, YZORR JOFFE, RUUQY GXUATJ... GTJ OZ YKKY HXKGJ... YKKY CGZKX... YKKY NOSYKRL YAXXUATJKJ HE HGXY... UBKXCNKRSKJ, NURJY OZY NKGJ COZN OZY COTMY GTJ IXOKY: "NURE IUC! O QORRKJ ZNK MAE OT ZNK SUZUXIEIRK... !"
                </Paper>
                Desencriptado con la base <strong>u</strong>
                <Paper>
                    A BLUE JAY WAS PLEASANTLY FLYING ALONG THE ROAD WHEN SUDDENLY A HARLEY DAVIDSON APPEARS. THE TINY BIRD MANEUVERS DESPERATELY BUT STILL COLLIDES AGAINST THE RAIDER'S HELMET. THE GUY STOPS, LOOKS THE INJURED JAY THAT LAYS DOWN ON THE FLOOR AND, FEELING GUILTY, DECIDES TO TAKE IT HOME. ONCE THERE, THE RIDER PUTS THE UNCONSCIOUS BIRD IN A CAGE WITH SOME BREAD AND SOME WATER; THEN LEAVES THE HOUSE. A MINUTE LATER, THE BLUE JAY STARTS RECOVERING AND, STILL DIZZY, LOOKS AROUND... AND IT SEES BREAD... SEES WATER... SEES HIMSELF SURROUNDED BY BARS... OVERWHELMED, HOLDS ITS HEAD WITH ITS WINGS AND CRIES: "HOLY COW! I KILLED THE GUY IN THE MOTORCYCLE... !"
                </Paper>
            </Paper>
        </Container>
    )
}

export default Cesar
