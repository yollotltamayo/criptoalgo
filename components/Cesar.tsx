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
//import '../styles/katex.module.css'
//hljs.registerLanguage('python', python);
import hljs from './high'

const Latex = dynamic( () => import('react-latex'))

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
    const [tab, setTab] = useState<number>(0);

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
                }}>Cifrado Cesar ??????? </h1>
            <Paper elevation={3}>
                <Typography>
                    En criptograf??a, el cifrado C??sar, tambi??n conocido como cifrado por desplazamiento, c??digo de C??sar o desplazamiento de C??sar, es una de las t??cnicas de cifrado m??s simples y m??s usadas. Es un tipo de cifrado por sustituci??n en el que una letra en el texto original es reemplazada por otra letra que se encuentra un n??mero fijo de posiciones m??s adelante en el alfabeto. Por ejemplo, con un desplazamiento de 3, la A ser??a sustituida por la D (situada 3 lugares a la derecha de la A), la B ser??a reemplazada por la E, etc. Este m??todo debe su nombre a Julio C??sar, que lo usaba para comunicarse con sus generales.
                    <br></br>
    El cifrado C??sar muchas veces puede formar parte de sistemas m??s complejos de codificaci??n, como el cifrado Vigen??re, e incluso tiene aplicaci??n en el sistema ROT13. Como todos los cifrados de sustituci??n alfab??tica simple, el cifrado C??sar se descifra con facilidad y en la pr??ctica no ofrece mucha seguridad en la comunicaci??n.
                </Typography>
            </Paper>
            <h1 style={{
                fontSize:'calc(1em + 2vw)',
                padding:'0',
                WebkitTextFillColor:'transparent',
                WebkitTextStrokeWidth:'1px',
                margin:'0'
                }}>
            Demostraci??n </h1>
            <Paper >
                <OutlinedPaper variant="outlined">
                    <ul  className={style.listas}>
                        <li>Puedes ingresar una base(n??meros , letras )  o prueba moviendo la perilla.</li>
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
            Implementaci??n </h1>
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
                            <li>??Qu?? mensaje se obtiene si <Latex> $k = -1$</Latex> y porqu???</li>
                        </Typography>
                    </ul>
                </OutlinedPaper>
                Si aplicamos la formula de modulo para la resta:
                <div className={style.block}>
                    <Latex >$((a - b) \% MOD + MOD) \% MOD$</Latex>
                </div>
                Entonces resulta que  retrocedemos  las letras una posici??n atr??s sin salir del abecedario.
                <OutlinedPaper variant="outlined">
                    <ul  className={style.listas}>
                        <Typography>
                            <li>Encripta manualmente "YA LLEGARON LAS PIZZAS" utilizando una llave k = 10.</li>
                        </Typography>
                    </ul>
                </OutlinedPaper>
                <div className={style.block}>
                <Latex >$A \implies K , B \implies  L, C \implies M \dots Z \implies J$</Latex>
                </div> 
                Entonces :
                <div className={style.block}>
                <Latex >$ YA \ LLEGARON  \ LAS \ PIZZAS \implies IK  \ VVOQKBYX \ VKC  \ ZSJJKC$</Latex>
                </div>
                <OutlinedPaper variant="outlined">
                    <ul  className={style.listas}>
                        <Typography>
                            <li>??Qu?? caracter??stica tiene esta t??cnica cuando k = 13.</li>
                        </Typography>
                    </ul>
                </OutlinedPaper>
                Como la base es la mitad del abecedario de 26 letras, entonces el algoritmo de cifrar se puede usar tambi??n para descifrar.
                <OutlinedPaper variant="outlined">
                    <ul  className={style.listas}>
                        <Typography>
                            <li>Muestra qu?? f??rmula(s) representa(n) al algoritmo.</li>
                        </Typography>
                    </ul>
                </OutlinedPaper>
                <div className={style.block}>
                <Latex >$ENCRIPTA(x) = (x + BASE)\%n$</Latex>
                </div>
                <div className={style.block}>
                <Latex >$DESENCRIPTA(x) = (x - BASE)\%n$</Latex>
                </div>
                <OutlinedPaper variant="outlined">
                    <ul  className={style.listas}>
                        <Typography>
                            <li>Modificar el programa anterior para que pueda desencriptar mensajes a??n cuando se
                                desconozca la llave k, y probarlo con el texto que se muestra a continuaci??n.</li>
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
