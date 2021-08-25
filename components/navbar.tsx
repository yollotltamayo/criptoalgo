import style from '../styles/Navbar.module.css'
import { useRouter } from 'next/router'
import Typography from '@material-ui/core/Typography'

const Navbar = () => {
    const r = useRouter()
    return (
        <div className={style.barra}>
            <div className={style.elements}>
                <div onClick={() => r.push('/')}className={style.element}>
                    <Typography>
                        <strong>
                        Criptografía 🔒
                        </strong>
                    </Typography>
                </div>
                <div onClick={() => r.push('/cesar')}
                    className={style.element}>
                    <Typography>
                        <a>Método Cesar</a>
                    </Typography>
                </div>
                <div onClick={() => r.push('/vigenere')}
                    className={style.element}>
                    <Typography>
                        <a>Método Vigenere</a>
                    </Typography>
                </div>
                <div onClick={() => r.push('/luhn')}
                    className={style.element}>
                    <Typography>
                        <a>Algoritmo de Luhn</a>
                    </Typography>
                </div>
            </div>
        </div>
    )
}
export default Navbar
