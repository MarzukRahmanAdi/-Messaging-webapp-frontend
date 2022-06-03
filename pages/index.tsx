import { Avatar, Card, Center, Grid, Group, Stack, Text, ThemeIcon } from '@mantine/core'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useStyles } from '../styles/index'
import styles from '../styles/Home.module.css'
import { ChatIcon } from '@heroicons/react/outline'

const Home: NextPage = () => {
  const {classes} = useStyles()
  const chats:any = ["Adi", "hola", "Doing", "Daki"]
  const message:any = [
  {
    Sender : true
  },
  {

  },
  {

  },
  {

  },
  {

  },
  {

  },
]
  return (
    <div className={classes.root}>
      <Head>
        <title>Chat</title>
        <meta name="description" content="Created by Adi" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Grid columns={36} >
          <Grid.Col className={classes.sidebar}  span={2} >
            <Stack align="center">

              <Avatar src={"/images/avatar.png"} sx={{marginTop:"20px", marginBottom:"30px  "}} radius="xl" />

              <ThemeIcon radius="xl" size="xl" color="violet">
                <ChatIcon/>
              </ThemeIcon>
            </Stack>

          </Grid.Col>   

          <Grid.Col sx={{background:"#1A202F"}}  span={27}>
            <Grid columns={27}>
              <Grid.Col span={7}>
                  <Stack sx={{marginTop:"20px"}}>
                      {chats.map(chat =>(
                        <Card className='CustomCard' sx={{ }}>
                          <Group>
                          <Avatar color="cyan" radius="xl">{chat.slice(0, 2)}</Avatar>
                            
                          <Text >{chat}</Text> 
                          </Group>                          
                        </Card>
                      ))}
                  </Stack>
              </Grid.Col>
              <Grid.Col  span={20}>
                      
              </Grid.Col>
            </Grid>
 
          </Grid.Col>
            <Grid.Col span={7}>
            
            </Grid.Col>   
        </Grid>
      </main>

      <footer className={styles.footer}>

      </footer>
    </div>
  )
}

export default Home
