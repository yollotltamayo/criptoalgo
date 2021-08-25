import Head from 'next/head'
import Image from 'next/image'
import Cesar from '../components/Cesar'
import styles from '../styles/Home.module.css'
import  MuiContainer  from '@material-ui/core/Container'
import MuiPaper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles'

export default function Home() {

    const Paper = withStyles({
        root:{
            padding: '15px',
            margin: '5px 0',
            borderTop:'1px solid rgba(255,255,255,0.1)'

        }
    })(MuiPaper)
    const Container = MuiContainer
    return (
        <>
            <Container maxWidth='md'>
                <div className={styles.main}>
                    <div className={styles.letras}>
                        <span>C</span>
                        <span>R</span>
                        <span>I</span>
                        <span>P</span>
                        <span>T</span>
                        <span>O</span>
                        <span>G</span>
                        <span>R</span>
                        <span>A</span>
                        <span>F</span>
                        <span>Í</span>
                        <span>A</span>
                    </div>
                    <Paper>
                        La criptografía (del griegu κρύπτvos (criptos), «ocultu», y γραφη (grafé), «grafo» o «escritura», lliteralmente «escritura oculto») definióse, tradicionalmente, como l'ámbitu de la criptología que s'ocupa de les téuniques de cifráu o codificado destinaes a alteriar les representaciones llingüístiques de ciertos mensaxes col fin de faelos inintelixibles a receptores ensin autorizar. Estes téuniques utilícense tantu nel arte como na ciencia y na teunoloxía. Poro, l'únicu oxetivu de la criptografía yera consiguir la confidencialidad de los mensaxes, pa lo cual diseñábense sistemes de cifráu y códigos, y l'única criptografía esistente yera la llamada criptografía clásica
                    </Paper>
                </div>
            </Container>
        </>
    )
}


