import type { AppProps } from 'next/app'
import Head from 'next/head'
import '../styles/globals.css'
import ChatWidget from '../components/ChatWidget'
import { SUPPORT } from '../lib/support.config'

export default function App({ Component, pageProps }: AppProps) {
  return       <><Head>
        <meta property="og:type" content="website" />
        <meta property="og:title" content="MealPlanner" />
        <meta property="og:description" content="Set a goal and dietary restrictions; get a 7-day meal plan you can actually cook. For people who want to eat better without the spreadsheet." />
        <meta property="og:url" content="https://meal-planner.lxsaihub.com/" />
        <meta property="og:image" content="https://meal-planner.lxsaihub.com/og.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="MealPlanner" />
        <meta name="twitter:description" content="Set a goal and dietary restrictions; get a 7-day meal plan you can actually cook. For people who want to eat better without the spreadsheet." />
        <meta name="twitter:image" content="https://meal-planner.lxsaihub.com/og.png" />
                                        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: '{"@context":"https://schema.org","@type":"SoftwareApplication","name":"MealPlanner","url":"https://meal-planner.lxsaihub.com/","description":"Set a goal and dietary restrictions; get a 7-day meal plan you can actually cook. For people who want to eat better without the spreadsheet.","applicationCategory":"BusinessApplication","operatingSystem":"Web"}' }} />
      </Head>
      <Component {...pageProps} />
      <ChatWidget productName={SUPPORT.productName} brandColor={SUPPORT.brandColor} sessionKeyPrefix={SUPPORT.productSlug} /></>
}
