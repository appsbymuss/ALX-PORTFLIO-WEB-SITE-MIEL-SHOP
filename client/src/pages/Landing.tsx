import { Banner, CategoriesSection} from "../components";

import SectionContent1 from "../components/SectionContent1";
import BestSellersSlider from "../components/BestSellersSlider";
import Collections from "../components/CollectionsSection";
import WhyChooseUs from "../components/WhyChooseUs";
import NewProductsSlider from "../components/NewProductsSlider";
import ReviewsSlider from "../components/ReviewSlider";
const Landing = () => {
  return (
    <>
      <Banner />
      <SectionContent1 />
      <BestSellersSlider />
      <Collections />
      <WhyChooseUs />
      <NewProductsSlider />
      <ReviewsSlider />
      

      
    </>
  );
};
export default Landing;
