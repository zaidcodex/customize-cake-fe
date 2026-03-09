import React from 'react'
import Carousal from './Carousal';
import Banner from './Banner';
import Carousal2 from './Carousal-2';
import Products from './Products';
import Imgviewer from './Imgviewer';
import Typesofcake from './Typesofcake';
import OrderDesignerCake from './OrderDesignerCake';

const Home = () => {
  return (
    <div>
      <Carousal/>
     <Banner/>
     <Products/>
     <Imgviewer/>
     <Typesofcake/>
     <OrderDesignerCake/>
    </div>
  )
}

export default Home
