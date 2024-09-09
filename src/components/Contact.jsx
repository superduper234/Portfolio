import React, { useRef, useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const form = useRef();
  const [showLottie, setShowLottie] = useState(false);

  useEffect(() => {
    // Dynamically load the Lottie player script when the component mounts
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs';
    script.type = 'module';
    document.body.appendChild(script);

    // Cleanup script on component unmount
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_lr83hsm', 'template_nblqn7a', form.current, '1xdRcwObviOhcq31E')
      .then(
        () => {
          console.log('SUCCESS!');
          setShowLottie(true); // Show Lottie animation on success
          
          // Hide the Lottie animation after 2 seconds
          setTimeout(() => {
            setShowLottie(false);
          }, 2000);
        },
        (error) => {
          console.log('FAILED...', error.text);
        }
      );
  };

  return (
    <div name='contact' className='w-full h-screen bg-[#0a192f] flex justify-center items-center p-4'>
      <div className='flex flex-col max-w-[600px] w-full'>
        <div className='pb-8 flex flex-col justify-center w-full h-full items-center'>
          <p className='text-4xl font-bold inline border-b-4 border-cyan-500 text-gray-300'>Contact</p>
          <p className='text-gray-300 py-4'>Send me a message</p>
        </div>
        <form ref={form} onSubmit={sendEmail} className='flex flex-col w-full'>
          <input className='bg-[#ccd6f6] p-2' type="text" placeholder='Name' name='user_name' />
          <input className='my-4 p-2 bg-[#ccd6f6]' type="email" placeholder='Email' name='user_email' />
          <textarea className='bg-[#ccd6f6] p-2' name="message" rows="10" placeholder='Message'></textarea>
          <button type='submit' className='text-white border-2 hover:bg-cyan-500 hover:border-cyan-500 px-4 py-3 my-8 mx-auto flex items-center'>
            Let's Collaborate
          </button>
        </form>
      </div>

      {showLottie && (
        <div className="fixed inset-0 flex justify-center items-center bg-transparent">
          <dotlottie-player
            src="https://lottie.host/641b6cfb-80c0-4d46-9ba0-01eff81e51ba/OkISUi1XF1.json"
            background="transparent"
            speed="1"
            style={{ width: '300px', height: '300px' }}
            loop
            autoplay
          ></dotlottie-player>
        </div>
      )}
    </div>
  )
}

export default Contact;
