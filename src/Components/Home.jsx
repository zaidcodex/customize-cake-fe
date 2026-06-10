import React from 'react'
import Carousal from './Carousal';
import Banner from './Banner';
import Carousal2 from './Carousal-2';
import Products from './Products';
import Imgviewer from './Imgviewer';
import Typesofcake from './Typesofcake';
import OrderDesignerCake from './OrderDesignerCake';
import CustomCakeSection from './Customcakesec';
import WhyChoose from './WhyChoose';
import Testimonials from './Testimonials';
import Newsletter from './Newsletter';

const Home = () => {
  return (
    <div>
      <Carousal/>
     <Banner/>
     <Products/>
     <CustomCakeSection/>
     <WhyChoose/>
     <Testimonials/>
     {/* <Newsletter/> */}
     {/* <div className='mx-3'>
     <Imgviewer/>
     </div>
     <Typesofcake/>
     <OrderDesignerCake/> */}
    </div>
  )
}

export default Home
