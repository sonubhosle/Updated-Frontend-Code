import React from 'react'
import Carousel from 'react-material-ui-carousel'

const slide_images = [
    {
        "id": 1,
        "image": "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/3a0edbfa89f89763.jpg?q=20",
    },
    {
        "id": 2,
        "image": "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/029dded1a973385e.jpg?q=20",
    },
    {
        "id": 3,
        "image": "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/8d7c5a9f8990a71b.jpg?q=20",
    },
    {
        "id": 4,
        "image": "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/9e9aa250dfecdbc3.jpg?q=20",
    },
]

const Home_Carousel = () => {
    return (
        <Carousel indicators={false}>
            {
                slide_images.map((item,index)=> <img src={item.image} key={index}/>)
            }
        </Carousel>
    )
}

export default Home_Carousel