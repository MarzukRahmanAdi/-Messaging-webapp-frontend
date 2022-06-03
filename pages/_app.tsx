import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { MantineProvider } from '@mantine/core'
import { Tuple } from '@mantine/core';

type CustomColors = 'primaryColorName' | 'secondaryColorName';

declare module '@mantine/core' {
  export interface MantineThemeColorsOverride {
    colors: Record<CustomColors, Tuple<string, 10>>;
  }
}
function MyApp({ Component, pageProps }: AppProps) {

  return (
  <MantineProvider theme={{
    colorScheme:"dark",
    colors:{
      customDarkColors:["#131A2B", "#080E1A"],
    }
  }}>

  <Component {...pageProps} />
  </MantineProvider>

  
  )
}

export default MyApp
