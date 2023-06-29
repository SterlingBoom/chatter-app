import './About.css'
import couple from '../../assets/flowers.jpg'
const About = () => {
  return (
    <>
      <div className='about-top'>
        <section className='about-section container'>
          <div className='about-text'>
            <h1>About LoveDesk</h1>
            <h3>
              Welcome to LoveDesk! We&#39;re a heartfelt platform exploring the
              intricacies of love, relationships, family, lifestyle, and the
              emotional rollercoaster that comes with them. From the
              exhilarating highs to the heart-wrenching lows, we cover it all.
              At LoveDesk, we believe in the power of love to transform lives.
              We provide inspiring content, personal stories, and insightful
              discussions on topics like love, life, relationships, friendship,
              family, heartbreak, and finding inspiration in moments of
              loneliness. Our diverse team of writers and contributors brings a
              wealth of knowledge and perspectives, ensuring a rich tapestry of
              articles that resonate with our readers. Join our community as we
              navigate the joys and challenges of love together. Discover the
              universal language of love and its profound impact on our
              existence at LoveDesk. Lets embark on this incredible journey and
              explore the depths of our hearts. Welcome to LoveDesk– where love
              finds its voice.
            </h3>
          </div>
          <div className='about-img'>
            <img src={couple} alt='couple' />
          </div>
        </section>
      </div>
    </>
  )
}

export default About
