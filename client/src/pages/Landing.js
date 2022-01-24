import logo from '../assets/images/logo.svg';
import main from '../assets/images/main.svg';
import Wrapper from '../assets/wrappers/LandingPage';

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <img src={logo} alt='logo' className='logo' />
      </nav>
      <div className='container page'>
        <div className='info'>
          <h1>
            Job <span>Tracking</span>App
          </h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate
            repellat voluptatibus id accusamus! Eos explicabo voluptate
            repellendus nihil officiis? Cum.
          </p>
          <button className='btn btn-hero'>Login/Register</button>
        </div>
        <img src={main} alt='job-hunt' className='img main-img' />
      </div>
    </Wrapper>
  );
};

export default Landing;
