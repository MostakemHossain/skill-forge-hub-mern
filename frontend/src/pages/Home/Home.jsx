import Gallary from "./Gallary/Gallary"
import HeroContainer from "./Hero/HeroContainer"
import PopularClasses from "./PopularClasses/PopularClasses"
import PopularTeacher from "./PopularTeacher/PopularTeacher"


const Home = () => {
  return (
    <section>
      <HeroContainer />
      <div className="max-w-screen-2xl mx-auto">
        <Gallary />
        <PopularClasses />
        <PopularTeacher />

      </div>
    </section>
  )
}

export default Home