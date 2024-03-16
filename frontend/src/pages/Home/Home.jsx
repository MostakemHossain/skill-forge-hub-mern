import Gallary from "./Gallary/Gallary"
import HeroContainer from "./Hero/HeroContainer"
import PopularClasses from "./PopularClasses/PopularClasses"


const Home = () => {
  return (
    <section>
      <HeroContainer />
      <div className="max-w-screen-2xl mx-auto">
        <Gallary />
        <PopularClasses />

      </div>
    </section>
  )
}

export default Home