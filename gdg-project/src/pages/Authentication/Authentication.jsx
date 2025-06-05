import { Card } from '@mui/material';

import { Grid } from '@mui/material';
import Login from './Login';
import Register from './Register';
const Authentication = () => {
  return (
    <div>

        <Grid container>
            <Grid className="h-screen overflow-hideen" item xs={7}>
                <img className="h-full w-full" src="https://developer.android.com/static/distribute/console/images/play-console.svg" alt=""/>
            </Grid>
            <Grid item xs={5}>

                <div className='px-20 flex flex-col justify-center h-full'>

                    <Card className='card p-8'>

                        <div className='flex flex-col item-center mb-5 space-y-1'>
                            <h1 className='logo text-center'>GGD-Connect</h1>
                            <p className='text-center text-sm w-[70&]'>Connect yourself</p>

                        </div>
                        
                        <div>

                            <Login/>



                        </div>

                        <div>


                            <Register/>





                        </div>
                        

                    </Card>

                </div>
            </Grid>
        </Grid>

    </div>
  )
}

export default Authentication