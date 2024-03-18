import Gallary from "./Gallary/Gallary"
import HeroContainer from "./Hero/HeroContainer"
import NewsLetter from "./NewsLetter/NewsLetter"
import PopularClasses from "./PopularClasses/PopularClasses"
import PopularTeacher from "./PopularTeacher/PopularTeacher"
import Stat from "./Stat/Stat"


const Home = () => {
  return (
    <section>
      <HeroContainer />
      <div className="max-w-screen-2xl mx-auto">
        <Gallary />
        <PopularClasses />
        <PopularTeacher />


      </div>
      <Stat />
      <div className="max-w-screen-2xl mx-auto">
        <NewsLetter />

      </div>
    </section>
  )
}

export default Home