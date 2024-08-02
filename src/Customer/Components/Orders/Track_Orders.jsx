import { Step, StepLabel, Stepper } from '@mui/material'
import React from 'react'


const steps = [
    "Placed",
    "Order Conformed",
    "Shipped",
    "Out For Delivery",
    "Delivered"
]

const Track_Orders = ({activeStep}) => {
  return (
    <div className='w-full'>
        <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label)=><Step>
                <StepLabel sx={{color:"#9155fd",fontSize:"20px"}}>{label}</StepLabel>
            </Step>)}
        </Stepper>
    </div>
  )
}


export default Track_Orders