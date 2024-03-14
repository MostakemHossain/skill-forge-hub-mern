import Gallary from "./Gallary/Gallary"
import HeroContainer from "./Hero/HeroContainer"


const Home = () => {
  return (
    <section>
      <HeroContainer />
      <div className="max-w-screen-2xl mx-auto">
        <Gallary />

      </div>
    </section>
  )
}

export default Home