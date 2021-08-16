import '../styles/globals.css'
import React from 'react'
import type { AppProps } from 'next/app'
import { ThemeProvider ,createTheme } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
function MyApp({ Component, pageProps }: AppProps) {
    const theme = createTheme({
        palette: {
            type: "dark",
        }
    })
    React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles?.parentElement?.removeChild(jssStyles);
    }
  }, []);
  return (
      <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
      </ThemeProvider>
  )
}
export default MyApp

