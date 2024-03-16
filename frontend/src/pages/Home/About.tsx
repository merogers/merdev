import TopWave from '../../assets/wave_about_top.svg';
import BottomWave from '../../assets/wave_about_bottom.svg';

export default function About() {
  return (
    <>
      <section className="home__about">
        <img src={TopWave} className="home__wave" />
        <div className="home__container">
          <h2 className="home__h2">About</h2>
          <p className="home__p">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Vivamus at augue eget arcu dictum varius duis. Mattis ullamcorper velit sed ullamcorper
            morbi tincidunt. Sed cras ornare arcu dui vivamus. Neque volutpat ac tincidunt vitae semper quis lectus.
            Mauris a diam maecenas sed enim ut sem. Tortor aliquam nulla facilisi cras. Nisl suscipit adipiscing
            bibendum est.
          </p>
          <p className="home__p">
            Maecenas pharetra convallis posuere morbi leo urna molestie at. Nulla malesuada pellentesque elit eget.
            Adipiscing commodo elit at imperdiet dui accumsan sit. Netus et malesuada fames ac turpis egestas integer
            eget. Et ligula ullamcorper malesuada proin libero nunc. Tellus orci ac auctor augue mauris augue neque
            gravida in. Posuere ac ut consequat semper viverra nam libero. Risus quis varius quam quisque id diam vel
            quam. Pretium quam vulputate dignissim suspendisse.
          </p>
        </div>
        <img src={BottomWave} className="home__wave" />
      </section>
    </>
  );
}
